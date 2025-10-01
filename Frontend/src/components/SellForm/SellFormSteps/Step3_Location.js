import React, { useState, useEffect } from "react";

const Step3_Location = ({ formData, setFormData, setStepValid }) => {
  const [loading, setLoading] = useState(false);
  const [pincodeError, setPincodeError] = useState("");

  const fetchLocation = async (pincode) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();

      if (data[0].Status === "Success") {
        const postOffices = data[0].PostOffice;
        const areaNames = postOffices.map((po) => po.Name);

        setFormData({
          ...formData,
          pincode,
          state: postOffices[0].State,
          city: postOffices[0].District,
          areaList: areaNames,
          area: areaNames[0] || "",
        });
        setPincodeError("");
      } else {
        setPincodeError("Invalid pincode. Please check.");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      setPincodeError("Something went wrong. Try again.");
    }
    setLoading(false);
  };

  // ✅ Validation
  useEffect(() => {
    const isValid = formData.state && formData.city && formData.area;
    if (setStepValid) {
      setStepValid(isValid);
    }
  }, [formData.state, formData.city, formData.area, setStepValid]);

  return (
    <div>
      <h2>Step 3: Location Details</h2>

      <div className="form-group">
        <label>Pincode</label>
        <input
          type="text"
          className="form-control"
          value={formData.pincode || ""}
          onChange={(e) => {
            const pin = e.target.value;
            setFormData({ ...formData, pincode: pin });

            if (pin.length === 6) {
              fetchLocation(pin);
            }
          }}
          placeholder="Enter 6-digit pincode"
        />
        {pincodeError && <p style={{ color: "red" }}>{pincodeError}</p>}
      </div>

      {loading && <p>🔄 Fetching location...</p>}

      {!loading && formData.city && (
        <>
          <div className="form-group">
            <label>State</label>
            <input
              type="text"
              className="form-control"
              value={formData.state || ""}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>City / District</label>
            <input
              type="text"
              className="form-control"
              value={formData.city || ""}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Area</label>
            <select
              className="form-control"
              value={formData.area || ""}
              onChange={(e) =>
                setFormData({ ...formData, area: e.target.value })
              }
            >
              <option value="">Select Area</option>
              {formData.areaList?.map((area, index) => (
                <option key={index} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default Step3_Location;
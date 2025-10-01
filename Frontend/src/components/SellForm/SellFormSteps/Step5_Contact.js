import React, { useEffect } from "react";


const Step5_Contact = ({ formData, setFormData, setStepValid }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "contactMobile") {
      const onlyDigits = value.replace(/\D/g, "");
      if (onlyDigits.length <= 10) {
        setFormData({ ...formData, [name]: onlyDigits });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    const isValid =
      formData.contactName?.trim().length > 0 &&
      formData.contactMobile?.trim().length === 10;

    if (setStepValid) {
      setStepValid(isValid);
    }
  }, [formData, setStepValid]);

  return (
    <div>
      <h2>Step 5: Contact Information</h2>

      <div className="form-group">
        <label>Contact Name</label>
        <input
          type="text"
          className="form-control"
          name="contactName"
          value={formData.contactName || ""}
          onChange={handleInputChange}
          placeholder="Enter your full name"
          maxLength={15}
        />
      </div>

      <div className="form-group">
        <label>Mobile Number</label>
        <input
          type="text"
          className="form-control"
          name="contactMobile"
          value={formData.contactMobile || ""}
          onChange={handleInputChange}
          placeholder="Enter 10-digit mobile number"
          maxLength={10}
        />
      </div>
    </div>
  );
};


export default Step5_Contact;
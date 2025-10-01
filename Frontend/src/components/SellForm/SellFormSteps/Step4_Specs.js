// src/components/SellForm/SellFormSteps/Step4_Specs.js
import React from "react";
import Select from "react-select";

const Step4_Specs = ({ formData, setFormData }) => {
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const ownershipOptions = [
    { value: "First Owner", label: "First Owner" },
    { value: "Second Owner", label: "Second Owner" },
    { value: "Third Owner", label: "Third Owner" },
    { value: "Fourth or More", label: "Fourth or More" },
  ];

  const handleOwnershipChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      ownership: selectedOption ? selectedOption.value : "",
    }));
  };

  return (
    <div className="sell-form-container">
      <div className="form-card">
        <h2>Step 4: Bike Specifications</h2>

        {/* Ownership Type */}
        <div className="form-group">
          <label>Ownership Type <span className="required">*</span></label>
          <Select
            options={ownershipOptions}
            onChange={handleOwnershipChange}
            value={
              ownershipOptions.find(
                (opt) => opt.value === formData.ownership
              ) || null
            }
            placeholder="Select ownership type"
          />
        </div>

        {/* Price Fields */}
        {formData.postType === "Sell" && (
          <div className="form-group">
            <label>
              Price (Selling Price)<span className="span">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price || ""}
              onChange={handleInput}
              min="0"
              required
            />
          </div>
        )}

        {formData.postType === "Rent" && (
          <>
            <div className="form-group">
              <label>
                Price Per Day<span className="span">*</span>
              </label>
              <input
                type="number"
                name="pricePerDay"
                value={formData.pricePerDay || ""}
                onChange={handleInput}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>
                Price Per Week<span className="span">*</span>
              </label>
              <input
                type="number"
                name="pricePerWeek"
                value={formData.pricePerWeek || ""}
                onChange={handleInput}
                min="0"
                required
              />
            </div>
          </>
        )}

        <div className="form-group">
          <label>
            Engine Capacity (cc)<span className="span">*</span>
          </label>
          <input
            type="text"
            name="enginecpacity"
            value={formData.enginecpacity || ""}
            
            onChange={handleInput}
            required
          />
        </div>

        <div className="form-group">
          <label>
            Kilometer Driven<span className="span">*</span>
          </label>
          <input
            type="text"
            name="kilometerdriven"
            value={formData.kilometerdriven || ""}
            onChange={handleInput}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="fueltype">
            Fuel Type<span className="required">*</span>
          </label>
          <select
            id="fueltype"
            name="fueltype"
            value={formData.fueltype || ""}
            onChange={handleInput}
            required
          >
            <option value="">-- Select Fuel Type --</option>
            <option value="Petrol">Petrol</option>
            <option value="CNG">CNG</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="form-group">
          <label>
            Any Accidents<span className="required">*</span>
          </label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="accident"
                value="Yes"
                checked={formData.accident === "Yes"}
                onChange={handleInput}
                required
              />
              Yes
            </label>
            <label >
              <input
                type="radio"
                name="accident"
                value="No"
                checked={formData.accident === "No"}
                onChange={handleInput}
                required
              />
              No
            </label>
          </div>
        </div>

        {formData.accident === "Yes" && (
          <div className="form-group">
            <label>Accident Severity</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="accidentType"
                  value="Major"
                  checked={formData.accidentType === "Major"}
                  onChange={handleInput}
                />
                Major
              </label>
              <label>
                <input
                  type="radio"
                  name="accidentType"
                  value="Minor"
                  checked={formData.accidentType === "Minor"}
                  onChange={handleInput}
                />
                Minor
              </label>
            </div>
          </div>
        )}

        <div className="form-group">
          <label>
            Any Modification<span className="span">*</span>
          </label>
          <input
            type="text"
            name="anymodification"
            value={formData.anymodification || ""}
            onChange={handleInput}
            required
          />
        </div>

        <div className="form-group">
          <label>
            Insurance Status<span className="span">*</span>
          </label>
          <select
            name="insurancestatus"
            value={formData.insurancestatus || ""}
            onChange={handleInput}
            required
          >
            <option value="">-- Select Insurance Status --</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
            <option value="Not Insured">Not Insured</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Step4_Specs;
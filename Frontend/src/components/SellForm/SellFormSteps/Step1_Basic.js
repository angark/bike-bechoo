import React, { useEffect, useState } from "react";
import Select from "react-select";

const Step1_Basic = ({ formData, setFormData, bikeData = {}, setStepValid }) => {
  const [customBrandName, setCustomBrand] = useState(formData.customBrandName || "");
  const [customModelName, setCustomModel] = useState(formData.customModelName || "");

  // Brand options
  const brandOptions = bikeData
    ? [
        ...Object.keys(bikeData).map((brand) => ({
          label: brand,
          value: brand,
        })),
        { label: "other", value: "other" },
      ]
    : [];

  // Model options
  const modelOptions =
    formData.brand && bikeData[formData.brand]
      ? [
          ...bikeData[formData.brand].map((model) => ({
            label: model,
            value: model,
          })),
          { label: "other", value: "other" },
        ]
      : formData.brand === "other"
      ? [{ label: "other", value: "other" }]
      : [];

  // Year options
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 25 }, (_, i) => ({
    label: (currentYear - i).toString(),
    value: (currentYear - i).toString(),
  }));

  // Validation
  useEffect(() => {
    const isValid =
      formData.postType &&
      formData.bikeType &&
      ((formData.brand && formData.brand !== "other") ||
        (formData.brand === "other" && customBrandName.trim() !== "")) &&
      ((formData.model && formData.model !== "other") ||
        (formData.model === "other" && customModelName.trim() !== "")) &&
      formData.year;

    if (setStepValid) {
      setStepValid(isValid);
    }
  }, [formData, customBrandName, customModelName, setStepValid]);

  // Keep formData in sync with local state
  useEffect(() => {
    if (formData.brand === "other") {
      setFormData((prev) => ({ ...prev, customBrandName }));
    }
  }, [customBrandName, formData.brand, setFormData]);

  useEffect(() => {
    if (formData.model === "other") {
      setFormData((prev) => ({ ...prev, customModelName }));
    }
  }, [customModelName, formData.model, setFormData]);

  return (
    <div className="form-card">
      <h2 className="form-title">Step 1: Basic Details</h2>

      {/* Posting Type */}
      <div className="form-group">
        <label className="form-label">
          Posting Type <span className="required">*</span>
        </label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="postType"
              value="Sell"
              checked={formData.postType === "Sell"}
              onChange={(e) =>
                setFormData({ ...formData, postType: e.target.value })
              }
            />
            Sell
          </label>
          <label>
            <input
              type="radio"
              name="postType"
              value="Rent"
              checked={formData.postType === "Rent"}
              onChange={(e) =>
                setFormData({ ...formData, postType: e.target.value })
              }
            />
            Rent
          </label>
        </div>
      </div>

      {/* Bike Type */}
      <div className="form-group">
        <label className="form-label">
          Bike Type <span className="required">*</span>
        </label>
        <select
          name="bikeType"
          value={formData.bikeType || ""}
          onChange={(e) =>
            setFormData({ ...formData, bikeType: e.target.value })
          }
          className="bike-type-dropdown"
        >
          <option value="">All BIKES ⬇</option>
          <option value="scooter">Scooter</option>
          <option value="sports">Sports</option>
          <option value="cruiser">Cruiser</option>
          <option value="ev">Electric Vehicle</option>
        </select>
      </div>

      {/* Brand */}
      <div className="form-group">
        <label className="form-label">
          Brand <span className="required">*</span>
        </label>
        <Select
          options={brandOptions}
          onChange={(selected) =>
            setFormData({
              ...formData,
              brand: selected.value,
              model: "",
              customBrandName: selected.value === "other" ? customBrandName : "",
            })
          }
          value={
            formData.brand
              ? { label: formData.brand, value: formData.brand }
              : null
          }
          placeholder="Select brand"
        />
        {formData.brand === "other" && (
          <input
            type="text"
            placeholder="Enter custom brand"
            value={customBrandName}
            onChange={(e) => setCustomBrand(e.target.value)}
            className="form-input"
          />
        )}
      </div>

      {/* Model */}
      <div className="form-group">
        <label className="form-label">
          Model <span className="required">*</span>
        </label>
        <Select
          options={modelOptions}
          onChange={(selected) =>
            setFormData({
              ...formData,
              model: selected.value,
              customModelName: selected.value === "other" ? customModelName : "",
            })
          }
          value={
            formData.model
              ? { label: formData.model, value: formData.model }
              : null
          }
          isDisabled={!formData.brand}
          placeholder={!formData.brand ? "Select brand first" : "Select model"}
        />
        {formData.model === "other" && (
          <input
            type="text"
            placeholder="Enter custom model"
            value={customModelName}
            onChange={(e) => setCustomModel(e.target.value)}
            className="form-input"
          />
        )}
      </div>

      {/* Year */}
      <div className="form-group">
        <label className="form-label">
          Year of Purchase <span className="required">*</span>
        </label>
        <Select
          options={years}
          onChange={(selected) =>
            setFormData({ ...formData, year: selected.value })
          }
          value={
            formData.year
              ? { label: formData.year, value: formData.year }
              : null
          }
          placeholder="Select year"
        />
      </div>
    </div>
  );
};

export default Step1_Basic;

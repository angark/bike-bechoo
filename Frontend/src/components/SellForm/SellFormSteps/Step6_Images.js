import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Step6_Images = ({ formData, setFormData }) => {
  const [bikeImagePreviews, setBikeImagePreviews] = useState([]);

  const handleBikeImagesChange = (e) => {
    let files = Array.from(e.target.files);
    if (files.length > 4) {
      alert("You can upload up to 4 images only.");
      files = files.slice(0, 4);
    }

    // Save files directly to formData (no upload yet)
    setFormData((prev) => ({
      ...prev,
      bikeImages: files,
    }));

    // Show local previews
    setBikeImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleRecaptchaChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      recaptchaToken: value,
    }));
  };

  return (
    <div>
      <h2>Step 6: Upload Bike Photos & reCAPTCHA</h2>

      <div className="form-group">
        <label>Upload Bike Photos (up to 4 images allowed)</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          multiple
          onChange={handleBikeImagesChange}
        />
      </div>

      {bikeImagePreviews.length > 0 && (
        <div className="image-preview-container">
          {bikeImagePreviews.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Bike Preview ${index + 1}`}
              style={{ width: "100px", height: "auto", margin: "5px" }}
            />
          ))}
        </div>
      )}

      <div className="form-group mt-3">
        <ReCAPTCHA
          sitekey="6Lf5zdgrAAAAAF9jA_KsniECqaEq1gvvDYzdyQat"
          onChange={handleRecaptchaChange}
        />
      </div>
    </div>
  );
};

export default Step6_Images;

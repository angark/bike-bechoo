import React, { useState, useEffect } from "react";
import axios from "axios";

const Step2_RC = ({ formData, setFormData, setStepValid }) => {
  const [localPreview, setLocalPreview] = useState(null); // Local file preview URL
  const [loading, setLoading] = useState(false);
  const [ocrResult, setOcrResult] = useState("");
  const [matchStatus, setMatchStatus] = useState(null);

  // Normalize RC number (remove spaces, convert O to 0, uppercase)
  const normalizeRC = (str) =>
    str.replace(/[^A-Z0-9]/gi, "").toUpperCase().replace(/O/g, "0");

  // Extract RC number from OCR text with flexible pattern
  const extractRCNumber = (text) => {
    const lines = text
      .split("\n")
      .map((line) =>
        line.replace(/[^A-Z0-9]/gi, "").toUpperCase().replace(/O/g, "0")
      );

    for (let line of lines) {
      const match = line.match(/([A-Z]{2}[0-9]{2}[A-Z]{0,3}[0-9]{4})/);
      if (match) return match[0];
    }
    return "";
  };

  // Upload image file to backend and get Cloudinary URL
  const uploadImageToBackend = async (file) => {
    const formDataUpload = new FormData();
    formDataUpload.append("rcImage", file);

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://bike-bechoo-6.onrender.com/api/form/upload-rc-image",
        formDataUpload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.fileUrl; // Cloudinary image URL
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image");
      return null;
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setMatchStatus(null);
    setOcrResult("");
    setLocalPreview(URL.createObjectURL(file));

    // Upload to backend + cloudinary
    const uploadedUrl = await uploadImageToBackend(file);
    if (!uploadedUrl) {
      setLoading(false);
      return;
    }

    // Save uploaded URL in formData so it persists
    setFormData((prev) => ({
      ...prev,
      rcImage: file, // optional, local file
      rcImageUrl: uploadedUrl, // cloudinary URL for preview
    }));

    // Prepare form data for OCR.space API
    const formPayload = new FormData();
    formPayload.append("apikey", "K88472225688957"); // Your OCR API key
    formPayload.append("language", "eng");
    formPayload.append("isOverlayRequired", "false");
    formPayload.append("scale", "true");
    formPayload.append("OCREngine", "2");
    formPayload.append("file", file);

    try {
      const response = await fetch("https://api.ocr.space/parse/image", {
        method: "POST",
        body: formPayload,
      });

      const data = await response.json();
      const text = data?.ParsedResults?.[0]?.ParsedText || "";

      console.log("Full OCR Output:\n", text);

      const extracted = extractRCNumber(text);
      setOcrResult(extracted);
      setFormData((prev) => ({ ...prev, extractedRC: extracted }));

      const inputRC = normalizeRC(formData.rcNumber || "");
      const ocrRC = normalizeRC(extracted);

      if (inputRC && ocrRC) {
        setMatchStatus(inputRC === ocrRC ? "matched" : "mismatched");
      }
    } catch (error) {
      console.error("OCR API Error:", error);
      alert("Something went wrong while extracting text.");
    } finally {
      setLoading(false);
    }
  };

  const handleManualRCInput = (e) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    setFormData({ ...formData, rcNumber: value });

    if (ocrResult) {
      setMatchStatus(
        normalizeRC(value) === normalizeRC(ocrResult) ? "matched" : "mismatched"
      );
    }
  };

  useEffect(() => {
    const isValid =
      formData.rcNumber &&
      formData.extractedRC &&
      normalizeRC(formData.rcNumber) === normalizeRC(formData.extractedRC);

    if (setStepValid) setStepValid(isValid);
  }, [formData.rcNumber, formData.extractedRC, setStepValid]);

  return (
    <div className="form-section">
      <h2>Step 2: RC Book Verification</h2>

      <div className="form-group">
        <label>Enter RC Number (manually)</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g., MH12AB1234"
          value={formData.rcNumber || ""}
          onChange={handleManualRCInput}
        />
      </div>

      <div className="form-group">
        <label>Upload RC Book Image (Upload clear image for verification)</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      {/* Show preview - prioritize uploaded URL, fallback to local preview */}
      {(formData.rcImageUrl || localPreview) && (
        <div className="form-group">
          <label>Preview:</label>
          <img
            src={formData.rcImageUrl || localPreview}
            alt="RC Preview"
            width="300"
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              marginTop: "10px",
            }}
          />
        </div>
      )}

      {loading && <p>🔄 Extracting RC number from image...</p>}

      {!loading && ocrResult && (
        <div className="form-group">
          <p>
            <strong>Extracted RC Number:</strong> {ocrResult}
          </p>
        </div>
      )}

      {matchStatus === "matched" && (
        <p style={{ color: "green", fontWeight: "bold" }}>✅ RC number matched!</p>
      )}
      {matchStatus === "mismatched" && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          ❌ RC number mismatch! Please verify.
        </p>
      )}
    </div>
  );
};

export default Step2_RC;

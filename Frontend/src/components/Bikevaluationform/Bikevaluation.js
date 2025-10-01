import React, { useState, useEffect,useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Bikevaluation.css";

const Bikevaluation = () => {
  const [brandOptions, setBrandOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [kmRun, setKmRun] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const sectionRef = useRef(null);
  const location = useLocation();

    useEffect(() => {
    if (location.hash === "#valuationSection" && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const years = Array.from(
    { length: new Date().getFullYear() - 1999 },
    (_, i) => `${2000 + i}`
  );

  useEffect(() => {
    axios.get("/brandModels.json").then((res) => {
      const brands = Object.keys(res.data);
      setBrandOptions(brands);
    });
  }, []);

  const handleBrandChange = (e) => {
    const selected = e.target.value;
    setSelectedBrand(selected);
    setModelOptions([]);
    setSelectedModel("");

    axios.get("/brandModels.json").then((res) => {
      const models = res.data[selected];
      setModelOptions(models || []);
    });
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    const year = parseInt(selectedYear);
    const kms = parseInt(kmRun);
    const base = parseFloat(basePrice);
    const currentYear = new Date().getFullYear();

    if (!base || !year || !kms) {
      alert("Please fill all fields correctly.");
      return;
    }

    let yearFactor = 1 - (currentYear - year) * 0.05;
    yearFactor = Math.max(yearFactor, 0.5);

    let kmFactor = 1 - kms / 100000;
    kmFactor = Math.max(kmFactor, 0.5);

    

    const estimated = Math.round(base * yearFactor * kmFactor );
    setEstimatedPrice(estimated);
  };

  return (
    <div id="valuationSection" className="valuation-container">
      <h2>Bike Valuation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <label>Brand</label>
          <select value={selectedBrand} onChange={handleBrandChange} required>
            <option value="">Select Brand</option>
            {brandOptions.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div className="form-section">
          <label>Model</label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            required
          >
            <option value="">Select Model</option>
            {modelOptions.map((model, index) => (
              <option key={index} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        <div className="form-section">
          <label>Year of Manufacture</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            required
          >
            <option value="">Select Year</option>
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        

        <div className="form-section">
          <label>KMs Run</label>
          <input
            type="number"
            value={kmRun}
            onChange={(e) => setKmRun(e.target.value)}
            placeholder="e.g. 25000"
            required
          />
        </div>

        <div className="form-section">
          <label>Base Price (₹)</label>
          <input
            type="number"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            placeholder="e.g. 80000"
            required
          />
        </div>

        <button type="submit">Check Estimated Value</button>

        {estimatedPrice !== null && (
          <div className="valuation-result">
            <h3>Estimated Price: ₹{estimatedPrice.toLocaleString()}</h3>
          </div>
        )}
      </form>
    </div>
  );
};

export default Bikevaluation;

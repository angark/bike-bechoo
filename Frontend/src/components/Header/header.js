import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./header.css";

const Header = ({ filters, setFilters }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Track MyActivity open state
  const [hideHeader, setHideHeader] = useState(false);

  // Listen for show/hide header events
  useEffect(() => {
    const hideHandler = () => setHideHeader(true);
    const showHandler = () => setHideHeader(false);

    window.addEventListener("hideHeader", hideHandler);
    window.addEventListener("showHeader", showHandler);

    return () => {
      window.removeEventListener("hideHeader", hideHandler);
      window.removeEventListener("showHeader", showHandler);
    };
  }, []);

  // Only show for these routes
  const showHeaderRoutes = ["/buy", "/sell", "/rent"].includes(currentPath);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    console.log("Applied Filters:", filters);
  };

  // Hide header if MyActivity is open or if route not in list
  if (!showHeaderRoutes || hideHeader) return null;

  return (
    <div className="header-container">
      {/* Navigation */}
      <div className="nav-links">
        <NavLink to="/buy" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Buy</NavLink>
        <NavLink to="/sell" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Sell</NavLink>
        <NavLink to="/rent" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Rent</NavLink>
      </div>

      {/* Filters */}
      <div className="filter-wrapper">
        {["/buy", "/rent"].includes(currentPath) && (
          <form className="search-bar" onSubmit={handleFilterSubmit}>
            {/* Common fields */}
            <div className="row">
              <select name="bikeType" className="dropdown" value={filters.bikeType} onChange={handleChange}>
                <option value="">All Bikes ⬇</option>
                <option value="scooter">Scooter</option>
                <option value="sports">Sports</option>
                <option value="cruiser">Cruiser</option>
                <option value="ev">Electric Vehicle</option>
              </select>
              <input
                type="text"
                name="location"
                className="search-input"
                placeholder="Location / Pincode"
                value={filters.location || filters.pincode || filters.state || filters.city}
                onChange={(e) => {
                  setFilters({
                    ...filters,
                    location: e.target.value,
                    pincode: e.target.value,
                  });
                }}
              />
            </div>

            {/* Buy filters */}
            {currentPath === "/buy" && (
              <div className="row">
                <div className="form-group">
                  <label>Year of Manufacture</label>
                  <input type="number" name="year" placeholder="e.g. 2022" value={filters.year} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Model Name</label>
                  <input type="text" name="brand" placeholder="e.g. Royal Enfield" value={filters.brand} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Ownership</label>
                  <input type="text" name="ownership" placeholder="e.g. First owner" value={filters.ownership} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input type="number" name="budget" placeholder="e.g. 50000" value={filters.budget} onChange={handleChange} />
                </div>
              </div>
            )}

            {/* Rent filters */}
            {currentPath === "/rent" && (
              <div className="row">
                <div className="form-group">
                  <label>Model Name</label>
                  <input type="text" name="brand" placeholder="e.g. Activa 6G" value={filters.brand} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Price/Day</label>
                  <input type="number" name="pricePerDay" placeholder="e.g. 500" value={filters.pricePerDay} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Price/Week</label>
                  <input type="number" name="pricePerWeek" placeholder="e.g. 3000" value={filters.pricePerWeek} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Fuel Type</label>
                  <select name="fueltype" value={filters.fueltype} onChange={handleChange}>
                    <option value="">Any</option>
                    <option value="Petrol">Petrol</option>
                    <option value="CNG">CNG</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
            )}

            <div style={{ marginTop: "12px" }}>
              <button type="submit" className="search-button">Apply</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Header;

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/navbar";
import Footer from "./components/Footer/footer";
import Header from "./components/Header/header";
import About from "./components/About/about";
import BuyPage from "./components/Buypage/BuyPage";
import SellPage from "./components/SellForm/SellPage";
import RentPage from "./components/Rentpage/RentPage";
import CompanyAbout from "./components/CompanyAbout/CompanyAbout";
import Contact from "./components/Contact/Contact";
import TermsAndConditions from "./components/Terms/TermsAndConditions";
import LaunchingSoon from "./components/Launch/LaunchingSoon";
import WhyChooseBikeBechoo from "./components/whychoose/whychoose";
import HowItWorks from "./components/How/HowItWorks";
import BikeValuationForm from "./components/Bikevaluationform/Bikevaluation";
import PrivacyPolicy  from  "./components/Privacy/Privacy";
import Gernalsafety from "./components/Safety/Gernalsafety";
import ReviewSection from "./components/Review/ReviewSection";
import AuthHandler from "./components/AuthHandler/AuthHandler";
import MyActivity from "./components/MyActivity/MyActivity";


const App = () => {
  const [filters, setFilters] = useState({
    location: "",
    brand: "",
    ownership: "",
    year: "",
    budget: "",
    bikeType: ""
  });

  return (
    <Router>
      {/* Header will control filters */}
      <Header filters={filters} setFilters={setFilters} />
      
      <Routes>
        {/* Standalone pages */}
        <Route path="/dealers" element={<LaunchingSoon />} />
        <Route path="/accessories" element={<LaunchingSoon />} />

        {/* Main layout */}
        <Route
          path="/*"
          element={
            <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
              <Navbar />
              
              <main style={{ flex: 1 }}>
                <About />
                
                <Routes>
                  <Route path="/" element={<div />} />
                  {/* Pass filters to BuyPage */}
                  <Route path="/buy" element={<BuyPage filters={filters} />} />
                  <Route path="/sell" element={<SellPage />} />
                 <Route path="/rent" element={<RentPage filters={filters} />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/terms" element={<TermsAndConditions />} />
                  <Route path="/bikevaluation" element={<BikeValuationForm />} />
                  <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
                  <Route path="/auth-handler" element={<AuthHandler />} />
                  
                </Routes>

                <CompanyAbout />
                <HowItWorks />
                <WhyChooseBikeBechoo />
                <Gernalsafety />
                <ReviewSection />
                
              </main>
              
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

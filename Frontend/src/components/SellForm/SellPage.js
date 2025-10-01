import React, { useState, useEffect } from "react";
import Step1_Basic from "./SellFormSteps/Step1_Basic";
import Step2_RC from "./SellFormSteps/Step2_RC";
import Step3_Location from "./SellFormSteps/Step3_Location";
import Step4_Specs from "./SellFormSteps/Step4_Specs";
import Step5_Contact from "./SellFormSteps/Step5_Contact";
import Step6_Images from "./SellFormSteps/Step6_Images";
import Stepper from "./Stepper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./SellPage.css";

const bikeData = {
  Aprilia: [
    "RS 457",
    "Tuono 457",
    "RS 660",
    "Tuono 660",
    "RSV4 1100 Factory",
    "Tuareg 660",
    "SR 125",
    "SR 160",
    "SR 175",
    "Storm 125",
    "SXR 125",
    "SXR 160",
  ],
  Ather: ["450S", "450X", "450 Apex", "Rizta"],
  Benelli: ["TRK 502", "TRK 502X", "502C", "Leoncino 500"],
  BSA: ["Gold Star 650", "Scrambler 650"],
  BMW: [
    "G310 RR",
    "S1000 RR",
    "M 1000 RR",
    "R 1250 GS",
    "CE 02",
    "R 1250 GS Adventure",
    "F 850 GS",
    "S 1000 R",
    "C 400 GT",
    "CE 04",
    "R 1300 GS",
    "F 900 GS",
    "R 12 nineT",
    "F 900 GS Adventure",
    "K 1600",
    "M 1000 R",
    "R 1250 RT",
    "M 1000 XR",
    "S 1000 XR",
    "R 1300 GS Adventure",
    "R 12",
    "F 900 XR",
    "R18",
  ],
  Brixton: [
    "Crossfire 500 X",
    "Crossfire 500 XC",
    "Cromwell 1200",
    "Cromwell 1200 X",
  ],
  Bounce: ["Infinity E1"],
  Benling: ["Aura", "Kriti", "Falcon"],
  Ducati: [
    "Panigale V4",
    "Panigale V4 R",
    "Panigale V2",
    "Streetfighter V4",
    "Streetfighter V2",
    "Multistrada V4",
    "Multistrada V4 Rally",
    "Monster",
    "Scrambler Icon",
    "Scrambler Dark",
    "DesertX",
    "DesertX Rally",
    "DesertX Discovery",
    "SuperSport 950 S",
    "Hypermotard 950 RVE",
    "Diavel V4",
    "XDiavel V4",
    "Superleggera V4",
  ],
  Evolet: ["Derby", "Pony", "Raptor", "Dhanno", "Hawk"],
  Ferrato: ["Disruptor"],
  Gemopai: ["Miso", "Ryder", "Ryder SuperMax", "Astrid Lite"],
  "Hop Electric": ["Oxo", "Lyf", "Leo"],
  Husqvarna: ["Vitpilen 250", "Svartpilen 401"],
  "Harley-Davidson": [
    "X440",
    "Sportster S",
    "Fat Bob",
    "Road Glide Special",
    "Iron 883",
    "Forty Eight",
    "Pan America 1250",
    "Heritage Classic",
    "Street Bob",
    "Fat Boy",
  ],
  Hero: [
    "Splendor Plus",
    "HF Deluxe",
    "HF 100",
    "Passion Plus",
    "Passion Pro",
    "Glamour",
    "Glamour Xtec",
    "Super Splendor",
    "Super Splendor Xtec",
    "Xtreme 125R",
    "Xtreme 160R",
    "Xtreme 160R 4V",
    "Xtreme 200S 4V",
    "Xpulse 200 4V",
    "Xpulse 200T 4V",
    "Karizma XMR",
    "Mavrick 440",
    "Xtreme 250R",
    "Xpulse 210",
    "XF3R",
    "Duet",
  ],
  Honda: [
    "Activa",
    "Activa 125",
    "Dio",
    "Dio 125",
    "Shine",
    "Shine 125",
    "SP 125",
    "Livo",
    "Unicorn",
    "XBlade",
    "Hornet 2.0",
    "CB200X",
    "CB300F",
    "CB300R",
    "Hness CB350",
    "CB350RS",
    "CB500X",
    "CBR650R",
    "CB650R",
    "CBR1000RR-R Fireblade",
    "Africa Twin",
    "Gold Wing Tour",
    "CD 110 Dream",
    "Cliq",
    "Grazia",
    "Aviator",
    "Navi",
    "Activa i",
    "Hornet",
  ],
  Jawa: [
    "Jawa 42",
    "Jawa Forty-Two",
    "Jawa 42 Bobber",
    "Jawa 42 FJ",
    "Jawa Perak",
    "Jawa 350",
  ],
  iVOOMi: ["iVOOMi S1", "iVOOMi Jeet X"],
  "Joy e-bike": [
    "Glob",
    "Wolf",
    "Wolf Plus",
    "Gen Nxt",
    "Gen Nxt Nanu",
    "Gen Nxt Nanu Plus",
    "Mihos",
    "Beast",
    "Thunderbolt",
    "Hurricane",
    "Monster",
    "Nemo",
  ],
  Kawasaki: [
    "Z900",
    "Ninja ZX-10R",
    "Ninja 300",
    "W175 Standard",
    "W175 Cafe",
    "W175 TR",
    "Ninja ZX-6R",
    "Z650",
    "Ninja 500",
    "Eliminator",
    "Ninja 650",
    "Ninja ZX-4R",
    "Ninja H2 SX",
    "Versys-X 300",
    "Vulcan S",
    "KLX 230",
    "Z H2",
    "Ninja ZX-4RR",
    "Versys 650",
    "Ninja 1100SX",
    "Z650RS",
    "Ninja H2 SX SE",
    "Z900RS",
    "Versys 1100",
    "KLX110R L",
    "KX 85",
    "KLX 300R",
    "KLX450R",
    "KLX 140R F",
    "KX112",
    "KX65",
    "KLX230RS",
    "KX250",
    "KX450",
  ],
  Keeway: [
    "SR 125",
    "K-Light 250V",
    "V302C",
    "SR 250",
    "K300 SF",
    "K300 R",
    "Vieste 300",
    "Sixties 300i",
  ],
  KTM: [
    "125 Duke",
    "200 Duke",
    "250 Duke",
    "390 Duke",
    "690 Duke",
    "790 Duke",
    "890 Duke R",
    "1390 Super Duke R",
    "RC 200",
    "RC 390",
    "RC GP",
    "250 Adventure",
    "390 Adventure",
    "390 Adventure X",
    "1290 Super Adventure S",
    "890 Adventure R",
    "390 Enduro R",
    "50 SX",
    "65 SX",
    "85 SX",
    "250 SX-F",
    "350 EXC-F",
    "450 SX-F",
    "390 SMC R",
  ],
  KineticGreen: ["E Luna", "Flex", "Zing", "Zulu", "Zoom"],
  "Liger Mobility": ["Liger X", "Liger X+"],
  Lectrix: ["SX25", "LXS", "LXS 2.0", "LXS 3.0", "NDuro", "ZYRO"],
  LML: ["Star", "Freedom", "Adreno", "Graptor", "Beamer", "Sensation"],
  "Matter Aera": ["Aera"],
  "Moto Morini": ["X-Cape", "Seiemmezzo"],
  Norton: ["Commando 961", "V4SV", "V4CR"],
  Oben: ["Rorr", "Rorr EZ"],
  Odys: ["Trot"],
  Okaya: [
    "Faast F4",
    "Freedum",
    "ClassIQ",
    "Faast F2B",
    "Faast F2T",
    "Faast F2F",
    "Faast F3",
    "Motofaast",
  ],
  Okinawa: [
    "Okhi-90",
    "iPraise",
    "iPraise+",
    "PraisePro",
    "Ridge",
    "Ridge+",
    "Lite",
    "R30",
    "Dual 100",
  ],
  Ola: [
    "Gig",
    "Gig+",
    "S1 Z",
    "S1 Z+",
    "S1 X",
    "S1 X Plus",
    "S1 Pro",
    "S1 Pro Plus",
    "S1 Air",
    "Roadster",
    "Roadster Pro",
    "Roadster X",
    "Roadster X+",
  ],

  "Pure EV": [
    "Epluto 7G",
    "Epluto 7G Max",
    "ETrance Neo",
    "EcoDryft",
    "eTryst 350",
  ],
  "QJ Motor": ["SRC 250", "SRC 500", "SRV 300", "SRK 400"],
  "Quantum Energy": ["Milan", "Plasma", "BZiness"],
  Revolt: ["RV300", "RV400", "RV1", "RV BlazeX"],
  River: ["Indie"],
  "Simple Energy": ["Simple One", "Simple OneS", "Simple Two"],
  Suzuki: [
    "Access 125",
    "Burgman Street 125",
    "Avenis 125",
    "Gixxer 150",
    "Gixxer SF 150",
    "Gixxer 250",
    "Gixxer SF 250",
    "V-Strom SX 250",
    "V-Strom 800 DE",
    "Katana",
    "GSX-8R",
    "Hayabusa",
  ],
  TVS: [
    "Apache 150 IE-Surge",
    "Apache RTR 160",
    "Apache RTR 160 4V",
    "Apache RTR 160 EFI",
    "Apache RTR 165RP",
    "Apache RTR 180",
    "Apache RTR 200 4V",
    "Apache RTR 200 Race Edition",
    "Apache RTR 200 FI",
    "Apache RTR 200 BS6",
    "Apache RR 310",
    "Apache RTR 310",
    "Ntorq 125 Standard",
    "Ntorq 125 Race Edition",
    "Ntorq 125 Super Squad",
    "Ntorq 125 Race XP",
    "Ntorq 125 XT",
    "Jupiter 110",
    "Jupiter 125",
    "iQube Electric 2.2kWh",
    "iQube Electric 3.1kWh",
  ],
  Triumph: [
    "Speed 400",
    "Speed T4",
    "Scrambler 400 X",
    "Scrambler 400 XC",
    "Trident 660",
    "Street Triple 765 RS",
    "Street Triple 1200 RS",
    "Daytona 660",
    "Tiger Sport 660",
    "Tiger 900",
    "Tiger 1200",
    "Bonneville T100",
    "Bonneville T120",
    "Bonneville Bobber",
    "Bonneville Speedmaster",
    "Scrambler 900",
    "Scrambler 1200 X",
    "Scrambler 1200",
    "Rocket 3",
    "Rocket 3 GT",
  ],
  "Tork Motors": ["Kratos", "Kratos R", "KratosX (upcoming)"],
  Ultraviolette: [
    "Tesseract",
    "Shockwave",
    "F77",
    "F77 Mach 2",
    "F77 SuperStreet",
  ],
  Vespa: [
    "ZX 125",
    "VXL 125",
    "S 125",
    "S Tech 125",
    "S 150",
    "S Tech 150",
    "S150 Oro",
    "SXL 150",
    "125 Qala",
    "125 Dual Tone",
    "125 Tech",
    "125 Single Tone",
    "150 Qala",
    "150 Tech",
    "150 Single Tone",
    "150 Dual Tone",
  ],
  Vida: ["V2 Lite", "V2 Plus", "V2 Pro", "VX2 Go", "VX2 Plus"],
  Yezdi: ["Adventure", "Roadster", "Scrambler"],
  Yamaha: [
    "FZ-S Hybrid",
    "FZS FI V4",
    "FZ S FI",
    "FZ-X Hybrid",
    "FZ X",
    "FZ FI",
    "Fascino 125",
    "Ray ZR 125",
    "MT-15 V2",
    "MT-03",
    "YZF-R15 V4",
    "R15S",
    "YZF-R3",
    "Aerox 155",
  ],
  YO: ["Electron DX", "Drift DX", "Drift DX+", "Edge DX", "Trust Drift HX"],
  Zontes: [],

  // Add more brands and models here
};

const SellPage = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    // Step 1
    postType: "",
    brand: "",
    customBrandName: "",
    customModelName: "",
    model: "",
    year: "",
    // Step 2
    rcNumber: "",
    rcImage: null,
    extractedRC: "",
    // Step 3
    pincode: "",
    state: "",
    city: "",
    area: "",
    // Step 4
    ownership: "",
    price: "",
    pricePerDay: "",
    pricePerWeek: "",
    enginecpacity: "",
    kilometerdriven: "",
    fueltype: "",
    accident: "",
    accidentType: "",
    anymodification: "",
    insurancestatus: "",
    // Step 5
    contactName: "",
    contactMobile: "",
    // Step 6
    bikeImages: [],
    bikeImageUrls: [], // cloudinary URLs after upload
    recaptchaToken: "",
    userId: "",
  });

  const initialFormData = {
    postType: "",
    brand: "",
    customBrandName: "",
    customModelName: "",
    model: "",
    year: "",
    rcNumber: "",
    rcImage: null,
    extractedRC: "",
    pincode: "",
    state: "",
    city: "",
    area: "",
    ownership: "",
    price: "",
    pricePerDay: "",
    pricePerWeek: "",
    enginecpacity: "",
    kilometerdriven: "",
    fueltype: "",
    accident: "",
    accidentType: "",
    anymodification: "",
    insurancestatus: "",
    contactName: "",
    contactMobile: "",
    bikeImages: [],
    bikeImageUrls: [],
    recaptchaToken: "",
    userId: "",
  };

  const [remainingPosts, setRemainingPosts] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showFreePostsDialog, setShowFreePostsDialog] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const isLoggedIn = !!token;

  // Load userId from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?._id) setFormData((prev) => ({ ...prev, userId: user._id }));
  }, []);

  // Fetch credits from backend
  // Fetch remaining posts from backend
  useEffect(() => {
    if (!token) return;
    const fetchCredits = async () => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/user/use-credit`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setRemainingPosts(res.data.remainingPosts || 1); // first post free
      } catch (err) {
        console.error("Error fetching credits", err);
      }
    };
    fetchCredits();
  }, [token]);

  // Autosave function
  const autosave = async (currentData, currentStep) => {
    if (!token) return;
    try {
      const saveData = { ...currentData };
      delete saveData.recaptchaToken;
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/form/save`,
        { formData: saveData, step: currentStep },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Draft saved at step", currentStep);
    } catch (err) {
      console.error("Failed to autosave draft:", err);
    }
  };

  // Razorpay payment
  const handlePayment = async ({ autoSubmit = false, dataToSubmit = null }) => {
    if (!token || !dataToSubmit) return;
    try {
      const orderRes = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/payment/order`,
        { amount: 5900 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: orderRes.data.amount,
        currency: "INR",
        name: "Bike Listing",
        description: "Unlock 3 posts",
        order_id: orderRes.data.id,
        handler: async (response) => {
          try {
            const verifyRes = await axios.post(
              `${process.env.REACT_APP_API_URL}/api/payment/verify`,
              response,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            if (verifyRes.data.success) {
              toast.success("Payment successful! You now have 3 free posts.");
              setRemainingPosts(3);
              if (autoSubmit) await createPostAndClearDraft(dataToSubmit);
            } else toast.error("Payment verification failed!");
          } catch (err) {
            console.error(err);
            toast.error("Payment verification failed!");
          }
        },
        prefill: {
          name: JSON.parse(localStorage.getItem("user"))?.name || "",
          email: JSON.parse(localStorage.getItem("user"))?.email || "",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment initiation failed:", err);
      toast.error("Failed to initiate payment.");
    }
  };

  // Create post & clear draft
  // Create post function
  const createPostAndClearDraft = async (data) => {
    if (!token) return;
    try {
      const form = new FormData();
      if (data.rcImage instanceof File) form.append("rcImage", data.rcImage);
      if (data.bikeImages?.length > 0) {
        data.bikeImages.forEach((file) => {
          if (file instanceof File) form.append("bikeImages", file);
        });
      }
      Object.entries(data).forEach(([key, value]) => {
        if (value == null || ["rcImage", "bikeImages"].includes(key)) return;
        if (Array.isArray(value)) form.append(key, JSON.stringify(value));
        else form.append(key, value.toString());
      });
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/post/create`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        toast.success("Bike listed successfully!");
        setFormData(initialFormData);
        setStep(0);
        setRemainingPosts(res.data.remainingPosts || 0);
        navigate("/sell", { state: { newBike: res.data.post } });
      } else {
        toast.error(res.data.message || "Failed to create post.");
      }
    } catch (err) {
      console.error("Post creation error:", err.response?.data || err);
      toast.error("Failed to create post.");
    }
  };
  // Handle final submit
  const handleSubmit = async (e) => { if (e) e.preventDefault(); if (!isLoggedIn) return setShowLoginModal(true); if (!formData.recaptchaToken) return alert("Please verify CAPTCHA."); try { if (remainingPosts > 0) { // Consume one remaining post
      await createPostAndClearDraft(formData);
    } else { // No posts left, initiate payment
      const confirmPayment = window.confirm(
        "You need to pay ₹59 for next 3 posts. Continue?"
      );
      if (confirmPayment) {
        handlePayment({ autoSubmit: true, dataToSubmit: formData });
      }
    }
  } catch (err) {
    console.error("Submit error:", err);
    toast.error("Something went wrong.");
  }
};

  const totalSteps = 6;

  const validateStep = () => {
    switch (step) {
      case 0:
        return (
          formData.postType &&
          ((formData.brand && formData.model) || // normal brand/model
            (formData.customBrandName && formData.customModelName)) && // custom brand/model
          formData.year
        );

      case 1:
        return (
          formData.rcNumber &&
          formData.extractedRC &&
          formData.rcNumber === formData.extractedRC
        );

      case 2:
        return (
          formData.pincode && formData.state && formData.city && formData.area
        );

      case 3:
        if (!formData.ownership) return false;

        if (
          formData.postType === "Sell" &&
          (!formData.price || formData.price <= 0)
        )
          return false;

        if (
          formData.postType === "Rent" &&
          (!formData.pricePerDay || !formData.pricePerWeek)
        )
          return false;

        return (
          formData.enginecpacity && // If you renamed it to engineCapacity, update this line
          formData.kilometerdriven &&
          formData.fueltype &&
          formData.accident &&
          (formData.accident === "No" || formData.accidentType) &&
          formData.anymodification &&
          formData.insurancestatus
        );

      case 4:
        return formData.contactName && formData.contactMobile;

      case 5:
        return (
          formData.bikeImages &&
          formData.bikeImages.length > 0 &&
          formData.recaptchaToken
        );
      default:
        return true;
    }
  };

  // Updated nextStep to autosave before incrementing step
  const nextStep = async () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    if (!validateStep()) {
      alert("Please fill all required fields before proceeding.");
      return;
    }
    await autosave(formData, step);
    setStep((prev) => Math.min(prev + 1, 5));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <Step1_Basic
            formData={formData}
            setFormData={setFormData}
            bikeData={bikeData}
          />
        );

      case 1:
        return <Step2_RC formData={formData} setFormData={setFormData} />;
      case 2:
        return <Step3_Location formData={formData} setFormData={setFormData} />;
      case 3:
        return <Step4_Specs formData={formData} setFormData={setFormData} />;
      case 4:
        return <Step5_Contact formData={formData} setFormData={setFormData} />;
      case 5:
        return <Step6_Images formData={formData} setFormData={setFormData} />;

      default:
        return <div>Step not found</div>;
    }
  };

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="sell-page-container">
      <div className="form-step-container">
        <div className="form-card">
          <div className="form-step-content">{renderStep()}</div>
          <div className="stepper-buttons">
            {step > 0 && (
              <button onClick={prevStep} className="back-btn">
                Back
              </button>
            )}
            {step < totalSteps - 1 ? (
              <button onClick={nextStep} className="continue-btn">
                Next
              </button>
            ) : (
              <button onClick={handleSubmit} className="submit-btn">
                Submit
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="stepper-container">
        <Stepper
          step={step}
          setStep={setStep}
          validateStep={validateStep} // 🔥 pass the function here
          nextStep={nextStep}
          prevStep={prevStep}
          totalSteps={totalSteps}
          handleSubmit={handleSubmit}
        />
      </div>

      {showFreePostsDialog && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Free Posts Used</h3>
            <p>
              Your 3 free posts after payment are used. Please make a new
              payment to continue posting.
            </p>
            <div className="modal-actions">
              <button
                className="continue-btn"
                onClick={() => {
                  setShowFreePostsDialog(false);
                  handlePayment({ autoSubmit: false, dataToSubmit: null });
                }}
              >
                Pay & Get 3 More Posts
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowFreePostsDialog(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔒 Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Login Required</h3>
            <p>You must login before continuing.</p>
            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowLoginModal(false)}
              >
                Cancel
              </button>
              <button
                className="continue-btn"
                onClick={() =>
                  (window.location.href = "http://localhost:8000/auth/google")
                }
              >
                Continue (Login)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellPage;

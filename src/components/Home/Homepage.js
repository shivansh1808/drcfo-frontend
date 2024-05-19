import React from "react";
import Navbar from "./Navbar/Navbar";
import "./HomePage.css";
import Header from "./Header/Header";
import relativeImage from "../../assets/images/home/home_illus.png";
import DoctorParadigm from "./DoctorParadigm/DoctorParadigm";
import SignUpSection from "./SignUpSection/SignUpSection";
import Features from "./Features/Features";
import HIPAACard from "./HIPAA/HIPAACard";
import Modules from "./Modules/Modules";
import FAQ from "./FAQ/FAQ";
import Footer from "./Footer/Footer";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
const Homepage = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <>
      <div className="homepage">
        {/* <img src={relativeImage} alt="" className="top_corner_image" /> */}
        <Navbar />
        <Header />
      </div>
      <DoctorParadigm />
      <SignUpSection />
      <Features />
      <HIPAACard />
      <Modules />
      <FAQ />
      <Footer />
    </>
  );
};

export default Homepage;

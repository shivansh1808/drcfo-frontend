import React from "react";
import "./Consultation.css";
import image1 from "../../assets/images/c1.png";
import image2 from "../../assets/images/c2.png";
import image3 from "../../assets/images/c3.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
const Consultation = () => {
  const navigate = useNavigate();
  return (
    <div className="consultation_carousel">
      <div>
        <h1>Online Video Consultation</h1>
        <p>
          Onboard Yourself Today. <br /> and earn up too 1,20,000 with video
          consultation.
        </p>
      </div>
      <div className="carousel_wrapper">
        <Carousel
          showArrows={false}
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          interval={2000}
          infiniteLoop
        >
          <div className="card_car_1">
            <img src={image1} alt="" />
            <p>Accept Consultation Request</p>
          </div>
          <div className="card_car">
            <img src={image2} alt="" />
            <p>Generate Prescription</p>
          </div>
          <div className="card_car">
            <img src={image3} alt="" />
            <p>Make Revenue</p>
          </div>
        </Carousel>
      </div>
      <div className="terms">
        <input type="checkbox" id="Terms" name="Terms" value="Terms" />
        <label for="Terms">I accept the terms and agreement </label>
      </div>
      <div className="d-flex justify-content-center align-items-center start_consulting_cta">
        <button onClick={() => navigate("/dashboard/chatlist")}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Consultation;

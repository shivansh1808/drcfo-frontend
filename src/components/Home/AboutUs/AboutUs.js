import React from "react";
import Navbar from "../Navbar/Navbar";
import "./AboutUs.css";
import ab1 from "../../../assets/images/home/ab1.png";
import ab2 from "../../../assets/images/home/ab2.png";
import ab3 from "../../../assets/images/home/ab3.png";
import Footer from "../Footer/Footer";
const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="about_container">
        <div className="about_img">
          <img src={ab1} alt="" />
        </div>
        <div className="about_img two">
          <img src={ab2} alt="" />
          <span>About us</span>
        </div>
        <div className="about_img">
          <img src={ab3} alt="" />
        </div>
      </div>
      <div className="about_content">
        <p>
          DRCFO HEALTHCARE CONSULTANTS PVT. LTD., a company incorporated under
          the laws of India, is recognized as a start-up by the Department for
          Promotion of Industry and Internal Trade, Government of India Having
          Registration no DIPP61037.
        </p>
        <p>
          India, being one of the largest populated countries, facing a huge gap
          in the demand and supply of the Healthcare services, and not every
          individual gets the treatment in time. There are many healthcare
          professionals who due to ineffective record-keeping, prescription
          management, and mishandling of emergencies are not able to help their
          patients despite having the medical acumen and resources to handle
          such situations. This primarily happens due to a lack of technological
          up-gradation and skills or unavailability of a cost-effective solution
          that can smoothen the administrative work of a healthcare professional
          thereby reallocating time wasted on such work to the needs of the
          patients.
        </p>
        <p>
          In today’s fast-paced healthcare industry which is evolving
          technologically every single day, the success of any healthcare
          professional from a small private clinic to a multispeciality hospital
          primarily depends on the technological adaptation that allows robust
          record-keeping, prescription management, appointment scheduling,
          accounting, and statutory compliances in streamlined fashion with
          minimal wastage of time and resources. There are multiple healthcare
          management systems available in the market for the preparation and
          maintenance of records that are widely adopted by big
          hospitals/clinics. However, it fails to meet the needs of smaller
          clinics/hospitals and individual healthcare professionals. There is no
          comprehensive cost-effective and user-friendly automated system for
          healthcare management catering to all needs of healthcare
          professionals on a real-time basis, such as record keeping of patient
          data and hospital management, documentation related to various legal
          compliances, and financial and accounting management for smaller
          clinics/hospitals and individual healthcare professionals.
        </p>
        <p>
          In today’s fast-paced healthcare industry which is evolving
          technologically every single day, the success of any healthcare
          professional from a small private clinic to a multispeciality hospital
          primarily depends on the technological adaptation that allows robust
          record-keeping, prescription management, appointment scheduling,
          accounting, and statutory compliances in streamlined fashion with
          minimal wastage of time and resources. There are multiple healthcare
          management systems available in the market for the preparation and
          maintenance of records that are widely adopted by big
          hospitals/clinics. However, it fails to meet the needs of smaller
          clinics/hospitals and individual healthcare professionals. There is no
          comprehensive cost-effective and user-friendly automated system for
          healthcare management catering to all needs of healthcare
          professionals on a real-time basis, such as record keeping of patient
          data and hospital management, documentation related to various legal
          compliances, and financial and accounting management for smaller
          clinics/hospitals and individual healthcare professionals.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;

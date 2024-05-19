import React, { useState } from "react";
import "./FAQ.css";
import doc from "../../../assets/images/home/faq_doc.png";
import faq from "../../../assets/images/home/faq.png";
import CustomizedAccordions from "./Accordian";
import Accordian from "./Accordian";
import illus4 from "../../../assets/images/home/module_illus4.png";
const FAQ = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="FAQ_container">
      {/* <img src={illus4} alt="" className="module_illus4" /> */}
      <div className="faq_question">
        <img src={doc} alt="" className="faq_doc" />
      </div>

      <div className="faq_box">
        <div className="faq_header">
          <h1>Frequently Asked Questions</h1>
        </div>

        <div className="accordian_container">
          <Accordian />
        </div>
      </div>
    </div>
  );
};

export default FAQ;

import React from "react";
import "./Accordian.css";
const Accordian = () => {
  return (
    <div>
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Q. What is DRCFO?
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse "
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              DRCFO (Pat-IN389617) is an integrated healthcare management system
              for preparing and maintaining electronic medical records, records
              related to financial transactions, and records related to various
              legal compliances in real-time.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="true"
              aria-controls="collapseTwo"
            >
              Q. Why should I go with DRCFO?
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="collapseTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              There are many solutions available for medical professionals which
              are primarily focusing on the maintenance of electronic medical
              records and effective patient management, Therefore they have to
              use another system for the maintenance of records related to
              financial transactions, and records related to various legal
              compliances. <br />
              Thus, by using DRCFO Doctors can use their best efficiency for the
              scientific evaluation of patients’ profiles, for analyzing the
              treatment results, and to plan treatment protocols as they do not
              have to bother preparing various records, thus dedicating more
              time to patients rather than management of records .
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="true"
              aria-controls="collapseThree"
            >
              Q. Is There a hardware requirement to install or use DRCFO?
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="collapseThree"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              No, even You can start it with your smartphone and only require
              internet connectivity to use it.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFour">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="true"
              aria-controls="collapseFour"
            >
              Q. Is There a requirement for skilled personnel to operate the
              software?
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="collapseFour"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              No, A person having basic knowledge to operate a computer/ Smart
              Phone can easily operate the Software
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFive">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
              aria-expanded="true"
              aria-controls="collapseFive"
            >
              Q. Is my data safe?
            </button>
          </h2>
          <div
            id="collapseFive"
            className="accordion-collapse collapse"
            aria-labelledby="collapseFive"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <ul>
                <li>
                  DRCFO server is hosted within HIPAA-compliant Virtual Private
                  Servers inside Amazon Cloud which will ensure a secure
                  environment and protect critical health data, electronically
                  protected health information (ePHI), records, etc.
                </li>
                <li>
                  The Data saved in the software can be accessed by a respective
                  doctor only, as our log-in is based on One-Time Password (OTP)
                  authentication on our website and mobile application
                </li>
                <li>
                  We use HTTPS protocol for our website and mobile applications
                  (hereinafter referred to as “Platform”). All communication
                  between the Platform and our servers is protected via a
                  256-bit encrypted HTTPS protocol.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFour">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSix"
              aria-expanded="true"
              aria-controls="collapseFour"
            >
              Q. Will DRCFO have the facility to Customize the software?
            </button>
          </h2>
          <div
            id="collapseSix"
            className="accordion-collapse collapse"
            aria-labelledby="collapseSix"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              Yes, the doctors can customize the various operational aspects of
              the clinic operation including printing prescriptions on
              letterhead.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFour">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSeven"
              aria-expanded="true"
              aria-controls="collapseSeven"
            >
              Q. Will DRCFO help me migrate from my existing software?
            </button>
          </h2>
          <div
            id="collapseSeven"
            className="accordion-collapse collapse"
            aria-labelledby="collapseSeven"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              Yes, Our Support time will assist you to migrate.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFour">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseEight"
              aria-expanded="true"
              aria-controls="collapseEight"
            >
              Q. After the expiry of the Trial Period or Subscription can I
              download my data?
            </button>
          </h2>
          <div
            id="collapseEight"
            className="accordion-collapse collapse"
            aria-labelledby="collapseEight"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              Yes, Our Support time will assist you may download/exporting all
              your clinic data.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordian;

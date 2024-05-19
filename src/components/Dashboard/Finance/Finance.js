import React, { useState } from "react";

import "./Finance.css";
import image from "../../../assets/images/finance.png";
import { useRef } from "react";
import BankModal from "./BankModal";

const Finance = () => {
  const [benificiaryName, setbenificiaryName] = useState("");
  const [bankAccountNumber, setbankAccountNumber] = useState("");
  const [IFSCCode, setIFSCCode] = useState("");
  const [bankName, setbankName] = useState("");
  const [btnState, setBtnState] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  const inputRef = useRef(null);

  const getbenificiaryName = (e) => {
    setbenificiaryName(e.target.value);
  };

  const getbankAccountNumber = (e) => {
    setbankAccountNumber(e.target.value);
  };

  const getIFSCCode = (e) => {
    setIFSCCode(e.target.value);
  };

  const getbankName = (e) => {
    setbankName(e.target.value);
  };

  const checkbankAccountNumber = (e) => {
    if (bankAccountNumber !== e.target.value) {
      alert("Bank Account number should be same!");
      inputRef.current.value = "";
    } else {
      setbankAccountNumber(bankAccountNumber);
      // console.log("set");
    }
  };

  return (
    <div className="finance_container">
      <div className="d-flex align-items-center">
        <h2 className="bank_header">Add your bank</h2>
        {/* <p className="my_accounts_cta" onClick={openAccounts}>
          My Accounts
        </p> */}
      </div>
      <div className="finance_wrapper">
        <form>
          <div className="finance_input_box">
            <div>
              <label htmlFor="">Benificiary Name*</label>
              <input
                onChange={getbenificiaryName}
                type="text"
                id="bene"
                className="finance_input"
                placeholder="Enter benificiary name"
                name="Benificiary Name"
                required
              />
            </div>
            <div>
              <label htmlFor="">Bank Account Number*</label>
              <input
                onChange={getbankAccountNumber}
                type="text"
                className="finance_input"
                placeholder="Enter bank number"
                name="account no"
                required
              />
            </div>
            <div>
              <label htmlFor="">Confirm Account Number*</label>
              <input
                onBlur={checkbankAccountNumber}
                type="text"
                className="finance_input"
                placeholder="Enter bank number"
                name="account no"
                required
                ref={inputRef}
              />
            </div>
            <div>
              <label htmlFor="">IFSC Code*</label>
              <input
                onChange={getIFSCCode}
                type="text"
                className="finance_input"
                placeholder="Enter IFSC Code"
                name="IFSC Code"
                required
              />
            </div>
            <div>
              <label htmlFor="">Bank Name*</label>
              <input
                onChange={getbankName}
                type="text"
                className="finance_input"
                placeholder="Enter Bank Name"
                name="Bank Name"
                required
              />
            </div>
            <button disabled={btnState} className="add_bank_cta" type="submit">
              {btnState ? "You currently hold an account" : "Add Your Bank"}
            </button>
            <BankModal modalIsOpen={modalIsOpen} />
          </div>
        </form>
        <div className="finance_body">
          <div className="finance_image">
            <img src={image} alt="" />
          </div>
          <div>
            <h5>Add Your Bank & Activate Video Consultation</h5>
            <p>
              Provide secure video consultation to your patients from the
              comfort of your home
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;

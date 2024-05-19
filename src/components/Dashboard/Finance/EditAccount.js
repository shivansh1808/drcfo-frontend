import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../axios";

const EditAccount = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const doctorId = localStorage.getItem("doctor_id");
  const [benificiaryName, setbenificiaryName] = useState("");
  const [bankAccountNumber, setbankAccountNumber] = useState("");
  const [IFSCCode, setIFSCCode] = useState("");
  const [bankName, setbankName] = useState("");
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
      console.log("set");
    }
  };

  return (
    <div>
      <div className="finance_container">
        <div className="d-flex align-items-center">
          <h2 className="bank_header">Edit your Account</h2>
        </div>
        <div className="finance_wrapper">
          <form>
            <div className="finance_input_box">
              <div>
                <label>Benificiary Name*</label>
                <input
                  onChange={getbenificiaryName}
                  type="text"
                  id="bene"
                  className="finance_input"
                  placeholder="Enter benificiary name"
                  name="Benificiary Name"
                  required
                  value={benificiaryName}
                />
              </div>
              <div>
                <label>Bank Account Number*</label>
                <input
                  onChange={getbankAccountNumber}
                  type="number"
                  className="finance_input"
                  placeholder="Enter bank number"
                  name="account no"
                  required
                  value={bankAccountNumber}
                />
              </div>
              <div>
                <label>Confirm Account Number*</label>
                <input
                  onBlur={checkbankAccountNumber}
                  type="number"
                  className="finance_input"
                  placeholder="Enter bank number"
                  name="account no"
                  required
                  ref={inputRef}
                  value={bankAccountNumber}
                />
              </div>
              <div>
                <label>IFSC Code*</label>
                <input
                  onChange={getIFSCCode}
                  type="number"
                  className="finance_input"
                  placeholder="Enter IFSC Code"
                  name="IFSC Code"
                  required
                  value={IFSCCode}
                />
              </div>
              <div>
                <label>Bank Name*</label>
                <input
                  onChange={getbankName}
                  type="text"
                  className="finance_input"
                  placeholder="Enter Bank Name"
                  name="Bank Name"
                  required
                  value={bankName}
                />
              </div>
              <button className="add_bank_cta" type="submit">
                Add Your Bank
              </button>
            </div>
          </form>
          <div className="finance_body"></div>
        </div>
      </div>
    </div>
  );
};

export default EditAccount;

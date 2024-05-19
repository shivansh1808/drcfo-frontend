import React from "react";
import "./AddVitals.css";
import Modal from "react-modal";
import { useState } from "react";
import { updateVitals } from "../../api/appointment";
import { toast } from "react-toastify";
Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    height: "500px",
    width: "900px",
    transform: "translate(-50%, -50%)",
    background: "#F7F8F9",
    borderRadius: " 4px",
  },
};

const modalH1 = {
  fontWeight: "500",
  fontSize: "18px",
  lineHeight: " 29px",
  color: "#232526",
  marginTop: "30px",
  marginLeft: "30px",
};

const AddVitals = ({
  appointmentId,
  modalIsOpen,
  setIsOpen,
  setVitalsData,
  vitalsData,
  patient,
}) => {
  // console.log(patient);
  // const [vitalsValues, setvitalsValue] = useState({});
  // console.log(vitalsData);
  const submitVitals = async (e) => {
    e.preventDefault();
    const { hg, mm, ...vitals } = vitalsData;
    const res = await updateVitals(appointmentId, {
      bloodPressure: { hg, mm },
      ...vitals,
    });
    if (res?.status === 200) {
      toast.success("Vitals Added Successfully");
    } else {
      toast.error(res?.data?.message ?? "Something went wrong");
    }
    setIsOpen(false);
  };
  const InputHandle = (e) => {
    setVitalsData({ ...vitalsData, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="">
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
        onRequestClose={closeModal}
      >
        <form onSubmit={submitVitals} autoComplete="off">
          <div className="vital_modal">
            <h1 style={modalH1}>Add Vitals for {patient?.detials?.name}</h1>
            <div>
              <div className="d-flex justify-content-evenly">
                <div className="bp_input_box">
                  <label>BP(mmHg)</label>
                  <div className="bp_box">
                    <input
                      name="hg"
                      className="bp_input"
                      type="text"
                      onChange={InputHandle}
                      value={vitalsData?.bloodPressure?.hg}
                    />
                    /
                    <input
                      name="mm"
                      className="bp_input"
                      type="text"
                      onChange={InputHandle}
                      value={vitalsData?.bloodPressure?.mm}
                    />
                  </div>
                </div>
                <div className="vitals_input_box">
                  <label>Pulse(bpm)</label>
                  <input
                    value={vitalsData?.pulse}
                    name="pulse"
                    type="text"
                    onChange={InputHandle}
                  />
                </div>
                <div className="vitals_input_box">
                  <label>On set Diabetes(mg/dL)</label>
                  <input
                    value={vitalsData?.diabetes}
                    name="diabetes"
                    type="text"
                    onChange={InputHandle}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-evenly">
                <div className="vitals_input_box">
                  <label htmlFor="">Weight(kg)</label>
                  <input
                    value={vitalsData?.weight}
                    name="weight"
                    type="text"
                    onChange={InputHandle}
                  />
                </div>
                <div className="vitals_input_box">
                  <label htmlFor="">Height(cm)</label>
                  <input
                    value={vitalsData?.height}
                    name="height"
                    type="text"
                    onChange={InputHandle}
                  />
                </div>
                <div className="vitals_input_box">
                  <label htmlFor="">Hip(cm)</label>
                  <input
                    value={vitalsData?.hip}
                    name="hip"
                    type="text"
                    onChange={InputHandle}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-evenly">
                <div className="vitals_input_box">
                  <label htmlFor="temperature">Temperature(f)</label>
                  <input
                    value={vitalsData?.temperature}
                    name="temperature"
                    type="text"
                    onChange={InputHandle}
                  />
                </div>
                <div className="vitals_input_box">
                  <label htmlFor="">SPO2(%)</label>
                  <input
                    value={vitalsData?.spo2}
                    name="spo2"
                    type="text"
                    onChange={InputHandle}
                  />
                </div>
                <div className="vitals_input_box_invisible"></div>
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center ">
              <button
                type="submit"
                className="vitals_submit_cta"
                // onClick={() => setIsOpen(false)}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddVitals;

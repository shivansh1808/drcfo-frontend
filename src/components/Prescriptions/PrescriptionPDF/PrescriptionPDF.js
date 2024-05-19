import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getAppointmentFollowup } from "../../../api/appointment";
import { getAppointment } from "../../../api/doctor";
import "./PrescriptionPDF.scss";

const PrescriptionPDF = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const pdfRef = React.createRef(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [followupAppointment, setFollowupAppointment] = useState(null);
  console.log(appointmentData);
  useEffect(() => {
    onComponentLoad();
  }, [id]);

  const onComponentLoad = async () => {
    const appointmentResData = await getAppointment(id);
    console.log("appointment", appointmentResData);
    if (appointmentResData?.data) {
      setAppointmentData(appointmentResData?.data);
    } else {
      toast.error("could not fetch appointment data");
    }

    const followupAppointmentResData = await getAppointmentFollowup(id);
    console.log("follow up appointment", followupAppointmentResData);
    if (followupAppointmentResData?.data?.message == null) {
      setFollowupAppointment(followupAppointmentResData?.data);
    } else {
      toast.info("This appointment has no follow up appointment");
      setFollowupAppointment(null);
    }
  };

  const generatePdf = () => {
    if (pdfRef?.current == null) return;
    html2canvas(pdfRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
      pdf.save("download.pdf");
    });
  };
  console.log(appointmentData?.prescription?.diagnosis);
  return (
    <div className="PrescriptionPDF_container">
      <div className="PrescriptionPDF_navbar">
        <p className="PrescriptionPDF_navbar_text">
          <span onClick={() => navigate(-1)}>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
              />
            </svg>
            Prescription
          </span>
        </p>
      </div>
      <p className="PrescriptionPDF_container_header">
        Send Prescription to Patients
      </p>
      <div className="PrescriptionPDF_box" ref={pdfRef}>
        <div className="prescription_clinic_box">
          <div className="prescription_clinic_inner_box">
            <div>
              <h3>{appointmentData?.clinic?.name ?? "CLINIC NAME"}</h3>
              <h4>{"Dr. " + appointmentData?.doctor?.name ?? "DOCTOR NAME"}</h4>
              <h5>{appointmentData?.doctor?.education ?? "EDUCATION"}</h5>
            </div>
            <div>
              <p>Contact: {appointmentData?.doctor?.phone ?? "0000000000"}</p>
              <p>Email: {appointmentData?.doctor?.email}</p>
              <h6>
                Address:{" "}
                {appointmentData?.clinic?.address?.street +
                  ", " +
                  appointmentData?.clinic?.address?.area +
                  ", " +
                  appointmentData?.clinic?.address?.city +
                  " - " +
                  appointmentData?.clinic?.address?.pincode}
              </h6>
            </div>
          </div>
        </div>
        <div className="prescription_patient_container">
          <div className="prescription_patient_box">
            <h2>
              Patient Details <span>Date: {moment().format("DD/MM/YYYY")}</span>
            </h2>
            <p className="prescription_patient_box_name">
              {appointmentData?.unregisteredPatient?.name ??
                appointmentData?.patient?.name}
              , (
              {appointmentData?.unregisteredPatient?.gender?.charAt(0) ??
                appointmentData?.patient?.gender?.charAt(0)}
              ) /{" "}
              {moment().diff(
                moment(
                  appointmentData?.unregisteredPatient?.dateOfBirth ??
                    appointmentData?.patient?.dateOfBirth
                ),
                "years"
              )}{" "}
              year
            </p>
          </div>
        </div>
        <div className="patient_prescription_content">
          <div className="prescription_item">
            <h1>Complain</h1>
            <p>
              {appointmentData?.prescription?.complain
                ? appointmentData?.prescription?.complain.map((item, id) => (
                    <p>{item}</p>
                  ))
                : "No Complain"}
            </p>
          </div>
          <div className="prescription_item">
            <h1>Diagnosis</h1>

            <p>
              {appointmentData?.prescription?.diagnosis
                ? appointmentData?.prescription?.diagnosis.map((item, id) => (
                    <p>{item}</p>
                  ))
                : "No Diagnosis"}
            </p>
          </div>
          <div className="prescription_item">
            <h1>Treatment</h1>
            <p>
              {appointmentData?.prescription?.treatment
                ? appointmentData?.prescription?.treatment.map((item, id) => (
                    <p>{item}</p>
                  ))
                : "No Treatments"}
            </p>
          </div>
        </div>
        <div className="prescription_test_container">
          <div className="prescription_test_item">
            <h1>Test</h1>
            <ol>
              {appointmentData?.prescription?.test?.length > 0 ? (
                appointmentData?.prescription?.test?.map((test, index) => {
                  return <li key={index}>{test}</li>;
                })
              ) : (
                <p>-</p>
              )}
            </ol>
          </div>
        </div>
        <div className="prescription_drugs_container">
          {appointmentData?.prescription?.drugs?.length > 0 && (
            <div className="prescription_drugs_table">
              <table>
                <thead>
                  <tr>
                    <th>Medicine Name</th>
                    <th>Unit</th>
                    <th>Dosage</th>
                    <th>Duration</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {appointmentData?.prescription?.drugs.map((drug, index) => {
                    return (
                      <tr>
                        <td>TAB- {drug?.name ?? "Unnamed"}</td>
                        <td>{drug?.unit ?? "0"} TAB</td>
                        <td>{drug?.dosage ?? "0-0-0"}</td>
                        <td>{drug?.duration ?? "0"} days</td>
                        <td>{drug?.description ?? "-"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {followupAppointment && (
            <div className="prescription_follow_update">
              <div className="prescription_follow_update_wrapper">
                <h1>Follow Up Date</h1>
                <p>{moment(followupAppointment?.date).format("DD/MM/YYYY")}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="prescription_pdf_download_container">
        <button
          className="prescription_pdf_edit_cta"
          onClick={() => {
            navigate("/prescription/" + id);
          }}
        >
          Edit Prescription
        </button>
        <button
          className="prescription_pdf_continue_cta"
          onClick={() => navigate("/dashboard")}
        >
          Continue
        </button>
        <button
          className="prescription_pdf_download_cta"
          onClick={() => generatePdf()}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default PrescriptionPDF;

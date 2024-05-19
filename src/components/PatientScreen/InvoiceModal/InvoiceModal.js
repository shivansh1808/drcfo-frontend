import React from "react";
import "./InvoiceModal.css";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "36vw",
    padding: "1.5em 1em",
    transform: "translate(-50%, -50%)",
  },
};

const InvoiceModal = ({
  isInvoiceOpen,
  setInvoiceModalOpen,
  appointment,
  data,
}) => {
  const fees = [{ name: "Consultaion", price: appointment.fees.total }];
  // console.log(appointment.payment.type);
  return (
    <Modal
      isOpen={isInvoiceOpen}
      onRequestClose={() => setInvoiceModalOpen(false)}
      style={customStyles}
    >
      <div className="InvoiceModal">
        <p>Invoice</p>
        <p>#217098</p>
        <div className="appointment_card_header">
          <div>
            <h1 className="appointment_card_name"> {data?.patientName}</h1>
            <h2 className="appointmnet_type_label">
              {appointment?.parent != null
                ? "Follow-up"
                : appointment?.patient == null
                ? "Walk-in"
                : "MHV"}
            </h2>
          </div>
          <div className="appointment_card_details">
            <h4>
              Gender:{" "}
              <span className="appointment_card_details_value">
                {data?.patientGender}
              </span>
            </h4>
            <h4>
              Age:{" "}
              <span className="appointment_card_details_value">
                {data?.patientAge}
              </span>
            </h4>
            <h4>
              Phone:{" "}
              <span className="appointment_card_details_phone_value">
                {data?.patientPhone}
              </span>
            </h4>
          </div>
        </div>
      </div>
      {/* Services prices need to be added in the api */}
      <div className="amount_box">
        <div className="invoice_table">
          <table>
            <thead>
              <tr>
                <td>S. No.</td>
                <td>Service</td>
                <td>Total Charges</td>
              </tr>
            </thead>
            <tbody>
              {appointment.status == "CONFIRMED"
                ? fees.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.name}</td>
                        <td>₹{item?.price}/-</td>
                      </tr>
                    );
                  })
                : appointment.status == "COMPLETED"
                ? appointment.services.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.name}</td>
                        <td>₹{item?.price}/-</td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
          <hr />
          <h6 className="bills_grand_total">
            Grand Total : ₹{appointment?.fees?.total}/-{" "}
          </h6>
        </div>
      </div>{" "}
      <h1 className="invoice_sub_header">Mode of Payment</h1>
      <div className="pay_type_selector mb-3">
        <p>
          <input
            type="radio"
            id="test4"
            name="radio-group"
            className="payment_radio_input"
            checked={true}
          />
          <label htmlFor="test4">
            {appointment.payment.type == "OFFLINE"
              ? "Cash"
              : appointment.payment.type == "ONLINE"
              ? "Online"
              : "Unknown"}
          </label>
        </p>
      </div>
      <h1 className="invoice_sub_header ">Payment Status</h1>
      <div className="bills_payment_status mb-3">
        <div>
          {appointment.payment.isPaid == true && (
            <button className="bills_paid_button">Paid</button>
          )}
          {appointment.payment.isPaid == false && (
            <button className="bills_unpaid_button">Unpaid</button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default InvoiceModal;

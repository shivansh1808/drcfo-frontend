import React, { useEffect, useRef, useState } from "react";
import BillsNav from "./BillsNav";
import "./PatientBills.css";
import { useNavigate, useParams } from "react-router-dom";
import { getAppointment } from "../../api/doctor";
import { createInvoice } from "../..//api/appointment";
import moment from "moment";
import { toast } from "react-toastify";

const PatientBills = () => {
	const navigate = useNavigate();
	const [appointment, setAppointment] = useState(null);
	const [payType, setPayType] = useState("CASH");
	const [payStatus, setPayStatus] = useState("UNPAID");
	const [netPayment, setNetPayment] = useState("");
	const [totalAmount, setTotalAmount] = useState(0);
	const [patient, setPatient] = useState(null);
	const [singleService, setsingleService] = useState({});
	const [consultationDiscount, setConsultationDiscount] = useState(false);

	const [services, setServices] = useState([]);
	const complainref = useRef(null);
	const priceRef = useRef(null);
	const gstRef = useRef(null);
	const { id } = useParams();

	useEffect(() => {
		onComponentLoad();
	}, [id]);

	const onComponentLoad = async () => {
		const appointmentData = await getAppointment(id);
		console.log("appointment data ", appointmentData?.data);
		if (appointmentData?.data) {
			setAppointment(appointmentData.data);
			setPatient(
				appointmentData?.data?.unregisteredPatient ??
					appointmentData.data?.patient
			);
			setTotalAmount(appointmentData.data?.fees?.total ?? 0);
			setServices(appointmentData.data?.services);
			setPayType(appointmentData.data?.payment?.mode ?? "CASH");
			setPayStatus(
				appointmentData.data?.payment?.isPaid == true
					? "PAID"
					: appointmentData.data?.payment?.status ??
					  appointmentData.data?.fees?.net - appointmentData.data?.fees?.paid <
							appointmentData.data?.fees?.net
					? "PARTIAL"
					: "UNPAID"
			);

			// setPayStatus( ?? "UNPAID");
			setNetPayment(
				appointmentData.data?.fees?.net - appointmentData.data?.fees?.paid ??
					"0"
			);
		}
	};

	useEffect(() => {
		const totalPaidServices = appointment?.services.reduce((acc, curr) => {
			return (
				acc + Number(curr?.price ?? 0) + (Number(curr?.gst ?? 0) + 1 / 100)
			);
		}, 0);
		const totalLocalServices = services.reduce((acc, curr) => {
			return (
				acc + Number(curr?.price ?? 0) + (Number(curr?.gst ?? 0) + 1 / 100)
			);
		}, 0);
		setTotalAmount(
			Math.floor(
				Number(totalLocalServices) + Number(appointment?.clinic?.fees ?? 0)
			)
		);
		setsingleService({ name: "", price: 0, gst: 0 });
		setNetPayment(
			Math.floor(
				Number(appointment?.fees?.net ?? 0) -
					Number(appointment?.fees?.paid ?? 0) +
					(Number(totalLocalServices) - Number(totalPaidServices))
			)
		);
	}, [services]);

	const getPaymentDetail = (e) => {
		setPayType(e.target.value);
	};

	const EditService = (index, item) => {
		console.log({ singleService });
		setServices([...services.filter((_, i) => i !== index)]);
		if (complainref.current && priceRef.current && gstRef.current) {
			// complainref.current.value = item.name;
			// priceRef.current.value = item.price;
			// gstRef.current.value = item.gst;

			const serviceToBeEdited = {
				name: item.name,
				price: item.price,
				gst: item.gst,
			};

			console.log(serviceToBeEdited);

			setsingleService({
				...singleService,
				...serviceToBeEdited,
			});
		}
	};

	const DeleteService = (index) => {
		setServices([...services.filter((_, i) => i !== index)]);
		setsingleService({ name: "", price: 0, gst: 0 });
	};

	const addService = (e) => {
		// e.target.reset();
		e.preventDefault();
		console.log("Add service", { singleService });
		if (
			singleService.name === "" ||
			singleService.price === "" ||
			singleService.gst === ""
		) {
			toast.error("Please fill all the fields");
			return;
		}
		setServices([...services, singleService]);
	};

	const addBill = async (e) => {
		e.preventDefault();
		if (payType === "") {
			toast.error("Please select payment mode");
			return;
		}
		const data = {
			services: services.map((item) => ({
				name: item.name,
				price: Number(item.price),
				gst: Number(item.gst),
			})),
			paymentMode: payType,
		};
		const res = await createInvoice(id, data);
		if (res?.data?.message == null) {
			toast.success("invoice created successfully");
			setTimeout(() => navigate("/prescriptionpdf/" + id), 2000);
		} else {
			toast.error(
				res?.data?.message ?? "Something went wrong while creating invoice"
			);
		}
	};

	const handleService = (e) => {
		e.preventDefault();
		setsingleService({
			...singleService,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className="bill">
			<BillsNav />
			<div className="bills_wrapper p-5 mt-5">
				<h1 className="bills_header_text">Patient Details</h1>
				<div className="patient_bills_header">
					<div className="patient_bill_card appointment_card_header ">
						<div>
							<h1 className="appointment_card_name">{patient?.name}</h1>
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
									{patient?.gender}
								</span>
							</h4>
							<h4>
								Age:{" "}
								<span className="appointment_card_details_value">
									{moment().diff(patient?.dateOfBirth, "years")}
								</span>
							</h4>
							<h4>
								Phone:{" "}
								<span className="appointment_card_details_value">
									{patient?.phone}
								</span>
							</h4>
						</div>
					</div>
				</div>

				<div className="divider"></div>

				<div className="services_box">
					<form onSubmit={addService}>
						<h5>Services</h5>
						<ul>
							<li>
								<h4>Consultation Fees</h4>
								<p>₹{appointment?.clinic?.fees}</p>
							</li>
							{services &&
								services.map((item, index) => (
									<li key={index}>
										<h4>{item.name}</h4>
										<p>₹{item.price}</p>
										<button
											className="bills_edit_cta"
											onClick={() => EditService(index, item)}
										>
											Edit
										</button>
										<button
											className="bills_delete_cta"
											onClick={() => DeleteService(index)}
										>
											Delete
										</button>
									</li>
								))}
						</ul>
						<div className="add_service_box">
							<h3>Add New Services</h3>
							<input
								type="text"
								className="service_input"
								placeholder="Enter service name"
								name="name"
								onChange={handleService}
								ref={complainref}
								value={singleService.name}
							/>
							<input
								type="number"
								onChange={handleService}
								className="service_input2"
								placeholder="Price"
								name="price"
								ref={priceRef}
								value={singleService.price}
							/>
							<input
								type="number"
								onChange={handleService}
								className="service_input2"
								placeholder="GST(%)"
								name="gst"
								ref={gstRef}
								value={singleService.gst}
							/>{" "}
							<button type="submit" className="service_save_btn">
								Save
							</button>
						</div>
					</form>
				</div>

				<div className="divider"></div>

				<div className="amount_box">
					<div>
						<h2 className="invoice_title">Invoice</h2>
						<div className="invoice">
							<table>
								<thead>
									<tr>
										<td>S. No.</td>
										<td>Service</td>
										<td>Total Charges</td>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>{1}</td>
										<td>Consultation Fees</td>
										<td>₹{appointment?.clinic?.fees ?? 0}/-</td>
									</tr>
									{services.map((item, index) => {
										return (
											<tr key={index}>
												<td>{index + 2}</td>
												<td>{item?.name}</td>
												<td>₹{item.price}/-</td>
											</tr>
										);
									})}
								</tbody>
							</table>
							<hr />
							<h6 className="bills_grand_total">
								Grand Total : ₹ {totalAmount}/- <br />
								Net Payable : ₹ {netPayment}/-
							</h6>
						</div>
					</div>
				</div>

				<div className="divider"></div>

				<div className="bills_payment_status">
					<h1>Payment Status</h1>
					<div>
						{payStatus === "PAID" && (
							<button className="bills_paid_button">Paid</button>
						)}
						{payStatus === "UNPAID" && (
							<button className="bills_unpaid_button">Unpaid</button>
						)}
						{payStatus === "PARTIAL" && (
							<button className="bills_partial_button">Partial Paid</button>
						)}
					</div>
				</div>

				<div className="divider"></div>

				<div className="pay_wrapper">
					<h1>Mode of Payment</h1>
					<div className="pay_type_selector">
						<p>
							<input
								type="radio"
								id="test1"
								name="radio-group"
								className="payment_radio_input"
								value="UPI"
								onClick={getPaymentDetail}
								checked={payType === "UPI"}
							/>
							<label htmlFor="test1">UPI</label>
						</p>
						<p>
							<input
								type="radio"
								id="test2"
								name="radio-group"
								className="payment_radio_input"
								value="NET_BANKING"
								onClick={getPaymentDetail}
								checked={payType === "NET_BANKING"}
							/>
							<label htmlFor="test2">Netbanking</label>
						</p>
						<p>
							<input
								type="radio"
								id="test3"
								name="radio-group"
								className="payment_radio_input"
								value="CARD"
								onClick={getPaymentDetail}
								checked={payType === "CARD"}
							/>
							<label htmlFor="test3">Credit/Debit Card</label>
						</p>
						<p>
							<input
								type="radio"
								id="test4"
								name="radio-group"
								className="payment_radio_input"
								value="CASH"
								onClick={getPaymentDetail}
								checked={payType === "CASH"}
							/>
							<label htmlFor="test4">Cash</label>
						</p>
					</div>
				</div>

				<div className="divider"></div>

				<div className="d-flex justify-content-end">
					<button className="bill_submit" onClick={addBill}>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};

export default PatientBills;

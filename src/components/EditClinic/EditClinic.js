import React, { useEffect, useRef, useState } from "react";
import "../ClinicStepper/ClinicDetail.css";
import locationicon from "../../assets/images/locationicon.png";
import Box from "@mui/material/Box";
import axios from "../../axios";
import { useNavigate, useParams } from "react-router-dom";

const EditClinic = () => {
	const [location, setLocation] = useState({});
	const [pincode, setPincode] = useState("");
	const [name, setName] = useState("");
	const [fees, setFees] = useState("");
	const [street, setStreet] = useState("");
	const [area, setArea] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const stateRef = useRef(null);
	const cityRef = useRef(null);
	const navigate = useNavigate();
	const { id } = useParams();
	const [addressComponents, setAddressComponents] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {
			id: id,
			name,
			fees,
			street,
			area,
			city,
			state,
			pincode,
			location,
		};

		console.log(data);

		axios.put(`/edit/clinic`, data).then((res) => {
			navigate(-1);
		});
	};

	const addlocation = (e) => {
		e.preventDefault();
		navigator.geolocation.getCurrentPosition(function (position) {
			setLocation({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			});
		});
	};

	const getAddressCity = (address) => {
		const findType = (type) => type.types[0] === "locality";
		const location = address.map((obj) => obj);
		const rr = location.filter(findType)[0];
		// console.log(rr?.long_name);
		return rr?.long_name;
	};

	const getAddressState = (address) => {
		const findType = (type) => type.types[0] === "administrative_area_level_1";
		const location = address.map((obj) => obj);
		const rr = location.filter(findType)[0];
		return rr?.long_name;
	};

	const apikey = process.env.REACT_APP_MAPS_API_KEY;

	useEffect(() => {
		const city = getAddressCity(addressComponents);
		const state = getAddressState(addressComponents);
		console.log(city, state);
		setCity(city);
		setState(state);
		console.log("cliked");
	}, [addressComponents]);

	useEffect(() => {
		if (location.latitude && location.longitude) {
			fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${apikey}`
			)
				.then((response) => response.json())
				.then((data) => {
					// console.log(data);
					setAddressComponents(data.results[0].address_components);
				});
		}
	}, [location]);

	return (
		<div className="clinic_detail_form d-flex justify-content-center align-items-center flex-column">
			<h1>Edit Clinic Details/Location</h1>
			<p>It’s going to take only few minutes</p>

			<form onSubmit={handleSubmit}>
				<div className="clinic_detail_box">
					<div>
						<label htmlFor="clinicName">Clinic Name*</label>
						<input
							type="text"
							className="clinic_input"
							placeholder="Enter Clinic Name"
							name="clinicname"
							defaultValue={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</div>
					<div>
						<label htmlFor="fees">Consultation fee*</label>
						<input
							type="number"
							className="clinic_input"
							placeholder="Enter consultation fee"
							name="fees"
							defaultValue={fees}
							onChange={(e) => setFees(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="clinicLocation">
							Add current location to get better result
						</label>
						<button className="location_button" onClick={addlocation}>
							<img src={locationicon} alt="locationicon"></img> Add Current
							Location
						</button>
					</div>
					<div>
						<label htmlFor="houseNum">House/Street/Gali Number*</label>
						<input
							type="text"
							className="clinic_input"
							placeholder="Enter your House/Street/Gali Number"
							name="houseNum"
							defaultValue={street}
							onChange={(e) => setStreet(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="area">Sec/Area/Locality</label>
						<input
							type="text"
							name="area"
							className="clinic_input"
							defaultValue={area}
							placeholder="Enter your Sec//Locality"
							onChange={(e) => setArea(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="pincode">Pincode*</label>
						<input
							type="number"
							className="pincode_input"
							placeholder="Enter your Pincode"
							defaultValue={pincode}
							name="pincode"
							onChange={(e) => {
								setPincode(e.target.value);
								// fetchPincode(e.target.value);
							}}
						/>
					</div>
					<div>
						<label htmlFor="city">City*</label>
						<input
							type="text"
							name="city"
							id="city"
							className="clinic_input"
							placeholder="Enter your City"
							value={city}
							ref={cityRef}
							onChange={(e) => setCity(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="state">State*</label>
						<input
							type="text"
							id="state"
							ref={stateRef}
							className="clinic_input"
							placeholder="Enter your "
							name="state"
							value={state}
							onChange={(e) => setState(e.target.value)}
						/>
					</div>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							pt: 2,
						}}
					>
						<button className="stepper_btn" type="submit">
							Save & Next
						</button>
					</Box>
				</div>
			</form>
		</div>
	);
};

export default EditClinic;

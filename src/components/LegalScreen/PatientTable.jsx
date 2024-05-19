import moment from "moment";
import React, { useEffect, useState } from "react";
import { getAppointments } from "../../api/doctor";
import { appointmentFilter } from "../../util/constants";
import useAppContext from "../context/AppContext";
import PatientsTableSkeleton from "./PatientsTableSkeleton";

export default function PatientTable() {
	const { openSnackbar } = useAppContext();
	const [loading, setLoading] = useState(false);
	const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);
	const [patients, setPatients] = useState([]);
	const [responseData, setResponseData] = useState(null);

	function onClickFilterButton() {
		setIsOpenDatePicker(true);
	}

	function onClickExpandPatientDetails() {}

	async function onComponentLoad() {
		setLoading(true);
		const response = await getAppointments(appointmentFilter.completed);
		if (response?.data?.length) {
			setResponseData(response.data);
		} else {
			openSnackbar({
				severity: "error",
				message: response?.message || "Could not load appoinments",
			});
		}
		setLoading(false);
	}

	function handleResponseData() {
		if (Array.isArray(responseData)) {
			setPatients(
				responseData.map((appointment) => ({
					date: moment(appointment?.date).format("DD/MM/YYYY") || "-",
					name:
						appointment?.unregisteredPatient?.name ||
						appointment?.patient?.name ||
						"-",
					service: appointment?.services[0]?.name || "-",
					fees: `₹ ${appointment?.fees?.paid}` || "-",
					receiptDate: moment(appointment?.date).format("DD/MM/YYYY") || "-",
				}))
			);
		}
	}

	useEffect(() => {
		onComponentLoad();
	}, []);

	useEffect(() => {
		handleResponseData();
	}, [responseData]);

	return (
		<div class="legal_container">
			<div className="d-flex justify-content-between align-items-center legal_topBar">
				<h2>Patient Details</h2>
				<div className="d-flex align-items-center">
					<div className="export_dropdown">
						<p
							className="btn btn-primary dropdown-toggle export_btn "
							role="button"
							id="dropdownMenuLink"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							Export
						</p>
						<ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
							<li className="dropdown-item">Export as PDF</li>
							<li>
								<a className="dropdown-item">Export as XLS</a>
							</li>
						</ul>
					</div>
					<div>
						<button className="date_filter_btn" onClick={onClickFilterButton}>
							<svg
								width="20"
								height="20"
								viewBox="0 0 28 28"
								fill="none"
								xmlnsXlink="http://www.w3.org/1999/xlink"
							>
								<rect width="28" height="28" fill="url(#pattern0)" />
								<defs>
									<pattern
										id="pattern0"
										patternContentUnits="objectBoundingBox"
										width="1"
										height="1"
									>
										<use
											xlinkHref="#image0_4862_2818"
											transform="scale(0.0111111)"
										/>
									</pattern>
									<image
										id="image0_4862_2818"
										width="90"
										height="90"
										xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAABmJLR0QA/wD/AP+gvaeTAAADdklEQVR4nO3az04TURTH8d+ZKTWRhS7UxGJjfAcRTYjRrexdCDQWTCS6Mio1LkxdEPljcGc0EdBqfQKNCzUxkYUKvoMBqQoL3ShK2zkuSo1RQjt07syZm/NZjp3ryUmZNvAFlFJKKaWUUkoppexBUQ9gFDMNF5aOEVM/GN0AOtb/5SOAWYL3cDSbfhXGKNYu+lLh8wG34k2B+HiDl74kOGdGs3s/mJzHykUPP1g8ROw8BWNXk7essEcnxgdT86Zmsm7RF++V9idcngOw2+ety3CpcyyTWjAxl2Pi0Ci5Lt+B/yUDwB5UcTvoeeqsekdfmfnUyfDetXIGg4+MZ/e9CWqmuqYWnb9b2v4zyRMM6gV4R9BDhOAXwFfdSluxnCByuNwHwgiAZAtnfgNQXGv3Lt86mV5t9OJEMyeuJr1JgM4C3MJcUaL8WLZj8q8LN3MzpSTAIy0cuhPA+eR3SgAYavTihs/ofJ4dgDItDBQ9F4//vVSpohjM4dRf29HmrPswbFYiGe6PZxPvaPIALoQxjClcQe9/1zyvP5CzQYXajjbX1DN6rZ0vbPtBZWb0ofZsihUizueml8puW7kIAF6lrY8Z11o89iuAR+X2aq6pGVr8z0QZniodJIfnWjnDYe/wjYH026Bm+nNu0AdGaXwwNQ/mZ1u9nwhPTCwZsGzRAICEMwRgeQt3fnE9nAt6nDrrFj2WSS2wRz0AVnzctkxEPSMDHYum5rJu0UDtEVJ13S4QXjTx8ucEp2v0dOq9yZms+jDcSO5+6SiYMwC6AaTXLy8wYZaZChPZ1OsIx1NKKaWUCli0X+8EdRemRbZoad2FaZEsWmJ3YVroi5baXZgW+u86pHYXpoX6jpbcXZgmpesw0V2YFseuw0h3YVoMuw6j3YVpMe86wu4uTJPRdVRx6t9LQXUXpsWs6+DruemlSsDdhWlyuw7J3YVpoT6jJXcXpoX/YSi0uzAt9EVL7S5Mi+TrncTuwrTIuw7tLpRSSimlghT51ztfYtyBxGbRce9AYrFoGzoQ8Yu2pQMR+6esOls6ENHvaJs6ECldh18SOpA4dh1+iehAYth1+CWqA4l51+GX9A5ERtfhl6AOJGZdh18iOhC5XYdfNnUgop/RNnUgohcNwJoORPyibelAxC8asKMDEf1huBHtQJRSSimllFJKKaWi9xtYbgR2QxFhogAAAABJRU5ErkJggg=="
									/>
								</defs>
							</svg>
							{/* {isOpenDatePicker && (
                  <ClickOutHandler onClickOut={clickOut}>
                    <DatePicker
                      selected={startDate}
                      onChange={onChange}
                      startDate={startDate}
                      endDate={endDate}
                      selectsRange
                      inline
                      calendarClassName="legal_calender_range"
                    />
                  </ClickOutHandler>
                )} */}
						</button>
					</div>
					<div className="expand_btn" onClick={onClickExpandPatientDetails}>
						<svg width="30" height="30" viewBox="0 0 29 30" fill="none">
							<path
								d="M20.5858 0H8.4287C3.14807 0 0 3.14807 0 8.4287V20.5713C0 25.8664 3.14807 29.0145 8.4287 29.0145H20.5713C25.8519 29.0145 28.9999 25.8664 28.9999 20.5858V8.4287C29.0145 3.14807 25.8664 0 20.5858 0ZM24.2996 11.6058C24.2996 12.2006 23.8064 12.6938 23.2116 12.6938C22.6168 12.6938 22.1235 12.2006 22.1235 11.6058V8.4287L8.4287 22.1235H11.6058C12.2006 22.1235 12.6938 22.6168 12.6938 23.2116C12.6938 23.8064 12.2006 24.2996 11.6058 24.2996H5.80289C5.65782 24.2996 5.51275 24.2706 5.38218 24.2126C5.11502 24.0978 4.90211 23.8849 4.78739 23.6178C4.74104 23.4873 4.71653 23.35 4.71485 23.2116V17.4087C4.71485 16.8139 5.20809 16.3206 5.80289 16.3206C6.39769 16.3206 6.89093 16.8139 6.89093 17.4087V20.5858L20.5858 6.89093H17.4087C16.8139 6.89093 16.3206 6.39769 16.3206 5.80289C16.3206 5.20809 16.8139 4.71485 17.4087 4.71485H23.2116C23.3566 4.71485 23.4872 4.74386 23.6323 4.80189C23.8934 4.91795 24.111 5.12105 24.2271 5.39669C24.2706 5.52725 24.2996 5.65782 24.2996 5.80289V11.6058Z"
								fill="#91A7FF"
							/>
						</svg>
					</div>
					{/* <PatientDetailsExpanded
              modalIsOpen={modalIsOpen}
              setIsOpen={setIsOpen}
              startDate={startDate}
              endDate={endDate}
              exportPDF={exportPDF}
              setOpen={setOpen}
              open={open}
              datefrom={datefrom}
              dateto={dateto}
              onChange={onChange}
              filteredConfirmedData={filteredConfirmedData}
            /> */}
				</div>
				{/* {startDate && (
            <p className="legal_reset_btn" onClick={reset}>
              Reset
            </p>
          )} */}
			</div>
			<ul class="legal_responsive_table">
				<li class="table-header">
					<div class="col_1">S. No.</div>
					<div class="col_2">Date</div>
					<div class="col_3">Name</div>
					<div class="col_4">Service</div>
					<div class="col_5">Fees Recieved</div>
					<div class="col_6">Date of Reciept</div>
				</li>
				{loading ? (
					<PatientsTableSkeleton />
				) : (
					patients?.map((patient, i) => (
						<li class="table-row" key={String(i) + patient?._id}>
							<div class="col_1">{i + 1}</div>
							<div class="col_2">{patient?.date}</div>
							<div class="col_3">{patient?.name}</div>
							<div class="col_4">{patient?.service}</div>
							<div class="col_5">{patient?.fees}</div>
							<div class="col_6">{patient?.receiptDate}</div>
						</li>
					))
				)}
			</ul>
		</div>
	);
}

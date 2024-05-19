import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./PatientTabs.css";
import { appointmentFilter, patientsTab } from "../../../util/constants";
import AppointmentsSkeleton from "./AppointmentsSkeleton";
import { getAppointments } from "../../../api/doctor";
import useAppContext from "../../context/AppContext";
import AppointmentsZeroScreen from "./AppointmentsZeroScreen";
import AppointmentCard from "../AppointmentCard";
import PatientTabFilter from "../PatientTabFilter/PatientTabFilter";
import { getClinics } from "../../../api/clinic";
import CompletedFilters from "../PatientTabFilter/CompletedFilters";
import moment from "moment";
import { COMPLETED, CONFIRMED, NO_SHOW } from "./constants";

const initialState = {
  currentTab: patientsTab.confirmed,
  appointments: {
    confirmed: [],
    "no-show": [],
    completed: [],
  },
  isOpenFilter: false,
  loading: {
    confirmed: false,
    "no-show": false,
    completed: false,
  },
};

const PatientTabs = () => {
  const { setSnackbar, openSnackbar } = useAppContext();
  const [currentTab, setCurrentTab] = useState(initialState.currentTab);
  const [appointments, setAppointments] = useState(initialState.appointments);
  const [isOpenFilter, setIsOpenFilter] = useState(initialState.isOpenFilter);
  const [isOpenFilter2, setIsOpenFilter2] = useState(initialState.isOpenFilter);
  const [loading, setLoading] = useState(initialState.loading);

  const [sortvalue, setSortValue] = useState("");
  const [patientType, setPatientType] = useState("");
  const [bookingType, setBookingType] = useState("");
  const [clinicsList, setClinicsList] = useState([]);
  const [clinicName, setClinicName] = useState([]);
  const [bookingDate, setbookingsDate] = useState();

  const [sortvalue2, setSortValue2] = useState("");
  const [patientType2, setPatientType2] = useState("");
  const [bookingType2, setBookingType2] = useState("");
  const [clinicName2, setClinicName2] = useState([]);
  const [bookingDate2, setbookingsDate2] = useState();
  console.log(bookingDate2);

  async function loadAppointements(filter) {
    setLoading((prev) => ({ ...prev, [filter]: true }));
    const responseData = await getAppointments(filter);
    if (responseData) {
      setAppointments((prev) => ({ ...prev, [filter]: responseData.data }));
    } else {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Could not load confirmed appointments",
      });
    }
    setLoading((prev) => ({ ...prev, [filter]: false }));
  }

  function onComponentLoad() {
    loadAppointements(appointmentFilter.confirmed);
    loadAppointements(appointmentFilter["no-show"]);
    loadAppointements(appointmentFilter.completed);
  }
  const loadClinic = async () => {
    const response = await getClinics();
    if (response?.status === 200) {
      setClinicsList(response?.data?.data);
    } else {
      openSnackbar({
        severity: "error",
        message: response?.data?.message || "Could not get clinics",
      });
    }
  };

  useEffect(() => {
    onComponentLoad();
    loadClinic();
  }, []);
  // console.log(appointments.confirmed);
  // console.log(appointments.completed);

  const sortFilter = (sortvalue) => {
    const list = appointments.confirmed.sort((a, b) => {
      const text1 =
        a?.patient?.name.toLowerCase() ||
        a?.unregisteredPatient?.name.toLowerCase();
      const text2 =
        b?.patient?.name.toLowerCase() ||
        b?.unregisteredPatient?.name.toLowerCase();

      if (sortvalue == "a-z") {
        return text1.localeCompare(text2);
      } else if (sortvalue == "z-a") {
        return text2.localeCompare(text1);
      } else if (sortvalue == "New-Old") {
        return new Date(b.date) - new Date(a.date);
      } else if (sortvalue == "Old-New") {
        return new Date(a.date) - new Date(b.date);
      }
    });

    // console.log(
    //   list.map((t) => t?.patient?.name || t?.unregisteredPatient?.name)
    // );
    setAppointments((prev) => ({
      ...prev,
      [appointmentFilter.confirmed]: list,
    }));
  };

  const sortFilter2 = (sortvalue) => {
    const list = appointments.completed.sort((a, b) => {
      const text1 =
        a?.patient?.name.toLowerCase() ||
        a?.unregisteredPatient?.name.toLowerCase();
      const text2 =
        b?.patient?.name.toLowerCase() ||
        b?.unregisteredPatient?.name.toLowerCase();

      if (sortvalue == "a-z") {
        return text1.localeCompare(text2);
      } else if (sortvalue == "z-a") {
        return text2.localeCompare(text1);
      } else if (sortvalue == "New-Old") {
        return new Date(b.date) - new Date(a.date);
      } else if (sortvalue == "Old-New") {
        return new Date(a.date) - new Date(b.date);
      }
    });

    // console.log(
    //   list.map((t) => t?.patient?.name || t?.unregisteredPatient?.name)
    // );
    setAppointments((prev) => ({
      ...prev,
      [appointmentFilter.completed]: list,
    }));
  };
  const patientTypeFilter = (patientType) => {
    if (patientType == "followup") {
      const filteredPersons = appointments.confirmed.filter(
        (item) => item?.parent != null
      );
      setAppointments((prev) => ({
        ...prev,
        [appointmentFilter.confirmed]: filteredPersons,
      }));
      console.log();
    } else if (patientType == "new") {
      const filteredPersons = appointments.confirmed.filter(
        (item) => item?.patient == null
      );
      setAppointments((prev) => ({
        ...prev,
        [appointmentFilter.confirmed]: filteredPersons,
      }));
    }
  };

  const patientTypeFilter2 = (patientType) => {
    if (patientType == "followup") {
      const filteredPersons = appointments.completed.filter(
        (item) => item?.parent != null
      );
      setAppointments((prev) => ({
        ...prev,
        [appointmentFilter.completed]: filteredPersons,
      }));
      console.log();
    } else if (patientType == "new") {
      const filteredPersons = appointments.completed.filter(
        (item) => item?.patient == null
      );
      setAppointments((prev) => ({
        ...prev,
        [appointmentFilter.completed]: filteredPersons,
      }));
    }
  };
  const dateFilter = (bookingDate) => {
    //  events.filter((event) => event.date.getTime() === filterDate.getTime());
    const filteredEvents = appointments.confirmed.filter(
      (item) =>
        moment(item.date).format("DD/MM/YYYY") ===
        moment(bookingDate).format("DD/MM/YYYY")
    );
    setAppointments((prev) => ({
      ...prev,
      [appointmentFilter.confirmed]: filteredEvents,
    }));
  };
  const dateFilter2 = (bookingDate) => {
    const filteredEvents = appointments.completed.filter(
      (item) =>
        moment(item.date).format("DD/MM/YYYY") ===
        moment(bookingDate).format("DD/MM/YYYY")
    );
    setAppointments((prev) => ({
      ...prev,
      [appointmentFilter.completed]: filteredEvents,
    }));
  };

  useEffect(() => {
    sortFilter(sortvalue);
    patientTypeFilter(patientType);
    dateFilter(bookingDate);
  }, [sortvalue, patientType, bookingDate]);

  useEffect(() => {
    sortFilter2(sortvalue2);
    patientTypeFilter2(patientType2);
    dateFilter2(bookingDate2);
  }, [sortvalue2, patientType2, bookingDate2]);

  return (
    <div className="patient_tab_container">
      <div className="patients_tab_header">
        <button
          className={
            currentTab === patientsTab.confirmed
              ? "patients_tabs active-tabs"
              : "patients_tabs"
          }
          onClick={() => setCurrentTab(patientsTab.confirmed)}
        >
          Booking Confirmed
        </button>
        <button
          className={
            currentTab === patientsTab["no-show"]
              ? "patients_tabs active-tabs"
              : "patients_tabs"
          }
          onClick={() => setCurrentTab(patientsTab["no-show"])}
        >
          No Show
        </button>
        <button
          className={
            currentTab === patientsTab.completed
              ? "patients_tabs active-tabs"
              : "patients_tabs"
          }
          onClick={() => setCurrentTab(patientsTab.completed)}
        >
          Appointment Completed
        </button>
      </div>

      {/* _______________TAB CONTENT___________________*/}

      <div>
        {/* CONFIRMED APPOINTMENTS */}
        <div
          className={
            currentTab === patientsTab.confirmed
              ? "patient_content_tab  active-clinic_content"
              : "patient_content_tab"
          }
        >
          <div className="tab_wrap">
            <div className="d-flex justify-content-end me-5 filter_wrapper">
              <div className="tabs_body">
                <button
                  className="request_filter_button"
                  onClick={() => setIsOpenFilter(true)}
                >
                  {/* <span className="filter_count">+2</span> */}
                  <svg width="25" height="25" viewBox="0 0 28 28" fill="none">
                    <rect width="28" height="28" fill="url(#pattern0)" />
                    <defs>
                      <pattern
                        id="pattern0"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                      >
                        <use
                          xlinkHref="#image0_4473_1598"
                          transform="scale(0.0111111)"
                        />
                      </pattern>
                      <image
                        id="image0_4473_1598"
                        width="90"
                        height="90"
                        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAABmJLR0QA/wD/AP+gvaeTAAADdklEQVR4nO3az04TURTH8d+ZKTWRhS7UxGJjfAcRTYjRrexdCDQWTCS6Mio1LkxdEPljcGc0EdBqfQKNCzUxkYUKvoMBqQoL3ShK2zkuSo1RQjt07syZm/NZjp3ryUmZNvAFlFJKKaWUUkoppexBUQ9gFDMNF5aOEVM/GN0AOtb/5SOAWYL3cDSbfhXGKNYu+lLh8wG34k2B+HiDl74kOGdGs3s/mJzHykUPP1g8ROw8BWNXk7essEcnxgdT86Zmsm7RF++V9idcngOw2+ety3CpcyyTWjAxl2Pi0Ci5Lt+B/yUDwB5UcTvoeeqsekdfmfnUyfDetXIGg4+MZ/e9CWqmuqYWnb9b2v4zyRMM6gV4R9BDhOAXwFfdSluxnCByuNwHwgiAZAtnfgNQXGv3Lt86mV5t9OJEMyeuJr1JgM4C3MJcUaL8WLZj8q8LN3MzpSTAIy0cuhPA+eR3SgAYavTihs/ofJ4dgDItDBQ9F4//vVSpohjM4dRf29HmrPswbFYiGe6PZxPvaPIALoQxjClcQe9/1zyvP5CzQYXajjbX1DN6rZ0vbPtBZWb0ofZsihUizueml8puW7kIAF6lrY8Z11o89iuAR+X2aq6pGVr8z0QZniodJIfnWjnDYe/wjYH026Bm+nNu0AdGaXwwNQ/mZ1u9nwhPTCwZsGzRAICEMwRgeQt3fnE9nAt6nDrrFj2WSS2wRz0AVnzctkxEPSMDHYum5rJu0UDtEVJ13S4QXjTx8ucEp2v0dOq9yZms+jDcSO5+6SiYMwC6AaTXLy8wYZaZChPZ1OsIx1NKKaWUCli0X+8EdRemRbZoad2FaZEsWmJ3YVroi5baXZgW+u86pHYXpoX6jpbcXZgmpesw0V2YFseuw0h3YVoMuw6j3YVpMe86wu4uTJPRdVRx6t9LQXUXpsWs6+DruemlSsDdhWlyuw7J3YVpoT6jJXcXpoX/YSi0uzAt9EVL7S5Mi+TrncTuwrTIuw7tLpRSSimlghT51ztfYtyBxGbRce9AYrFoGzoQ8Yu2pQMR+6esOls6ENHvaJs6ECldh18SOpA4dh1+iehAYth1+CWqA4l51+GX9A5ERtfhl6AOJGZdh18iOhC5XYdfNnUgop/RNnUgohcNwJoORPyibelAxC8asKMDEf1huBHtQJRSSimllFJKKaWi9xtYbgR2QxFhogAAAABJRU5ErkJggg=="
                      />
                    </defs>
                  </svg>
                </button>
                <PatientTabFilter
                  isOpenFilter={isOpenFilter}
                  setIsOpenFilter={setIsOpenFilter}
                  setSortValue={setSortValue}
                  setBookingType={setBookingType}
                  clinicsList={clinicsList}
                  setPatientType={setPatientType}
                  setClinicName={setClinicName}
                  clinicName={clinicName}
                  setbookingsDate={setbookingsDate}
                />
              </div>
            </div>

            <div className="d-flex flex-wrap confirmed_wrapper">
              {loading.confirmed ? (
                <AppointmentsSkeleton />
              ) : appointments?.confirmed?.length ? (
                appointments?.confirmed?.map((appointment, i) => (
                  <AppointmentCard
                    key={i}
                    appointment={appointment}
                    type={CONFIRMED}
                  />
                ))
              ) : (
                <AppointmentsZeroScreen />
              )}
            </div>
          </div>
        </div>

        {/* NO-SHOW APPOINTMENTS */}
        <div
          className={
            currentTab === patientsTab["no-show"]
              ? "patient_content_tab  active-clinic_content"
              : "patient_content_tab"
          }
        >
          <div>
            <div className="d-flex justify-content-end me-5 filter_wrapper">
              <div className="tabs_body">
                <button
                  className="request_filter_button"
                  // onClick={() => setIsOpenFilter2(true)}
                >
                  {/* <span className="filter_count">+2</span> */}
                  <svg width="25" height="25" viewBox="0 0 28 28" fill="none">
                    <rect width="28" height="28" fill="url(#pattern1)" />
                    <defs>
                      <pattern
                        id="pattern1"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                      >
                        <use
                          xlinkHref="#image0_4473_1598"
                          transform="scale(0.0111111)"
                        />
                      </pattern>
                      <image
                        id="image0_4473_1598"
                        width="90"
                        height="90"
                        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAABmJLR0QA/wD/AP+gvaeTAAADdklEQVR4nO3az04TURTH8d+ZKTWRhS7UxGJjfAcRTYjRrexdCDQWTCS6Mio1LkxdEPljcGc0EdBqfQKNCzUxkYUKvoMBqQoL3ShK2zkuSo1RQjt07syZm/NZjp3ryUmZNvAFlFJKKaWUUkoppexBUQ9gFDMNF5aOEVM/GN0AOtb/5SOAWYL3cDSbfhXGKNYu+lLh8wG34k2B+HiDl74kOGdGs3s/mJzHykUPP1g8ROw8BWNXk7essEcnxgdT86Zmsm7RF++V9idcngOw2+ety3CpcyyTWjAxl2Pi0Ci5Lt+B/yUDwB5UcTvoeeqsekdfmfnUyfDetXIGg4+MZ/e9CWqmuqYWnb9b2v4zyRMM6gV4R9BDhOAXwFfdSluxnCByuNwHwgiAZAtnfgNQXGv3Lt86mV5t9OJEMyeuJr1JgM4C3MJcUaL8WLZj8q8LN3MzpSTAIy0cuhPA+eR3SgAYavTihs/ofJ4dgDItDBQ9F4//vVSpohjM4dRf29HmrPswbFYiGe6PZxPvaPIALoQxjClcQe9/1zyvP5CzQYXajjbX1DN6rZ0vbPtBZWb0ofZsihUizueml8puW7kIAF6lrY8Z11o89iuAR+X2aq6pGVr8z0QZniodJIfnWjnDYe/wjYH026Bm+nNu0AdGaXwwNQ/mZ1u9nwhPTCwZsGzRAICEMwRgeQt3fnE9nAt6nDrrFj2WSS2wRz0AVnzctkxEPSMDHYum5rJu0UDtEVJ13S4QXjTx8ucEp2v0dOq9yZms+jDcSO5+6SiYMwC6AaTXLy8wYZaZChPZ1OsIx1NKKaWUCli0X+8EdRemRbZoad2FaZEsWmJ3YVroi5baXZgW+u86pHYXpoX6jpbcXZgmpesw0V2YFseuw0h3YVoMuw6j3YVpMe86wu4uTJPRdVRx6t9LQXUXpsWs6+DruemlSsDdhWlyuw7J3YVpoT6jJXcXpoX/YSi0uzAt9EVL7S5Mi+TrncTuwrTIuw7tLpRSSimlghT51ztfYtyBxGbRce9AYrFoGzoQ8Yu2pQMR+6esOls6ENHvaJs6ECldh18SOpA4dh1+iehAYth1+CWqA4l51+GX9A5ERtfhl6AOJGZdh18iOhC5XYdfNnUgop/RNnUgohcNwJoORPyibelAxC8asKMDEf1huBHtQJRSSimllFJKKaWi9xtYbgR2QxFhogAAAABJRU5ErkJggg=="
                      />
                    </defs>
                  </svg>
                </button>
              </div>
            </div>

            <div className="d-flex flex-wrap">
              {loading["no-show"] ? (
                <AppointmentsSkeleton />
              ) : appointments["no-show"]?.length ? (
                appointments["no-show"]?.map((appointment, i) => (
                  <AppointmentCard
                    key={i}
                    appointment={appointment}
                    type={NO_SHOW}
                  />
                ))
              ) : (
                <AppointmentsZeroScreen />
              )}
            </div>
          </div>
        </div>

        {/* COMPLETED APPOINTMENTS */}
        <div
          className={
            currentTab === patientsTab.completed
              ? "patient_content_tab  active-clinic_content"
              : "patient_content_tab"
          }
        >
          <div>
            <div className="d-flex justify-content-end me-5 filter_wrapper">
              <div className="tabs_body">
                <button
                  className="request_filter_button"
                  onClick={() => setIsOpenFilter2(true)}
                >
                  {/* <span className="filter_count">+2</span> */}
                  <svg width="25" height="25" viewBox="0 0 28 28" fill="none">
                    <rect width="28" height="28" fill="url(#pattern101)" />
                    <defs>
                      <pattern
                        id="pattern101"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                      >
                        <use
                          xlinkHref="#image0_4473_1598"
                          transform="scale(0.0111111)"
                        />
                      </pattern>
                      <image
                        id="image0_4473_1598"
                        width="90"
                        height="90"
                        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAABmJLR0QA/wD/AP+gvaeTAAADdklEQVR4nO3az04TURTH8d+ZKTWRhS7UxGJjfAcRTYjRrexdCDQWTCS6Mio1LkxdEPljcGc0EdBqfQKNCzUxkYUKvoMBqQoL3ShK2zkuSo1RQjt07syZm/NZjp3ryUmZNvAFlFJKKaWUUkoppexBUQ9gFDMNF5aOEVM/GN0AOtb/5SOAWYL3cDSbfhXGKNYu+lLh8wG34k2B+HiDl74kOGdGs3s/mJzHykUPP1g8ROw8BWNXk7essEcnxgdT86Zmsm7RF++V9idcngOw2+ety3CpcyyTWjAxl2Pi0Ci5Lt+B/yUDwB5UcTvoeeqsekdfmfnUyfDetXIGg4+MZ/e9CWqmuqYWnb9b2v4zyRMM6gV4R9BDhOAXwFfdSluxnCByuNwHwgiAZAtnfgNQXGv3Lt86mV5t9OJEMyeuJr1JgM4C3MJcUaL8WLZj8q8LN3MzpSTAIy0cuhPA+eR3SgAYavTihs/ofJ4dgDItDBQ9F4//vVSpohjM4dRf29HmrPswbFYiGe6PZxPvaPIALoQxjClcQe9/1zyvP5CzQYXajjbX1DN6rZ0vbPtBZWb0ofZsihUizueml8puW7kIAF6lrY8Z11o89iuAR+X2aq6pGVr8z0QZniodJIfnWjnDYe/wjYH026Bm+nNu0AdGaXwwNQ/mZ1u9nwhPTCwZsGzRAICEMwRgeQt3fnE9nAt6nDrrFj2WSS2wRz0AVnzctkxEPSMDHYum5rJu0UDtEVJ13S4QXjTx8ucEp2v0dOq9yZms+jDcSO5+6SiYMwC6AaTXLy8wYZaZChPZ1OsIx1NKKaWUCli0X+8EdRemRbZoad2FaZEsWmJ3YVroi5baXZgW+u86pHYXpoX6jpbcXZgmpesw0V2YFseuw0h3YVoMuw6j3YVpMe86wu4uTJPRdVRx6t9LQXUXpsWs6+DruemlSsDdhWlyuw7J3YVpoT6jJXcXpoX/YSi0uzAt9EVL7S5Mi+TrncTuwrTIuw7tLpRSSimlghT51ztfYtyBxGbRce9AYrFoGzoQ8Yu2pQMR+6esOls6ENHvaJs6ECldh18SOpA4dh1+iehAYth1+CWqA4l51+GX9A5ERtfhl6AOJGZdh18iOhC5XYdfNnUgop/RNnUgohcNwJoORPyibelAxC8asKMDEf1huBHtQJRSSimllFJKKaWi9xtYbgR2QxFhogAAAABJRU5ErkJggg=="
                      />
                    </defs>
                  </svg>
                </button>
                <CompletedFilters
                  isOpen={isOpenFilter2}
                  setIsOpen={setIsOpenFilter2}
                  setSortValue={setSortValue2}
                  clinicName={clinicName2}
                  setClinicName={setClinicName2}
                  clinicsList={clinicsList}
                  setPatientType={setPatientType2}
                  setBookingType={setBookingType2}
                  setbookingsDate={setbookingsDate2}
                  bookingDate2={bookingDate2}
                />
              </div>
            </div>

            <div className="d-flex flex-wrap">
              {loading.completed ? (
                <AppointmentsSkeleton />
              ) : appointments?.completed?.length ? (
                appointments?.completed?.map((appointment, i) => (
                  <AppointmentCard
                    key={i}
                    appointment={appointment}
                    type={COMPLETED}
                  />
                ))
              ) : (
                <AppointmentsZeroScreen />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientTabs;

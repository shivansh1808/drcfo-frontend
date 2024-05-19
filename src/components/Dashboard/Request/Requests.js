import "./Requests.css";
import { useState } from "react";
import RequestFilter from "./RequestFilter";
import RequestExtendView from "./RequestExtendView";
import accept from "../../../assets/images/accept.png";
import { useEffect } from "react";
import { changeAppointmentStatus, getAppointments } from "../../../api/doctor";
import { appointmentFilter, appointmentStatus } from "../../../util/constants";
import { calculateAge, getInitials } from "../../../util";
import { CircularProgress } from "@mui/material";
import useAppContext from "../../context/AppContext";
import { useSocket } from "../../../lib/SocketContext";
import moment from "moment";
import { toast } from "react-toastify";

function RequestCard({
  appointment,
  setReloadAppointments,
  setRemoveRequestId,
  extended = false,
}) {
  const initialState = {
    appointmentData: {
      initials: "AB",
      name: "First Last",
      month: "Jan",
      time: "12:30",
      phone: "1234567890",
      bookingType: "Walk-In",
    },
  };

  const { setSnackbar } = useAppContext();

  const [active, setActive] = useState(false);
  const [loadingAccept, setLoadingAccept] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);
  const [patient, setPatient] = useState(
    appointment?.unregisteredPatient ?? appointment?.patient
  );
  const [appointmentData, setAppointmentData] = useState(
    initialState.appointmentData
  );

  async function onClickAccept() {
    setLoadingAccept(true);
    const responseData = await changeAppointmentStatus(
      appointment._id,
      appointmentStatus.confirmed
    );
    if (responseData) {
      setReloadAppointments((prev) => !prev);
      setRemoveRequestId(appointment._id);
      setSnackbar({
        open: true,
        message: `Confirmed appointement of ${appointmentData.name}`,
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: `Error confirming appointement of ${appointmentData.name}`,
        severity: "error",
      });
    }
    setLoadingAccept(false);
    toast.success(
      `Appointement Request of ${appointmentData.name} has been accepted!`
    );
  }

  async function onClickReject() {
    setLoadingReject(true);
    const responseData = await changeAppointmentStatus(
      appointment._id,
      appointmentStatus.cancelled
    );
    if (responseData) {
      setReloadAppointments((prev) => !prev);
      setRemoveRequestId(appointment._id);
      setSnackbar({
        open: true,
        message: `Cancelled appointement of ${appointmentData.name}`,
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: `Error cancelling appointement of ${appointmentData.name}`,
        severity: "error",
      });
    }
    setLoadingReject(false);
  }

  function handlePatient() {
    if (!patient) return;
    const mappedData = {
      initials: getInitials(patient.name),
      name: patient?.name,
      stats: `${calculateAge(patient.dateOfBirth)} ${patient.gender}`,
      time: `${appointment?.time?.startTime} - ${appointment?.time?.endTime}`,
    };
    setAppointmentData(mappedData);
  }

  useEffect(() => {
    handlePatient();
  }, [patient]);

  return (
    <div className={active ? "request--card selected" : "request--card"}>
      <div className="request--card--profile">{appointmentData.initials}</div>
      <div className="request--card--detials">
        <span className="request--card--name">{appointmentData.name}</span>
        <span className="request--card--date">{appointmentData.stats}</span>
        {extended ? (
          <>
            <span>{" • "}</span>
            <span className="request--card--date">
              {moment(appointment.date).format("DD/MM/YY")}
            </span>
          </>
        ) : null}
        {" • "}
        <span className="request--card--time">{appointmentData.time}</span>
        <span className="request--card--time">
          {appointment?.parent != null
            ? "Follow-up"
            : appointment?.patient == null
            ? "Walk-in"
            : "MHV"}
        </span>
      </div>
      <div className="requests--card--buttons">
        <div className="requests--card-button--group">
          {loadingReject ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress sx={{ color: "#194AF5" }} size="0.8rem" />
            </div>
          ) : (
            <span className="requests--card--button decline">
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                onClick={onClickReject}
              >
                <path
                  d="M1 1L14.9996 14.9996"
                  stroke="#194AF5"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M15.0015 1L1.00187 14.9996"
                  stroke="#194AF5"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          )}
          {loadingAccept ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress sx={{ color: "blue" }} size="0.8rem" />
            </div>
          ) : (
            <span
              className="requests--card--button accept"
              onClick={onClickAccept}
            >
              <img src={accept} alt="" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function Requests({
  setReloadAppointments,
  expandsearchText = "",
  viewAll,
  setViewAll,
  extended = false,
}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [removeRequestId, setRemoveRequestId] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [search, setSearch] = useState("");
  const { value } = useSocket();

  async function onComponentLoad() {
    const responseData = await getAppointments(appointmentFilter.pending);
    if (responseData?.data?.length) {
      setAppointments(responseData.data);
    }
  }

  useEffect(() => {
    if (value && value?.latestAppointmentRequests != null) {
      setAppointments(() => {
        const newState = [...appointments, value?.latestAppointmentRequests];
        //	remove duplicates (ones with same _id)
        const unique = newState.filter(
          (v, i, a) => a.findIndex((t) => t._id === v._id) === i
        );
        return unique;
      });
    }
  }, [value]);

  function handleRemoveRequestId() {
    setAppointments((prev) => {
      const newState = [...prev];
      const foundIndex = newState.findIndex(
        (appointment) => appointment._id === removeRequestId
      );
      if (foundIndex > -1) {
        newState.splice(foundIndex, 1);
      }
      return newState;
    });
  }

  useEffect(() => {
    onComponentLoad();
  }, []);

  useEffect(() => {
    handleRemoveRequestId();
  }, [removeRequestId]);

  return (
    <div
      className={
        viewAll == "false" ? "requests--container2" : "requests--container"
      }
    >
      <div className="requests--header">
        <span className="requests--title">
          Requests ({appointments?.length}
          )
          <br />
          {!extended && (
            <span className="viewall_cta" onClick={() => setViewAll(true)}>
              View All{" "}
              <svg
                className="ms-1"
                width="8"
                height="12"
                viewBox="0 0 8 12"
                fill="none"
              >
                <path
                  d="M5.18797 5.93147C5.10541 5.88132 5.02227 5.84736 4.96223 5.79129C3.42713 4.36146 1.89549 2.92947 0.361547 1.49857C0.101175 1.25541 -0.00447547 0.971278 0.0942467 0.635387C0.19066 0.308662 0.423321 0.102708 0.773756 0.0250702C1.12708 -0.0531067 1.42209 0.0558019 1.67496 0.292489C2.54383 1.10768 3.41558 1.91965 4.28676 2.73268C5.18797 3.5743 6.08974 4.41591 6.99094 5.25807C7.51342 5.74654 7.51573 6.20859 6.99845 6.69167C5.22145 8.35171 3.4433 10.0107 1.66745 11.6718C1.48444 11.8433 1.28642 11.977 1.01796 11.9969C0.625384 12.0255 0.280722 11.8546 0.105216 11.5397C-0.0714448 11.2227 -0.0252595 10.834 0.240886 10.5633C0.460269 10.3406 0.695817 10.132 0.925014 9.91848C2.27537 8.65903 3.62631 7.40011 4.97667 6.14119C5.03151 6.08998 5.08289 6.03606 5.18797 5.93147Z"
                  fill="#194AF5"
                />
              </svg>
            </span>
          )}
          <RequestExtendView
            setExtendView={setViewAll}
            extendView={viewAll}
            search={search}
            setSearch={setSearch}
            setReloadAppointments={setReloadAppointments}
          />
        </span>
        <button
          className="request_filter_button"
          onClick={() => setIsOpen(true)}
        >
          <span className="filter_count">+2</span>

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
        <RequestFilter
          setIsOpen={setIsOpen}
          modalIsOpen={modalIsOpen}
          setSortValue={setSortValue}
        />
      </div>
      <div className="requests--body">
        {appointments
          ?.sort((a, b) => {
            return new Date(a?.date) - new Date(b?.date);
          })
          ?.filter((appointment) => {
            if (extended === true && expandsearchText !== "") {
              // then seach of "expandsearchText" in  patient.name or patient.phone
              return (
                (
                  appointment?.unregisteredPatient?.name ??
                  appointment?.patient?.name
                )
                  ?.toLowerCase()
                  ?.includes(expandsearchText.toLowerCase()) ||
                (
                  appointment?.unregisteredPatient?.phone ??
                  appointment?.patient?.phone
                )
                  ?.toLowerCase()
                  ?.includes(expandsearchText.toLowerCase())
              );
            } else return true;
          })
          ?.map((appointment) => (
            <RequestCard
              key={appointment._id}
              appointment={appointment}
              setReloadAppointments={setReloadAppointments}
              setRemoveRequestId={setRemoveRequestId}
              extended={extended}
            />
          ))}
      </div>
    </div>
  );
}

export default Requests;

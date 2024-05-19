import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./Prescriptions.css";
import SideNav from "./SideNav";
import Topbar from "./Topbar";
import DatePicker from "react-datepicker";
import PatientVitals from "./PatientVitals";
import { getAppointment, getdetailedClinicsOfDoctor } from "../../api/doctor";
import {
  createFollowupAppointment,
  createPrescription,
  getAppointmentFollowup,
  getAppointmentMedicalHistory,
  getPrescriptionTemplates,
} from "../../api/appointment";
import CreatableSelect from "react-select/creatable";
import ReactSelect from "react-select";
import moment from "moment";
import testsData from "../../assets/data/tests.json";

const drugTemplate = {
  drugName: "",
  unit: "",
  dosage: "",
  duration: "",
  description: "",
};

const Prescriptions = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [drugList, setDrugList] = useState([drugTemplate]);
  const [testList, setTestList] = useState({ 0: "" });
  const [patient, setPatient] = useState({});
  const [docterId, setDoctorId] = useState("");

  const [focusName, setFocusName] = useState("");
  const [VitalsModalIsOpen, setVitalsModalOpen] = useState(false);
  const [section, setSection] = useState("");
  const [vitalsData, setVitalsData] = useState({});

  const [complainTags, setComplainTags] = useState([]);
  const [diagnoseTags, setDiagnoseTags] = useState([]);
  const [treatmentTags, setTreatmentTags] = useState([]);
  const [advice, setAdvice] = useState("");

  const [followUp, setFollowUp] = useState(null);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [clinicList, setClinicList] = useState([]);

  const [whitelistedDays, setWhitelistedDays] = useState([]);
  const [whitelistedClinics, setWhitelistedClinics] = useState([]);
  const [whitelistedSlots, setWhitelistedSlots] = useState([]);
  const [selectedSlotValue, setSelectedSlotValue] = useState(null);
  const [selectedClinicValue, setSelectedClinicValue] = useState(null);

  const [followupAppointment, setFollowupAppointment] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [medicalHistory, setMedicalHistory] = useState(null);

  // References

  const complainref = useRef(null);
  const diagnosisref = useRef(null);
  const treatmentref = useRef(null);
  const testref = useRef(null);
  const drugNameref = useRef(null);
  const followupRef = useRef(null);

  useEffect(() => {
    onComponentLoad();
  }, [id]);

  useEffect(() => {
    if (activeTemplate) {
      // console.log("A template is selected", activeTemplate);
      const template = templates.find(
        (template) => template._id === activeTemplate
      );
      // console.log("active Template data", template);

      if (template) {
        setComplainTags(template?.complain ?? []);
        setDiagnoseTags(template?.diagnosis ?? []);
        setDrugList(template?.drug ?? []);
        setAdvice(template?.generalAdvice ?? "");
        setTestList(template?.test ?? { 0: "" });
        setTreatmentTags(template?.treatment ?? []);
      }
    }
  }, [activeTemplate]);

  const onComponentLoad = async () => {
    loadTemplate();

    const appointmentResData = await getAppointment(id);
    // console.log(appointmentResData);
    setDoctorId(appointmentResData?.data?.doctor?._id);
    setPatient(
      appointmentResData?.data?.unregisteredPatient ??
        appointmentResData?.data?.patient
    );
    setVitalsData(appointmentResData?.data?.vitals);
    setComplainTags(appointmentResData?.data?.prescription?.complain ?? []);
    setDiagnoseTags(appointmentResData?.data?.prescription?.diagnosis ?? []);
    setDrugList(appointmentResData?.data?.prescription?.drug ?? []);
    setAdvice(appointmentResData?.data?.prescription?.generalAdvice ?? "");
    setTestList(appointmentResData?.data?.prescription?.test ?? { 0: "" });
    setTreatmentTags(appointmentResData?.data?.prescription?.treatment ?? []);

    // console.log("Drugs", appointmentResData?.data?.prescription?.drugs);

    setDrugList(
      appointmentResData?.data?.prescription?.drugs?.map((drug) => {
        const { name, ...rest } = drug;
        return {
          ...rest,
          drugName: name,
        };
      }) ?? []
    );

    const doctorClinicsResData = await getdetailedClinicsOfDoctor();
    // console.log(doctorClinicsResData.data);
    setClinicList(doctorClinicsResData.data);
    const wlDays = doctorClinicsResData.data
      .map((clinic) => clinic.availabilities)
      .flat()
      .map((availability) => availability.days)
      .flat();
    setWhitelistedDays(wlDays);

    // console.log({ patient: appointmentResData.data.patient });
    if (appointmentResData.data.patient) {
      const historyResData = await getAppointmentMedicalHistory(
        appointmentResData.data.patient._id
      );
      // console.log("Medical History data ", historyResData.data);
      if (historyResData.data && historyResData.data.message == null) {
        setMedicalHistory(historyResData.data ?? []);
      }
    }

    const followupResData = await getAppointmentFollowup(id);
    // console.log("follow-up data ", followupResData.data);
    if (followupResData.data && followupResData.data.message == null) {
      setFollowupAppointment(followupResData.data);
      setFollowUp(new Date(followupResData?.data?.date));
      setSelectedClinic(
        followupResData.data?.clinic?._id ?? followupResData.data?.clinic
      );
      setSelectedSlot(followupResData?.data?.slot);
    }
  };

  // when user selects a date, filter clinics that are available on that day
  useEffect(() => {
    if (!followUp) return;
    setWhitelistedClinics([]);
    setWhitelistedSlots([]);
    setSelectedClinic(null);
    setSelectedSlot(null);
    setSelectedClinicValue(null);
    setSelectedSlotValue(null);

    const wlClinics = clinicList.filter(
      (clinic) =>
        clinic.availabilities.filter((availability) =>
          availability.days.includes(
            moment(followUp).format("dddd").toUpperCase()
          )
        ).length > 0
    );
    setWhitelistedClinics(wlClinics);
  }, [followUp]);

  //  when user selects a clinic, filter slots that are available on that clinic for the selected date
  useEffect(() => {
    if (!followUp) return;
    if (!selectedClinic) return;

    const selectedClinicData = clinicList.find(
      (clinic) => clinic._id === selectedClinic
    );

    if (!selectedClinicData) {
      toast.error("clinic not found");
      return;
    }

    // get the availability of the selected clinic on the selected date
    const selectedClinicAvailabilities =
      selectedClinicData?.availabilities?.filter((availability) =>
        availability?.days?.includes(
          moment(followUp).format("dddd").toUpperCase()
        )
      );

    // console.log({ selectedClinicAvailabilities });

    // get the slots of the selected clinic on the selected date
    const selectedClinicSlots = selectedClinicAvailabilities
      ?.map((avail) => ({
        ...avail,
        slots: avail?.slots?.map((slot) => ({
          slotId: slot?._id,
          startTime: slot?.startTime,
          endTime: slot?.endTime,
          availabilityId: avail?._id,
        })),
      }))
      ?.map((avail) => avail?.slots)
      ?.flat();
    setWhitelistedSlots(
      selectedClinicSlots?.map((slot) => ({
        label: `${slot.startTime} - ${slot.endTime}`,
        value: {
          slotId: slot?.slotId,
          availabilityId: slot?.availabilityId,
        },
      }))
    );
  }, [selectedClinic]);

  const addrow = (e) => {
    e.preventDefault();
    setDrugList([
      ...drugList,
      {
        drugName: "",
        unit: "",
        dosage: "",
        duration: "",
        description: "",
      },
    ]);
  };

  const addPatienttest = (e) => {
    e.preventDefault();
    setTestList({
      ...testList,
      [Object.keys(testList)?.length ?? 0]: "",
    });
  };

  const handleDrugs = (e, index) => {
    e.preventDefault();
    let dosage = 0;
    if (e.target.name == "dosage") {
      const value = e.target.value.split("-").join("");
      dosage = value.match(/.{1}/g).join("-");
    }
    const updatedList = drugList.map((item, i) =>
      index === i
        ? Object.assign(item, {
            [e.target.name]:
              e.target.name == "dosage" ? dosage : e.target.value,
          })
        : item
    );
    setDrugList(updatedList);
  };

  const removeDrug = (e, index) => {
    const filteredDrugs = [...drugList];
    if (drugList.length > 0) {
      e.preventDefault();
      filteredDrugs.splice(index, 1);
    }
    setDrugList(filteredDrugs);
  };

  const handleTests = (choice, index) => {
    const object1 = { [index]: choice?.value };
    const testListItems = { ...testList, ...object1 };
    setTestList(testListItems);
  };

  const saveAndSubmit = (e) => {
    e.preventDefault();
    submitbtn(true);
  };

  const submitbtn = async (template = false) => {
    const precriptionData = {
      complain: complainTags,
      diagnosis: diagnoseTags,
      treatment: treatmentTags,
      test: Object.values(testList),
      generalAdvice: advice,
      drugs: drugList
        // filter out empty rows
        ?.filter(
          (drug) =>
            drug.drugName !== "" &&
            drug.dosage !== "" &&
            drug.duration !== "" &&
            drug.unit !== ""
        )
        // map to the required format
        ?.map((drug) => ({
          name: drug.drugName,
          dosage: drug.dosage,
          duration: drug.duration,
          description: drug.description,
          unit: drug.unit,
        })),
    };
    const res = await createPrescription(id, precriptionData, template);
    if (res?.status === 200) {
      toast.success("Prescription saved successfully");

      if (followUp != null) {
        await createFollowup();
      }
      navigate(`/patientbills/${id}`);
    } else {
      toast.error(
        res?.data?.message ?? "Something went wrong while saving prescription"
      );
    }
  };

  const createFollowup = async () => {
    if (
      !selectedClinic ||
      !selectedSlot?.slotId ||
      !selectedSlot?.availabilityId
    )
      return;
    const followupData = {
      date: followUp,
      appointmentId: id,
      availabilityId: selectedSlot?.availabilityId,
      slotId: selectedSlot?.slotId,
      clinicId: selectedClinic,
      paymentType: "OFFLINE",
    };
    console.log("follow-up date", followupData);
    const res = await createFollowupAppointment(followupData);
    console.log(res);
    if (res.status === 200) {
      toast.success("Followup appointment created successfully");
    } else {
      toast.error(
        res?.data?.message ??
          "Something went wrong while creating followup appointment"
      );
    }
  };

  const loadTemplate = async () => {
    const res = await getPrescriptionTemplates();
    if (res?.status === 200) {
      // console.log("template data", res.data.data);
      setTemplates(res.data.data);
    }
  };

  const handleFocus = (e) => {
    setFocusName(e.target.name);
    setSection("");
  };

  useEffect(() => {
    if (section === "complain") {
      complainref?.current?.focus();
    } else if (section === "diagnosis") {
      diagnosisref?.current?.focus();
    } else if (section === "treatment") {
      treatmentref?.current?.focus();
    } else if (section === "test") {
      testref?.current?.focus();
    } else if (section === "drugName") {
      drugNameref?.current?.focus();
    } else if (section === "follow") {
      followupRef?.current?.focus();
    }
  }, [section]);

  const removeDiagnoseTags = (indexToRemove) => {
    setDiagnoseTags([
      ...diagnoseTags.filter((_, index) => index !== indexToRemove),
    ]);
  };

  const addDiagnoseTags = (event) => {
    if (event.code == "Enter" && event.target.value.length > 1) {
      let text = event.target.value.replace(/[\r\n]/gm, "");
      setDiagnoseTags([...diagnoseTags, text]);
      event.target.value = "";
    }
  };

  const updateDiagnoseTagsHandler = (e) => {
    if (diagnoseTags.length > 0 && e.target.value == "") {
      const copyOfTags = [...diagnoseTags];
      copyOfTags.pop();
      setDiagnoseTags(copyOfTags);
    }
  };
  const getDiagnoseTagData = (i, tag) => {
    let text = tag.replace(/[\r\n]/gm, "");
    const copyOfTags = [...diagnoseTags.filter((_, index) => index !== i)];
    setDiagnoseTags(copyOfTags);
    if (diagnosisref.current) {
      diagnosisref.current.value = text;
      diagnosisref.current.focus();
    }
  };
  const setDiagnoseFocus = () => {
    if (diagnosisref.current) {
      diagnosisref.current.focus();
    }
  };
  const removeTreatmentTags = (indexToRemove) => {
    setTreatmentTags([
      ...treatmentTags.filter((_, index) => index !== indexToRemove),
    ]);
  };
  const addTreatmentTags = (event) => {
    if (event.code == "Enter" && event.target.value.length > 1) {
      let text = event.target.value.replace(/[\r\n]/gm, "");
      setTreatmentTags([...treatmentTags, text]);
      event.target.value = "";
    }
  };
  const updateTreatmentTagsHandler = (e) => {
    if (treatmentTags.length > 0 && e.target.value == "") {
      const copyOfTags = [...treatmentTags];
      copyOfTags.pop();
      setTreatmentTags(copyOfTags);
    }
  };
  const getTreatmentTagData = (i, tag) => {
    let text = tag.replace(/[\r\n]/gm, "");
    console.log(text);
    const copyOfTags = [...treatmentTags.filter((_, index) => index !== i)];
    setTreatmentTags(copyOfTags);
    if (treatmentref.current) {
      treatmentref.current.value = text;
      treatmentref.current.focus();
    }
  };
  const setTreatmentFocus = () => {
    if (treatmentref.current) {
      treatmentref.current.focus();
    }
  };
  const removeTags = (indexToRemove) => {
    setComplainTags([
      ...complainTags.filter((_, index) => index !== indexToRemove),
    ]);
  };
  const addTags = (event) => {
    if (event.code == "Enter" && event.target.value.length > 1) {
      let text = event.target.value.replace(/[\r\n]/gm, "");
      setComplainTags([...complainTags, text]);
      event.target.value = "";
    }
  };
  const updateTagsHandler = (e) => {
    if (complainTags.length > 0 && e.target.value == "") {
      const copyOfTags = [...complainTags];
      copyOfTags.pop();
      setComplainTags(copyOfTags);
    }
  };
  const getTagData = (i, tag) => {
    let text = tag.replace(/[\r\n]/gm, "");
    const copyOfTags = [...complainTags.filter((_, index) => index !== i)];
    setComplainTags(copyOfTags);
    if (complainref.current) {
      complainref.current.value = text;
      complainref.current.focus();
    }
  };
  const setcomplainFocus = () => {
    if (complainref.current) {
      complainref.current.focus();
    }
  };

  return (
    <>
      <Topbar
        templates={templates}
        appointmentId={id}
        docterId={docterId}
        loadTemplate={loadTemplate}
        setIsOpen={setVitalsModalOpen}
        modalIsOpen={VitalsModalIsOpen}
        setVitalsData={setVitalsData}
        vitalsData={vitalsData}
        patient={patient}
        setActiveTemplate={setActiveTemplate}
      />
      <div>
        <SideNav
          patient={patient}
          focusName={focusName}
          setSection={setSection}
          section={section}
          medicalHistory={medicalHistory}
        />
        <form autoComplete="off">
          <div className="prescription_outlet">
            <div className="prescription_container">
              {vitalsData?.weight ||
              vitalsData?.bp_input1 ||
              vitalsData?.bp_input2 ||
              vitalsData?.diabetes ||
              vitalsData?.height ||
              vitalsData?.hip ||
              vitalsData?.spo2 ||
              vitalsData?.pulse ||
              vitalsData?.temperature ? (
                <>
                  <label className="vitals_header">
                    Vitals
                    <span
                      className="vitals_edit_cta"
                      onClick={() => setVitalsModalOpen(true)}
                    >
                      (edit)
                    </span>
                  </label>
                  <PatientVitals vitalsData={vitalsData} />
                </>
              ) : null}

              <div className="prescription_content" id="complain">
                <label htmlFor="complain">Complain</label>
                <div className="tags-input" onClick={setcomplainFocus}>
                  <ul id="tags">
                    {complainTags.map((tag, index) => (
                      <li key={index} className="tag">
                        <span
                          className="tag-title"
                          onClick={() => getTagData(index, tag)}
                        >
                          {tag}
                        </span>
                        <span
                          className="tag-close-icon"
                          onClick={() => removeTags(index)}
                        >
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </li>
                    ))}
                    <li>
                      <textarea
                        id="complain"
                        name="complain"
                        cols="50"
                        rows="1"
                        className="complain_textarea"
                        onKeyUp={(event) =>
                          event.code == "Enter" ? addTags(event) : null
                        }
                        onKeyDown={(e) =>
                          e.code == "Backspace" ? updateTagsHandler(e) : null
                        }
                        onFocus={handleFocus}
                        ref={complainref}
                      ></textarea>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="prescription_content" id="diagnosis">
                <label htmlFor="diagnosis">Diagnosis</label>
                <div className="tags-input" onClick={setDiagnoseFocus}>
                  <ul id="tags">
                    {diagnoseTags.map((tag, index) => (
                      <li key={index} className="tag">
                        <span
                          className="tag-title"
                          onClick={() => getDiagnoseTagData(index, tag)}
                        >
                          {tag}
                        </span>
                        <span
                          className="tag-close-icon"
                          onClick={() => removeDiagnoseTags(index)}
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </li>
                    ))}
                    <li>
                      <textarea
                        name="diagnosis"
                        id="diagnosis"
                        cols="50"
                        rows="1"
                        className="diagnose_textarea"
                        onFocus={handleFocus}
                        ref={diagnosisref}
                        onKeyUp={(e) =>
                          e.code == "Enter" ? addDiagnoseTags(e) : null
                        }
                        onKeyDown={(e) =>
                          e.code == "Backspace"
                            ? updateDiagnoseTagsHandler(e)
                            : null
                        }
                      ></textarea>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="prescription_content" id="treatment">
                <label htmlFor="treatment">Treatment</label>
                <div className="tags-input" onClick={setTreatmentFocus}>
                  <ul id="tags">
                    {treatmentTags.map((tag, index) => (
                      <li key={index} className="tag">
                        <span
                          className="tag-title"
                          onClick={() => getTreatmentTagData(index, tag)}
                        >
                          {tag}
                        </span>
                        <span
                          className="tag-close-icon"
                          onClick={() => removeTreatmentTags(index)}
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </li>
                    ))}
                    <li>
                      <textarea
                        name="treatment"
                        id="treatment"
                        cols="50"
                        rows="1"
                        className="treatment_textarea"
                        onFocus={handleFocus}
                        ref={treatmentref}
                        onKeyUp={(e) =>
                          e.code == "Enter" ? addTreatmentTags(e) : null
                        }
                        onKeyDown={(e) =>
                          e.code == "Backspace"
                            ? updateTreatmentTagsHandler(e)
                            : null
                        }
                      ></textarea>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="prescription_content" id="tests">
                <label htmlFor="test">Test</label>
                {Object.values(testList).map((test, index) => (
                  <div key={index} className="text_name_input">
                    <CreatableSelect
                      onChange={(choice) => handleTests(choice, index)}
                      isClearable
                      defaultInputValue={test}
                      options={(() => {
                        const defaultTestData =
                          testsData?.map((test) => ({
                            label: test.name,
                            value: test.name,
                          })) || [];
                        const userValues = Object.values(testList).map(
                          (test) => ({
                            label: test,
                            value: test,
                          })
                        );
                        return [
                          ...defaultTestData,
                          ...userValues.filter(
                            (test) =>
                              !defaultTestData.find(
                                (defaultTest) =>
                                  defaultTest.value === test.value
                              )
                          ),
                        ];
                      })()}
                    />
                  </div>
                ))}
                <div className="d-flex justify-content-end mt-3">
                  <button className="addtest_btn" onClick={addPatienttest}>
                    Add More
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 45 45"
                      fill="none"
                      className="enter_icon"
                    >
                      <path
                        d="M38.4371 0H6.56222C2.94369 0 0 2.94371 0 6.56258V38.4377C0 42.0563 2.94369 45 6.56254 45H38.4375C42.0563 45 45 42.0563 45 38.4374V6.56226C44.9997 2.94371 42.056 0 38.4371 0V0ZM37.4999 25.3124C37.4999 25.83 37.0799 26.25 36.5623 26.25H16.875V30.9374C16.875 31.2918 16.6744 31.616 16.3574 31.7755C16.2243 31.8411 16.0799 31.875 15.9374 31.875C15.7387 31.875 15.54 31.8113 15.3749 31.6876L7.87508 26.0626C7.63872 25.8862 7.49997 25.6069 7.49997 25.3124C7.49997 25.018 7.63872 24.7386 7.87508 24.5625L15.3749 18.9376C15.658 18.7238 16.0407 18.6918 16.3555 18.8494C16.6744 19.0088 16.875 19.3331 16.875 19.6875V24.3749H35.6245V14.0627C35.6245 13.5451 36.0445 13.1251 36.5621 13.1251C37.0797 13.1251 37.4997 13.5451 37.4997 14.0627L37.4999 25.3124Z"
                        fill="#B7B7B7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="prescription_content" id="drugs">
                <label htmlFor="test">RX</label>
                <table className="table_prescription">
                  <thead className="point-table-head">
                    <tr>
                      <th className="text-center">No.</th>
                      <th className="text-left">Drug Name</th>
                      <th className="text-center">Unit</th>
                      <th className="text-center">Dosage</th>
                      <th className="text-center">Duration (days)</th>
                      <th className="text-center">Description</th>
                      <th className="text-center delete_small_box">&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {drugList.map((item, index) => (
                      <tr key={index}>
                        <td className="text-left">{index + 1}</td>
                        <td className="drugname_input">
                          <input
                            id={index < 1 ? "drugInput" : null}
                            autoFocus={index >= 1 ? true : false}
                            name="drugName"
                            type="text"
                            className="prescription_table_input"
                            onChange={(e) => {
                              handleDrugs(e, index);
                            }}
                            value={item.drugName}
                            onFocus={handleFocus}
                            ref={drugNameref}
                          />
                        </td>
                        <td className="small_box">
                          <input
                            name="unit"
                            type="number"
                            className="prescription_table_input"
                            placeholder="e.g 1 table spoon"
                            onChange={(e) => handleDrugs(e, index)}
                            defaultValue={item.unit}
                          />
                        </td>
                        <td className="small_box">
                          <input
                            name="dosage"
                            type="tel"
                            className="prescription_table_input"
                            placeholder="e.g 1-0-1"
                            onChange={(e) => handleDrugs(e, index)}
                            defaultValue={item.dosage}
                            value={item.dosage}
                            maxLength={6}
                          />
                        </td>
                        <td className="small_box">
                          <input
                            name="duration"
                            type="number"
                            className="prescription_table_input"
                            placeholder="e.g 2 days"
                            onChange={(e) => handleDrugs(e, index)}
                            defaultValue={item.duration}
                          />
                        </td>
                        <td className="small_box">
                          <input
                            name="description"
                            type="text"
                            className="prescription_table_input"
                            placeholder=""
                            onChange={(e) => handleDrugs(e, index)}
                            defaultValue={item.description}
                          />
                        </td>
                        <td
                          className="delete_small_box"
                          onClick={(e) => removeDrug(e, index)}
                        >
                          <svg
                            width="20"
                            height="22"
                            viewBox="0 0 20 22"
                            fill="none"
                          >
                            <path
                              d="M8.25 0C6.7375 0 5.5 1.2375 5.5 2.75H2.75C1.2375 2.75 0 3.9875 0 5.5H19.25C19.25 3.9875 18.0125 2.75 16.5 2.75H13.75C13.75 1.2375 12.5125 0 11 0H8.25ZM2.75 8.25V21.4775C2.75 21.78 2.97 22 3.2725 22H16.005C16.3075 22 16.5275 21.78 16.5275 21.4775V8.25H13.7775V17.875C13.7775 18.645 13.1725 19.25 12.4025 19.25C11.6325 19.25 11.0275 18.645 11.0275 17.875V8.25H8.2775V17.875C8.2775 18.645 7.6725 19.25 6.9025 19.25C6.1325 19.25 5.5275 18.645 5.5275 17.875V8.25H2.7775H2.75Z"
                              fill="#A4A4A4"
                            />
                          </svg>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="d-flex justify-content-end">
                  <button className="addrow_btn" onClick={addrow}>
                    Add More{" "}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 45 45"
                      fill="none"
                      className="enter_icon"
                    >
                      <path
                        d="M38.4371 0H6.56222C2.94369 0 0 2.94371 0 6.56258V38.4377C0 42.0563 2.94369 45 6.56254 45H38.4375C42.0563 45 45 42.0563 45 38.4374V6.56226C44.9997 2.94371 42.056 0 38.4371 0V0ZM37.4999 25.3124C37.4999 25.83 37.0799 26.25 36.5623 26.25H16.875V30.9374C16.875 31.2918 16.6744 31.616 16.3574 31.7755C16.2243 31.8411 16.0799 31.875 15.9374 31.875C15.7387 31.875 15.54 31.8113 15.3749 31.6876L7.87508 26.0626C7.63872 25.8862 7.49997 25.6069 7.49997 25.3124C7.49997 25.018 7.63872 24.7386 7.87508 24.5625L15.3749 18.9376C15.658 18.7238 16.0407 18.6918 16.3555 18.8494C16.6744 19.0088 16.875 19.3331 16.875 19.6875V24.3749H35.6245V14.0627C35.6245 13.5451 36.0445 13.1251 36.5621 13.1251C37.0797 13.1251 37.4997 13.5451 37.4997 14.0627L37.4999 25.3124Z"
                        fill="#B7B7B7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="prescription_content follow_up_line" id="follow">
                <div>
                  <label ref={followupRef} htmlFor="follow">
                    Follow Up Date
                  </label>
                  <DatePicker
                    placeholderText={"Select a date"}
                    className="follow_up_date"
                    selected={followUp}
                    onChange={(date) => setFollowUp(date)}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    // whitelist days of the week
                    filterDate={(date) => {
                      if (date == null) return false;
                      const day = moment(date).format("dddd").toUpperCase();
                      return whitelistedDays?.includes(day);
                    }}
                    maxDate={new Date() + 90}
                    disabled={followupAppointment != null}
                  />
                </div>

                {followupAppointment == null && (
                  <div className="follow_up_clinic_selector">
                    <ReactSelect
                      placeholder="Select a Clinic"
                      isDisabled={false}
                      isLoading={false}
                      className="react-select-container"
                      isClearable={false}
                      isRtl={false}
                      isSearchable={true}
                      name="clinic"
                      options={
                        whitelistedClinics?.map((clinic) => {
                          return { value: clinic?._id, label: clinic?.name };
                        }) ?? []
                      }
                      onChange={(e) => {
                        setSelectedClinic(e.value);
                        setSelectedClinicValue({
                          label: whitelistedClinics?.find(
                            (clinic) => clinic?._id == e?.value
                          )?.name,
                        });
                      }}
                      value={selectedClinicValue}
                    />
                  </div>
                )}

                {followupAppointment == null && (
                  <div className="follow_up_clinic_selector">
                    <ReactSelect
                      placeholder="Select a Slot"
                      classNamePrefix="select"
                      defaultValue={selectedClinic ?? 0}
                      isDisabled={false}
                      isLoading={false}
                      isClearable={false}
                      isRtl={false}
                      isSearchable={true}
                      name="clinic"
                      options={whitelistedSlots ?? []}
                      onChange={(e) => {
                        setSelectedSlot(e.value);
                        setSelectedSlotValue({
                          label: whitelistedSlots?.find(
                            (slot) => slot?.value?.slotId == e?.value?.slotId
                          )?.label,
                        });
                      }}
                      value={selectedSlotValue}
                    />
                  </div>
                )}
              </div>
              <div className="prescription_content" id="advice">
                <label htmlFor="advice">General advice</label>
                <textarea
                  id="date"
                  name="advice"
                  className="advice_textarea"
                  placeholder="Type here"
                  value={advice}
                  onChange={(e) => setAdvice(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="d-flex justify-content-end me-5">
              <button
                id="save_btn"
                onClick={(e) => {
                  saveAndSubmit(e);
                }}
                className="save_btn"
                type="submit"
                name="submit"
                value="true"
              >
                Submit & Save as template
              </button>
              <button
                type="submit"
                className="submit_btn"
                name="submit"
                value="false"
                onClick={(e) => {
                  e.preventDefault();
                  submitbtn();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Prescriptions;

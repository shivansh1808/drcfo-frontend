import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SideNav from "../SideNav";
import Topbar from "../Topbar";
import axios from '../../../axios';
import DeleteTemplateModal from "./DeleteTemplateModal";
import TemplateSaveModal from "./TemplateSaveModal";

const drugTemplate = {
  drugName: "",
  unit: "",
  dosage: "",
  duration: "",
  description: "",
};
const testTemplate = {
  test: "",
};

const EditTemplate = () => {
  const { id } = useParams();
  const [followup, setFollowUp] = useState(null);
  const [drugList, setDrugList] = useState([drugTemplate]);
  const [drugSet, setDrugSet] = useState([]);
  const [testSet, setTestSet] = useState([]);
  const [testList, setTestList] = useState([testTemplate]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [deletemodalIsOpen, setdeletemodalIsOpen] = useState(false);
  const textInput = useRef(null);
  const [focusName, setFocusName] = useState("");
  const complainref = useRef(null);
  const diagnosisref = useRef(null);
  const treatmentref = useRef(null);
  const testref = useRef(null);
  const adviceref = useRef(null);
  const drugNameref = useRef(null);
  const [section, setSection] = useState("");
  const [drugName, setDrugName] = useState("");
  const [testName, setTestName] = useState("");
  const [drugSetIndex, setDrugSetIndex] = useState(null);
  const [testSetIndex, settestSetIndex] = useState(null);
  const [complaintags, setComplainTags] = useState([]);
  const [diagnosetags, setDiagnoseTags] = useState([]);
  const [treatmenttags, setTreatmentTags] = useState([]);
  const [advicetags, setAdviceTags] = useState([]);
  const [cursor, setCursor] = useState(-1);
  function openModal() {
    setIsOpen(true);
  }
  useEffect(() => {
    // console.log(id);
    window.scrollTo(0, 0);
    // fetch(
    //   `https://drco-all-backend-617u.onrender.com/get/prescription-template?id=${id}`
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     // console.log(data);
    //     setComplainTags(data.complain);
    //     setTreatmentTags(data.treatment);
    //     setDiagnoseTags(data.diagnosis);
    //     setAdviceTags(data.generalAdvice);
    //     setFollowUp(data.followUpdate);
    //     setDrugList(data.drug);
    //     setTestList(data.test);
    //   });
      axios.get(`/get/prescription-template?id=${id}`).then((res)=>{
        setComplainTags(res.data.complain);
        setTreatmentTags(res.data.treatment);
        setDiagnoseTags(res.data.diagnosis);
        setAdviceTags(res.data.generalAdvice);
        setFollowUp(res.data.followUpdate);
        setDrugList(res.data.drug);
        setTestList(res.data.test);
      })
  }, [id]);

  useEffect(() => {
    // console.log(testName);
    if (testName.length > 0) {
      // fetch(
      //   `https://drco-all-backend-617u.onrender.com/searchTest?query=${testName}&search=test`
      // )
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log(data);
      //     setTestSet(data);
      //   });
      // axios
      //   .get(
      //     `https://drco-all-backend-617u.onrender.com/searchTest?query=${testName}&search=test`
      //   )
      //   .then(function (response) {
      //     console.log(response);
      //   });
      axios.get(`/searchTest?query=${testName}&search=test`).then((res)=>{
          console.log(res.data);
          setTestSet(res.data);
      })
    }
  }, [testName]);
  useEffect(() => {
    // console.log(drugName);
    if (drugName.length > 0) {
      // fetch(
      //   `https://drco-all-backend-617u.onrender.com/search?query=${drugName}&search=drug`
      // )
      //   .then((res) => res.json())
      //   .then((data) => {
      //     setDrugSet(data);
      //   });
        axios.get(`/search?query=${drugName}&search=drug`).then((res)=>{
          setDrugSet(res.data);
        })
    }
  }, [drugName]);
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
    console.log("adding test");
    setTestList([
      ...testList,
      {
        test: "",
      },
    ]);
  };
  const handleText = (e, index) => {
    e.preventDefault();
    if (e.target.name === "drugName") {
      setDrugName(e.target.value);
      setDrugSetIndex(index);
    }
    const updatedList = drugList.map((item, i) =>
      index === i
        ? Object.assign(item, {
            [e.target.name]: e.target.value,
          })
        : item
    );
    setDrugList(updatedList);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addrow(e);
    }
  };

  const handleTestKeyPress = (e, index) => {
    const newtestList = [...testList];
    console.log(testList.length);
    if (
      e.key === "Enter" &&
      e.target.value.length == 0 &&
      testList.length > 1
    ) {
      e.preventDefault();
      newtestList.splice(index, 1);
      setTestList(newtestList);
    } else if (e.key === "Enter" && e.target.value.length > 0) {
      e.preventDefault();
      addPatienttest(e);
    } else {
      // console.log("object");
    }
  };

  const removeDrug = (e, index) => {
    const filteredDrugs = [...drugList];
    if (
      e.key === "Enter" &&
      e.target.value.length === 0 &&
      drugList.length > 1
    ) {
      e.preventDefault();
      filteredDrugs.splice(index, 1);
      textInput.current.focus();
    }
    setDrugList(filteredDrugs);
  };

  const handleTests = (e, index) => {
    if (e.target.name === "test") {
      setTestName(e.target.value);
      settestSetIndex(index);
    }
    const updatedTestList = testList.map((item, i) =>
      index === i
        ? Object.assign(item, { [e.target.name]: e.target.value })
        : item
    );
    setTestList(updatedTestList);
  };
  const deleteTemplate = () => {
    // fetch(
    //   `https://drco-all-backend-617u.onrender.com/delete/template?id=${id}`,
    //   {
    //     method: "DELETE",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     if (data.message == "Template deleted Sucessfully") {
    //       setdeletemodalIsOpen(true);
    //     }
    //   });
      axios.delete(`/delete/template?id=${id}`).then((res)=>{
        console.log(res.data);
        if (res.data.message == "Template deleted Sucessfully") {
          setdeletemodalIsOpen(true);
        }
      })
  };
  const submitbtn = () => {
    const precriptionData = {
      id,
      complain: complaintags,
      treatment: treatmenttags,
      test: testList,
      drug: drugList,
      diagnosis: diagnosetags,
      followUpdate: followup,
      generalAdvice: advicetags,
    };

    console.log(precriptionData);
    // fetch("https://drco-all-backend-617u.onrender.com/edit/editTemplate", {
    //   method: "PUT",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(precriptionData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // console.log(data);
    //     if (data.message == "template edited sucessfully") {
    //       openModal();
    //     }
    //   });
      axios.put(`/edit/editTemplate`, precriptionData).then((res) => {
				if (res.data.message == "template edited sucessfully") {
					openModal();
				}
			});
  };

  const handleFocus = (e) => {
    setFocusName(e.target.name);
    setSection("");
  };
  const onSuggestHandler = (value, index) => {
    setDrugSet([]);
    setDrugList(
      drugList.map((item, i) => {
        if (index == i) {
          return { ...item, drugName: value };
        } else {
          return item;
        }
      })
    );
  };
  const onTestSuggestHandler = (value, index) => {
    setTestSet([]);
    setTestList(
      testList.map((item, i) => {
        if (index == i) {
          return { ...item, test: value };
        } else {
          return item;
        }
      })
    );
  };

  useEffect(() => {
    if (section === "complain") {
      complainref.current.focus();
    } else if (section === "diagnosis") {
      diagnosisref.current.focus();
    } else if (section === "treatment") {
      treatmentref.current.focus();
    } else if (section === "test") {
      testref.current.focus();
    } else if (section === "drugName") {
      drugNameref.current.focus();
    } else if (section === "follow") {
      textInput.current.focus();
    } else if (section === "advice") {
      adviceref.current.focus();
    }
  }, [section]);

  const removeDiagnoseTags = (indexToRemove) => {
    setDiagnoseTags([
      ...diagnosetags.filter((_, index) => index !== indexToRemove),
    ]);
  };
  const addDiagnoseTags = (event) => {
    if (event.code == "Enter" && event.target.value.length > 1) {
      let text = event.target.value.replace(/[\r\n]/gm, "");
      setDiagnoseTags([...diagnosetags, text]);
      event.target.value = "";
    }
  };
  const updateDiagnoseTagsHandler = (e) => {
    if (diagnosetags.length > 0 && e.target.value == "") {
      const copyOfTags = [...diagnosetags];
      copyOfTags.pop();
      setDiagnoseTags(copyOfTags);
    } else {
      // console.log("coreect nedded");
    }
  };
  const getDiagnoseTagData = (i, tag) => {
    let text = tag.replace(/[\r\n]/gm, "");
    console.log(text);
    const copyOfTags = [...diagnosetags.filter((_, index) => index !== i)];
    setDiagnoseTags(copyOfTags);
    // console.log(copyOfTags);
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
  const removeAdviceTags = (indexToRemove) => {
    setAdviceTags([
      ...advicetags.filter((_, index) => index !== indexToRemove),
    ]);
  };
  const addAdviceTags = (event) => {
    if (event.code == "Enter" && event.target.value.length > 1) {
      let text = event.target.value.replace(/[\r\n]/gm, "");
      setAdviceTags([...advicetags, text]);
      event.target.value = "";
    }
  };
  const updateAdviceTagsHandler = (e) => {
    if (advicetags.length > 0 && e.target.value == "") {
      const copyOfTags = [...advicetags];
      copyOfTags.pop();
      setAdviceTags(copyOfTags);
    } else {
      // console.log("coreect nedded");
    }
  };
  const getAdviceTagData = (i, tag) => {
    let text = tag.replace(/[\r\n]/gm, "");
    console.log(text);
    const copyOfTags = [...advicetags.filter((_, index) => index !== i)];
    setAdviceTags(copyOfTags);
    // console.log(copyOfTags);
    if (adviceref.current) {
      adviceref.current.value = text;
      adviceref.current.focus();
    }
  };
  const setAdviceFocus = () => {
    if (adviceref.current) {
      adviceref.current.focus();
    }
  };
  const removeTreatmentTags = (indexToRemove) => {
    setTreatmentTags([
      ...treatmenttags.filter((_, index) => index !== indexToRemove),
    ]);
  };
  const addTreatmentTags = (event) => {
    if (event.code == "Enter" && event.target.value.length > 1) {
      let text = event.target.value.replace(/[\r\n]/gm, "");
      setTreatmentTags([...treatmenttags, text]);
      event.target.value = "";
    }
  };
  const updateTreatmentTagsHandler = (e) => {
    if (treatmenttags.length > 0 && e.target.value == "") {
      // console.log(e);
      const copyOfTags = [...treatmenttags];
      copyOfTags.pop();
      setTreatmentTags(copyOfTags);
    } else {
      // console.log("coreect nedded");
    }
  };
  const getTreatmentTagData = (i, tag) => {
    let text = tag.replace(/[\r\n]/gm, "");
    console.log(text);
    const copyOfTags = [...treatmenttags.filter((_, index) => index !== i)];
    setTreatmentTags(copyOfTags);
    // console.log(copyOfTags);
    if (treatmentref.current) {
      treatmentref.current.value = text;
      treatmentref.current.focus();
    }
  };
  const removeTags = (indexToRemove) => {
    setComplainTags([
      ...complaintags.filter((_, index) => index !== indexToRemove),
    ]);
  };
  const addTags = (event) => {
    // console.log(event.target.value.length);
    if (event.code == "Enter" && event.target.value.length > 1) {
      let text = event.target.value.replace(/[\r\n]/gm, "");
      setComplainTags([...complaintags, text]);
      event.target.value = "";
    }
  };
  const updateTagsHandler = (e) => {
    // console.log(e.target.value.length);
    if (complaintags.length > 0 && e.target.value == "") {
      // console.log(e);
      const copyOfTags = [...complaintags];
      copyOfTags.pop();
      setComplainTags(copyOfTags);
    } else {
      // console.log("coreect nedded");
    }
  };
  const getTagData = (i, tag) => {
    let text = tag.replace(/[\r\n]/gm, "");
    console.log(text);
    const copyOfTags = [...complaintags.filter((_, index) => index !== i)];
    setComplainTags(copyOfTags);
    // console.log(copyOfTags);
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
  const setTreatmentFocus = () => {
    if (treatmentref.current) {
      treatmentref.current.focus();
    }
  };
  const handleArrowKeys = (e, index) => {
    if (e.key === "ArrowDown") {
      drugSet.length
        ? setCursor((c) => (c < drugSet.length - 1 ? c + 1 : c))
        : setCursor(null);
    }
    if (e.key === "ArrowUp") {
      setCursor((c) => (c > 0 ? c - 1 : 0));
    }
    if (e.keyCode === 13 && cursor > 0) {
      e.preventDefault();
      setDrugList(
        drugList.map((item, i) => {
          if (index == i) {
            return { ...item, drugName: drugSet[cursor].brandName };
          } else {
            return item;
          }
        })
      );
      setDrugSet([]);
      setCursor(-1);
    }
  };
  return (
    <>
      <Topbar />
      <div>
        <SideNav
          focusName={focusName}
          setSection={setSection}
          section={section}
        />
        <form autoComplete="off">
          <div className="prescription_outlet">
            <div className="prescription_container">
              <div className="prescription_content" id="complain">
                <label htmlFor="complain">Complain</label>
                <div className="tags-input" onClick={setcomplainFocus}>
                  <ul id="tags">
                    {complaintags.map((tag, index) => (
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
                    {diagnosetags.map((tag, index) => (
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
                    {treatmenttags.map((tag, index) => (
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
                {testList.map((test, index) => (
                  <div key={index} className="text_name_input">
                    <input
                      autoFocus={index >= 1 ? true : false}
                      name="test"
                      type="text"
                      id="testInput"
                      className="prescription_input"
                      placeholder="Write Test Name"
                      onChange={(e) => handleTests(e, index)}
                      // defaultValue={}
                      onKeyDown={(e) => handleTestKeyPress(e, index)}
                      onFocus={handleFocus}
                      ref={testref}
                      value={test.test}
                    ></input>{" "}
                    {testSetIndex === index && testSet.length > 0 && (
                      <div className="drug_suggestion">
                        {testSet.map((set, i) => (
                          <div
                            key={i}
                            className={
                              cursor == i
                                ? "drug_suggestion_card active"
                                : "drug_suggestion_card"
                            }
                            onClick={() => {
                              onTestSuggestHandler(set.name, index);
                            }}
                          >
                            {set.name},{" "}
                            <span className="manufacturer">
                              {/* {set.value} */}
                              value
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="d-flex justify-content-end">
                  <button
                    className="addtest_btn"
                    onClick={(e) =>
                      e.type == "click" ? addPatienttest(e) : null
                    }
                  >
                    Add More
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 45 45"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
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
                      <th className="text-left">No</th>
                      <th className="text-left">Drug Name</th>
                      <th className="text-center">Unit</th>
                      <th className="text-center">Dosage</th>
                      <th className="text-center">Duration</th>
                      <th className="text-center">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {drugList.map((item, index) => (
                      <tr key={index}>
                        <td className="text-left">{index + 1}</td>
                        <td className="drugname_input">
                          <input
                            // id="drugInput"
                            id={index < 1 ? "drugInput" : null}
                            autoFocus={index >= 1 ? true : false}
                            name="drugName"
                            type="text"
                            className="prescription_table_input"
                            // onKeyDown={ handleKeyDown}
                            onChange={(e) => {
                              handleText(e, index);
                            }}
                            onKeyDown={(e) => removeDrug(e, index)}
                            onKeyDownCapture={(e) => handleArrowKeys(e, index)}
                            onBlur={() => {
                              setTimeout(() => {
                                setDrugSet([]);
                              }, 500);
                            }}
                            value={item.drugName}
                            onFocus={handleFocus}
                            ref={drugNameref}
                          />
                          {drugSetIndex === index && drugSet.length > 0 && (
                            <div className="drug_suggestion">
                              {drugSet.map((set, i) => (
                                <div
                                  key={i}
                                  className={
                                    cursor == i
                                      ? "drug_suggestion_card active"
                                      : "drug_suggestion_card"
                                  }
                                  onClick={() => {
                                    onSuggestHandler(set.brandName, index);
                                  }}
                                >
                                  {set.brandName},{" "}
                                  <span className="manufacturer">
                                    {set.composition}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </td>
                        <td className="small_box">
                          <input
                            name="unit"
                            type="text"
                            className="prescription_table_input"
                            placeholder="e.g 1 table spoon"
                            onChange={(e) => handleText(e, index)}
                            defaultValue={item.unit}
                          />
                        </td>
                        <td className="small_box">
                          <input
                            name="dosage"
                            type="text"
                            className="prescription_table_input"
                            placeholder="e.g 1-0-1"
                            onChange={(e) => handleText(e, index)}
                            defaultValue={item.dosage}
                          />
                        </td>
                        <td className="small_box">
                          <input
                            name="duration"
                            type="text"
                            className="prescription_table_input"
                            placeholder="e.g 2 days"
                            onChange={(e) => handleText(e, index)}
                            defaultValue={item.duration}
                          />
                        </td>
                        <td className="small_box">
                          <input
                            name="description"
                            type="text"
                            className="prescription_table_input"
                            placeholder=""
                            onChange={(e) => handleText(e, index)}
                            defaultValue={item.description}
                            onKeyDownCapture={handleKeyPress}
                          />
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
                      xmlns="http://www.w3.org/2000/svg"
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
              <div className="prescription_content" id="advice">
                <label htmlFor="advice">General advice</label>
                <div className="tags-input" onClick={setAdviceFocus}>
                  <ul id="tags">
                    {advicetags.map((tag, index) => (
                      <li key={index} className="tag">
                        <span
                          className="tag-title"
                          onClick={() => getAdviceTagData(index, tag)}
                        >
                          {tag}
                        </span>
                        <span
                          className="tag-close-icon"
                          onClick={() => removeAdviceTags(index)}
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
                        id="date"
                        name="advice"
                        cols="50"
                        rows="1"
                        className="advice_textarea"
                        onKeyUp={(event) =>
                          event.code == "Enter" ? addAdviceTags(event) : null
                        }
                        onKeyDown={(e) =>
                          e.code == "Backspace"
                            ? updateAdviceTagsHandler(e)
                            : null
                        }
                        onFocus={handleFocus}
                        ref={adviceref}
                      ></textarea>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="d-flex justify-content-end me-5">
                <button
                  className="delete_template_btn"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteTemplate();
                  }}
                >
                  Delete
                </button>
                <DeleteTemplateModal deletemodalIsOpen={deletemodalIsOpen} />
                <button
                  //   disabled={disable}
                  type="submit"
                  className="submit_btn"
                  name="submit"
                  value="false"
                  onClick={(e) => {
                    e.preventDefault();
                    submitbtn();
                  }}
                >
                  Save
                </button>
                <TemplateSaveModal modalIsOpen={modalIsOpen} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditTemplate;

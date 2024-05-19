import React, { useState } from "react";
import ConfirmationModal from "../components/ConfirmationModal.js/ConfirmationModal";
import WebGeneratorInput from "../components/WebGeneratorInput/WebGeneratorInput";
import QuestionAnswerBox from "../QuestionAnswerBox/QuestionAnswerBox";
import CreatableSelect from "react-select/creatable";
import useAppContext from "../../context/AppContext";
import "./WebProfile.css";
import { blobToBase64, getUniueArray } from "../../../util";
import { AddPersonalDetails } from "../../../api/WebGenerator";
import { uploadImage } from "../../../util/vars";
import { useEffect } from "react";
import Spinner from "../../Spinner";
import specialitiesData from "../../../assets/data/specialities.json";

const WebProfile = ({ setActiveStep }) => {
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [specialities, setSpecialitites] = useState([]);
  const [loading, setLoading] = useState(false);

  const { setSnackbar } = useAppContext();

  function onChangeInput(name, value) {
    // console.log(name, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const PersonalDetialsData = {
      name: formData.name,
      experience: Number(formData.experience),
      education: formData.education,
      specialities: specialities,
      bio: formData.bio,
      picture: formData.picture?.split(",")[1],
    };
    console.log("PersonalDetialsData", PersonalDetialsData);
    const responseData = await AddPersonalDetails(PersonalDetialsData);
    if (responseData.status === 200) {
      console.log(responseData);
      setmodalIsOpen(false);
      setActiveStep(1);
      setLoading(false);
    } else {
      setSnackbar({
        open: true,
        message: "Could not save personal details",
        severity: "error",
      });
      setLoading(false);
    }
  };

  const onSavandnextClick = (e) => {
    if (
      formData.name &&
      formData.experience &&
      formData.education &&
      formData.bio &&
      specialities.length
    ) {
      e.preventDefault();
      setmodalIsOpen(true);
    } else {
      console.log("fill the form");
    }
  };

  useEffect(() => {
    console.log("WebProfile formData", formData);
  }, [formData]);

  return (
    <>
      <div className="web_generator_container">
        <h1 className="web_profile_header">
          Fill in the information required below. It will just take few minutes.
        </h1>
        <div className="web_profile_image_uploader_box">
          <input
            type="file"
            id="actual-btn"
            onChange={async (e) =>
              onChangeInput("picture", await blobToBase64(e.target.files[0]))
            }
            hidden
          />
          <label htmlFor="actual-btn">
            <svg width="40" height="40" viewBox="0 0 44 44" fill="none">
              <rect width="44" height="44" fill="url(#pattern0)" />
              <defs>
                <pattern
                  id="pattern0"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_338_576"
                    transform="scale(0.0111111)"
                  />
                </pattern>
                <image
                  id="image0_338_576"
                  width="90"
                  height="90"
                  xlinkHref={formData.picture || uploadImage}
                />
              </defs>
            </svg>
          </label>
          {!formData.picture && <span id="file-chosen">No file Chosen</span>}
          <button className="web_profile_picture_upload_cta">
            {formData.picture ? "Change" : "Upload"} Picture
          </button>
        </div>
        <div className="w-100 mt-4">
          <form>
            <WebGeneratorInput
              title={"Full Name*"}
              subtitle={""}
              placeholderText={"Enter your Full Name"}
              required={true}
              onChange={(e) => onChangeInput("name", e.target.value)}
            />{" "}
            <WebGeneratorInput
              title={"Total Year of Experience"}
              subtitle={""}
              required={true}
              type={"number"}
              placeholderText={"Enter total year of Experience"}
              onChange={(e) => onChangeInput("experience", e.target.value)}
            />
            <WebGeneratorInput
              title={"Education"}
              subtitle={""}
              required={true}
              placeholderText={"Enter all about your education"}
              onChange={(e) => onChangeInput("education", e.target.value)}
            />
            <div className="mb-3">
              <label className="WebgeneratorInput_label" htmlFor="">
                Major Specialty*
              </label>
              <div className="webprofile_dropdown_1">
                <CreatableSelect
                  isClearable
                  isMulti
                  options={(specialitiesData || []).map((item) => ({
                    label: item,
                    value: item,
                  }))}
                  onChange={(event) => {
                    console.log(event);
                    setSpecialitites(event.map((item) => item.value));
                  }}
                  placeholder="Type to Major Specialities"
                  value={
                    specialities.length > 0
                      ? specialities.map((item) => ({
                          label: item,
                          value: item,
                        }))
                      : []
                  }
                />
              </div>{" "}
            </div>
            <div>
              <div className="WebgeneratorInput_label">Add Bio</div>
              <textarea
                required
                className="Webgenerator_bio_input"
                placeholder="Add your Bio here..."
                onChange={(e) => onChangeInput("bio", e.target.value)}
              ></textarea>
            </div>
            <div className="save_next_cta">
              <button
                type="submit"
                onClick={(e) => {
                  onSavandnextClick(e);
                }}
              >
                Save & Next
              </button>
              <ConfirmationModal
                title={"Do you want to add detailed personal information?"}
                setmodalIsOpen={setmodalIsOpen}
                modalIsOpen={modalIsOpen}
                onAccept={onSubmit}
                loading={loading}
                onReject={() => setmodalIsOpen(false)}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default WebProfile;

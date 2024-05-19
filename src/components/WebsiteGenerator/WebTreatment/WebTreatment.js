import React, { useState } from "react";
import WebGeneratorInput from "../components/WebGeneratorInput/WebGeneratorInput";
import TreatmentCard from "./TreatmentCard/TreatmentCard";
import "./WebTreatment.css";
import { AddTreatmentDetails } from "../../../api/WebGenerator";
import useAppContext from "../../context/AppContext";
import { blobToBase64 } from "../../../util";
import { uploadImage } from "../../../util/vars";
import Spinner from "../../Spinner";

export const initialState = {
  formData: {},
};

const WebTreatment = ({ setActiveStep }) => {
  const [TreatmentsData, setTreatmentsData] = useState([]);
  const [formData, setFormData] = useState(initialState.formData);
  const [loading, setLoading] = useState(false);
  const { setSnackbar } = useAppContext();
  const ref = React.useRef();

  const onAddBtnClickTreatment = (e) => {
    if (formData.name && formData.description) {
      ref.current.reset();
      e.preventDefault();
      TreatmentsData.push(formData);
      setTreatmentsData([...TreatmentsData]);
    }
  };
  function onChangeInput(name, value) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    TreatmentsData.push(formData);
    const responseData = await AddTreatmentDetails({
      treatments: TreatmentsData.map((treatment) => ({
        ...treatment,
        picture: treatment.picture?.split(",")[1],
      })),
    });
    if (responseData.status === 200) {
      // console.log(responseData);
      setLoading(false);
      setActiveStep(2);
    } else {
      setSnackbar({
        open: true,
        message: "Could not save treatment details",
        severity: "error",
      });
      setLoading(false);
    }
  };
  return (
    <>
      {/* Preview Section */}
      <div className="treatment_section">
        {TreatmentsData.length > 0 && <p>Preview</p>}
        <div className="d-flex">
          {TreatmentsData.length
            ? TreatmentsData.map((data, id) => (
                <TreatmentCard key={id} data={data} />
              ))
            : null}
        </div>
      </div>

      {/* Treatment Form */}
      {TreatmentsData.length === 5 ? (
        <div className="treatments_end_page">
          <p>You can add 5 treatments in maximum.</p>
          <button
            onClick={(e) => onSubmit(e)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <span>Save & Next</span>
            {loading && <Spinner />}
          </button>
        </div>
      ) : (
        <div className="web_generator_container">
          <h1 className="web_profile_header">
            Fill in the information required below. It will just take few
            minutes. <br />
            You can add 5 treatments in maximum.
          </h1>
          <div className="w-100 mt-4">
            <form ref={ref}>
              <WebGeneratorInput
                title={"Treatment"}
                subtitle={""}
                type={"text"}
                placeholderText={"Enter the treatment you provide"}
                onChange={(e) => onChangeInput("name", e.target.value)}
              />
              <WebGeneratorInput
                title={"Bio"}
                type={"text"}
                subtitle={"250 Characters Max"}
                placeholderText={
                  "Enter information about the service provided, eg. Symptoms"
                }
                max={"250"}
                onChange={(e) => onChangeInput("description", e.target.value)}
              />
              <div className="WebTreatment_image_uploader_box">
                <span className="WebgeneratorInput_label">Upload Picture</span>
                <input
                  type="file"
                  id="actual-btn"
                  hidden
                  onChange={async (e) =>
                    onChangeInput(
                      "picture",
                      await blobToBase64(e.target.files[0])
                    )
                  }
                />
                <label htmlFor="actual-btn">
                  <svg width="35" height="35" viewBox="0 0 44 44" fill="none">
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
                {!formData.picture && (
                  <span id="file-chosen">No file Chosen</span>
                )}
              </div>
              <div className="WebTreatment_buttons">
                <button onClick={onAddBtnClickTreatment}>
                  Save & Add More
                </button>
                <button onClick={onSubmit}>Save & Next</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default WebTreatment;

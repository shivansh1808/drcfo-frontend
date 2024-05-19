import React from "react";
import { useState } from "react";
import WebFaqQuestionBox from "./WebFaqQuestionBox/WebFaqQuestionBox";
import { AddFAQDetails } from "../../../api/WebGenerator";
import useAppContext from "../../context/AppContext";
import Spinner from "../../Spinner";
const WebFAQ = ({ setActiveStep }) => {
  const [QuesCount, setQuesCount] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [FaqData, setFaqData] = useState([{}]);
  const { setSnackbar } = useAppContext();

  const onAddBtnClick = () => {
    setQuesCount(QuesCount + 1);
    FaqData.push(formData);
    setFaqData([...FaqData]);
  };
  const onSubmit = async () => {
    setLoading(true);
    FaqData.splice(0, 1);
    console.log(FaqData);
    const responseData = await AddFAQDetails({
      qna: FaqData,
    });
    if (responseData.status === 200) {
      console.log(responseData);
      setActiveStep(5);
    } else {
      setSnackbar({
        open: true,
        message: "Could not save treatment details",
        severity: "error",
      });
    }
    setLoading(false);
  };
  const onNextClick = () => {
    FaqData.push(formData);
    setFaqData([...FaqData]);
    onSubmit();
  };
  return (
    <div>
      <h1 className="QuestionAnswerBox_header">
        Fill in the information required below. It will just take few minutes.
      </h1>
      <div className="web_generator_container">
        {FaqData.length
          ? FaqData.map((data, id) => (
              <WebFaqQuestionBox
                key={id}
                QuesCount={QuesCount}
                setFormData={setFormData}
              />
            ))
          : null}

        <button
          className="addQueston_box_cta"
          onClick={() => {
            onAddBtnClick();
          }}
        >
          Add More
        </button>
      </div>
      <div className="save_next_cta">
        <button
          onClick={() => onNextClick()}
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
    </div>
  );
};

export default WebFAQ;

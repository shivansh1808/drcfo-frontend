import React, { useState } from "react";
import "./QuestionAnswerBox.css";
import QuestionCard from "./QuestionCard";
const QuestionAnswerBox = ({ setActiveStep }) => {
  const [QuesCount, setQuesCount] = useState(0);
  const [qnaform, setQnaForm] = useState({});
  const [inputQues, setInputQues] = useState([
    <QuestionCard QuesCount={QuesCount} />,
  ]);
  const onAddBtnClickQues = () => {
    setQuesCount(QuesCount + 1);
    setInputQues(
      inputQues.concat(
        <QuestionCard key={QuesCount.length} QuesCount={QuesCount} />
      )
    );
  };

  return (
    <div>
      <hr className="mt-5" />
      <h1 className="QuestionAnswerBox_header">
        Type some of the questions that are frequently asked from you!
      </h1>
      <div className="web_generator_container">
        {inputQues}{" "}
        <button
          className="addQueston_box_cta"
          onClick={() => {
            onAddBtnClickQues();
          }}
        >
          Add More
        </button>
      </div>
      <div className="save_next_cta">
        <button onClick={() => setActiveStep(1)}>Save & Next</button>
      </div>
    </div>
  );
};

export default QuestionAnswerBox;

import React from "react";
import WebGeneratorInput from "../../components/WebGeneratorInput/WebGeneratorInput";

const TestimonialQuestionBox = ({ QuesCount, setFormData }) => {
  function onChangeInput(name, value) {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <div className="w-100">
      <WebGeneratorInput
        title={`Name of the person`}
        subtitle={""}
        placeholderText={"Enter the name of the person"}
        onChange={(e) => onChangeInput("name", e.target.value)}
      />
      <WebGeneratorInput
        title={`Testimonial`}
        subtitle={""}
        placeholderText={"Enter the testimonial of the person"}
        onChange={(e) => onChangeInput("content", e.target.value)}
      />
    </div>
  );
};

export default TestimonialQuestionBox;

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  UpdateArticleDetails,
  getArticleDetails,
} from "../../../../api/WebGenerator";
import useAppContext from "../../../context/AppContext";
const EditArticle = ({ setPageName }) => {
  const [image, setImage] = useState({});
  const id = localStorage.getItem("article_id");
  const [inputValues, setInputValues] = useState({
    title: "",
    content: "",
    summary: "",
    author: "",
  });

  const { setSnackbar } = useAppContext();
  const getInputValues = (e) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const fileType = ["image/png", "image/jpeg"];
  const handleFileData = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        setImage(selectedFile);
      } else {
        alert("Please select a valid file");
      }
    } else {
      alert("select your file");
    }
  };

  const getArticleDetailsData = async (id) => {
    const responseData = await getArticleDetails(id);
    if (responseData) {
      setInputValues(responseData.data.data);
    } else {
      setSnackbar({
        open: true,
        message: "Could not save article details",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    getArticleDetailsData(id);
  }, [id]);

  const OnClickSave = async () => {
    const data = {
      title: inputValues.title,
      content: inputValues.content,
      summary: inputValues.summary,
      author: inputValues.author,
    };
    const responseData = await UpdateArticleDetails(id, data);
    if (responseData.status === 200) {
      console.log(responseData);
      setPageName("articleTabs");
    } else {
      setSnackbar({
        open: true,
        message: "Could not save article details",
        severity: "error",
      });
    }
  };

  return (
    <div className="ArticlesForm mx-4">
      <h1>Managing your website</h1>
      <h3>Edit Your Article</h3>
      <div className="ArticlesForm_box">
        <input
          type="text"
          placeholder="Enter Title"
          className="article_form_input1"
          onChange={getInputValues}
          name="title"
          defaultValue={inputValues?.title}
        />
        <input
          type="text"
          placeholder="Enter Summary"
          className="article_form_input"
          onChange={getInputValues}
          name="summary"
          defaultValue={inputValues?.summary}
        />
        <textarea
          placeholder="Start Writing the body text from here..."
          className="article_form_textarea"
          onChange={getInputValues}
          defaultValue={inputValues?.content}
          name="content"
        ></textarea>
        <input
          type="text"
          placeholder="Enter Published by"
          className="article_form_input"
          onChange={getInputValues}
          defaultValue={inputValues?.author}
          name="author"
        />
        <div className="articles_buttons_group">
          <div className="position-relative">
            <input
              type="file"
              onChange={handleFileData}
              id="actual-btn"
              hidden
            />
            <button className="article_image_upload_button">
              <label htmlFor="actual-btn">Upload Image</label>
            </button>
            <p className="image_name_text">
              {image.name ? `${image.name}` : "No file chosen"}
            </p>
          </div>
          <button onClick={OnClickSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditArticle;

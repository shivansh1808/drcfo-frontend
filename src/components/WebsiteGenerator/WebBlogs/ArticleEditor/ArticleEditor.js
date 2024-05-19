import React from "react";
import { useState } from "react";
import ConfirmationModal from "../../components/ConfirmationModal.js/ConfirmationModal";
import "./ArticleEditor.css";
import {
  AddArticleDetails,
  UpdateArticleState,
} from "../../../../api/WebGenerator";
import useAppContext from "../../../context/AppContext";
import { blobToBase64, getBase64String } from "../../../../util";
const ArticleEditor = ({ setActiveStep, setPageName, setBlogs, blogs }) => {
  const [image, setImage] = useState({});
  const [modalIsOpen, setmodalIsOpen] = useState(false);

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

  const OnClickPublish = async () => {
    blogs.push(inputValues);
    setBlogs([...blogs]);

    const postData = {
      ...inputValues,
      picture: await getBase64String(image),
    };
    console.log("OnClickPublish", postData);
    const responseData = await AddArticleDetails(postData);
    if (responseData.status === 200) {
      setmodalIsOpen(true);
      toggleArticleState(responseData.data.data._id);
    } else {
      setSnackbar({
        open: true,
        message: "Could not save article details",
        severity: "error",
      });
    }
  };
  const toggleArticleState = async (id) => {
    const responseData = await UpdateArticleState(id);
    if (responseData.status === 200) {
      console.log(responseData);
    } else {
      setSnackbar({
        open: true,
        message: "Could not update article state",
        severity: "error",
      });
    }
  };
  const OnClickSaveAndNext = async () => {
    blogs.push(inputValues);
    setBlogs([...blogs]);

    const postData = {
      ...inputValues,
      picture: await getBase64String(image),
    };

    const responseData = await AddArticleDetails(postData);
    if (responseData.status === 200) {
      console.log(responseData);
      setmodalIsOpen(true);
    } else {
      setSnackbar({
        open: true,
        message: "Could not save article details",
        severity: "error",
      });
    }
  };
  return (
    <div className="ArticlesForm">
      <h1>Managing your website</h1>
      <h2>Blogs</h2>
      <h3>Write a blog or an article.</h3>
      <div className="ArticlesForm_box">
        <input
          type="text"
          placeholder="Enter Title"
          className="article_form_input1"
          onChange={getInputValues}
          name="title"
        />
        <input
          type="text"
          placeholder="Enter Summary"
          className="article_form_input"
          onChange={getInputValues}
          name="summary"
        />
        <textarea
          placeholder="Start Writing the body text from here..."
          className="article_form_textarea"
          onChange={getInputValues}
          name="content"
        ></textarea>
        <input
          type="text"
          placeholder="Enter Published by"
          className="article_form_input"
          onChange={getInputValues}
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
          <button onClick={OnClickSaveAndNext}>Save & Next</button>
          <button onClick={OnClickPublish}>Publish</button>
          <ConfirmationModal
            title={"Do you want to add more Blogs?"}
            setmodalIsOpen={setmodalIsOpen}
            modalIsOpen={modalIsOpen}
            onAccept={() => setPageName("articleTabs")}
            onReject={() => setActiveStep(6)}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleEditor;

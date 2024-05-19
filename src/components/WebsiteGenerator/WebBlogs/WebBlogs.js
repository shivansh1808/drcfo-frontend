import React from "react";
import { useState } from "react";
import AddArticlePage from "./AddArticlePage/AddArticlePage";
import ArticleEditor from "./ArticleEditor/ArticleEditor";
import ArticleTabs from "./ArticleTabs/ArticleTabs";
import EditArticle from "./EditArticle/EditArticle";
import "./WebBlogs.css";
const WebBlogs = ({ setActiveStep }) => {
  // PageName states
  // addArticle - AddArticlePage
  // articleEditor - ArticleEditor
  // editArticle - EditArticle
  // articleTabs - ArticleTabs
  const [blogs, setBlogs] = useState([]);
  const [pageName, setPageName] = useState("addArticle");
  return (
    <>
      {pageName === "addArticle" ? (
        <AddArticlePage
          setPageName={setPageName}
          setActiveStep={setActiveStep}
        />
      ) : pageName === "articleEditor" ? (
        <ArticleEditor
          setPageName={setPageName}
          setBlogs={setBlogs}
          blogs={blogs}
          setActiveStep={setActiveStep}
        />
      ) : pageName === "articleTabs" ? (
        <ArticleTabs setPageName={setPageName} setActiveStep={setActiveStep} />
      ) : pageName === "editArticle" ? (
        <EditArticle setPageName={setPageName} />
      ) : null}
    </>
  );
};

export default WebBlogs;

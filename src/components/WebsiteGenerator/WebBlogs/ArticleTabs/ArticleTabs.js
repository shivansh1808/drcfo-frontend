import React, { useEffect, useState } from "react";
import { getArticle } from "../../../../api/WebGenerator";
import useAppContext from "../../../context/AppContext";
import PublishedArticles from "../PublishedArticles/PublishedArticles";
import SavedArticles from "../SavedArticles/SavedArticles";
import "./ArticleTabs.css";

const ArticleTabs = ({ setActiveStep, setPageName }) => {
  const [toggleState, setToggleState] = useState(1);
  const { setSnackbar } = useAppContext();
  const [PublishedArticlesData, setPublishedArticlesData] = useState([]);
  const [SavedArticlesData, setSavedArticlesData] = useState([]);

  async function onComponentLoad() {
    const responseData = await getArticle();
    if (responseData) {
      let filteredPublishedArticle = responseData.blogs.filter(
        (blog) => blog.published === true
      );
      setPublishedArticlesData(filteredPublishedArticle);

      let filteredSavedArticle = responseData.blogs.filter(
        (blog) => blog.published === false
      );
      setSavedArticlesData(filteredSavedArticle);
    } else {
      setSnackbar({
        open: true,
        message: "Could not save article details",
        severity: "error",
      });
    }
  }
  useEffect(() => {
    onComponentLoad();
  }, []);

  return (
    <div>
      <div className="articles_tab_container">
        <div className="articles_tab_header">
          <button
            className={
              toggleState === 1 ? "articles_tabs active-tabs" : "articles_tabs"
            }
            onClick={() => setToggleState(1)}
          >
            Published Articles
          </button>
          <button
            className={
              toggleState === 2 ? "articles_tabs active-tabs" : "articles_tabs"
            }
            onClick={() => setToggleState(2)}
          >
            Saved Articles
          </button>
        </div>
        <div className="article_body_wrapper">
          <div
            className={
              toggleState === 1
                ? "article_content_tab  active-article_content"
                : "article_content_tab"
            }
          >
            <div className="tab_wrap">
              <PublishedArticles
                setPageName={setPageName}
                PublishedArticlesData={PublishedArticlesData}
              />
            </div>
          </div>

          <div
            className={
              toggleState === 2
                ? "article_content_tab  active-article_content"
                : "article_content_tab"
            }
          >
            <div className="tab_wrap">
              <SavedArticles
                setPageName={setPageName}
                SavedArticlesData={SavedArticlesData}
              />
            </div>
          </div>
        </div>
        <div className="article_tab_button">
          <button onClick={() => setActiveStep(6)}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default ArticleTabs;

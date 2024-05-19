import React from "react";
import ArticleCard from "../ArticleCard/ArticleCard";
import "./PublishedArticles.css";
import image from "../../../../assets/images/skeleton_bg.png";
import { Skeleton } from "@mui/material";
const PublishedArticles = ({ setPageName, PublishedArticlesData }) => {
  return (
    <div>
      <div className="PublishedArticles_container">
        <div className="ArticleCard_skeleton">
          <span onClick={() => setPageName("articleEditor")}>+</span>
          <img
            src={image}
            alt="skeleton_bg"
            onClick={() => setPageName("articleEditor")}
          />
          <p className="new_article_text">New Article</p>
        </div>
        {PublishedArticlesData?.length ? (
          PublishedArticlesData.map((item, index) => (
            <ArticleCard item={item} key={index} setPageName={setPageName} />
          ))
        ) : (
          <>
            <div className="ArticleCard_skeleton">
              <Skeleton variant="rectangular" width={280} height={170} />
            </div>
            <div className="ArticleCard_skeleton">
              <Skeleton variant="rectangular" width={280} height={170} />
            </div>
          </>
        )}
      </div>{" "}
    </div>
  );
};

export default PublishedArticles;

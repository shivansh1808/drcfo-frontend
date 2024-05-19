import React from "react";
import { Skeleton } from "@mui/material";
import ArticleCard from "../ArticleCard/ArticleCard";

const SavedArticles = ({ SavedArticlesData, setPageName }) => {
  return (
    <div className="PublishedArticles_container">
      {SavedArticlesData?.length ? (
        SavedArticlesData.map((item, index) => (
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
          <div className="ArticleCard_skeleton">
            <Skeleton variant="rectangular" width={280} height={170} />
          </div>
        </>
      )}
    </div>
  );
};

export default SavedArticles;

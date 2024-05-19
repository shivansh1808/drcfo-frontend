import React from "react";
import "./ArticleCard.css";
import image from "../../../../assets/images/demo.png";
const ArticleCard = ({ item, setPageName }) => {
  // console.log("ArticleCard", item);
  const onEditClick = (id) => {
    localStorage.setItem("article_id", id);
    setPageName("editArticle");
  };
  return (
    <div className="ArticleCard">
      <div onClick={() => onEditClick(item._id)}>
        {/* {item.images.length ? (
          <img
            src={`https://ge3s-backend.onrender.com/image/display?name=${item?.images[0]?.name}`}
            alt="demo_image"
          />
        ) : (
          <img src="" alt="demo_image" />
        )} */}
        <img src={item?.picture?.fileUrl || image} alt="demo_image" />
        <p>
          {item.title.substring(0, 50)}
          {item.title.length > 50 ? "..." : null}
        </p>
      </div>
    </div>
  );
};

export default ArticleCard;

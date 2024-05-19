import React from "react";
import "./WebGenShareBox.css";
const WebGenShareBox = () => {
  return (
    <div className="WebGenShareBox">
      <p>Domain </p>
      <div className="WebGenShareBox_input">
        <input type="text" defaultValue={"www.drcfo/ashisharma.com"} />{" "}
        <button className="web_gen_link_share_cta">Share</button>
      </div>
      <h6>
        Upgrade to premium to get your personal domain name and many more
        benefits.
      </h6>
      <button className="web_gen_upgrade">Upgrade Now</button>
    </div>
  );
};

export default WebGenShareBox;

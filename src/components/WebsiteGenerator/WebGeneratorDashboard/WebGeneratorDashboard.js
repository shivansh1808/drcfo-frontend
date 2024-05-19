import React from "react";
import WebGenChart from "./WebGenChart/WebGenChart";
import "./WebGeneratorDashboard.css";
import WebGenManager from "./WebGenManager/WebGenManager";
import WebGenShareBox from "./WebGenShareBox/WebGenShareBox";
import WebGenStats from "./WebGenStats/WebGenStats";
const WebGeneratorDashboard = () => {
  return (
    <div className="WebGeneratorDashboard">
      <WebGenStats />
      <div className="web_gen_dashboard_other">
        <div>
          <WebGenChart />
          <WebGenShareBox />
        </div>
        <WebGenManager />
      </div>
    </div>
  );
};

export default WebGeneratorDashboard;

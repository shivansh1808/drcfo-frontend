import React from "react";
import { Doughnut } from "react-chartjs-2";
import "./WebGenChart.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
const WebGenChart = () => {
  const chartData = [40, 20.25, 6.75, 11];
  return (
    <div className="WebGenChart">
      <p>Patient Visit by Service Selected</p>
      <div className="plag_board">
        <div className="plag_chart">
          <Doughnut
            data={{
              datasets: [
                {
                  label: "",
                  data: chartData,
                  backgroundColor: ["#6B9DFE", "#FFBC6E", "#8CDD7E", "#B494FF"],
                },
              ],
            }}
          />
        </div>
        <div className="plag_content">
          <p>
            <svg width="20" height="20" viewBox="0 0 30 30" fill="none">
              <circle
                cx="15"
                cy="15"
                r="15"
                fill="#FF2222"
                fill-opacity="0.7"
              />
            </svg>
            Identical <span>40.0%</span>
          </p>

          <p>
            <svg width="20" height="20" viewBox="0 0 30 30" fill="none">
              <circle
                cx="15"
                cy="15"
                r="15"
                fill="#FF2222"
                fill-opacity="0.7"
              />
            </svg>
            Minor Chages <span>40.0%</span>
          </p>
          <p>
            {" "}
            <svg width="20" height="20" viewBox="0 0 30 30" fill="none">
              <circle
                cx="15"
                cy="15"
                r="15"
                fill="#FF2222"
                fill-opacity="0.7"
              />
            </svg>
            Paraphrased <span>40.0%</span>
          </p>
          <p>
            <svg width="20" height="20" viewBox="0 0 30 30" fill="none">
              <circle
                cx="15"
                cy="15"
                r="15"
                fill="#FF2222"
                fill-opacity="0.7"
              />
            </svg>
            Omitted Words <span>40.0%</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WebGenChart;

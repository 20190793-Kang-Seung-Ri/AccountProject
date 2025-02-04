import React from "react";
import ChartBox from "./ChartBox"; // 차트 표시를 위해 추가

const StatBox = ({ title, value, description, chartData, chartType }) => {
  return (
    <div className="stat-box">
      <h3>{title}</h3>
      {value && <div className="value">{value}</div>}
      {description && <div className="description">{description}</div>}
      {chartData && chartType && <ChartBox type={chartType} data={chartData} />}
    </div>
  );
};

export default StatBox;

import React from "react";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <a href="#dashboard">📊 대시보드</a>
      <a href="#income-expense">💰 수입/지출 관리</a>
      <a href="#budget">📋 예산 설정</a>
      <a href="#assets">🏦 총 자산 관리</a>
      <a href="#stats">📈 통계 확인</a>
      <a href="#visualization">📊 데이터 시각화</a>
      <a href="#settings">⚙️ 설정</a>
    </nav>
  );
};

export default Sidebar;
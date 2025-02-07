import React, { useState, useEffect } from "react";

// 외부 IP 주소 (예시)
const API_URL = "http://34.47.93.101:8080/data.json";

const Header = () => {
  const [user, setUser] = useState({ email: "", budget: 0 });

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch((error) => console.error("데이터 불러오기 실패:", error));
  }, []);

  return (
    <header className="header">
      <img src="LOGO.png" alt="로고" />
      <div className="email">{user.email}</div>
      <div className="MonthlyBudget">
        월 예산: {user.budget.toLocaleString()}원
      </div>
    </header>
  );
};

export default Header;

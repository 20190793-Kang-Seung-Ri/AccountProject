import React, { useState, useEffect } from "react";

const Header = () => {
  const [user, setUser] = useState({ email: "", budget: 0 });

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  return (
    <header className="header">
      <img src="LOGO.png" alt="로고" />
      <div className="email">{user.email}</div>
      <div className="MonthlyBudget">월 예산: {user.budget.toLocaleString()}원</div>
    </header>
  );
};

export default Header;

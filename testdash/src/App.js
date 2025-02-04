import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Calendar from "./components/Calendar";
import StatBox from "./components/StatBox";
import "./index.css";
import Sidebar from "./components/Sidebar"; // ✅ Sidebar 추가

const App = () => {
  const [user, setUser] = useState({ email: "", budget: 0 });
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user || { email: "", budget: 0 });
        setExpenses(data.expenses || []);
      })
      .catch((error) => console.error("❌ 데이터 불러오기 실패:", error));
  }, []);

  // ✅ 1. 최대 지출 카테고리 계산
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const maxCategory = Object.entries(categoryTotals).reduce(
    (max, [category, amount]) => (amount > max.amount ? { category, amount } : max),
    { category: "", amount: 0 }
  ).category;

  const maxExpenseData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)", "rgba(75, 192, 192, 0.6)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // ✅ 2. 예산 소진율 계산
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const budgetUsageData = {
    labels: ["소진", "남은 예산"],
    datasets: [
      {
        data: [totalSpent, user.budget - totalSpent],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 159, 64, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // ✅ 3. 오늘 하루 지출 계산 (1월 31일 기준)
  const todayDate = "2025-01-31"; 
  const dailyExpenses = expenses.filter(expense => expense.date === todayDate);
  const dailySpent = dailyExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  // ✅ 4. 하루 지출 차트 데이터
  const dailyCategoryTotals = dailyExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const dailyExpenseData = {
    labels: Object.keys(dailyCategoryTotals),
    datasets: [
      {
        data: Object.values(dailyCategoryTotals),
        backgroundColor: ["rgba(153, 102, 255, 0.6)", "rgba(255, 159, 64, 0.6)", "rgba(75, 192, 192, 0.6)"],
        borderColor: ["rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)", "rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // ✅ 최근 4주간 주간 지출 추이 계산 (오늘 날짜 기준)
const getWeekStartDate = (weeksAgo) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay() - (weeksAgo * 7)); // 각 주의 일요일
  return weekStart;
};

// ✅ 오늘 날짜 기준으로 각 주의 총 지출 계산
const weeklyTotals = [3, 2, 1, 0].map(weeksAgo => {
  const weekStart = getWeekStartDate(weeksAgo);
  const weekEnd = getWeekStartDate(weeksAgo - 1);

  return expenses
    .filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= weekStart && expenseDate < weekEnd;
    })
    .reduce((sum, expense) => sum + expense.amount, 0);
});

// ✅ 주간 지출 차트 데이터
const weeklyExpenseData = {
  labels: ["4주 전", "3주 전", "2주 전", "이번 주"],
  datasets: [
    {
      data: weeklyTotals,
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};


  return (
    <div className="app">
      <Header />
      <div className="main-layout">
        <Sidebar />  {/* ✅ Sidebar 추가 */}
      <div className="content">
        <Calendar />
        <div className="stats-container">
          <StatBox title="최대 지출 카테고리" value={maxCategory || "없음"} chartData={maxExpenseData} chartType="pie" />
          <StatBox title="예산 소진율" value={`${((totalSpent / user.budget) * 100).toFixed(1)}%`} chartData={budgetUsageData} chartType="doughnut" />
          <StatBox title="오늘 하루 지출" value={`${dailySpent.toLocaleString()}원`} chartData={dailyExpenseData} chartType="bar" />
          <StatBox title="주간 지출 추이" chartData={weeklyExpenseData} chartType="line" />
        </div>
      </div>
    </div>
  </div>
  );
};

export default App;

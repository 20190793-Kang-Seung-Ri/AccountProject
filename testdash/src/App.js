import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Calendar from "./components/Calendar";
import StatBox from "./components/StatBox";
import Sidebar from "./components/Sidebar";
import "./index.css";

// 외부 API 주소
const API_URL = "http://34.47.93.101:8080/data.json";

// 카테고리 변환 객체 (영어 → 한국어)
const categoryMap = {
  "Meal": "식사",
  "Transport": "교통",
  "Shopping": "쇼핑",
  "Dining Out": "외식", // 공백이 있어도 문자열 키 사용
  "Leisure": "레저",
  "Rent": "월세",
  "Utilities": "공과금",
  "Internet": "인터넷",
};


const App = () => {
  const [user, setUser] = useState({ email: "", budget: 0 });
  const [expenses, setExpenses] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("🚀 API 요청 시작:", API_URL);
        const response = await fetch(API_URL, {
          mode: "cors",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
        }

        const data = await response.json();
        console.log("✅ API 응답 데이터:", data);

        // 카테고리 한국어 변환 후 저장
        const formattedExpenses = data.expenses.map((expense) => ({
          ...expense,
          category: categoryMap[expense.category] || expense.category, // 변환이 없으면 원래 값 유지
        }));

        setUser(data?.user || { email: "", budget: 0 });
        setExpenses(formattedExpenses);
      } catch (error) {
        console.error("❌ 데이터 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">데이터 불러오는 중...</div>;
  }

  // 🔹 최대 지출 카테고리 계산
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const maxCategory = Object.entries(categoryTotals).reduce(
    (max, [category, amount]) =>
      amount > max.amount ? { category, amount } : max,
    { category: "", amount: 0 }
  ).category;

  const maxExpenseData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: ["#36A2EB", "#FF6384", "#4BC0C0"],
        borderColor: ["#36A2EB", "#FF6384", "#4BC0C0"],
        borderWidth: 1,
      },
    ],
  };

  // 🔹 예산 소진율 계산
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const budgetUsageData = {
    labels: ["소진", "남은 예산"],
    datasets: [
      {
        data: [totalSpent, Math.max(user.budget - totalSpent, 0)],
        backgroundColor: ["#4BC0C0", "#FF9F40"],
        borderColor: ["#4BC0C0", "#FF9F40"],
        borderWidth: 1,
      },
    ],
  };

  // 🔹 선택된 날짜의 하루 지출 계산
  const dailyExpenses = expenses.filter((expense) => expense.date === selectedDate);
  const dailySpent = dailyExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const dailyCategoryTotals = dailyExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const dailyExpenseData = {
    labels: Object.keys(dailyCategoryTotals),
    datasets: [
      {
        data: Object.values(dailyCategoryTotals),
        backgroundColor: ["#9966FF", "#FF9F40", "#4BC0C0"],
        borderColor: ["#9966FF", "#FF9F40", "#4BC0C0"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="app">
      <Header />
      <div className="main-layout">
        <Sidebar />
        <div className="content">
          <Calendar onSelectDate={setSelectedDate} />
          <div className="stats-container">
            <StatBox
              title="최대 지출 카테고리"
              value={maxCategory || "없음"}
              chartData={maxExpenseData}
              chartType="pie"
            />
            <StatBox
              title="예산 소진율"
              value={`${
                user.budget ? ((totalSpent / user.budget) * 100).toFixed(1) : 0
              }%`}
              chartData={budgetUsageData}
              chartType="doughnut"
            />
            <StatBox
              title={`오늘 날짜(${selectedDate}) 하루 지출`}
              value={`${dailySpent.toLocaleString()}원`}
              chartData={dailyExpenseData}
              chartType="bar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

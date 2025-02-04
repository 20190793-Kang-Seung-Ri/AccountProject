import React, { useState, useEffect } from "react";

const Calendar = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setExpenses(data.expenses));
  }, []);

  return (
    <section id="spending-calendar" className="section">
      <div className="calendar-header">
        <button onClick={() => alert("이전 달")}>&lt;</button>
        <h1>1월 2025</h1>
        <button onClick={() => alert("다음 달")}>&gt;</button>
      </div>
      <div className="calendar">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div key={day} className="day day-header">{day}</div>
        ))}
        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
          const dailyExpenses = expenses.filter(expense => new Date(expense.date).getDate() === day);
          return (
            <div key={day} className="day">
              {day}
              {dailyExpenses.map((expense, index) => (
                <div key={index} className="spending">
                  {expense.category}: -{expense.amount.toLocaleString()}원
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Calendar;

import React, { useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";

// 외부 IP 주소
const API_URL = "http://34.47.93.101:8080/data.json";

// 카테고리 변환 객체 (영어 → 한국어)
const categoryMap = {
  "Meal": "식사",
  "Transport": "교통",
  "Shopping": "쇼핑",
  "Dining Out": "외식",
  "Leisure": "레저",
  "Rent": "월세",
  "Utilities": "공과금",
  "Internet": "인터넷",
};

const Calendar = ({ onSelectDate }) => {
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const formattedEvents = data.expenses.map((expense) => ({
          title: `${categoryMap[expense.category] || expense.category}: -${expense.amount.toLocaleString()}원`,
          date: expense.date,
          color: "#ff6347",
        }));
        setEvents(formattedEvents);
      })
      .catch((error) => console.error("❌ 데이터 불러오기 실패:", error));
  }, []);

  return (
    <section id="spending-calendar" className="section">
      <div className="calendar-container">
        <div className="calendar custom-calendar">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            initialDate={new Date()} // 오늘 날짜 사용
            events={events} // 변환된 한국어 카테고리 사용
            locale={koLocale}
            eventColor="#007bff"
            eventTextColor="#fff"
            className="custom-calendar"
            aspectRatio={2}
            // 날짜 범위 변경 시 선택된 날짜 상위 컴포넌트로 전달
            datesSet={() => {
              const today = new Date();
              const formattedDate = today.toISOString().split("T")[0]; // "YYYY-MM-DD" 형식
              if (onSelectDate) {
                onSelectDate(formattedDate);
              }
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Calendar;

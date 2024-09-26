import { useState } from 'react';
import './App.css';
import left_arrow from './asserts/left-arrow-circle.svg'
import right_arrow from './asserts/right-arrow-circle.svg'

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysInMonth = () => {
    const daysArray = [];
    const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const lastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

    for (let i = 0; i < firstDay.getDay(); i++) {
      daysArray.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      daysArray.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i));
    }

    return daysArray;
  };

  const handleChangeMonth = (e) => {
    const newMonth = parseInt(e.target.value, 10);
    setSelectedDate(new Date(selectedDate.getFullYear(), newMonth, 1));
  };

  const handleChangeYear = (e) => {
    const newYear = parseInt(e.target.value, 10);
    setSelectedDate(new Date(newYear, selectedDate.getMonth(), 1));
    
  };

  const isToday = (date1, date2) => {
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();
     
  };

  function isSunday(date) {
    const weekDay = date.getDay()
    return  weekDay === 0 ; 
  }

  return (
    <div className="calendar">
      <h1 className='heading'>Monthly Calendar</h1>
      <div className='header'>
        <button onClick={() => { setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1)) }}><img src={left_arrow} alt='' /></button>
        <select size={1} value={selectedDate.getMonth()} onChange={handleChangeMonth}>
          {months.map((month, index) => (
            <option key={index} value={index}>{month}</option>
          ))}
        </select>
        <select value={selectedDate.getFullYear()} onChange={handleChangeYear}>
          {Array.from({ length: 10 }, (_, i) => selectedDate.getFullYear() - 5 + i).map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <button onClick={() => { setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1)) }}><img src={right_arrow} alt='' /></button>
      </div>
      <div className='daysOfWeek'>
        {daysOfWeek.map((day) => (
          <div className={(day === "SUN")? "sunday":"" } key={day}>{day}</div>
        ))}
      </div>
      <div className='days'>
        {daysInMonth().map((day, index) => (
          // <div className={day ? (isSameDay(day, new Date())) ? "day current" : "day" : "empty"} key={index}>{day ? day.getDate() : ""}</div>
          <div className={day ? (isToday(day, new Date())) ? "day current" : (isSunday(day))? "day sunday":"day" : "empty"} key={index}>{day ? day.getDate() : ""}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
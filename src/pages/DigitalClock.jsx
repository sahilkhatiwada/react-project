import React, { useState, useEffect } from 'react';
import './DigitalClock.css';

function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  }, []);

  const tick = () => {
    setTime(new Date());
  };

  const formatNumber = (num) => {
    return num.toString().padStart(2, '0');
  };

  const hours = formatNumber(time.getHours());
  const minutes = formatNumber(time.getMinutes());
  const seconds = formatNumber(time.getSeconds());
  const date = time.toDateString();
  const amPm = time.getHours() >= 12 ? 'PM' : 'AM';

  return (
    <div className="clock-container">
      <div className="digital-clock">
        <div className="time">
          <span className="hours">{hours}</span>
          <span className="colon">:</span>
          <span className="minutes">{minutes}</span>
          <span className="colon">:</span>
          <span className="seconds">{seconds}</span>
          <span className="ampm">{amPm}</span>
        </div>
        <div className="date">{date}</div>
      </div>
    </div>
  );
}

export default DigitalClock;
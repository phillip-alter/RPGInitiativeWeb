let time = {
    month: 1,
    week: 1,
    day: 1,
    hour: 0,
    minute: 0,
    second: 0
  };



  // Load saved time from cookie
  const savedTime = JSON.parse(localStorage.getItem('savedTime'));
  if (savedTime) {
    time = savedTime;
    updateDisplay();
  }

  function updateDisplay() {
    document.getElementById('month').textContent = `${getMonthName(time.month)}`;
    document.getElementById('week').textContent = `${time.week}`;
    document.getElementById('day').textContent = `${time.day}`;
    document.getElementById('hour').textContent = `${String(time.hour).padStart(2,'0')}`;
    document.getElementById('minute').textContent = `${String(time.minute).padStart(2,'0')}`;
    document.getElementById('second').textContent = `${String(time.second).padStart(2,'0')}`;
  }

  function getMonthName(month) {
    const months = [
      'Hammer', 'Alturiak', 'Ches', 'Tarsakh', 'Mirtul', 'Kythorn',
      'Flamerule', 'Eleasis', 'Eleint', 'Marpenoth', 'Uktar', 'Nightal'
    ];
    return months[month - 1];
  }

  function increment(unit) {
    time[unit]++;
    incUnit(unit);
    updateDisplay();
    saveTime();
  }

  function incUnit(unit){
    if (unit === 'month' && time[unit] > 12) {
      time[unit] %= 12;
      changeWeather();
    }
    else if (unit === 'week' && time[unit] > 3) {
      time[unit] %= 3;
      changeWeather();
      increment('month');
    }
    else if (unit === 'day' && time[unit] > 10) {
      time[unit] %= 10;
      changeWeather();
      increment('week');
    }
    else if (unit === 'hour' && time[unit] > 23) {
      time[unit] %= 24;
      changeWeather();
      increment('day');
    }
    else if (unit === 'minute' && time[unit] > 59) {
      time[unit] %= 60;
      increment('hour');
    }
    else if (unit === 'second' && time[unit] > 59) {
      time[unit] %= 60;
      increment('minute');
    }
  }

  function decrement(unit) {
    time[unit]--;
    decUnit(unit);
    updateDisplay();
    saveTime();
  }

  function decUnit(unit){
    if (time['hour'] < 0){ // hrs are special in decrement
      time[unit] = 23;
      decrement('day');
    }
    else if(time[unit] < 1){
      if (unit === 'month') {
        time[unit] = 12;
      }
      else if (unit === 'week') {
        time[unit] = 3;
        decrement('month');
      }
      else if (unit === 'day') {
        time[unit] = 10;
        decrement('week');
      }
      else if (unit === 'minute') {
        time[unit] = 59;
        decrement('hour');
      }
      else if (unit === 'second') {
        time[unit] = 59;
        decrement('minute');
      }
    }
  }

  let intervalId;
  let isPaused = false;

  function pauseUnpause() {
    if (isPaused) {
      intervalId = setInterval(updateTime, 1000);
      isPaused = false;
    } else {
      clearInterval(intervalId);
      isPaused = true;
    }
  }

  function updateTime() {
    increment('second');
    updateDisplay();
    saveTime();
  }

  function startNewDay() {
    time.hour = 0;
    time.minute = 0;
    time.second = 0;
    increment('day');
    updateDisplay();
    saveTime();
  }
  
  function addTen() {
  	time.minute += 10;
  	incUnit('minute');
  	updateDisplay();
  	saveTime();
  }

  function longRest() {
    time.hour += 8;
    incUnit('hour'); // checks if we've ticked over to a new day
    updateDisplay();
    saveTime();
  }

  function saveTime() {
    localStorage.setItem('savedTime', JSON.stringify(time));
  }

  intervalId = setInterval(updateTime, 1000);
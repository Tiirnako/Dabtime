let audio = new Audio('dabtime.mp3');
let timer = new Audio('dabTimer.mp3');

document.getElementById('play-button').addEventListener('click', () => {
  window.ipcRenderer.send('play-audio');
});

document.getElementById('timer-115-btn').addEventListener('click', () => {
  document.getElementById("timer-115-btn").disabled = true;
  document.getElementById("timer-60-btn").disabled = true;
  document.getElementById("timer-45-btn").disabled = true;
  const deadline = setTime(75)
  initializeClock('clockdiv', deadline);
});

document.getElementById('timer-60-btn').addEventListener('click', () => {
  document.getElementById("timer-115-btn").disabled = true;
  document.getElementById("timer-60-btn").disabled = true;
  document.getElementById("timer-45-btn").disabled = true;
  const deadline = setTime(60)
  initializeClock('clockdiv', deadline);
});

document.getElementById('timer-45-btn').addEventListener('click', () => {
  document.getElementById("timer-115-btn").disabled = true;
  document.getElementById("timer-60-btn").disabled = true;
  document.getElementById("timer-45-btn").disabled = true;
  const deadline = setTime(45)
  initializeClock('clockdiv', deadline);
});

function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    
    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }
  
  function initializeClock(id, endtime) {
    const clock = document.getElementById(id);
    const hoursSpan = clock.querySelector('.hours');
    const minutesSpan = clock.querySelector('.minutes');
    const secondsSpan = clock.querySelector('.seconds');
  
    function updateClock() {
      const t = getTimeRemaining(endtime);
  
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
  
      if (t.total <= 0) {
        clearInterval(timeinterval);
        window.ipcRenderer.send('play-timer');
        document.getElementById("timer-115-btn").disabled = false;
        document.getElementById("timer-60-btn").disabled = false;
        document.getElementById("timer-45-btn").disabled = false;
      }
    }
  
    const timeinterval = setInterval(updateClock, 1000);
    updateClock();
  }
  
  function setTime(sec) {
    const calcsec = sec  * 1000;
    return seconds = new Date(Date.parse(new Date()) + calcsec);
  }



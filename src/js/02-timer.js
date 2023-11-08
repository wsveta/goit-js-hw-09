import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  timer: document.querySelectorAll('.value'),
  timePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
};

refs.startBtn.disabled = true;
let amountOfMs = 0;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > options.defaultDate) {
      amountOfMs = selectedDates[0].getTime() - new Date().getTime();
      refs.startBtn.disabled = false;
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr(refs.timePicker, options);
let timerId = null;
refs.startBtn.addEventListener('click', startTimer);

function playAudio() {
  const audio = document.querySelector('audio');
  audio.play();
}

function startTimer() {
  timerId = setInterval(() => {
    if (amountOfMs <= 0) {
      playAudio();
      clearInterval(timerId);
      return;
    }

    const timeUntil = convertMs(amountOfMs);
    const keys = Object.keys(timeUntil);

    for (let i = 0; i < 4; i++) {
      refs.timer[i].textContent = addLeadingZero(timeUntil[keys[i]]);
    }

    amountOfMs -= 1000;
  }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

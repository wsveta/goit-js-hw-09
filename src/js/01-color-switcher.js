function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const refs = {
  startButton: document.querySelector('button[data-start]'),
  stopButton: document.querySelector('button[data-stop]'),
  background: document.body,
};

let timerId = null;

function startDisco() {
  refs.background.style.backgroundColor = getRandomHexColor();
  refs.startButton.disabled = true;
}

function stopDisco() {
  refs.startButton.disabled = false;
  clearInterval(timerId);
}
refs.startButton.addEventListener('click', () => {
  startDisco();
  timerId = setInterval(startDisco, 1000);
});

refs.stopButton.addEventListener('click', stopDisco);

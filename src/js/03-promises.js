import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector('input[name="delay"]'),
  stepInput: document.querySelector('input[name="step"]'),
  amountInput: document.querySelector('input[name="amount"]'),
};

refs.form.addEventListener('submit', event => {
  event.preventDefault();

  const amount = Number(refs.amountInput.value);
  let delay = Number(refs.delayInput.value);
  const step = Number(refs.stepInput.value);
  let position = 1;

  while (position <= amount) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
      position++;
    delay += step;
  }
});

function createPromise(p, d) {
    const promise = new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      let timerId = setTimeout(() => {
        if (shouldResolve) {
          resolve({ position: p, delay: d });
        } else {
          reject({ position: p, delay: d });
        }
      }, d);
    });
    return promise;
}

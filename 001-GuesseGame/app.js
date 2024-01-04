'use strict';
let rndm = Math.round(Math.random() * 19) + 1;
let skore = 20;
let highskores = 0;
const guess2 = document.querySelector('.guess');
const lowhigh = document.querySelector('.low-high');
const skoreE = document.querySelector('.skore');
const high = document.querySelector('.high');
const box = document.querySelector('.box');

const btn_again = document.querySelector('.btn-again');
btn_again.addEventListener('click', function () {
  rndm = Math.round(Math.random() * 19) + 1;
  skore = 20;
  document.body.className = 'black';
  guess2.value = null;
  lowhigh.textContent = '🎡 Tahmin Et!';
  skoreE.textContent = 20;
  box.textContent = '?';
});

const lowAndHigh = function (guess, rndm) {
  if (guess > rndm) {
    return ['📈 Too high!', 'orange', 'black'];
  } else if (guess < rndm) {
    return ['📉 Too low!', 'blue', 'black'];
  } else {
    if (highskores < skore) {
      highskores = skore;
    }
    high.textContent = highskores;
    box.textContent = rndm;
    return ['🎉 Congralation!', 'red', 'green'];
  }
};

const btn_check = document.querySelector('.btn-check');
btn_check.addEventListener('click', function () {
  const guess = document.querySelector('.guess').value;
  if (skore > 0) {
    skore--;
    skoreE.textContent = skore;
    lowhigh.textContent = lowAndHigh(guess, rndm)[0];
    lowhigh.className = `low-high ${lowAndHigh(guess, rndm)[1]}`;
    document.body.className = lowAndHigh(guess, rndm)[2];
  } else {
    lowhigh.textContent = '🔒 Hakkınız kalmadı';
  }
});

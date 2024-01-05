'use strict';

const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const diceImg = document.querySelector('.dice');
const p1skoreP = document.querySelector('#score--0');
const p2skoreP = document.querySelector('#score--1');
const p1currentP = document.querySelector('#current--0');
const p2currentP = document.querySelector('#current--1');
const pSection = document.querySelectorAll('.player');

let p1skore = 0;
let p2skore = 0;
p1skoreP.textContent = p1skore;
p2skoreP.textContent = p2skore;

let activeSkore = 0;
let active = true;

const player1Active = function () {
  active = !active;
  activeSkore = 0;
  p2currentP.textContent = activeSkore;
  pSection.item(1).classList.remove('player--active');
  pSection.item(0).classList.add('player--active');
};

const player2Active = function () {
  active = !active;
  activeSkore = 0;
  p1currentP.textContent = activeSkore;
  pSection.item(0).classList.remove('player--active');
  pSection.item(1).classList.add('player--active');
};

const finishGame = function (playerSkore, p, playerActive) {
  if (playerSkore >= 100) {
    pSection.item(p).classList.add('player--winner');
    rollBtn.classList.add('hidden');
    holdBtn.classList.add('hidden');
    diceImg.classList.add('hidden');
  } else {
    playerActive();
  }
};

rollBtn.addEventListener('click', function () {
  const rndm = Math.round(Math.random() * 5) + 1;
  diceImg.classList.remove('hidden');
  diceImg.setAttribute('src', `img/dice-${rndm}.png`);
  if (active) {
    if (rndm != 1) {
      activeSkore += rndm;
      p1currentP.textContent = activeSkore;
    } else {
      player2Active();
    }
  } else {
    if (rndm != 1) {
      activeSkore += rndm;
      p2currentP.textContent = activeSkore;
    } else {
      player1Active();
    }
  }
});

holdBtn.addEventListener('click', function () {
  diceImg.classList.add('hidden');
  if (active) {
    p1skore += activeSkore;
    p1skoreP.textContent = p1skore;
    finishGame(p1skore, 0, player2Active);
  } else {
    p2skore += activeSkore;
    p2skoreP.textContent = p2skore;
    finishGame(p2skore, 1, player1Active);
  }
});

newBtn.addEventListener('click', function () {
  p1skore = 0;
  p2skore = 0;
  p1skoreP.textContent = p1skore;
  p2skoreP.textContent = p2skore;

  activeSkore = 0;
  active = true;

  p1currentP.textContent = activeSkore;
  p2currentP.textContent = activeSkore;

  pSection.item(0).className = 'player player--0 player--active';
  pSection.item(1).className = 'player player--1';

  rollBtn.classList.remove('hidden');
  holdBtn.classList.remove('hidden');
});

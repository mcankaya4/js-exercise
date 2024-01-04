'use strict';

// Element Selections
const openBtns = document.querySelectorAll('.show-modal');
const modalDiv = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-modal');
const overlayDiv = document.querySelector('.overlay');

// Modal Opened Event Function
const openModal = function () {
  modalDiv.classList.remove('hidden');
  overlayDiv.classList.remove('hidden');
  document.addEventListener('keydown', keyHandler);
};

// Modal Opened Event Listener
openBtns.forEach((element) => {
  element.addEventListener('click', openModal);
});

// Modal Closed Event Function
const closeEvent = function () {
  modalDiv.classList.add('hidden');
  overlayDiv.classList.add('hidden');
  document.removeEventListener('keydown', keyHandler);
};

// Modal Closed Event Listener
closeBtn.addEventListener('click', closeEvent);
overlayDiv.addEventListener('click', closeEvent);
const keyHandler = function (event) {
  if (event.key == 'Escape' && !modalDiv.classList.contains('hidden')) {
    closeEvent();
  }
};

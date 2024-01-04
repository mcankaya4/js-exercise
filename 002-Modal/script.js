'use strict';

// Element Selections
const modalDiv = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-modal');
const overlayDiv = document.querySelector('.overlay');

// Modal Opened Event Function
const openModal = function () {
  modalDiv.className = 'modal';
  overlayDiv.className = 'overlay';
  document.addEventListener('keydown', keyHandler);
};

// Modal Closed Event Function
const closeEvent = function () {
  modalDiv.className = 'modal hidden';
  overlayDiv.className = 'overlay hidden';
  document.removeEventListener('keydown', keyHandler);
};

// Modal Closed Event
closeBtn.addEventListener('click', closeEvent);
overlayDiv.addEventListener('click', closeEvent);
const keyHandler = function (event) {
  if (event.key == 'Escape') {
    closeEvent();
  }
};

'use strict';

// *********** Elements ***********
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navSections = document.querySelectorAll('.nav__link');
const tabBtns = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const sections = document.querySelectorAll('.section');
const lazyImages = document.querySelectorAll('img[data-src]');
// *********** Elements ***********

// *********** Modal ***********
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
// *********** Modal ***********

// *********** Cookie Message ***********
// const cookieMessage = document.createElement('div');
// cookieMessage.classList.add('cookie-message');
// cookieMessage.innerHTML =
//   'We use cookied for improved functionality and analytics. <button class="btn btn--close--cookie">Got it!</button>';

// cookieMessage.style.backgroundColor = '#37383d';
// header.before(cookieMessage);

// cookieMessage.style.height =
//   Number.parseFloat(getComputedStyle(cookieMessage).height) + 30 + 'px';

// const btnCookieClose = document.querySelector('.btn--close--cookie');
// btnCookieClose.addEventListener('click', function () {
//   cookieMessage.remove();
// });
// *********** Cookie Message ***********

// *********** #tag Scroll ***********
btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

const navLinks = document.querySelector('.nav__links');
navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.getAttribute('href') != '#' && e.target.hasAttribute('href')) {
    document
      .querySelector(e.target.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  }
});
// *********** #tag Scroll ***********

// *********** Operation Tabs ***********
tabContainer.addEventListener('click', function (e) {
  const tabBtn = e.target.closest('.operations__tab');

  if (!tabBtn) return;

  // Active Tab Add Class
  tabBtn.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${tabBtn.dataset.tab}`)
    .classList.add('operations__content--active');

  // Active Tabs Other Remove Class
  tabBtns.forEach(el => el.classList.remove('operations__tab--active'));
  tabContent.forEach(i => i.classList.remove('operations__content--active'));
});
// *********** Operation Tabs ***********

// *********** Nav Fade Animations ***********
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(i => {
      if (i != link) i.style.opacity = this;
    });

    if (link != logo) logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
// *********** Nav Fade Animations ***********

// *********** Old Sticky Nav ***********
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   if (this.window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });
// *********** Old Sticky Nav ***********

// *********** Modern Sticky Nav ***********
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${getComputedStyle(nav).height}`,
});
headerObserver.observe(header);
// *********** Modern Sticky Nav ***********

// *********** Revealing element scroll ***********
const hiddenSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(hiddenSection, {
  root: null,
  threshold: 0.15,
});
sections.forEach(sec => {
  sec.classList.add('section--hidden');
  sectionObserver.observe(sec);
});
// *********** Revealing element scroll ***********

// *********** Lazy loading ***********
const lazyImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const lazyImgObserver = new IntersectionObserver(lazyImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
lazyImages.forEach(img => {
  lazyImgObserver.observe(img);
});
// *********** Lazy loading ***********

// *********** Slider ***********
const slide = document.querySelectorAll('.slide');
const btnLeftSlider = document.querySelector('.slider__btn--left');
const btnRightSlider = document.querySelector('.slider__btn--right');
const dots = document.querySelector('.dots');
let currentSlide = 0;

slide.forEach((_, i) => {
  const dotBtnHtml = `<button class="dots__dot" data-slide="${i}"></button>`;
  dots.insertAdjacentHTML('beforeend', dotBtnHtml);
});

const goToSlide = function (crSlide) {
  currentSlide = Number(crSlide);
  slide.forEach(
    (s, i) => (s.style.transform = `translateX(${(i - crSlide) * 100}%)`)
  );

  [...dots.children].forEach(el => {
    if (el.dataset.slide == crSlide) {
      el.classList.add('dots__dot--active');
    } else el.classList.remove('dots__dot--active');
  });
};

const leftFn = function () {
  if (currentSlide === 0) currentSlide = slide.length - 1;
  else currentSlide--;

  goToSlide(currentSlide);
};

const rightFn = function () {
  if (currentSlide === slide.length - 1) currentSlide = 0;
  else currentSlide++;

  goToSlide(currentSlide);
};

goToSlide(currentSlide);
btnLeftSlider.addEventListener('click', leftFn);
btnRightSlider.addEventListener('click', rightFn);

dots.addEventListener('click', function (e) {
  if (!e.target.closest('.dots__dot')) return;
  const { slide } = e.target.dataset;
  goToSlide(slide);
});

document.addEventListener('keydown', function (e) {
  e.key === 'ArrowRight' && rightFn();
  e.key === 'ArrowLeft' && leftFn();
});

// *********** Slider ***********

// e.preventDefault() : yönlendirilme özelliği devre dışı kalır
// e.target : tıklanan öğeyi döndürür.
// e.currentTarget : this
// e.stopPropagation() : tıklamanın üst öğelere geçmesi durdurulabilir.

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('1. Mesaj');
  console.log(e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded');
  console.log(e);
});

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = 'Message';
});

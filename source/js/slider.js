(function () {
  'use strict';
  const ACTIVE_BUTTON_CLASSNAME = 'slider__btn--active';
  const HORIZONTAL_PADDING = 28;
  const DESKTOP_WIDTH = 988;
  let slideWidth;

  if (window.screen.width >= 988) {
    slideWidth = DESKTOP_WIDTH;
  } else {
    slideWidth = window.screen.width - HORIZONTAL_PADDING * 2;
  }

  const slideList = document.querySelector('.slider__list');
  const slides = document.querySelectorAll('.slider__item');
  const sliderBtns = document.querySelectorAll('.slider__btn');
  let activeIndex = 0;
  let positionStart = 0;
  let positionEnd = 0;

  const changeActiveClassname = (index) => {
    for (const button of sliderBtns) {
      button.classList.remove(ACTIVE_BUTTON_CLASSNAME);
    }

    sliderBtns[index].classList.add(ACTIVE_BUTTON_CLASSNAME);
  };

  slideList.addEventListener('touchstart', (e) => {
    positionStart = e.touches[0].pageX;
  });

  slideList.addEventListener('touchend', (e) => {
    positionEnd = e.changedTouches[0].pageX;
    const shift = positionEnd - positionStart;
    
    if (shift < 0 && Math.abs(shift) > 40 && activeIndex !== slides.length - 1) {
      activeIndex += 1;
      
    } else if (shift > 0 && Math.abs(shift) > 40 && activeIndex !== 0) {
      activeIndex -= 1;
    }

    changeActiveClassname(activeIndex);
    slideList.style.transform = `translateX(-${slideWidth*activeIndex}px)`;
  });
  
  window.addEventListener('resize', () => {
    if (window.screen.width >= 988) {
      slideWidth = DESKTOP_WIDTH;
    } else {
      slideWidth = window.screen.width - HORIZONTAL_PADDING * 2;
    }
    
    slideList.style.transition = 'none';
    slideList.style.transform = `translateX(-${slideWidth*activeIndex}px)`;
  });

  for (let i = 0; i < sliderBtns.length; i++) {
    sliderBtns[i].addEventListener('click', () => {
      activeIndex = i;
      
      changeActiveClassname(i);

      slideList.style.transition = 'all 0.3s';
      slideList.style.transform = `translateX(-${slideWidth*i}px)`;
    });
  }
})()
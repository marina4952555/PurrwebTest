(function () {
  'use strict';
  const ACTIVE_BUTTON_CLASSNAME = 'slider__btn--active';
  const HORIZONTAL_PADDING = 28;
  const DESKTOP_WIDTH = 1200;
  const MAX_SLIDE_WIDTH = 988;
  const MIN_SLIDE_WIDTH = 319;
  let slideWidth;
  let activeIndex = 0;
  let positionStart = 0;
  let positionEnd = 0;
  const slideList = document.querySelector('.slider__list');
  const slides = document.querySelectorAll('.slider__item');
  const sliderBtns = document.querySelectorAll('.slider__btn');

  defineSlideWidth();

  function defineSlideWidth() {
    if (window.screen.width >= DESKTOP_WIDTH) {
      slideWidth = MAX_SLIDE_WIDTH;
    } else {
      slideWidth = window.screen.width - HORIZONTAL_PADDING * 2;
      if (slideWidth >= MAX_SLIDE_WIDTH) {
        slideWidth = MAX_SLIDE_WIDTH;
      } else if (slideWidth <= MIN_SLIDE_WIDTH) {
        slideWidth = MIN_SLIDE_WIDTH;
      }
    }
  };

  function changeActiveClassname(index) {
    for (const button of sliderBtns) {
      button.classList.remove(ACTIVE_BUTTON_CLASSNAME);
    }

    sliderBtns[index].classList.add(ACTIVE_BUTTON_CLASSNAME);
  };

  slideList.addEventListener('touchstart', (e) => {
    positionStart = e.touches[0].pageX;
    slideList.style.transition = 'all 0.3s';

    function handleTouchEnd(e) {
      positionEnd = e.changedTouches[0].pageX;
      const shift = positionEnd - positionStart;
      
      if (shift < 0 && Math.abs(shift) > 40 && activeIndex !== slides.length - 1) {
        activeIndex += 1;
        
      } else if (shift > 0 && Math.abs(shift) > 40 && activeIndex !== 0) {
        activeIndex -= 1;
      }
  
      changeActiveClassname(activeIndex);
      slideList.style.transform = `translateX(-${slideWidth*activeIndex}px)`;

      slideList.removeEventListener('touchend', handleTouchEnd);
    }

    slideList.addEventListener('touchend', handleTouchEnd);
  });
  
  window.addEventListener('resize', () => {
    defineSlideWidth();
    
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
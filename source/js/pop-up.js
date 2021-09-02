(function () {
  'use script';
  const SHOW_POPUP_CLASSNAME = 'popup--show';

  const popupWindow = document.querySelector('.popup');
  const popupWrapper = document.querySelector('.popup__wrapper');
  const infoVideo = document.querySelector('.info__video');
  const closePopupBtn = document.querySelector('.popup__hide-button');

  window.addEventListener('keypress', (e) => {
    console.log(e.key);
    if (e.code === 'Escape') {
      popupWindow.classList.remove(SHOW_POPUP_CLASSNAME);
    }
  });

  popupWrapper.addEventListener('click', (e) => e.stopPropagation());
  popupWindow.addEventListener('click', () => popupWindow.classList.remove(SHOW_POPUP_CLASSNAME));

  infoVideo.addEventListener('click', () => {
    popupWindow.classList.add(SHOW_POPUP_CLASSNAME);
  }); 

  closePopupBtn.addEventListener('click', () => {
    popupWindow.classList.remove(SHOW_POPUP_CLASSNAME);
  });
}());
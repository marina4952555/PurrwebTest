(function () {
  'use strict'
  const scrollButton = document.querySelector(".link-section__button")
  const scrollStop = document.querySelector(".activity");

  scrollButton.addEventListener("click",function(e){
    e.preventDefault(),
    scrollStop.scrollIntoView(top)
  });
})();

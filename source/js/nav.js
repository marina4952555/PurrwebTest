(function () {
  'use strict'
  const menuToggle = document.querySelector(".nav__button")
  const nav = document.querySelector(".nav__wrapper");

  menuToggle.classList.remove("nav__button--no-js"),
  nav.classList.add("nav--hide"),

  menuToggle.addEventListener("click",function(e){
    e.preventDefault(),
    menuToggle.classList.toggle("nav__button--closed"),
    menuToggle.classList.toggle("nav__button--opened"),
    nav.classList.toggle("nav--hide")
  });
})();
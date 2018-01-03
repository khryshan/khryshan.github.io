var login = document.querySelector(".user-block");
var loc = document.querySelector(".btn-location");
var formLogin = document.querySelector(".modal-content");
var logout = document.querySelectorAll(".modal-content-close");
var focusLogin = formLogin.querySelector("[name=login]");
var focusPassword = formLogin.querySelector("[name=password]");
var form = formLogin.querySelector("form");
var storage = localStorage.getItem("focusLogin");
var map = document.querySelector(".modal-content-map");
var overlay = document.querySelector(".modal-overlay");

login.addEventListener("click", function(event) {
  event.preventDefault();
  formLogin.classList.toggle("modal-content-show");
  overlay.classList.add("modal-content-show");

  if (storage) {
    focusLogin.value = storage;
    focusPassword.focus();
  } else {
    focusLogin.focus();
  }
});

form.addEventListener("submit", function(event) {
  event.preventDefault();
  if (!focusLogin.value || !focusPassword.value) {
    console.log("поля не заполнены!");
  } else {
    localStorage.setItem("focusLogin", focusLogin.value);
  }
})

logout[0].addEventListener("click", function(event) {
  event.preventDefault();
  formLogin.classList.toggle("modal-content-show");
  overlay.classList.toggle("modal-content-show");
});

overlay.addEventListener("click", function(event) {
  event.preventDefault();
  formLogin.classList.remove("modal-content-show");
  overlay.classList.remove("modal-content-show");
  map.classList.remove("modal-content-show");
})

window.addEventListener("keydown", function(event) {
  if (event.keyCode === 27 && formLogin.classList.contains("modal-content-show")) {
    formLogin.classList.toggle("modal-content-show");
    overlay.classList.toggle("modal-content-show");
  }
})

loc.addEventListener("click", function(event) {
  event.preventDefault();
  map.classList.toggle("modal-content-show");
  overlay.classList.toggle("modal-content-show");
});

logout[1].addEventListener("click", function(event) {
  event.preventDefault();
  map.classList.toggle("modal-content-show");
  overlay.classList.toggle("modal-content-show");
});

window.addEventListener("keydown", function(event) {
  if (event.keyCode === 27 && map.classList.contains("modal-content-show")) {
    map.classList.toggle("modal-content-show");
    overlay.classList.toggle("modal-content-show");
  }
})

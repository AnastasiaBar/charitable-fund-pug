import ready from "../../js/utils/documentReady.js";
import { isElementInViewport, animateSignature } from "../../js/animation-signature";

ready(function () {
  let tab = document.querySelectorAll(".founders__item"),
    tabContent = document.querySelectorAll(".founders__container-tab");
  let blobColor;
  let el = document.querySelector(".cursor");

  tab.forEach((n) => {
    n.addEventListener("click", function () {
      tab.forEach((i) => {
        i.classList.remove("active");
      });
      n.classList.toggle("active");
      for (let i = 0; i < tab.length; i++) {
        if (n == tab[i] && n.classList.contains("active")) {
          hideTabContent();
          showTabContent(i);
        }
      }
    });
  });

  function hideTabContent() {
    tabContent.forEach((item) => {
      item.classList.remove("show");
      item.classList.add("hide");
    });
  }

  function showTabContent(b) {
    tabContent[b].classList.remove("hide");
    tabContent[b].classList.add("show");
    b == 0 ? tabAnimate("#B3315E", "#1f7b5c") : tabAnimate("#1f7b5c", "#b3315e");
    setTimeout(() => {
      animateOnScroll();
    }, 800);
  }

  function tabAnimate(elColor, bgColor) {
    blobColor = elColor;
    el.style.transform = "scale(50)";
    el.style.transition = "1s ease-out";
    el.classList.add("disabled");
    setTimeout(() => {
      el.style = "";
      el.classList.remove("disabled");
      document.querySelector(".cursor--active").style.background = elColor;
      document.querySelector(".founders").style.background = bgColor;
    }, 1000);
  }

  //анимация курсора в блоке "Основатели фонда"
  function followCursor() {
    el = document.querySelector(".cursor");
    let blockFounder = document.querySelector(".founders");

    blockFounder.addEventListener("mousemove", (e) => {
      if (!e.target) return;
      if (e.target.closest(".founders__item") && !e.target.closest(".founders__item.active")) {
        document.querySelector(".cursor").style.background = blobColor;
        el.classList.add("cursor--active");
        el.style.left = e.clientX - blockFounder.getBoundingClientRect().left + "px";
        el.style.top = e.clientY - blockFounder.getBoundingClientRect().top + "px";
      } else {
        if (!el.classList.contains("disabled")) {
          el.style = "";
          document.querySelector(".cursor").style = "none";
          el.classList.remove("cursor--active");
        }
      }
    });
  }

  followCursor();

  function animateOnScroll() {
    let elements = document.querySelectorAll(".show .founders__container-signature");
    elements.forEach(function (element) {
      if (isElementInViewport(element) && !element.classList.contains("disabled")) {
        animateSignature(".signature-animation");
        element.classList.add("animate");
        setTimeout(() => {
          element.classList.remove("animate");
          element.classList.add("disabled");
        }, 3500);
      }
    });
  }

  window.addEventListener("scroll", animateOnScroll);

  animateOnScroll();

  window.addEventListener("resize", function () {
    let newWidth = window.innerWidth;
    resizeWindow(newWidth);
  });

  function resizeWindow(width) {
    document.querySelectorAll(".hide").forEach((el) => {
      width < 992 ? el.classList.add("show") : el.classList.remove("show");
    });
  }

  resizeWindow(window.innerWidth);
});

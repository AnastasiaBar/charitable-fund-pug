import ready from "../../js/utils/documentReady.js";
import Swiper, { Navigation, Pagination } from "swiper/bundle";

Swiper.use([Navigation, Pagination]);

ready(function () {
  const colorSlider = ["#B3315E", "#dc9138", "#067256"];
  let count = 0;
  const elBottom = document.querySelector(".blob-bottom__icon-decor-bottom");
  const elBottomHidden = document.querySelector(".hero__decor-bottom-disabled svg");
  const containerElBottomHidden = document.querySelector(".hero__decor-bottom-disabled");
  const elTopHidden = document.querySelector(".hero__decor-top-disabled svg");
  const sliderBg = document.querySelector(".hero__wrapper");

  Array.from(document.querySelectorAll(".slider"), (n) => {
    return new Swiper(n, {
      loop: true,
      allowTouchMove: false,
      speed: 1000,
      navigation: {
        nextEl: ".slider-arrows__swiper-button-next",
        prevEl: ".slider-arrows__swiper-button-prev",
      },
      on: {
        slideNextTransitionStart: function () {
          sliderCounter(++count, false);
        },
        slidePrevTransitionStart: function () {
          sliderCounter(--count, true);
        },
      },
    });
  });

  function sliderCounter(countValue, slidePrev) {
    count =
      countValue === -1
        ? colorSlider.length - 1
        : countValue === colorSlider.length
        ? 0
        : countValue;
    slidePrev === true ? changeSlidePrev() : changeSlideNext();
  }

  function changeSlidePrev() {
    elTopHidden.classList.add("active");
    sliderBg.style.background = colorSlider[count];
    elBottom.classList.add("active-two");

    setTimeout(() => {
      elBottom.classList.remove("active-two");
      styleElBottom();
      Object.assign(elTopHidden.style, {
        transition: "0s ease-out",
        color: count === colorSlider.length - 1 ? colorSlider[count] : colorSlider[count - 1],
      });
    }, 500);

    setTimeout(() => {
      Object.assign(elTopHidden.style, {
        transition: "",
        color: colorSlider[count],
      });
      elTopHidden.classList.remove("active");
      elBottom.style.transition = "1.2s ease-out";
    }, 1000);
  }

  function changeSlideNext() {
    elBottom.classList.add("active");
    elBottom.style.transform = "scale(20)";
    elTopHidden.style.display = "none";
    containerElBottomHidden.classList.add("active");
    elBottomHidden.style.color =
      count === colorSlider.length - 1 ? colorSlider[0] : colorSlider[count + 1];

    setTimeout(() => {
      sliderBg.style.background = colorSlider[count];
      elBottom.classList.remove("active");
      styleElBottom();
    }, 500);

    setTimeout(() => {
      elBottom.style = "";
      elBottom.style.color =
        count === colorSlider.length - 1 ? colorSlider[0] : colorSlider[count + 1];
      containerElBottomHidden.classList.remove("active");
      elTopHidden.style.display = "block";
      elTopHidden.style.color = colorSlider[count];
    }, 1000);
  }

  function styleElBottom() {
    Object.assign(elBottom.style, {
      transform: "scale(1)",
      transition: "0s ease-out",
      color: count === colorSlider.length - 1 ? colorSlider[0] : colorSlider[count + 1],
    });
  }
});

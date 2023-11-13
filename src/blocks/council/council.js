import ready from "../../js/utils/documentReady.js";
import Swiper, { Navigation, Pagination } from "swiper/bundle";
import { isElementInViewport, animateSignature } from "../../js/animation-signature";

Swiper.use([Navigation, Pagination]);

ready(function () {
  const councilSlider = new Swiper(".council__slider", {
    effect: "cards",
    grabCursor: true,
    cardsEffect: {
      perSlideOffset: 9,
      rotate: false,
      slideShadows: false,
    },
    navigation: {
      nextEl: ".council__swiper-button-next",
      prevEl: ".council__swiper-button-prev",
    },
    on: {
      slideNextTransitionStart: function () {
        const container = document.querySelector(".council__wrapper");
        const activeSlide = container.querySelector(".swiper-slide-active");

        const slidesBeforeActive = Array.from(container.children).filter(
          (slide) =>
            slide !== activeSlide &&
            slide.compareDocumentPosition(activeSlide) === Node.DOCUMENT_POSITION_FOLLOWING,
        );
        slidesBeforeActive.forEach((slide) => {
          slide.style.opacity = "0";
        });
        animateOnScroll(".swiper-slide-active .council__container-signature");
      },
      slidePrevTransitionStart: function () {
        const container = document.querySelector(".council__wrapper");
        const activeSlide = container.querySelector(".swiper-slide-active");
        activeSlide.style.opacity = "1";
      },
      slideChange: function () {
        sliderRight.slideTo(councilSlider.realIndex);
      },
    },
  });

  const sliderRight = new Swiper(".council__slider-right", {
    on: {
      slideChange: function () {
        councilSlider.slideTo(sliderRight.realIndex);
      },
    },
  });

  new Swiper(".council__slider-mobile", {
    slidesPerView: "auto",
    spaceBetween: 20,
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
    on: {
      slideChange: function () {
        animateOnScroll(".council__signature-mobile");
      },
    },
  });

  function animateOnScroll(el) {
    var elements = document.querySelectorAll(el);
    elements.forEach(function (element) {
      setTimeout(() => {
        if (isElementInViewport(element) && !element.classList.contains("disabled")) {
          console.log("1");
          animateSignature(".signature-animation");
          element.classList.add("animate");
          setTimeout(() => {
            element.classList.remove("animate");
            element.classList.add("disabled");
          }, 1000);
        }
      }, 500);
    });
  }

  window.addEventListener("scroll", function () {
    resizeWindow(window.innerWidth);
  });

  window.addEventListener("resize", function () {
    resizeWindow(window.innerWidth);
  });

  function resizeWindow(width) {
    width < 992
      ? animateOnScroll(".council__signature-mobile")
      : animateOnScroll(".swiper-slide-active .council__container-signature");
  }

  resizeWindow(window.innerWidth);

  let btnAllText = document.querySelectorAll(".council__all-text");

  btnAllText.forEach((item) => {
    item.addEventListener("click", function () {
      let itemContainer = item.closest(".council__inner-mobile");
      let itemText = itemContainer.querySelector(".council__text");
      if (itemText.classList.contains("council__text--active")) {
        itemText.classList.remove("council__text--active");
        item.innerText = "Показать полностью";
      } else {
        itemText.classList.add("council__text--active");
        item.innerText = "Скрыть";
      }
    });
  });

  function hideButtonIfTextIsShort() {
    var textBlock = document.querySelectorAll(".council__inner-mobile .council__text");
    textBlock.forEach((item) => {
      let itemContainer = item.closest(".council__inner-mobile");
      let itemButton = itemContainer.querySelector(".council__all-text");
      item.clientHeight / parseFloat(getComputedStyle(item).lineHeight) < 6
        ? (itemButton.style.display = "none")
        : (itemButton.style.display = "block");
    });
  }
  hideButtonIfTextIsShort();
});

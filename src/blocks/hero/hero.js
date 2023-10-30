import ready from "../../js/utils/documentReady.js";
import Swiper, { Navigation, Pagination } from "swiper/bundle";

Swiper.use([Navigation, Pagination]);

ready(function () {
  let galleryThumbs = new Swiper(".hero__slider-gallery", {
    slidesPerView: 2,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  });

  new Swiper(".hero__main-slider", {
    navigation: {
      nextEl: ".hero__swiper-button-next",
      prevEl: ".hero__swiper-button-prev",
    },
    thumbs: {
      swiper: galleryThumbs,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });
});

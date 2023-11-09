import ready from "../../js/utils/documentReady.js";

ready(function () {
  let tab = document.querySelectorAll(".founders__item"),
    tabContent = document.querySelectorAll(".founders__container-tab");
  let blobColor;

  tab.forEach((n) => {
    n.addEventListener("click", function () {
      tab.forEach((i) => {
        i.classList.remove("active");
      });
      n.classList.toggle("active");
      for (let i = 0; i < tab.length; i++) {
        if (n == tab[i]) {
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

    if (b == 0) {
      blobColor = "#B3315E";
      document.querySelector(".cursor--active").style.background = "#B3315E";
      document.querySelector(".founders").style.background = "#1f7b5c";
    } else {
      blobColor = "#1f7b5c";
      document.querySelector(".cursor--active").style.background = "#1f7b5c";
      document.querySelector(".founders").style.background = "#B3315E";
    }
  }

  //анимация курсора в блоке "Основатели фонда"
  function followCursor() {
    const el = document.querySelector(".cursor");

    window.addEventListener("mousemove", (e) => {
      if (!e.target) return;
      if (e.target.closest(".founders__item")) {
        document.querySelector(".cursor").style.background = blobColor;
        el.classList.add("cursor--active");
      } else {
        el.classList.remove("cursor--active");
        document.querySelector(".cursor").style = "none";
      }
      el.style.left = e.pageX + "px";
      el.style.top = e.pageY + "px";
    });
  }

  followCursor();

  function calcPaths() {
    const paths = document.querySelectorAll(".signature-animation");
    const totalDuration = 3;
    let len = 0;
    if (!paths.length) {
      return false;
    }
    paths.forEach((path) => {
      len += path.getTotalLength();
    });

    paths.forEach((path) => {
      const totalLen = path.getTotalLength();
      const duration = (totalLen / len) * totalDuration;
      path.style.animationDuration = `${duration < 0.2 ? 0.2 : duration}s`;
      path.setAttribute("stroke-dasharray", totalLen);
      path.setAttribute("stroke-dashoffset", totalLen);
    });
  }

  // функция для проверки видимости элемента на странице
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function animateOnScroll() {
    var elements = document.querySelectorAll(".show .founders__container-signature");
    elements.forEach(function (element) {
      if (isElementInViewport(element) && !element.classList.contains("disabled")) {
        calcPaths();
        element.classList.add("animate");
        setTimeout(() => {
          element.classList.remove("animate");
          element.classList.add("disabled");
        }, 3500);
      }
    });
  }

  window.addEventListener("scroll", animateOnScroll);

  window.addEventListener("resize", function () {
    var newWidth = window.innerWidth;
    resizeWindow(newWidth);
  });

  function resizeWindow(width) {
    document.querySelectorAll(".hide").forEach((el) => {
      width < 992 ? el.classList.add("show") : el.classList.remove("show");
    });
  }

  resizeWindow(window.innerWidth);
});

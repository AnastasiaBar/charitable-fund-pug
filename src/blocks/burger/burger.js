import ready from "../../js/utils/documentReady.js";

ready(function () {
  const menuTrigger = document.querySelector(".burger__button");
  menuTrigger.addEventListener("click", openNav);
});

function openNav() {
  let bodyState = document.body.getAttribute("data-state");
  bodyState === "mobile-menu"
    ? (document.body.dataset.state = "")
    : (document.body.dataset.state = "mobile-menu");
}

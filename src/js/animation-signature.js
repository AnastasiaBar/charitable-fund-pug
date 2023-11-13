//export default isElementInViewport;
//export default animateSignature;

// функция для проверки видимости элемента на странице
export function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

//функция для анимация подписи
export function animateSignature(el) {
  const paths = document.querySelectorAll(el);
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

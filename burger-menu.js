function loadHeader(cb) {
  fetch("header.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("header-placeholder").innerHTML = html;
      if (cb) cb();
      highlightActiveMenu();
    });
}

loadHeader(function initializeBurger() {
  const burger = document.querySelector(".hamburger");
  const menu = document.querySelector(".nav-menu");
  burger.addEventListener("click", function () {
    burger.classList.toggle("active");
    menu.classList.toggle("active");
  });
  document.querySelectorAll(".nav-menu .nav-link").forEach((link) => {
    link.addEventListener("click", function () {
      burger.classList.remove("active");
      menu.classList.remove("active");
    });
  });
  document.addEventListener("click", function (event) {
    if (
      menu.classList.contains("active") &&
      !menu.contains(event.target) &&
      !burger.contains(event.target)
    ) {
      burger.classList.remove("active");
      menu.classList.remove("active");
    }
  });
});

function highlightActiveMenu() {
  const links = document.querySelectorAll(".nav-link");
  const pagePath = window.location.pathname.split("/").pop();
  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href !== "#" && href !== "") {
      if (
        href === pagePath ||
        (href === "index.html" && (!pagePath || pagePath === "index.html"))
      ) {
        link.classList.add("active");
      }
    }
    if (href && href.startsWith("#") && href === window.location.hash) {
      link.classList.add("active");
    }
  });
}

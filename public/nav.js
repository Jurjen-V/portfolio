const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");
const navbar = document.querySelector(".navbar");
const navlinks = document.querySelector(".navlinks");
const home = document.querySelector("#home");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
  navbar.classList.toggle("open");
  navlinks.classList.toggle("open");
  menuBtn.classList.toggle("active");
  home.classList.toggle("open");
});
home.addEventListener("click", () => {
  nav.classList.remove("open");
  navlinks.classList.remove("open");
  navbar.classList.remove("open");
  menuBtn.classList.remove("active");
  home.classList.remove("open");
});
document.querySelectorAll(".navlinks a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navlinks.classList.remove("open");
    navbar.classList.remove("open");
    menuBtn.classList.toggle("active");
    home.classList.remove("open");
  });
});
const handleResize = () => {
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    document.querySelector(".home a").textContent = "";
  } else {
    document.querySelector(".home a").textContent = "Jurjen Veenstra";
  }
};

// Roep de functie direct aan bij het laden van de pagina
handleResize();

// Voeg de eventlistener toe voor toekomstige wijzigingen
window.addEventListener("resize", handleResize);

// Smooth scroll & basic nav active state
(function () {
  // enable smooth scroll in browsers that support it
  try {
    document.documentElement.style.scrollBehavior = "smooth";
  } catch (e) {}

  var links = document.querySelectorAll(
    '.navlinks a[href^="#"], .navlinks a[href$="werk.html"]',
  );
  links.forEach(function (a) {
    a.addEventListener("click", function (e) {
      // regular anchor in same document will use native smooth scroll
      // ensure external links still behave normally
      var href = a.getAttribute("href") || "";
      if (href.indexOf("#") === 0) {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target)
          target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // highlight nav link for visible section
  var navLinks = document.querySelectorAll(".navlinks a");
  var sections = Array.from(navLinks).map(function (a) {
    var href = a.getAttribute("href") || "";
    if (href.indexOf("#") === 0) return document.querySelector(href);
    return null;
  });
  window.addEventListener(
    "scroll",
    function () {
      var y = window.scrollY + 120;
      navLinks.forEach(function (a, i) {
        var sec = sections[i];
        if (!sec) return;
        var on = y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight;
        // a.style.opacity = on ? "1" ;
      });
    },
    { passive: true },
  );
})();

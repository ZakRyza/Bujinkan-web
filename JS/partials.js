/*jshint esversion: 6 */
import { loadPartial, safeFetchJson, safeUrl } from "./util.js";

document.addEventListener("DOMContentLoaded", async () => {
  const isNorsk = window.location.pathname.includes("/Norsk/");
  const headerPath = isNorsk ? "../Partials/Norsk/navbar.html" : "../Partials/Engelsk/navbar.html";
  const footerPath = isNorsk ? "../Partials/Norsk/footer.html" : "../Partials/Engelsk/footer.html";
  await loadPartial(headerPath, "header");
  await loadPartial(footerPath, "footer");
  const normalise = (p) => p.replace(/\/$/, "");
  const currentPath = normalise(window.location.pathname);
  const navLinks = document.querySelectorAll("#header a.nav-link");
  navLinks.forEach((link) => {
    const linkPath = normalise(new URL(link.getAttribute("href"), location.origin).pathname);
    link.removeAttribute("aria-current");
    if (linkPath === currentPath) {
      link.setAttribute("aria-current", "page");
      link.classList.add("active");
    }
  });

  const langSwitch = document.getElementById("lang-switch");
  if (langSwitch) {
    const mapping = {
      "/Norsk/Dojos.html": "/Engelsk/Dojos.html",
      "/Norsk/Om.html": "/Engelsk/About.html",
      "/Norsk/Kontakt.html": "/Engelsk/Contact.html",
      "/Norsk/Billeder.html": "/Engelsk/Pictures.html",
      "/Norsk/Nyheter.html": "/Engelsk/News.html",

      "/Engelsk/Dojos.html": "/Norsk/Dojos.html",
      "/Engelsk/About.html": "/Norsk/Om.html",
      "/Engelsk/Contact.html": "/Norsk/Kontakt.html",
      "/Engelsk/Pictures.html": "/Norsk/Billeder.html",
      "/Engelsk/News.html": "/Norsk/Nyheter.html"
    };

    if (mapping[currentPath]) {
      langSwitch.href = mapping[currentPath];
      langSwitch.textContent = isNorsk ? "English" : "Norsk";
      const safeHref = safeUrl(mapping[currentPath]);
    }
  }
});
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

  // find repo-root fra URL'en (altid første segment efter /)
  const repo = "/" + location.pathname.split("/")[1] + "/"; 
  // => "/Bujinkan-web/"
  
  const langSwitch = document.getElementById("lang-switch");
  if (langSwitch) {
    const mapping = {
      [repo + "Norsk/Dojos.html"]: repo + "Engelsk/Dojos.html",
      [repo + "Norsk/Om.html"]: repo + "Engelsk/About.html",
      [repo + "Norsk/Kontakt.html"]: repo + "Engelsk/Contact.html",
      [repo + "Norsk/Billeder.html"]: repo + "Engelsk/Pictures.html",
      [repo + "Norsk/Nyheter.html"]: repo + "Engelsk/News.html",

      [repo + "Engelsk/Dojos.html"]: repo + "Norsk/Dojos.html",
      [repo + "Engelsk/About.html"]: repo + "Norsk/Om.html",
      [repo + "Engelsk/Contact.html"]: repo + "Norsk/Kontakt.html",
      [repo + "Engelsk/Pictures.html"]: repo + "Norsk/Billeder.html",
      [repo + "Engelsk/News.html"]: repo + "Norsk/Nyheter.html"
    };

    if (mapping[currentPath]) {
      const safeHref = safeUrl(mapping[currentPath]);
      langSwitch.href = safeHref;
      langSwitch.textContent = isNorsk ? "English" : "Norsk";
    }

});

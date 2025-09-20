/*jshint esversion: 6 */
import { loadPartial, safeFetchJson, safeUrl, withRepo } from "./util.js";

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
      [withRepo("Norsk/Dojos.html")]: withRepo("Engelsk/Dojos.html"),
      [withRepo("Norsk/Om.html")]: withRepo("Engelsk/About.html"),
      [withRepo("Norsk/Kontakt.html")]: withRepo("Engelsk/Contact.html"),
      [withRepo("Norsk/Billeder.html")]: withRepo("Engelsk/Pictures.html"),
      [withRepo("Norsk/Nyheter.html")]: withRepo("Engelsk/News.html"),

      [withRepo("Engelsk/Dojos.html")]: withRepo("Norsk/Dojos.html"),
      [withRepo("Engelsk/About.html")]: withRepo("Norsk/Om.html"),
      [withRepo("Engelsk/Contact.html")]: withRepo("Norsk/Kontakt.html"),
      [withRepo("Engelsk/Pictures.html")]: withRepo("Norsk/Billeder.html"),
      [withRepo("Engelsk/News.html")]: withRepo("Norsk/Nyheter.html")
    };

    if (mapping[currentPath]) {
  langSwitch.href = mapping[currentPath];
  langSwitch.textContent = isNorsk ? "English" : "Norsk";
}
  }
});

/*jshint esversion: 6 */
import { loadPartial, safeFetchJson, safeUrl, withRepo } from "./util.js";

document.addEventListener("DOMContentLoaded", async () => {
  const isNorsk = window.location.pathname.includes("/Norsk/");
  const headerPath = isNorsk ? withRepo("Partials/Norsk/navbar.html") : withRepo("Partials/Engelsk/navbar.html");
  const footerPath = isNorsk ? withRepo("Partials/Norsk/footer.html") : withRepo("Partials/Engelsk/footer.html");
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
      [withRepo("Norsk/Bilder.html")]: withRepo("Engelsk/Pictures.html"),
      [withRepo("Norsk/Nyheter.html")]: withRepo("Engelsk/News.html"),
      [withRepo("Norsk/Hjem.html")]: withRepo("Engelsk/Home.html"),

      [withRepo("Engelsk/Dojos.html")]: withRepo("Norsk/Dojos.html"),
      [withRepo("Engelsk/About.html")]: withRepo("Norsk/Om.html"),
      [withRepo("Engelsk/Contact.html")]: withRepo("Norsk/Kontakt.html"),
      [withRepo("Engelsk/Pictures.html")]: withRepo("Norsk/Bilder.html"),
      [withRepo("Engelsk/News.html")]: withRepo("Norsk/Nyheter.html"),
      [withRepo("Engelsk/Home.html")]: withRepo("Norsk/Hjem.html")
    };

    if (mapping[currentPath]) {
  langSwitch.href = mapping[currentPath];
  langSwitch.textContent = isNorsk ? "English" : "Norsk";
}
  }
});

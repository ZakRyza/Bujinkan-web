
/*jshint esversion: 6 */
import { safeFetchJson, safeUrl, withRepo, getLang } from "./util.js";
document.addEventListener("DOMContentLoaded", async () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const gallery = document.querySelector(".gallery");


  if (lightbox && lightboxImg && prevBtn && nextBtn && gallery) {
    let pictures = [];
    let currentIndex = 0;
    const lang = getLang();

    try {
      pictures = await safeFetchJson(withRepo("Assets/pictures.json"));
      if (pictures) {        
        pictures.forEach((pic, index) => {
          const img = document.createElement("img");
          const fullPath = pic.src.startsWith("http")
            ? pic.src
            : withRepo(pic.src);
        
          img.src = safeUrl(fullPath);
          img.alt = pic.alt[lang];
          img.setAttribute("oncontextmenu", "return false;");
          img.setAttribute("loading", "lazy");
        
          img.addEventListener("click", () => {
            currentIndex = index;
            showImage();
          });
        
          gallery.appendChild(img);
        });
      }
    } catch (err) {
      console.error("Kunne ikke loade billeder:", err);
    }

    function showImage() {
      const pic = pictures[currentIndex];
      const fullPath = pic.src.startsWith("http")
        ? pic.src
        : withRepo(pic.src);
      lightbox.style.display = "flex";
      lightboxImg.src = safeUrl(fullPath);
      lightboxImg.alt = pic.alt[lang]; // evt. pic.alt[lang]
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % pictures.length;
      showImage();
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + pictures.length) % pictures.length;
      showImage();
    }

    // Knapper
    nextBtn.addEventListener("click", showNext);
    prevBtn.addEventListener("click", showPrev);

    // Klik udenfor billede
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
      }
    });

    // Tastatur-navigation (flyttet IND i if-blokken)
    document.addEventListener("keydown", (e) => {
      if (lightbox.style.display === "flex") {
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "Escape") lightbox.style.display = "none";
      }
    });
  }
});
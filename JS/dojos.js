/*jshint esversion: 6 */
import { esc, safeFetchJson, safeUrl } from "./util.js";

const dojoSelector = document.getElementById("dojoSelector");
if (dojoSelector) {
  document.getElementById("dojoSelector").addEventListener("change", function () {
    const target = this.value;
    if (target) {
      window.location.hash = target; // scroller til sektionen
    }
  });
}
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const dojos = await safeFetchJson("../Assets/dojo-list.json");
        if (dojos) {
            const container = document.getElementById("dojo-list");
            const isNorsk = window.location.pathname.includes("/Norsk/");
            const lang = isNorsk ? "no" : "en";

            if (container && dojos) {
                dojos.forEach((dojo) => {
                    const html = `
      <h2 class="headline text-center" id="${esc(dojo.id)}">${esc(dojo.name[lang])}</h2>
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-1 col-12 textindhold"></div>
          <div class="col-md-5 col-12 textindhold">
              <h3 class="overskrift">${lang === "no" ? "Adresse" : "Address"}</h3>
              <p class="information">${esc(dojo.address[lang])}</p>

              <h3 class="overskrift">${lang === "no" ? "Treningstider" : "Training Times"}</h3>
              ${dojo.times[lang].map((t) => `<p class="information">${esc(t)}</p>`).join("")}

              <h3 class="overskrift">${lang === "no" ? "Kontakt" : "Contact"}</h3>
              <p class="information">Telefon: ${esc(dojo.contact.phone)}</p>
              <p class="information">Mail: <a class="linkcolor" href="mailto:${esc(dojo.contact.email)}">${esc(dojo.contact.email)}</a></p>
              ${renderSocialLinksAsString(dojo, lang)}
          </div>
          <div class="col-md-5 col-12">
            <h3 class="text-center text-white">${esc(dojo.map.thumbnailtext[lang])}</h3>
            <div class="thumb-container">
                <a href="${safeUrl(dojo.map.link)}" target="_blank" rel="noopener noreferrer">
                    <img class="map-thumb" src="${safeUrl(dojo.map.thumbnail)}" alt="${esc(dojo.map.alt[lang])}" loading="lazy">
                </a>
            </div>
          </div>
        </div>
      </div>
      <hr class="border border-white opacity-100 hr-class">
    `;
                    container.insertAdjacentHTML("beforeend", html);
                });
            }
        }
    } catch (err) {
        console.error("Kunne ikke loade dojos:", err);
    }
});

const SOCIAL_PLATFORMS = [
    {
        // Website – always shown if a URL exists.
        keyUrl: "homepageUrl",
        keyLabel: "homepage", // label object inside `links`
        iconSvg: null, // no SVG for plain website link
        cssClass: "linkcolor"
    },
    {
        keyUrl: "facebookUrl",
        keyLabel: "facebook",
        // Facebook SVG (static, trusted – you control it)
        iconSvg: `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
           fill="currentColor" class="bi bi-facebook text-white"
           viewBox="0 0 16 16">
        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
      </svg>`,
        cssClass: "linkcolor icon-link"
    },
    {
        keyUrl: "instagramUrl",
        keyLabel: "instagram",
        iconSvg: `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
           fill="currentColor" class="bi bi-instagram text-white"
           viewBox="0 0 16 16">
        <path d="M8 0C5.74 0 5.48.01 4.68.04c-.78.02-1.32.09-1.78.19a3.5 3.5 0 0 0-1.27.55 3.5 3.5 0 0 0-.94.94 3.5 3.5 0 0 0-.55 1.27c-.1.46-.17 1-.19 1.78C.01 5.48 0 5.74 0 8c0 2.26.01 2.52.04 3.32.02.78.09 1.32.19 1.78.14.53.34 1 .55 1.27.22.28.48.54.94.94.27.21.74.41 1.27.55.46.1 1 .17 1.78.19.8.03 1.06.04 3.32.04s2.52-.01 3.32-.04c.78-.02 1.32-.09 1.78-.19a3.5 3.5 0 0 0 1.27-.55 3.5 3.5 0 0 0 .94-.94 3.5 3.5 0 0 0 .55-1.27c.1-.46.17-1 .19-1.78.03-.8.04-1.06.04-3.32s-.01-2.52-.04-3.32c-.02-.78-.09-1.32-.19-1.78a3.5 3.5 0 0 0-.55-1.27 3.5 3.5 0 0 0-.94-.94 3.5 3.5 0 0 0-1.27-.55c-.46-.1-1-.17-1.78-.19C10.52.01 10.26 0 8 0zm0 1.44c2.2 0 2.45.01 3.31.04.62.02 1 .13 1.23.22.31.12.53.26.76.49.23.23.37.45.49.76.09.23.2.61.22 1.23.03.86.04 1.11.04 3.31s-.01 2.45-.04 3.31c-.02.62-.13 1-.22 1.23-.12.31-.26.53-.49.76-.23.23-.45.37-.76.49-.23.09-.61.2-1.23.22-.86.03-1.11.04-3.31.04s-2.45-.01-3.31-.04c-.62-.02-1-.13-1.23-.22-.31-.12-.53-.26-.76-.49-.23-.23-.37-.45-.49-.76-.09-.23-.2-.61-.22-1.23-.03-.86-.04-1.11-.04-3.31s.01-2.45.04-3.31c.02-.62.13-1 .22-1.23.12-.31.26-.53.49-.76.23-.23.45-.37.76-.49.23-.09.61-.2 1.23-.22.86-.03 1.11-.04 3.31-.04zM8 3.88a4.12 4.12 0 1 0 0 8.24 4.12 4.12 0 0 0 0-8.24zm0 6.79a2.66 2.66 0 1 1 0-5.33 2.66 2.66 0 0 1 0 5.33zm4.29-6.93a.96.96 0 1 1-1.92 0 .96.96 0 0 1 1.92 0z"/>
      </svg>`,
        cssClass: "linkcolor icon-link"
    },
    {
        keyUrl: "tiktokUrl",
        keyLabel: "tiktok",
        iconSvg: `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
           fill="currentColor" class="bi bi-instagram text-white"
           viewBox="0 0 16 16">
        <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z""/>
      </svg>`,
        cssClass: "linkcolor icon-link"
    }
];

function renderSocialLinksAsString(dojo, lang) {
    // Guard against a missing `links` object – return empty string early.
    if (!dojo.links) return "";

    // Reduce the platform catalogue to a single HTML string.
    return SOCIAL_PLATFORMS.reduce((html, platform) => {
        const url = dojo.links[platform.keyUrl];
        const label = dojo.links[platform.keyLabel]?.[lang]; // optional chaining

        // If either the URL or the label is falsy, skip this platform.
        if (!url || !label) return html;
        const safeHref = safeUrl(url);

        // Build the anchor – we escape the URL and the label.
        const anchor = `
      <a class="${platform.cssClass}" href="${safeHref}" target="_blank" rel="noopener noreferrer">
        ${platform.iconSvg ? platform.iconSvg : ""}${esc(label)}
      <span class="sr-only">${esc(label)}</span></a>`;

        // Wrap each anchor in a <p> (you can change the wrapper if you like).
        return html + `<p>${anchor}</p>`;
    }, "");
};
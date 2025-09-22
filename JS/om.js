/*jshint esversion: 6 */
import { esc, safeFetchJson, safeUrl, withRepo, getLang, parseTextWithLinks, getRepoRoot, parseSafeHtml } from "./util.js";

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const om = await safeFetchJson(getRepoRoot() + "Assets/om.json");

        if (om) {
            const container = document.getElementById("Om");
            const lang = getLang();

            if (container && om) {
                    let html = `
                        <div class="row">
                            <div class="col-1">
                            </div>
                            <div class="col-10">
                                <h1 class="text-center text-white">${esc(om.title[lang])}</h1>
                    `;
                  // Byg tekst med <i> tilladt
                  om.text1[lang].forEach(p => {
                    const wrapper = document.createElement("p");
                    wrapper.appendChild(parseSafeHtml(p)); // indsætter sikkert HTML
                    html += wrapper.outerHTML;
                  });
                    html += `
                                
                                <iframe class="responsive-iframe" src=${esc(safeUrl(om.video1.src))} title="${esc(om.video1.title[lang])}"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                <iframe class="responsive-iframe" src=${esc(safeUrl(om.video2.src))} title="${esc(om.video2.title[lang])}"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                ${om.text2[lang].map(p => `<p>${parseTextWithLinks(p)}</p>`).join("")}
                                <img class="img-fluid" src="${safeUrl(withRepo(om.img.src))}" alt="${esc(om.img.alt[lang])}" oncontextmenu="return false;">
                            <div class="col-2 text-center">
                            </div>
                        </div>
                `;
                    container.insertAdjacentHTML("beforeend", html);
                };
        }
    } catch (err) {
        console.error("Kunne ikke loade home:", err);
    }
});

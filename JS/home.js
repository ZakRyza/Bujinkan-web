/*jshint esversion: 6 */
import { esc, safeFetchJson, safeUrl, withRepo, getLang, parseTextWithLinks, getRepoRoot } from "./util.js";

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const home = await safeFetchJson(getRepoRoot() + "Assets/home.json");

        if (home) {
            const container = document.getElementById("Home");
            const lang = getLang();
            const paragraphs = home.text2[lang]; // dette er et array
            let textHtml = "";

            if (Array.isArray(paragraphs) && paragraphs.length > 0) {
                textHtml += `<p>${esc(paragraphs[0])}</p>`;
                if (paragraphs.length > 1) {
                    textHtml += "<ul>";
                    for (let i = 1; i < paragraphs.length; i++) {
                        textHtml += `<li>${esc(paragraphs[i])}</li>`;
                    }
                    textHtml += "</ul>";
                }
            }

            if (container && home) {
                    const html = `
                        <div class="container container-centered col-md-12">
                            <div class="row text-center text-white">
                                <h1>${esc(home.welcome[lang])}</h1>
                            </div>
                            <div class="row text-center text-white">
                                <p>${esc(home.language[lang])}</p>
                            </div>
                        </div>
                        <div class="container container-fluid col-md-12">
                            <div class="row">
                                <div class="col-md-12 flex-row-center">
                                    <img class="img-news" src="${safeUrl(withRepo(home.img.src))}" alt="${esc(home.img.alt[lang])}" loading="lazy" oncontextmenu="return false;">
                                </div>
                            </div>
                            <div class="row">
                            <div class="col-md-12"></div>
                                <div class="col-md-1"></div>
                                <div class="col-md-4 text-white">
                                    <h2 class="text-center">${esc(home.headline1[lang])}</h2>
                                    <p>${esc(home.text1[lang])}<p>
                                </div>
                                <div class="col-md-2"></div>
                                <div class="col-md-4 text-white">
                                    <h2 class="text-center">${esc(home.headline2[lang])}</h2>
                                    ${textHtml}
                                </div>
                                <div class="col-md-1 col-12"></div>
                            </div>
                            <div class="row">
                                <div class="col-md-1"></div>
                                <div class="col-md-10 flex-row-center">
                                    <p>${esc(home.text3[lang])}</p>
                                </div>
                                <div class="col-md-1"></div>
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

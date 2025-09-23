/*jshint esversion: 6 */
import { esc, safeFetchJson, safeUrl, getRepoRoot, getLang, withRepo } from "./util.js";

document.addEventListener("DOMContentLoaded", async () => {
    try {
      const kontakt = await safeFetchJson(getRepoRoot() + "Assets/kontakt.json");
        if (kontakt) {
            const container = document.getElementById("kontakt");
            const lang = getLang();

            if (container && kontakt) {
                    const html = `
                        <div class="container container-centered">
                            <div class="row">
                              <div class="col-12">
                                <div class="row text-center text-white">
                                  <h1>${esc(kontakt.h1[lang])}<a href="mailto:contact@budoskolen.no">contact@budoskolen.no</a></h1>
                                  <h2>${esc(kontakt.h2[lang])}</h2>
                                </div>
                              </div>
                            </div>
                          </div>
                    `;
                    container.insertAdjacentHTML("beforeend", html);
            }
        }
    } catch (err) {
        console.error("Kunne ikke loade dojos:", err);
    }
});

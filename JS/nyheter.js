/*jshint esversion: 6 */
import { esc, safeFetchJson, safeUrl, withRepo, getLang, parseTextWithLinks, formatDate } from "./util.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const news = await safeFetchJson(withRepo("Assets/nyheter.json"));
    if (news) {
      const container = document.getElementById("news-list");
      const lang = getLang();

      // Sortér efter dato (nyeste først)
      news.sort((a, b) => new Date(b.date) - new Date(a.date));

      news.forEach((item) => {
        const html = `
            <div class="container-fluid">
                <div class="row">
                    <div class="col-2"></div>
                        <div class="col-8 textindhold">
                            <h2 class="dojo text-center text-white">${esc(item.title[lang])}</h2>
                        </div>
                        <div class="col-2 textindhold"> 
                            <p class="date">${esc(formatDate(item.date))}</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2"></div>
                        <div class="col-8 flex-row-center">
                            ${item.thumbnail ? `<img class="img-news" src="${safeUrl(withRepo(item.thumbnail.path))}" alt="${esc(item.thumbnail.alt[lang])}" loading="lazy">`: ""}
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-2 textindhold"></div>
                        <div class="col-8 textindhold"> 
                            ${item.content[lang].map(p => `<p>${parseTextWithLinks(p)}</p>`).join("")}
                        </div>
                    </div>
                </div>
            </div>
            <hr class="border border-white opacity-100 hr-class">
        `;
        container.insertAdjacentHTML("beforeend", html);
      });
    }
  } catch (err) {
    console.error("Kunne ikke loade nyheder:", err);
  }
});
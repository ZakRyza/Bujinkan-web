/*jshint esversion: 6 */
// util.js
export function safeUrl(input) {
  if (!input) return "#";

  // Hvis allerede absolut (http(s)://, //, data:, mailto:), returnér som erstatet URL
  if (/^(https?:|\/\/|data:|mailto:)/i.test(input)) {
    try { return new URL(input).href; } catch { return "#"; }
  }

  // Hvis starter med '/' => root-relative: origin + path
  if (input.startsWith("/")) {
    try { return location.origin + input; } catch { return "#"; }
  }

  // Ellers er det en relative sti (fx "Pictures/Oslo.webp" eller "./Pictures/...").
  // Bestem repo-root: hvis pathname er /REPO/..., sæt base = origin + /REPO/
  const segments = location.pathname.split("/").filter(Boolean); // fjerner tomme
  const repoSegment = segments.length > 0 ? segments[0] : ""; // f.eks. "Bujinkan-web"
  const base = repoSegment ? `${location.origin}/${repoSegment}/` : `${location.origin}/`;

  try {
    return new URL(input, base).href;
  } catch (err) {
    console.warn("safeUrl: kunne ikke opløse", input, "med base", base, err);
    return "#";
  }
}

export function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
export async function loadPartial(path, targetId) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const html = await res.text();
    const tpl = document.createElement("template");
    tpl.innerHTML = html;

    const target = document.getElementById(targetId);
    if (target) {
      target.innerHTML = "";
      target.appendChild(tpl.content.cloneNode(true));
    }
  } catch (err) {
    console.error("Kunne ikke loade partial:", err);
  }
}
export async function safeFetchJson(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Kunne ikke hente JSON:", err);
    return null;
  }
}

export function getRepoRoot() {
  const parts = location.pathname.split("/").filter(Boolean);

  // Hvis du kører på GitHub Pages, er første del repo-navn (fx "Bujinkan-web")
  if (location.hostname.includes("github.io") && parts.length > 0) {
    return "/" + parts[0] + "/";
  }

  // Ellers (lokalt) -> bare root
  return "/";
}

export function withRepo(path) {
  // Hvis path er absolut (starter med http eller /), brug det direkte
  if (/^(https?:)?\//.test(path)) return path;

  // Ellers prepender vi repo-root
  return getRepoRoot() + path;
}

export function getLang() {
  return window.location.pathname.includes("/Norsk/") ? "no" : "en";
}

export function parseTextWithLinks(str) {
  return esc(str).replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, 
    (match, text, url) => `<a class="linkcolor" href="${safeUrl(url)}" target="_blank" rel="noopener noreferrer">${esc(text)}</a>`);
}
export function formatDate(isoDate) {
  const [year, month, day] = isoDate.split("-");
  return `${day} ${month} ${year}`;
}
/*jshint esversion: 6 */
export function safeUrl(url) {
  try {
    const u = new URL(url, location.origin);
    if (["http:", "https:"].includes(u.protocol)) return u.href;
  } catch {}
  return "#";
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
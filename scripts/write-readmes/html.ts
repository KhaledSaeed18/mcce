/**
 * Drive converts uploaded HTML into a Google Doc, keeping headings, links,
 * lists, tables, and cell backgrounds. Anything fancier is dropped, so the
 * builders stay within this small vocabulary.
 */

export function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function link(href: string, text: string): string {
  return `<a href="${href}">${escapeHtml(text)}</a>`;
}

export function heading(level: 1 | 2 | 3, html: string): string {
  return `<h${level}>${html}</h${level}>`;
}

export function paragraph(html: string): string {
  return `<p>${html}</p>`;
}

export function list(items: string[]): string {
  return `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

const TABLE_OPEN =
  '<table border="1" cellpadding="6" style="border-collapse:collapse;width:100%">';

export function table(rows: string[][], header?: string[]): string {
  const head = header
    ? `<tr>${header.map((cell) => `<td style="background:#eeeeee"><b>${cell}</b></td>`).join("")}</tr>`
    : "";
  const body = rows
    .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
    .join("");
  return `${TABLE_OPEN}${head}${body}</table>`;
}

/** A one-cell shaded table, the closest a converted Doc gets to a callout box. */
export function callout(html: string): string {
  return `${TABLE_OPEN}<tr><td style="background:#fff4cc">${html}</td></tr></table>`;
}

export function wrapDocument(body: string): string {
  return `<html><head><meta charset="utf-8"></head><body style="font-family:Arial">${body}</body></html>`;
}

export function plural(count: number, word: string): string {
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}

export function formatSize(bytes: number): string {
  if (bytes >= 1e9) {
    return `${(bytes / 1e9).toFixed(1)} GB`;
  }
  if (bytes >= 1e6) {
    return `${Math.round(bytes / 1e6)} MB`;
  }
  return `${Math.max(1, Math.round(bytes / 1e3))} KB`;
}

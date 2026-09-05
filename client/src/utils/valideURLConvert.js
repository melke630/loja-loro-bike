// src/utils/valideURLConvert.js

export function valideURLConvert(text) {
  if (!text) return "";
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")       // troca espaços por hífen
    .replace(/[^\w\-]+/g, "")   // remove caracteres especiais
    .replace(/\-\-+/g, "-");    // evita múltiplos hífens
}
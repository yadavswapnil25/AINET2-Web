// Small whitelist sanitizer for admin-authored rich text (event descriptions etc.).
const ALLOWED_TAGS = new Set([
  'A', 'B', 'STRONG', 'I', 'EM', 'U', 'P', 'BR', 'DIV', 'SPAN', 'UL', 'OL', 'LI',
  'H1', 'H2', 'H3', 'H4', 'BLOCKQUOTE',
]);
const SAFE_URL = /^(https?:|mailto:|tel:)/i;

const escapeText = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const cleanNode = (node) => {
  [...node.childNodes].forEach((child) => {
    if (child.nodeType === Node.TEXT_NODE) return;
    if (child.nodeType !== Node.ELEMENT_NODE) {
      child.remove();
      return;
    }
    if (!ALLOWED_TAGS.has(child.tagName)) {
      // Keep the text of unknown tags, drop dangerous ones entirely.
      if (['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED'].includes(child.tagName)) {
        child.remove();
      } else {
        cleanNode(child);
        child.replaceWith(...child.childNodes);
      }
      return;
    }
    const href = child.tagName === 'A' ? (child.getAttribute('href') || '').trim() : null;
    [...child.attributes].forEach((attr) => child.removeAttribute(attr.name));
    if (child.tagName === 'A') {
      if (SAFE_URL.test(href)) {
        child.setAttribute('href', href);
        child.setAttribute('target', '_blank');
        child.setAttribute('rel', 'noopener noreferrer');
      }
    }
    cleanNode(child);
  });
};

export const sanitizeHtml = (value) => {
  if (!value) return '';
  // Plain-text descriptions (saved before the editor existed): keep their line breaks.
  if (!/<[a-z][\s\S]*>/i.test(value)) return escapeText(value).replace(/\n/g, '<br>');
  const doc = new DOMParser().parseFromString(`<div>${value}</div>`, 'text/html');
  const root = doc.body.firstChild;
  cleanNode(root);
  return root.innerHTML;
};

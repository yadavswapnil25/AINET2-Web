// Helpers shared by the AINET Adda pages.

export const addaPath = (slug) => `/ainet-adda/${slug}`;

export const formatAddaDate = (iso) => {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
};

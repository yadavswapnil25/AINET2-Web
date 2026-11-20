// Shared layout and building blocks for every page, so the whole site lines
// up on the same grid and uses the same buttons and cards.
export const containerClass = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

// Narrower column for long reading (policies, articles).
export const readingContainerClass = "mx-auto w-full max-w-3xl px-4 sm:px-6";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 sm:text-base";

export const buttonPrimary = `${buttonBase} bg-ink text-white hover:bg-ink/85`;
export const buttonSecondary = `${buttonBase} bg-white text-ink ring-1 ring-ink/15 hover:bg-sky-soft`;
export const buttonSage = `${buttonBase} bg-sage text-ink hover:bg-white`;

export const cardClass = "rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5 sm:p-8";

export const eyebrowClass =
  "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-sage-deep";

// Section spacing on inner pages.
export const sectionClass = "py-12 sm:py-16";

// Form fields.
export const labelClass = "mb-1.5 block text-sm font-semibold text-ink";
export const inputClass =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-base text-ink placeholder:text-ink/40 transition focus:border-ink focus:outline-none focus:ring-4 focus:ring-sage/60";

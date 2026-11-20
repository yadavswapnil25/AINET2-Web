// Small label + big title used at the top of each home page section.
// `action` sits on the right (e.g. a "View all" link); `tone="light"` is for dark panels.
const SectionHeading = ({ id, eyebrow, title, action, align = "left", tone = "dark", className = "" }) => {
  const centered = align === "center";
  const light = tone === "light";

  return (
    <div
      className={`flex flex-col gap-5 ${centered ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"} ${className}`}
    >
      <div className={centered ? "max-w-2xl" : ""}>
        {eyebrow && (
          <p
            className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] ${light ? "text-sage" : "text-sage-deep"}`}
          >
            <span className="h-0.5 w-6 rounded-full bg-current" aria-hidden="true" />
            {eyebrow}
          </p>
        )}
        <h2
          id={id}
          className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl ${light ? "text-white" : "text-ink"}`}
        >
          {title}
        </h2>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};

export default SectionHeading;

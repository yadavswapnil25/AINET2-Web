import React, { useState, useEffect } from "react";
import { baseUrl } from "../../utils/constant";
import { containerClass } from "./sectionStyles";

const DEFAULT_HEADING = "HIGHLIGHTS";

// The marquee travels 200% of its own width in a fixed time (see
// `.marquee-animation` in index.css), so a longer line would scroll
// proportionally faster. Scale the duration with the amount of text instead,
// so the reading speed stays the same however many highlights are running.
const SECONDS_PER_CHARACTER = 0.5;
const MIN_SCROLL_SECONDS = 20;

const isExternalUrl = (url) =>
  url.startsWith("http://") || url.startsWith("https://");

const HighlightText = ({ highlight }) => {
  const url = highlight.link_url;

  if (!url) {
    return <span>{highlight.subheading}</span>;
  }

  const external = isExternalUrl(url);

  return (
    <a
      href={url}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="underline-offset-4 hover:underline"
    >
      {highlight.subheading}
    </a>
  );
};

const Separator = ({ className }) => (
  <span className={`text-flame ${className}`} aria-hidden="true">
    &bull;
  </span>
);

const Highlight = () => {
  const [highlights, setHighlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    const fetchHighlights = async () => {
      try {
        const response = await fetch(`${baseUrl}/client/highlights`);
        const data = await response.json();
        if (!alive) return;

        if (data.status && Array.isArray(data.data?.highlights)) {
          setHighlights(data.data.highlights);
        } else if (data.status && data.data?.highlight) {
          // Older API shape that returned a single highlight.
          setHighlights([data.data.highlight]);
        }
      } catch (error) {
        console.error("Error fetching highlights:", error);
        // Keep default values on error
      } finally {
        if (alive) setIsLoading(false);
      }
    };

    fetchHighlights();

    return () => {
      alive = false;
    };
  }, []);

  if (isLoading) {
    return null;
  }

  const items = highlights.filter((highlight) => highlight?.subheading);

  // Nothing to announce: hide the bar instead of showing an empty strip.
  if (items.length === 0) {
    return null;
  }

  const heading = items[0]?.heading || DEFAULT_HEADING;

  // Roughly how much text is scrolling past, separators included.
  const totalCharacters = items.reduce(
    (total, highlight) => total + highlight.subheading.length + 6,
    0
  );
  const scrollSeconds = Math.max(
    MIN_SCROLL_SECONDS,
    Math.round(totalCharacters * SECONDS_PER_CHARACTER)
  );

  // Every highlight runs in the same line, one after another, separated by a
  // dot. Each one keeps its own link.
  const renderItems = (separatorClassName) =>
    items.map((highlight, index) => (
      <React.Fragment key={highlight.id ?? index}>
        {index > 0 && <Separator className={separatorClassName} />}
        <HighlightText highlight={highlight} />
      </React.Fragment>
    ));

  return (
    <div className="bg-sage font-display text-ink">
      <div className={`${containerClass} flex items-center gap-3 py-2`}>
        <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white sm:text-xs">
          <span className="relative flex size-2" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-flame opacity-75 motion-reduce:hidden" />
            <span className="relative inline-flex size-2 rounded-full bg-flame" />
          </span>
          {heading}
        </span>

        <div className="relative min-w-0 flex-1 overflow-hidden">
          {/* Wider screens: every highlight scrolls past in one line. The
              wrapper does the hiding: `.marquee-animation` sets its own
              display, which would otherwise beat `hidden` on phones. */}
          <div className="fade-edges hidden md:block">
            <span
              className="marquee-animation py-1 text-[15px] font-semibold"
              style={{ animationDuration: `${scrollSeconds}s` }}
            >
              {renderItems("mx-8")}
            </span>
          </div>
          {/* Phones: the full text, no scrolling */}
          <p className="text-sm font-semibold leading-snug md:hidden">
            {renderItems("mx-2")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Highlight;

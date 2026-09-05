import React, { useState, useEffect } from "react";
import { baseUrl } from "../../utils/constant";

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
      className="hover:underline underline-offset-4"
    >
      {highlight.subheading}
    </a>
  );
};

const Separator = ({ className }) => (
  <span className={`text-[#A6AEBF] ${className}`} aria-hidden="true">
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
    return null; // Or return a loading placeholder
  }

  const items = highlights.filter((highlight) => highlight?.subheading);
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
    <div className="w-full min-h-[50px] bg-[#D0E8C5] flex items-center font-bold text-lg overflow-hidden relative">
      <span className="pr-4 w-[185px] flex-shrink-0 clippath bg-[#A6AEBF] h-full text-white capitalize grid place-items-center z-10 px-4 text-[15px] md:text-xl">
        {heading}
      </span>

      <div className="flex-1 overflow-hidden relative min-w-0">
        {/* Desktop: every highlight scrolls past in one marquee */}
        <span
          className="hidden md:block marquee-animation text-[#FF3D00] items-center text-center whitespace-nowrap px-12 py-2"
          style={{ animationDuration: `${scrollSeconds}s` }}
        >
          {renderItems("mx-10")}
        </span>
        {/* Mobile: full text, no truncation */}
        <span className="md:hidden text-[#FF3D00] items-center text-center px-4 py-2 text-sm leading-tight block">
          {renderItems("mx-2")}
        </span>
      </div>
    </div>
  );
};

export default Highlight;

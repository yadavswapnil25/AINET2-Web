import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

// Photo on top, title below. Becomes a link when `href` (external) or `to`
// (inside the site) is given.
const ImageCard = ({ image, title, href, to, meta, fallbackImage }) => {
  const body = (
    <>
      <div className="overflow-hidden bg-sky-soft">
        {image ? (
          <img
            src={image}
            alt=""
            className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={
              fallbackImage
                ? (e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = fallbackImage;
                  }
                : undefined
            }
          />
        ) : (
          <div className="grid aspect-[16/10] w-full place-items-center text-sm font-medium text-ink/40">No image</div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        {meta && <p className="text-xs font-bold uppercase tracking-[0.14em] text-sage-deep">{meta}</p>}
        <h3 className="text-base font-bold leading-snug text-ink sm:text-lg">{title}</h3>
        {(href || to) && (
          <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-semibold text-sage-deep transition-all group-hover:gap-3">
            View details
            <FaArrowRight className="text-xs" aria-hidden="true" />
          </span>
        )}
      </div>
    </>
  );

  const cardClass =
    "group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink/10 transition hover:-translate-y-1 hover:shadow-xl";

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cardClass}>
        {body}
      </a>
    );
  }
  if (to) {
    return (
      <Link to={to} className={cardClass}>
        {body}
      </Link>
    );
  }
  return <div className={cardClass}>{body}</div>;
};

export default ImageCard;

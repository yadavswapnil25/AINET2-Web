import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ links = [] }) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium">
        {links.map((item, index) => {
          const last = index === links.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.to ? (
                <Link to={item.to} className="text-ink/60 transition-colors hover:text-ink">
                  {item.label}
                </Link>
              ) : (
                <span className={last ? "font-semibold text-ink" : "text-ink/60"} aria-current={last ? "page" : undefined}>
                  {item.label}
                </span>
              )}
              {!last && <FaChevronRight className="text-[10px] text-ink/30" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

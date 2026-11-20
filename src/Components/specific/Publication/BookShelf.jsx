import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// A titled row of book covers that scrolls sideways. Covers with an `href`
// open the book's store page in a new tab.
export default function BookShelf({ title, viewAllTo, books }) {
  return (
    <section aria-label={title}>
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{title}</h2>
        {viewAllTo && (
          <Link
            to={viewAllTo}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-sky-soft px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
          >
            View all
            <FaArrowRight className="text-xs transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        )}
      </div>

      <div className="-mx-4 mt-6 flex snap-x gap-5 overflow-x-auto px-4 pb-5 pt-1 [scrollbar-width:thin] sm:mx-0 sm:px-0">
        {books.map((book, index) => {
          const cover = (
            <img
              src={book.src}
              alt={book.alt}
              className="h-64 w-auto max-w-none rounded-xl object-cover shadow-lg shadow-ink/15 ring-1 ring-ink/10 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl sm:h-80 lg:h-96"
            />
          );

          return book.href ? (
            <a
              key={`${book.src}-${index}`}
              href={book.href.trim()}
              target="_blank"
              rel="noopener noreferrer"
              className="group shrink-0 snap-start"
            >
              {cover}
            </a>
          ) : (
            <div key={`${book.src}-${index}`} className="group shrink-0 snap-start">
              {cover}
            </div>
          );
        })}
      </div>
    </section>
  );
}

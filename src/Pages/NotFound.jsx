import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { buttonPrimary } from "../Components/shared/sectionStyles";

// Rendered for any path the router doesn't know. Without this an unknown
// route rendered nothing at all, which made a stale-cache problem look like
// a broken page.
export default function NotFound() {
  return (
    <main className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-10 size-80 rounded-full bg-sage/40 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-0 size-80 rounded-full bg-sky/50 blur-3xl" />

      <div className="relative mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
        <p className="text-8xl font-extrabold tracking-tight text-sage-deep/30 sm:text-9xl">404</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Page not found</h1>
        <p className="mt-3 text-lg text-ink/60">
          The page you are looking for doesn&apos;t exist or has moved.
        </p>
        <Link to="/" className={`${buttonPrimary} mt-8`}>
          <FaArrowLeft className="text-sm" aria-hidden="true" />
          Go to Home
        </Link>
      </div>
    </main>
  );
}

import { Link } from "react-router-dom";

// Rendered for any path the router doesn't know. Without this an unknown
// route rendered nothing at all, which made a stale-cache problem look like
// a broken page.
export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <p className="text-6xl font-bold text-gray-300 mb-4">404</p>
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">Page not found</h1>
      <p className="text-gray-600 mb-8">
        The page you are looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
      >
        Go to Home
      </Link>
    </div>
  );
}

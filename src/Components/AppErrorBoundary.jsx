import { Component } from "react";

// Errors the browser gives when a page file from an older deploy no longer exists.
const STALE_BUILD_ERROR =
  /dynamically imported module|Importing a module script failed|Failed to load module script|error loading dynamically imported module/i;

const RELOAD_KEY = "ainet-reloaded-at";

// After a deploy, a tab opened earlier still runs the previous build. Reloading
// once picks up the new build. At most one reload every 10 seconds, so a real
// outage can't turn into a reload loop. Returns whether it reloaded.
export const reloadForNewBuild = () => {
  try {
    const last = Number(sessionStorage.getItem(RELOAD_KEY) || 0);
    if (Date.now() - last < 10000) return false;
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    // Storage is blocked, so the loop guard can't work; let the user reload.
    return false;
  }
  window.location.reload();
  return true;
};

// Shows a friendly message instead of a blank page if a page fails to render,
// and quietly reloads when the cause is an outdated build.
export default class AppErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    if (STALE_BUILD_ERROR.test(String(error?.message || error))) {
      reloadForNewBuild();
    }
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink">Something went wrong</h1>
        <p className="mt-3 text-lg text-ink/60">
          The site may have just been updated. Reloading the page usually fixes this.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 font-semibold text-white transition-colors hover:bg-ink/85"
        >
          Reload page
        </button>
      </main>
    );
  }
}

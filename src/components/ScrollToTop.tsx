import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router";

// Resets scroll to the top whenever the route changes (e.g. bio page <-> home).
// Skipped for hash links like "/#projects" so section navigation still works.
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  // Stop the browser from restoring the old scroll position on back/forward.
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  // On a page refresh, drop any leftover "#projects"-style hash from the URL
  // and start at the top instead of jumping to that section.
  useLayoutEffect(() => {
    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;

    if (nav?.type === "reload" && window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, []);

  useLayoutEffect(() => {
    if (hash) return;
    // "instant" overrides html { scroll-behavior: smooth }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;

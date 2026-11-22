import { useEffect, useRef } from "react";
import "./CustomCursor.css";

// Over these, the arrow turns into the hand pointer.
const CLICKABLE =
  'a, button, [role="button"], label, select, summary, input[type="button"], input[type="submit"], input[type="checkbox"], input[type="radio"], [class*="cursor-pointer"]';

// Over these, the normal text cursor shows.
const TEXT_FIELD =
  'input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]), textarea, [contenteditable="true"]';

const rand = (min: number, max: number) => min + Math.random() * (max - min);

/**
 * A hollow arrow cursor with a calm click splash.
 * Render it once near the root of the app, outside <Routes>.
 *
 * - The arrow only replaces the system cursor on devices with a real mouse.
 * - Over links, buttons and Minggoy it turns into a hollow hand pointer.
 * - Over text fields the normal text cursor shows.
 * - The click splash also works on touch screens.
 * - Everything respects "reduce motion".
 */
function CalmCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cur = cursorRef.current;
    if (!cur) return;

    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const make = (className: string, x: number, y: number) => {
      const el = document.createElement("div");
      el.className = className;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      return el;
    };

    // Added to the page, then removed when its animation ends
    const spawn = (el: HTMLElement) => {
      el.addEventListener("animationend", () => el.remove(), { once: true });
      document.body.appendChild(el);
    };

    /* Click splash ----------------------------------------------------- */
    // Capture phase, so it still fires when something else (like the cat)
    // stops the click from bubbling.
    const onPointerDown = (e: PointerEvent) => {
      if (reduce) return;
      if (e.pointerType === "mouse" && e.button !== 0) return;

      const x = e.clientX;
      const y = e.clientY;

      spawn(make("calm-fx calm-bloom", x, y));

      // Stardust drifting outward (every third one is a tiny star)
      for (let i = 0; i < 9; i++) {
        const angle = (Math.PI * 2 * i) / 9 + rand(-0.3, 0.3);
        const dist = rand(46, 110);
        const mini = i % 3 === 0;
        const size = mini ? rand(9, 14) : rand(2.5, 5);

        const p = make(`calm-fx ${mini ? "calm-mini" : "calm-speck"}`, x, y);
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.background = `rgb(${mini || i % 2 ? "var(--star)" : "var(--glow)"})`;
        p.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
        p.style.setProperty("--dy", `${Math.sin(angle) * dist}px`);
        p.style.setProperty("--life", `${rand(1.4, 2.3).toFixed(2)}s`);
        p.style.setProperty("--delay", `${Math.round(rand(0, 140))}ms`);
        spawn(p);
      }
    };

    window.addEventListener("pointerdown", onPointerDown, true);

    /* Arrow cursor (mouse devices only) -------------------------------- */
    let raf = 0;
    let removeMouse = () => {};

    if (fine) {
      const root = document.documentElement;

      let mx = window.innerWidth / 2; // real mouse position
      let my = window.innerHeight / 2;
      let x = mx; // smoothed position
      let y = my;
      let lastDustX = mx;
      let lastDustY = my;
      const ease = reduce ? 1 : 0.28; // lower = floatier
      let active = false;

      // Show the custom cursor and hide the system one.
      // This only happens once the mouse is actually moving over the page, so the
      // system cursor is never hidden while the custom one can't be seen
      // (e.g. in the browser's inspect-element mode).
      const activate = () => {
        if (active) return;
        active = true;
        // Jump straight to the pointer so it doesn't glide in from where it was left
        x = mx;
        y = my;
        lastDustX = mx;
        lastDustY = my;
        cur.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        root.classList.add("has-calm-cursor");
        cur.classList.add("calm-visible");
      };

      // Hide the custom cursor and give the system cursor back
      const deactivate = () => {
        if (!active) return;
        active = false;
        root.classList.remove("has-calm-cursor");
        cur.classList.remove("calm-visible", "is-hover", "is-text", "is-down");
      };

      const onMove = (e: MouseEvent) => {
        mx = e.clientX;
        my = e.clientY;
        activate();

        // Hand over clickables, normal text cursor over text fields
        const target = e.target as Element | null;
        const inText = !!target?.closest(TEXT_FIELD);
        const inClickable = !inText && !!target?.closest(CLICKABLE);
        cur.classList.toggle("is-text", inText);
        cur.classList.toggle("is-hover", inClickable);

        // Leave a speck of stardust every so often (not over text fields).
        // Its strength is set in calm-dust in the CSS file.
        if (
          !reduce &&
          !inText &&
          Math.hypot(mx - lastDustX, my - lastDustY) > 26
        ) {
          lastDustX = mx;
          lastDustY = my;

          const size = rand(2, 4);
          const d = make(
            `calm-dust${Math.random() > 0.5 ? " calm-dust--glow" : ""}`,
            mx,
            my,
          );
          d.style.width = `${size}px`;
          d.style.height = `${size}px`;
          d.style.setProperty("--dx", `${rand(-10, 10)}px`);
          d.style.setProperty("--dy", `${rand(8, 22)}px`);
          spawn(d);
        }
      };
      const onDown = () => cur.classList.add("is-down");
      const onUp = () => cur.classList.remove("is-down");

      // The mouse left the page (URL bar, tabs, another window, DevTools panel)
      const onOut = (e: MouseEvent) => {
        if (!e.relatedTarget) deactivate();
      };
      // The page lost focus (clicking into DevTools, switching windows or tabs)
      const onBlur = () => deactivate();
      const onVisibility = () => {
        if (document.visibilityState === "hidden") deactivate();
      };

      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseout", onOut);
      root.addEventListener("mouseleave", deactivate);
      window.addEventListener("blur", onBlur);
      document.addEventListener("visibilitychange", onVisibility);
      window.addEventListener("mousedown", onDown);
      window.addEventListener("mouseup", onUp);

      const loop = () => {
        x += (mx - x) * ease;
        y += (my - y) * ease;
        cur.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      removeMouse = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseout", onOut);
        root.removeEventListener("mouseleave", deactivate);
        window.removeEventListener("blur", onBlur);
        document.removeEventListener("visibilitychange", onVisibility);
        window.removeEventListener("mousedown", onDown);
        window.removeEventListener("mouseup", onUp);
        root.classList.remove("has-calm-cursor");
      };
    }

    return () => {
      window.removeEventListener("pointerdown", onPointerDown, true);
      cancelAnimationFrame(raf);
      removeMouse();
    };
  }, []);

  return (
    <div ref={cursorRef} className="calm-cursor" aria-hidden="true">
      <div className="calm-scale">
        <svg viewBox="0 0 24 24" focusable="false">
          <path className="calm-arrow" d="M3 3 L10.5 21 L13 13 L21 10.5 Z" />
        </svg>
      </div>

      {/* Hand pointer, shown over anything clickable */}
      <div className="calm-hand">
        <svg viewBox="0 0 24 24" focusable="false">
          <path
            className="calm-hand-shape"
            d="M7.5 13.5 L7.5 4.2 A1.8 1.8 0 0 1 11.1 4.2 L11.1 9.2 A1.8 1.8 0 0 1 14.7 9.2 L14.7 10.2 A1.8 1.8 0 0 1 18.3 10.2 L18.3 11.2 A1.6 1.6 0 0 1 21.5 11.2 L21.5 15 C21.5 19 18.5 21.5 15 21.5 L12.5 21.5 C10.2 21.5 8.6 20.7 7.3 19.4 L3.9 15.9 A1.6 1.6 0 0 1 6.2 13.6 Z"
          />
        </svg>
      </div>
    </div>
  );
}

export default CalmCursor;

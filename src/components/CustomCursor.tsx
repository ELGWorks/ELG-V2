import { useEffect, useRef } from "react";
import "./CustomCursor.css";

// Over these, the star steps aside and the normal pointer shows.
// Keep in sync with the :is(...) list in CustomCursor.css
const CLICKABLE =
  'a, button, [role="button"], label, select, summary, input[type="button"], input[type="submit"], input[type="checkbox"], input[type="radio"], [class*="cursor-pointer"]';

// Over these, the normal text cursor shows.
const TEXT_FIELD =
  'input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]), textarea, [contenteditable="true"]';

const rand = (min: number, max: number) => min + Math.random() * (max - min);

/**
 * A twinkling star cursor with a calm click splash.
 * Render it once near the root of the app, outside <Routes>.
 *
 * - The star only replaces the system cursor on devices with a real mouse.
 * - Over links, buttons and Minggoy it fades out and the normal pointer shows.
 * - Over text fields the normal text cursor shows.
 * - The click splash also works on touch screens.
 * - Everything respects "reduce motion".
 */
function CalmCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cur = cursorRef.current;
    if (!cur) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

    /* Star cursor (mouse devices only) --------------------------------- */
    let raf = 0;
    let removeMouse = () => {};

    if (fine) {
      const root = document.documentElement;
      root.classList.add("has-calm-cursor");

      let mx = window.innerWidth / 2; // real mouse position
      let my = window.innerHeight / 2;
      let x = mx; // smoothed position
      let y = my;
      let lastDustX = mx;
      let lastDustY = my;
      const ease = reduce ? 1 : 0.28; // lower = floatier

      const onMove = (e: MouseEvent) => {
        mx = e.clientX;
        my = e.clientY;
        cur.classList.add("calm-visible");

        // Step aside over clickables and text fields
        const target = e.target as Element | null;
        const inText = !!target?.closest(TEXT_FIELD);
        const inClickable = !inText && !!target?.closest(CLICKABLE);
        cur.classList.toggle("is-text", inText);
        cur.classList.toggle("is-hover", inClickable);

        // Leave a speck of stardust every so often (not while the pointer shows).
        // Its strength is set in calm-dust in the CSS file.
        if (
          !reduce &&
          !inText &&
          !inClickable &&
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
      const onLeave = () => cur.classList.remove("calm-visible");
      const onDown = () => cur.classList.add("is-down");
      const onUp = () => cur.classList.remove("is-down");

      window.addEventListener("mousemove", onMove, { passive: true });
      document.addEventListener("mouseleave", onLeave);
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
        document.removeEventListener("mouseleave", onLeave);
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
          <path
            d="M12 0 C12.8 7.5 16.5 11.2 24 12 C16.5 12.8 12.8 16.5 12 24 C11.2 16.5 7.5 12.8 0 12 C7.5 11.2 11.2 7.5 12 0 Z"
            style={{ fill: "rgb(var(--star))" }}
          />
        </svg>
      </div>
    </div>
  );
}

export default CalmCursor;

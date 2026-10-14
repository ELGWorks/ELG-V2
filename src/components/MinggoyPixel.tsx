import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import fierceMinggoy from "../assets/images/minggoy/fierceminggoy.webp";
import sleepingMinggoy from "../assets/images/minggoy/sleepingminggoy.webp";
import seriousMinggoy from "../assets/images/minggoy/seriousminggoy.webp";
import sleepingMinggoy2 from "../assets/images/minggoy/sleepingminggoy2.webp";
import shookMinggoy from "../assets/images/minggoy/shookminggoy.webp";
import shookMinggoy2 from "../assets/images/minggoy/seriousminggoy2.webp";

type Milestone = {
  at: number;
  text: string;
  image: string;
  alt: string;
};

const LOOP_AT = 100;

const MILESTONES: Milestone[] = [
  {
    at: 10,
    text: "You dare pet a god, mortal?",
    image: shookMinggoy2,
    alt: "Minggoy questioning",
  },
  {
    at: 25,
    text: "I am the great Minggoy! and I am here to invade your planet!",
    image: fierceMinggoy,
    alt: "Minggoy declaring an invasion",
  },
  {
    at: 40,
    text: "Hmm? You are still on it? Alright :3",
    image: sleepingMinggoy2,
    alt: "Minggoy looking impressed",
  },
  {
    at: 55,
    text: "You like petting cats, don't you? Mind you, one pet costs $1. Please send the money to Emman's bank account.",
    image: seriousMinggoy,
    alt: "Minggoy collecting payment",
  },
  {
    at: 80,
    text: "zZzzZzzZ 😴💤",
    image: sleepingMinggoy,
    alt: "Minggoy sleeping",
  },
  {
    at: 100,
    text: "You are one consistent human, I give you that.",
    image: shookMinggoy,
    alt: "Minggoy acknowledging your dedication",
  },
];

/* ------------------------------------------------------------------ */
/* Sprite: a 14 x 10 pixel cat facing right.                           */
/* b = body, e = eye, p = nose.                                        */
/* ------------------------------------------------------------------ */

const TORSO = {
  up: [
    "..............",
    ".........b...b",
    ".........bbbbb",
    "b........bebeb",
    "bbbbbbbbbbbbbb",
    "..bbbbbbbbb...",
    "..bbbbbbbbb...",
    "..bbbbbbbbb...",
  ],
  down: [
    "..............",
    ".........b...b",
    ".........bbbbb",
    ".........bebeb",
    "..bbbbbbbbbbbb",
    "bbbbbbbbbbb...",
    "b.bbbbbbbbb...",
    "..bbbbbbbbb...",
  ],
} as const;

const LEGS = {
  stand: ["..bb.....bb...", "..bb.....bb..."],
  a: ["..b.b....b.b..", "..b.b....b.b.."],
  b: ["...b.b..b.b...", "...b.b..b.b..."],
} as const;

type Tail = keyof typeof TORSO;
type Legs = keyof typeof LEGS;

const COLS = 14;
const ROWS = 10;
const PX = 5; // size of one sprite pixel on screen
const CAT_W = COLS * PX;
const CAT_H = ROWS * PX;

const WALK_SPEED = 38; // px per second while wandering
const RUN_SPEED = 160; // px per second when chasing the cursor or a tap

const POPOVER_MAX_W = 300; // width of Minggoy's speech card
const POPOVER_GAP = 16; // space between the cat and the card

// A white cat with gold eyes. These are fixed colors (not theme tokens) so the
// cat stays white in both light and dark mode. Full class names so Tailwind
// can see them.
const FILL: Record<string, string> = {
  b: "fill-white",
  e: "fill-[#FFC107]",
  p: "fill-white",
};

function CatSprite({
  tail,
  legs,
  blink,
}: {
  tail: Tail;
  legs: Legs;
  blink: boolean;
}) {
  const pixels = useMemo(() => {
    const torso = TORSO[tail].map((row) =>
      blink ? row.replace(/e/g, "b") : row,
    );
    const grid: string[] = [...torso, ...LEGS[legs]];
    const out: { x: number; y: number; c: string }[] = [];
    grid.forEach((row, y) =>
      [...row].forEach((c, x) => {
        if (c !== ".") out.push({ x, y, c });
      }),
    );
    return out;
  }, [tail, legs, blink]);

  return (
    <svg
      viewBox={`0 0 ${COLS} ${ROWS}`}
      width={CAT_W}
      height={CAT_H}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
      // Soft shadow so the white cat still shows up on the light background
      className="block [filter:drop-shadow(0_1px_2px_rgb(0_0_0/0.22))]"
    >
      {pixels.map(({ x, y, c }) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width="1"
          height="1"
          className={FILL[c]}
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* A heart that floats up and fades out when the cat is petted         */
/* ------------------------------------------------------------------ */

function Heart({
  id,
  x,
  onDone,
}: {
  id: number;
  x: number;
  onDone: (id: number) => void;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const animation = el.animate(
      [
        { transform: "translate(-50%, 0) scale(0.6)", opacity: 1 },
        { transform: "translate(-50%, -44px) scale(1.1)", opacity: 0 },
      ],
      { duration: 900, easing: "ease-out", fill: "forwards" },
    );
    animation.onfinish = () => onDone(id);

    return () => animation.cancel();
  }, [id, onDone]);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute bottom-[52px] text-[18px] leading-none text-red-500"
      style={{ left: x }}
    >
      ♥
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* The cat                                                             */
/* ------------------------------------------------------------------ */

type Mode = "walk" | "sit";

type Speech = {
  milestone: Milestone;
  left: number; // card position inside the strip
  width: number;
  caret: number; // where the little pointer sits on the card
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function PixelCat() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const catRef = useRef<HTMLButtonElement | null>(null); // moves left/right
  const bodyRef = useRef<HTMLSpanElement | null>(null); // jumps up/down
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Position and behavior live in a ref and are written straight to the DOM
  // every frame, so moving the cat never re-renders React.
  const sim = useRef({
    x: 0,
    width: 0,
    placed: false,
    facing: 1 as 1 | -1,
    mode: "sit" as Mode,
    until: 0,
    target: null as number | null, // x the cat is heading to (cursor or tap)
    pets: 0, // hidden pet count, resets after the last milestone
    frozen: false, // true while Minggoy is talking
    preloaded: false,
  });

  // Only things that change what is drawn live in state.
  const [isClosing, setIsClosing] = useState(false);
  const [mode, setMode] = useState<Mode>("sit");
  const [facing, setFacing] = useState<1 | -1>(1);
  const [frame, setFrame] = useState(0);
  const [blink, setBlink] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);
  const [speech, setSpeech] = useState<Speech | null>(null);
  const heartId = useRef(0);

  const removeHeart = useCallback((id: number) => {
    setHearts((list) => list.filter((h) => h.id !== id));
  }, []);

  /* Movement loop ---------------------------------------------------- */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const s = sim.current;
    let raf = 0;
    let last = 0;

    const render = () => {
      if (catRef.current) {
        catRef.current.style.transform = `translateX(${s.x}px)`;
      }
    };

    const changeMode = (m: Mode) => {
      if (s.mode !== m) {
        s.mode = m;
        setMode(m);
      }
    };
    const changeFacing = (f: 1 | -1) => {
      if (s.facing !== f) {
        s.facing = f;
        setFacing(f);
      }
    };

    const measure = () => {
      s.width = track.clientWidth;
      const max = Math.max(0, s.width - CAT_W);
      if (!s.placed && s.width > 0) {
        s.x = rand(0, max);
        s.placed = true;
      }
      s.x = Math.min(s.x, max);
      render();
    };

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const max = Math.max(0, s.width - CAT_W);

      if (s.target !== null) {
        // Heading to the cursor / tapped spot
        const goal = Math.min(Math.max(s.target - CAT_W / 2, 0), max);
        const diff = goal - s.x;
        if (Math.abs(diff) <= 2) {
          s.target = null;
          changeMode("sit");
          s.until = now + rand(1500, 3000);
        } else {
          changeMode("walk");
          changeFacing(diff > 0 ? 1 : -1);
          s.x += Math.sign(diff) * Math.min(Math.abs(diff), RUN_SPEED * dt);
        }
      } else if (s.mode === "walk") {
        // Wandering
        if (now >= s.until) {
          changeMode("sit");
          s.until = now + rand(1500, 3500);
        } else {
          s.x += s.facing * WALK_SPEED * dt;
          if (s.x <= 0) {
            s.x = 0;
            changeFacing(1);
          } else if (s.x >= max) {
            s.x = max;
            changeFacing(-1);
          }
        }
      } else if (now >= s.until) {
        // Done sitting: walk off, usually toward the middle of the strip
        const inward: 1 | -1 = s.x < max / 2 ? 1 : -1;
        changeFacing(Math.random() < 0.75 ? inward : inward === 1 ? -1 : 1);
        changeMode("walk");
        s.until = now + rand(2000, 5000);
      }

      render();
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (raf || prefersReducedMotion()) return;
      last = performance.now();
      s.until = Math.max(s.until, last + 800);
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    // Only animate while the cat is on screen.
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    const ro = new ResizeObserver(measure);

    io.observe(track);
    ro.observe(track);
    measure();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  /* Leg / tail frames -------------------------------------------------- */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(
      () => setFrame((f) => 1 - f),
      mode === "walk" ? 140 : 650,
    );
    return () => clearInterval(id);
  }, [mode]);

  /* Occasional blink --------------------------------------------------- */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;

    const schedule = () => {
      t1 = setTimeout(
        () => {
          setBlink(true);
          t2 = setTimeout(() => {
            setBlink(false);
            schedule();
          }, 140);
        },
        rand(2500, 5500),
      );
    };
    schedule();

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  /* Speech card -------------------------------------------------------- */
  const closeSpeech = useCallback((refocus: boolean) => {
    setIsClosing((closing) => {
      if (closing) return closing;
      return true;
    });

    if (refocus) catRef.current?.focus();
  }, []);

  const finishClosingSpeech = useCallback(() => {
    const s = sim.current;
    s.frozen = false;
    s.until = performance.now() + 1200;

    setSpeech(null);
    setIsClosing(false);
  }, []);

  useEffect(() => {
    if (!speech) return;

    const timeout = setTimeout(() => {
      closeSpeech(false);
    }, 7000);

    return () => {
      clearTimeout(timeout);
    };
  }, [speech, closeSpeech]);

  const openSpeech = (milestone: Milestone) => {
    const s = sim.current;
    s.frozen = true; // Minggoy stops to talk
    s.target = null;
    s.until = Infinity;

    const width = Math.min(POPOVER_MAX_W, Math.max(s.width - 8, 0));
    const center = s.x + CAT_W / 2;
    const left = Math.min(
      Math.max(center - width / 2, 0),
      Math.max(s.width - width, 0),
    );
    const caret = Math.min(Math.max(center - left, 22), width - 22);

    setSpeech({ milestone, left, width, caret });
  };

  /* Interaction -------------------------------------------------------- */
  const aim = (clientX: number) => {
    const track = trackRef.current;
    if (!track || sim.current.frozen) return;
    sim.current.target = clientX - track.getBoundingClientRect().left;
  };

  const pet = () => {
    const s = sim.current;
    if (s.frozen) return;

    s.target = null;
    s.mode = "sit";
    setMode("sit");
    s.until = performance.now() + 1600;

    setHearts((list) => [
      ...list.slice(-4),
      { id: ++heartId.current, x: s.x + CAT_W / 2 },
    ]);

    if (!prefersReducedMotion()) {
      bodyRef.current?.animate(
        [
          { transform: "translateY(0)" },
          { transform: "translateY(-26px)" },
          { transform: "translateY(0)" },
        ],
        { duration: 450, easing: "cubic-bezier(0.3, 0.7, 0.4, 1)" },
      );
    }

    // Warm up the milestone pictures on the first pet so they appear instantly.
    if (!s.preloaded) {
      s.preloaded = true;
      MILESTONES.forEach((m) => {
        new Image().src = m.image;
      });
    }

    // Count the pet. After the last milestone the count starts over.
    s.pets += 1;

    const milestone = MILESTONES.find((m) => m.at === s.pets);

    // Reset after the 100th pet, but keep its milestone message.
    if (s.pets >= LOOP_AT) {
      s.pets = 0;
    }

    if (milestone) {
      openSpeech(milestone);
    }
  };

  return (
    <div
      ref={trackRef}
      // Move the mouse over the strip and the cat follows; tap anywhere to call it.
      onPointerMove={(e) => {
        if (e.pointerType === "mouse") aim(e.clientX);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") sim.current.target = null;
      }}
      onPointerDown={(e) => aim(e.clientX)}
      className="relative mb-2 h-24 w-full max-w-5xl touch-manipulation select-none"
    >
      {/* ground */}
      <div className="absolute inset-x-0 bottom-0 border-b-2 border-dashed border-muted/50" />

      <button
        ref={catRef}
        type="button"
        aria-label="Pet Minggoy"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={pet}
        className="absolute bottom-[2px] left-0 block cursor-pointer rounded-md will-change-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        style={{ width: CAT_W, height: CAT_H }}
      >
        <span ref={bodyRef} className="block">
          <span className="block" style={{ transform: `scaleX(${facing})` }}>
            <CatSprite
              tail={frame === 0 ? "up" : "down"}
              legs={mode === "walk" ? (frame === 0 ? "a" : "b") : "stand"}
              blink={blink}
            />
          </span>
        </span>
      </button>

      {hearts.map((h) => (
        <Heart key={h.id} id={h.id} x={h.x} onDone={removeHeart} />
      ))}

      {/* Minggoy's speech card, above the cat */}
      {speech && (
        <div
          ref={cardRef}
          role="dialog"
          aria-label="Minggoy says"
          onPointerDown={(e) => e.stopPropagation()}
          onAnimationEnd={(e) => {
            if (
              isClosing &&
              e.currentTarget === e.target &&
              e.animationName === "jumpOut"
            ) {
              finishClosingSpeech();
            }
          }}
          className={`absolute z-20 rounded-[28px] border border-line-strong bg-surface p-4 text-left text-fg shadow-xl ${
            isClosing ? "jump-out" : "jump-in"
          }`}
          style={{
            left: speech.left,
            width: speech.width,
            bottom: CAT_H + 2 + POPOVER_GAP,
          }}
        >
          <p className="pr-8 text-[12px] font-bold text-accent">Minggoy</p>
          <p className="mt-1 text-[15px] leading-snug">
            {speech.milestone.text}
          </p>

          <img
            src={speech.milestone.image}
            alt={speech.milestone.alt}
            // No picture yet? Hide it so the message still looks right.
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            className="mt-3 aspect-[4/3] w-full rounded-2xl bg-chip object-cover"
          />

          {/* little pointer toward the cat */}
          <span
            aria-hidden="true"
            className="absolute -bottom-1.5 size-3 rotate-45 border-r border-b border-line-strong bg-surface"
            style={{ left: speech.caret - 6 }}
          />
        </div>
      )}
    </div>
  );
}

export default PixelCat;

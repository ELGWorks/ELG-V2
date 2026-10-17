import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Send, X } from "lucide-react";

type Message = {
  role: "minggoy" | "visitor";
  text: string;
};

const welcomeMessage: Message = {
  role: "minggoy",
  text: "A visitor? Very well. I am Minggoy, the digital guardian of this portfolio. Ask me about my human, Emman.",
};

function getReply(question: string): string {
  const q = question.toLowerCase();

  if (/\b(hi|hello|hey|greetings)\b/.test(q)) {
    return "You have my attention. I am Minggoy, keeper of this website. What do you want to know about Emman?";
  }

  if (/\b(who are you|your name|minggoy)\b/.test(q)) {
    return "I am Minggoy, a god in the body of a cat. What do you want to know?";
  }

  if (
    /\b(who is emman|about emman|tell me about emman|who is he|about you)\b/.test(
      q,
    )
  ) {
    return "Emman is a front-end developer from Pampanga, Philippines, interested in building websites and exploring AI.";
  }

  if (/\b(where|location|from|live)\b/.test(q)) {
    return "My human is from Pampanga, Philippines.";
  }

  if (
    /\b(skill|skills|technology|technologies|tech stack|what can you build)\b/.test(
      q,
    )
  ) {
    return "Emman works with HTML5, CSS3, tailwindCSS, JavaScript, TypeScript, and React.js.";
  }

  if (/\b(project|projects|portfolio|work|built|made)\b/.test(q)) {
    return "He has worked on projects including MyPrompts, a browser extension for managing AI prompts, and an Ecommerce project built with React.js. Explore the Projects section to see more!";
  }

  if (
    /\b(react|javascript|typescript|frontend|front.end|website|web development)\b/.test(
      q,
    )
  ) {
    return "Emman builds frontend experiences using technologies like React, JavaScript, TypeScript, and Tailwind CSS. He also explores backend development.";
  }

  if (/\b(laravel|php|backend|back.end|database)\b/.test(q)) {
    return "Emman has also worked with PHP and Laravel for backend development, including a multi-branch inventory tracking project.";
  }

  if (/\b(ai|artificial intelligence|prompts|myprompts)\b/.test(q)) {
    return "Emman is interested in AI and created MyPrompts, a browser extension for managing reusable prompts across AI websites. Finally, a useful invention from my human.";
  }

  if (/\b(contact|email|hire|reach|message|work together)\b/.test(q)) {
    return "Want to contact Emman or discuss a project? Visit the Contact section of this website.";
  }

  if (/\b(thank|thanks)\b/.test(q)) {
    return "You are welcome. Your gratitude has been noted.";
  }

  return "My knowledge doesn't cover that question yet. Try asking about Emman's background, skills, projects, or how to contact him.";
}

/* ------------------------------------------------------------------ */
/* Minggoy's face: a pixel art white cat head with gold eyes           */
/* b = body, e = eye                                                   */
/* ------------------------------------------------------------------ */

const HEAD = [
  ".b.....b.",
  ".bb...bb.",
  ".bbbbbbb.",
  "bbbbbbbbb",
  "bbebbbebb",
  "bbbbbbbbb",
  ".bbbbbbb.",
];
const HEAD_COLS = 9;
const HEAD_ROWS = 7;
const EAR_FLICK_ROW = "..b....b."; // left ear tip leans in for a moment

// Full class names so Tailwind can see them.
const FILL: Record<string, string> = {
  b: "fill-white",
  e: "fill-[#FFC107]",
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function CatHead({
  px,
  idle = false,
  busy = false,
}: {
  px: number; // size of one pixel on screen
  idle?: boolean; // gentle breathing bob
  busy?: boolean; // quick nodding while Minggoy is "typing"
}) {
  const [blink, setBlink] = useState(false);
  const [flick, setFlick] = useState(false);
  const bobRef = useRef<HTMLSpanElement | null>(null);

  // Blink now and then
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

  // Flick an ear now and then
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;

    const schedule = () => {
      t1 = setTimeout(
        () => {
          setFlick(true);
          t2 = setTimeout(() => {
            setFlick(false);
            schedule();
          }, 180);
        },
        rand(6000, 11000),
      );
    };
    schedule();

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Bob up and down: slowly when idle, quickly while typing
  useEffect(() => {
    const el = bobRef.current;
    if (!el || (!idle && !busy) || prefersReducedMotion()) return;

    const animation = el.animate(
      [
        { transform: "translateY(0)" },
        { transform: `translateY(${busy ? -3 : -2}px)` },
        { transform: "translateY(0)" },
      ],
      {
        duration: busy ? 450 : 2600,
        iterations: Infinity,
        easing: "ease-in-out",
      },
    );

    return () => animation.cancel();
  }, [idle, busy]);

  const pixels = useMemo(() => {
    const out: { x: number; y: number; c: string }[] = [];
    HEAD.forEach((row, y) => {
      let r = row;
      if (y === 0 && flick) r = EAR_FLICK_ROW;
      if (blink) r = r.replace(/e/g, "b");
      [...r].forEach((c, x) => {
        if (c !== ".") out.push({ x, y, c });
      });
    });
    return out;
  }, [blink, flick]);

  return (
    <span ref={bobRef} className="block">
      <svg
        viewBox={`0 0 ${HEAD_COLS} ${HEAD_ROWS}`}
        width={HEAD_COLS * px}
        height={HEAD_ROWS * px}
        shapeRendering="crispEdges"
        aria-hidden="true"
        focusable="false"
        // Soft shadow so the white head stays visible on any background
        className="block [filter:drop-shadow(0_1px_2px_rgb(0_0_0/0.25))]"
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
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* The chat                                                            */
/* ------------------------------------------------------------------ */

export default function MinggoyChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [typing, setTyping] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const replyTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Keep the newest message in view.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    list.scrollTo({
      top: list.scrollHeight,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, [messages, typing, isOpen]);

  // On desktop, put the cursor in the input when the chat opens.
  // (Skipped on touch screens so the keyboard doesn't pop up by itself.)
  useEffect(() => {
    if (isOpen && window.matchMedia("(pointer: fine)").matches) {
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [isOpen]);

  // Escape closes the chat.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeChat();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // Don't leave a pending reply behind if the page unmounts.
  useEffect(() => () => clearTimeout(replyTimer.current), []);

  function closeChat() {
    setIsOpen(false);
    launcherRef.current?.focus();
  }

  function sendMessage(text: string) {
    const question = text.trim();
    if (!question || typing) return;

    const reply = getReply(question);

    setMessages((current) => [...current, { role: "visitor", text: question }]);
    setInput("");
    setTyping(true);

    // Minggoy "types" for a moment; longer answers take a little longer.
    const delay = 550 + Math.min(reply.length * 8, 900);
    replyTimer.current = setTimeout(() => {
      setMessages((current) => [...current, { role: "minggoy", text: reply }]);
      setTyping(false);
    }, delay);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <div className="fixed bottom-5 right-5 z-[100]">
      {/* Always mounted so it can fade and pop smoothly in both directions.
          While closed it is invisible, so it can't be tabbed to or clicked. */}
      <section
        aria-label="Chat with Minggoy"
        className={`mb-3 flex h-[min(520px,70vh)] w-[min(360px,calc(100vw-2.5rem))] origin-bottom-right flex-col overflow-hidden rounded-3xl border border-line-strong bg-surface text-fg shadow-2xl transition-[opacity,transform,visibility] duration-300 ease-out ${
          isOpen
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible translate-y-4 scale-95 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-line-strong p-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent">
            <CatHead px={4} busy={typing} />
          </span>

          <div className="min-w-0 flex-1">
            <p className="font-bold">Minggoy</p>
            <p className="text-xs text-muted">
              {typing ? "Minggoy is typing..." : "Digital cat"}
            </p>
          </div>

          <button
            type="button"
            onClick={closeChat}
            aria-label="Close chat"
            className="rounded-full p-2 transition-colors duration-300 hover:bg-chip cursor-pointer"
          >
            <X size={19} />
          </button>
        </div>

        {/* Messages. data-lenis-prevent lets the mouse wheel scroll this list
            instead of the page behind it. */}
        <div
          ref={listRef}
          data-lenis-prevent
          className="flex-1 space-y-4 overflow-y-auto overscroll-contain p-4"
          aria-live="polite"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex animate-[jumpIn_0.4s_ease-out_both] ${
                message.role === "visitor" ? "justify-end" : "justify-start"
              }`}
            >
              <p
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  message.role === "visitor"
                    ? "rounded-br-sm bg-accent text-on-accent"
                    : "rounded-bl-sm bg-chip text-fg"
                }`}
              >
                {message.text}
              </p>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div className="flex animate-[jumpIn_0.3s_ease-out_both] justify-start">
              <p className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-chip px-3 py-3.5">
                <span className="sr-only">Minggoy is typing</span>
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    aria-hidden="true"
                    className="size-1.5 animate-bounce rounded-full bg-muted motion-reduce:animate-none"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </p>
            </div>
          )}
        </div>

        {/* Suggested questions */}
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 px-3 pb-3">
            {[
              "Who is Emman?",
              "What are his skills?",
              "Show me his projects",
            ].map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => sendMessage(question)}
                className="rounded-full border border-line-strong px-3 py-2 text-xs transition-colors duration-300 hover:bg-chip cursor-pointer"
              >
                {question}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-line-strong p-3"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Minggoy something..."
            aria-label="Your message"
            className="min-w-0 flex-1 rounded-full bg-chip px-4 py-3 text-sm outline-none"
          />

          <button
            type="submit"
            disabled={!input.trim() || typing}
            aria-label="Send message"
            className="rounded-full bg-accent p-3 text-on-accent transition-opacity hover:opacity-80 disabled:opacity-40 cursor-pointer"
          >
            <Send size={17} />
          </button>
        </form>
      </section>

      {/* Floating cat button. Enters with the same jump-in as the rest of the
          site, a moment after the page loads. */}
      <div className="flex animate-[jumpIn_0.7s_ease-out_0.8s_both] justify-end cursor-pointer">
        <button
          ref={launcherRef}
          type="button"
          onClick={() => (isOpen ? closeChat() : setIsOpen(true))}
          aria-label={isOpen ? "Close Minggoy chat" : "Chat with Minggoy"}
          aria-expanded={isOpen}
          className="grid size-[68px] cursor-pointer place-items-center rounded-full bg-accent text-on-accent shadow-xl transition-transform duration-300 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <span className="relative grid size-full place-items-center">
            {/* Cat head and X swap places with a small spin */}
            <span
              className={`absolute transition-[opacity,transform] duration-300 ease-in-out ${
                isOpen
                  ? "-rotate-90 scale-50 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              }`}
            >
              <CatHead px={5} idle />
            </span>
            <span
              className={`absolute transition-[opacity,transform] duration-300 ease-in-out ${
                isOpen
                  ? "rotate-0 scale-100 opacity-100"
                  : "rotate-90 scale-50 opacity-0"
              }`}
            >
              <X size={25} />
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}

/* eslint-disable @next/next/no-page-custom-font */
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import FacebookPixel from "../../../components/FacebookPixel";

// ─── Brand Tokens ──────────────────────────────────────────────────────────────
const C = {
  black: "#0A0A0F",
  navy: "#1A1A2E",
  gold: "#C9A84C",
  goldLt: "#E8C96A",
  crimson: "#7B2D2D",
  crimsonLt: "#E05555",
  parchment: "#E8E0D0",
  muted: "#9A9080",
  white: "#FFFFFF",
} as const;

const amazonLink = "https://www.amazon.com/dp/B082LX6ZWZ";
const videoId = "YOUR_VIDEO_ID";

// ─── Sub-components ────────────────────────────────────────────────────────────

function FadeUp({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Animated gold journey line behind the hero — a purely decorative particle
// trail that travels the same path drawn by getPathPoint on every frame.
function JourneyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      decay: number;
      hue: number;
    };

    let width = 0;
    let height = 0;
    let t = 0;
    let particles: Particle[] = [];
    let animId = 0;

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const getPathPoint = (progress: number) => {
      const startX = width * 0.15;
      const endX = width * 0.85;
      const y =
        height * 0.5 + Math.sin(progress * Math.PI * 2) * (height * 0.06);
      return { x: startX + (endX - startX) * progress, y };
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      t = (t + 0.002) % 1;

      if (particles.length < 120) {
        const spawnT = (t + Math.random() * 0.3) % 1;
        const pt = getPathPoint(spawnT);
        particles.push({
          x: pt.x,
          y: pt.y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 0.5,
          life: 1,
          decay: Math.random() * 0.008 + 0.004,
          hue: 45 + Math.random() * 15,
        });
      }

      ctx.beginPath();
      ctx.strokeStyle = "rgba(201,168,76,0.06)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 100; i++) {
        const pt = getPathPoint(i / 100);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();

      const cur = getPathPoint(t);
      const grd = ctx.createRadialGradient(cur.x, cur.y, 0, cur.x, cur.y, 30);
      grd.addColorStop(0, "rgba(201,168,76,0.25)");
      grd.addColorStop(1, "rgba(201,168,76,0)");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cur.x, cur.y, 30, 0, Math.PI * 2);
      ctx.fill();

      particles = particles.filter((p) => p.life > 0);
      particles.forEach((p) => {
        p.life -= p.decay;
        p.x += p.vx;
        p.y += p.vy;
        ctx.globalAlpha = p.life * 0.7;
        ctx.fillStyle = `hsla(${p.hue}, 70%, 65%, 1)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

function VslBox() {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "720px",
          margin: "0 auto 40px",
          aspectRatio: "16/9",
          background: C.navy,
          border: `1px solid ${C.gold}4D`,
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <iframe
          title="The Return of the King of Kings — VSL"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      className="rok-vsl-box"
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "720px",
        margin: "0 auto 40px",
        background: C.navy,
        border: `1px solid ${C.gold}4D`,
        borderRadius: "4px",
        overflow: "hidden",
        aspectRatio: "16/9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        padding: 0,
      }}
      aria-label="Play the video"
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #0A0A1A 0%, #1A0A0A 100%)",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          width: "60px",
          height: "80px",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0.15,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "8px",
            height: "80px",
            background: C.gold,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "60px",
            height: "8px",
            background: C.gold,
            top: "22px",
            left: 0,
          }}
        />
      </div>
      <div
        className="rok-play-btn"
        style={{
          position: "relative",
          zIndex: 2,
          width: "72px",
          height: "72px",
          background: C.gold,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s, box-shadow 0.2s",
          boxShadow: `0 0 40px ${C.gold}80`,
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill={C.black}
          style={{ marginLeft: "5px" }}
        >
          <polygon points="5,3 18,10 5,17" />
        </svg>
      </div>
      <span
        style={{
          position: "absolute",
          bottom: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'Inter', sans-serif",
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: `${C.parchment}80`,
          zIndex: 2,
          whiteSpace: "nowrap",
        }}
      >
        Watch — Your Life Will Never Look the Same
      </span>
    </button>
  );
}

function PrimaryCta({
  href,
  children,
  block = false,
}: {
  href: string;
  children: React.ReactNode;
  block?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="rok-btn-primary"
      style={{
        display: block ? "block" : "inline-block",
        textAlign: "center",
        background: `linear-gradient(135deg, ${C.gold} 0%, ${C.goldLt} 50%, ${C.gold} 100%)`,
        backgroundSize: "200% 200%",
        color: C.black,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 700,
        fontSize: "1rem",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        textDecoration: "none",
        padding: "18px 48px",
        border: "none",
        borderRadius: "2px",
        cursor: "pointer",
        boxShadow: `0 4px 30px ${C.gold}66`,
      }}
    >
      {children}
    </a>
  );
}

function Divider({ align = "center" }: { align?: "center" | "left" }) {
  return (
    <div
      style={{
        width: "80px",
        height: "1px",
        background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`,
        margin: align === "center" ? "0 auto 48px" : "0 0 48px",
      }}
    />
  );
}

function SectionLabel({
  children,
  center = false,
}: {
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <span
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color: C.gold,
        marginBottom: "16px",
        display: center ? "block" : "inline-block",
        textAlign: center ? "center" : undefined,
      }}
    >
      {children}
    </span>
  );
}

const discoverItems = [
  {
    title: "The complete redemption timeline",
    body: "from the birth of Jesus to the New Jerusalem, in chronological order for the first time",
  },
  {
    title: "The 7 Churches, 7 Seals and 7 Trumpets decoded",
    body: "not as abstract symbols but as real historical periods you can place on a map and a calendar",
  },
  {
    title: "The Final Events unfolding right now",
    body: "the Sunday Law, the Mark of the Beast, the Three Angels' Messages, Armageddon explained",
  },
  {
    title: "The 2300-year prophecy of Daniel 8",
    body: "the most precise prophetic clock in all of Scripture, and what it means for today",
  },
  {
    title: "Why the end of the world is not the end",
    body: "the Millennium, the New Earth, and the Eternal Kingdom in plain language",
  },
  {
    title: "How to have peace, hope and joy today",
    body: "not in spite of the chaos, but because you understand where it is all going",
    emphasizeBody: true,
  },
];

const timelineItems = [
  { date: "31 AD", label: "Calvary & Resurrection" },
  { date: "34–100", label: "7 Churches Begin" },
  { date: "538 AD", label: "The Dark Age" },
  { date: "1844", label: "Investigative Judgment" },
  { date: "NOW", label: "Final Events" },
  { date: "SOON", label: "The Return" },
  { date: "∞", label: "Eternal Kingdom" },
];

const testimonials = [
  {
    quote:
      "I have read many books on Revelation and never understood it until this one. The chronological approach changed everything. I finally see the big picture.",
    name: "Michael T.",
    location: "Texas, USA",
  },
  {
    quote:
      "This is not a book about fear. It is a book about hope. I was going through the darkest season of my life when I read it, and it anchored me.",
    name: "Sarah K.",
    location: "California, USA",
  },
  {
    quote:
      "Ismael has a gift for making complex prophecy accessible without dumbing it down. Every chapter connected scripture to history to today. Extraordinary.",
    name: "Pastor David M.",
    location: "Georgia, USA",
  },
];

const formats = [
  { label: "📖 Paperback" },
  { label: "📱 Kindle" },
  { label: "📦 Hardcover" },
] as const;

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function KingOfKingsPage() {
  const [activeFormat, setActiveFormat] = useState<string>(formats[0].label);

  return (
    <>
      {/* ── Font imports ── */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* ── Global page styles ── */}
      <style>{`
        .rok-root * { box-sizing: border-box; }
        .rok-root { font-family: 'EB Garamond', serif; }
        .rok-btn-primary { transition: background-position 0.4s, transform 0.2s, box-shadow 0.2s; animation: rok-shimmer 3s ease infinite; }
        .rok-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 40px ${C.gold}99 !important; }
        @keyframes rok-shimmer { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        .rok-vsl-box:hover .rok-play-btn { transform: scale(1.08); box-shadow: 0 0 60px ${C.gold}B3 !important; }
        .rok-problem-item { transition: border-color 0.3s; }
        .rok-problem-item:hover { border-color: ${C.gold}66 !important; }
        .rok-testimonial-card { transition: border-color 0.3s; }
        .rok-testimonial-card:hover { border-color: ${C.gold}59 !important; }
        .rok-format-btn { transition: all 0.2s; }
        .rok-format-btn:hover, .rok-format-btn.active { background: ${C.gold}26 !important; border-color: ${C.gold} !important; color: ${C.gold} !important; }
        .rok-tl-item:not(:last-child) .rok-tl-dot::after {
          content: '';
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          width: calc(100% + 60px);
          min-width: 40px;
          height: 1px;
          background: linear-gradient(90deg, ${C.gold}, ${C.gold}4D);
        }

        @media (max-width: 768px) {
          .rok-section { padding: 70px 20px !important; }
          .rok-book-layout { grid-template-columns: 1fr !important; }
          .rok-book-cover-wrap { position: static !important; }
          .rok-author-layout { flex-direction: column !important; align-items: center !important; text-align: center !important; }
          .rok-credential-row { justify-content: center !important; }
          .rok-offer-box { padding: 40px 24px !important; }
          .rok-guarantee-box { flex-direction: column !important; }
          .rok-tl-item:not(:last-child) .rok-tl-dot::after { display: none !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .rok-btn-primary { animation: none !important; }
        }
      `}</style>

      <main
        className="rok-root"
        style={{
          background: C.black,
          color: C.parchment,
          fontSize: "18px",
          lineHeight: 1.7,
          overflowX: "hidden",
        }}
      >
        {/* ANNOUNCEMENT */}
        <div
          style={{
            background: C.crimson,
            textAlign: "center",
            padding: "10px 20px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: C.white,
          }}
        >
          Now Available on Amazon —{" "}
          <span style={{ color: C.goldLt }}>Paperback & Kindle Edition</span>
        </div>

        {/* NAV */}
        <nav
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px 40px",
            borderBottom: `1px solid ${C.gold}26`,
          }}
        >
          <a
            href="https://ismaelsilva.org"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.2em",
              color: C.gold,
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Ismael Silva · ismaelsilva.org
          </a>
        </nav>

        {/* HERO */}
        <section
          style={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "80px 20px 60px",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(123,45,45,0.25) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(201,168,76,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 60%, rgba(26,26,46,0.8) 0%, transparent 50%)",
            }}
          />
          <JourneyCanvas />

          <div style={{ position: "relative", zIndex: 1, maxWidth: "860px" }}>
            <span
              style={{
                display: "inline-block",
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: C.gold,
                border: `1px solid ${C.gold}66`,
                borderRadius: "2px",
                padding: "6px 16px",
                marginBottom: "28px",
              }}
            >
              Volume 2 · The Cosmic Conflict Series
            </span>

            <h1
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
                fontWeight: 900,
                lineHeight: 1.1,
                color: C.white,
                marginBottom: "12px",
                textShadow: `0 0 60px ${C.gold}33`,
              }}
            >
              The <span style={{ color: C.gold }}>Return</span> of the
              <br />
              <span style={{ color: C.crimsonLt }}>King</span> of Kings
            </h1>

            <p
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(0.9rem, 2vw, 1.15rem)",
                fontWeight: 400,
                letterSpacing: "0.12em",
                color: C.muted,
                marginBottom: "36px",
              }}
            >
              The Great Hope: From Calvary to the Eternal Kingdom
            </p>

            <p
              style={{
                fontSize: "1.2rem",
                color: C.parchment,
                maxWidth: "640px",
                margin: "0 auto 48px",
                opacity: 0.9,
              }}
            >
              What if you could see the{" "}
              <em style={{ color: C.goldLt, fontStyle: "italic" }}>
                end of history
              </em>{" "}
              — and discover it was actually a beginning? A chronological
              journey through Revelation and the Final Events, written for real
              people carrying real pain.
            </p>

            <VslBox />

            <PrimaryCta href={amazonLink}>Get Your Copy on Amazon →</PrimaryCta>
            <span
              style={{
                display: "block",
                marginTop: "10px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                color: C.muted,
                letterSpacing: "0.05em",
              }}
            >
              Available in Paperback · Kindle · Hardcover
            </span>
          </div>
        </section>

        <div
          style={{
            width: "100%",
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${C.gold}4D, transparent)`,
          }}
        />

        {/* PROBLEM */}
        <FadeUp>
          <section
            className="rok-section"
            style={{
              padding: "100px 20px",
              background: C.navy,
              textAlign: "center",
            }}
          >
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
              <SectionLabel center>The world you live in</SectionLabel>
              <h2
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  fontWeight: 700,
                  color: C.white,
                  lineHeight: 1.2,
                  marginBottom: "24px",
                }}
              >
                You Were Not Made
                <br />
                for <span style={{ color: C.gold }}>This Much Pain</span>
              </h2>
              <Divider />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "32px",
                  margin: "56px 0",
                }}
              >
                {[
                  {
                    icon: "🏥",
                    title: "A frightening diagnosis",
                    body: "Waiting for results that could change everything",
                  },
                  {
                    icon: "💔",
                    title: "A marriage falling apart",
                    body: "The person you built your life with is a stranger",
                  },
                  {
                    icon: "📉",
                    title: "Financial ruin",
                    body: "Drowning in debt with no clear way out",
                  },
                  {
                    icon: "🌍",
                    title: "A world on fire",
                    body: "Wars, division, collapse — and no one has answers",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rok-problem-item"
                    style={{
                      textAlign: "center",
                      padding: "32px 20px",
                      border: `1px solid ${C.gold}26`,
                      borderRadius: "2px",
                      background: "rgba(10,10,15,0.5)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "2rem",
                        marginBottom: "16px",
                        display: "block",
                      }}
                    >
                      {item.icon}
                    </span>
                    <h3
                      style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: C.parchment,
                        marginBottom: "8px",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        opacity: 0.6,
                        margin: 0,
                        color: C.parchment,
                      }}
                    >
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>

              <p
                style={{
                  fontSize: "1.2rem",
                  maxWidth: "600px",
                  margin: "0 auto",
                  color: C.parchment,
                  opacity: 0.9,
                }}
              >
                You are not alone. And this is not the end of the story.
                <br />
                <em style={{ color: C.goldLt, fontStyle: "italic" }}>
                  The desert you are walking through has a name — and an exit.
                </em>
              </p>
            </div>
          </section>
        </FadeUp>

        <div
          style={{
            width: "100%",
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${C.gold}4D, transparent)`,
          }}
        />

        {/* REVELATION HOOK */}
        <FadeUp>
          <section
            className="rok-section"
            style={{ padding: "100px 20px", textAlign: "center" }}
          >
            <div style={{ maxWidth: "680px", margin: "0 auto" }}>
              <SectionLabel center>
                The Answer You&apos;ve Been Looking For
              </SectionLabel>
              <h2
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  fontWeight: 700,
                  color: C.white,
                  lineHeight: 1.2,
                  marginBottom: "24px",
                }}
              >
                The Book of Revelation Was Not
                <br />
                Written to <span style={{ color: C.gold }}>Frighten</span> You
              </h2>
              <Divider />
              <p
                style={{
                  fontSize: "1.15rem",
                  color: C.parchment,
                  opacity: 0.9,
                }}
              >
                It was written to{" "}
                <strong style={{ color: C.goldLt }}>set you free.</strong> It is
                the greatest love letter ever sent to a humanity lost in
                darkness — and most people have never understood it from
                beginning to end.
              </p>
              <p style={{ color: C.parchment, opacity: 0.9 }}>Until now.</p>

              <div
                style={{
                  position: "relative",
                  maxWidth: "600px",
                  margin: "48px auto",
                  padding: "40px 48px",
                  borderLeft: `3px solid ${C.gold}`,
                  background: `${C.gold}0A`,
                  textAlign: "left",
                }}
              >
                <p
                  style={{
                    fontSize: "1.3rem",
                    fontStyle: "italic",
                    color: C.parchment,
                    opacity: 1,
                    marginBottom: "12px",
                  }}
                >
                  &ldquo;Blessed is the one who reads aloud the words of this
                  prophecy, and blessed are those who hear it and take to heart
                  what is written in it, because the time is near.&rdquo;
                </p>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: C.gold,
                  }}
                >
                  — Revelation 1:3
                </span>
              </div>

              <p
                style={{
                  fontSize: "1.15rem",
                  color: C.parchment,
                  opacity: 0.9,
                }}
              >
                This book takes you on a{" "}
                <strong style={{ color: C.goldLt }}>
                  unique chronological journey
                </strong>{" "}
                — not a collection of symbols to decode, but a living narrative
                of history: from the Cross of Calvary to the Eternal Kingdom,
                told in the order it happened and the order it will happen.
              </p>
            </div>
          </section>
        </FadeUp>

        {/* TIMELINE STRIP */}
        <FadeUp>
          <div
            style={{
              background: C.black,
              padding: "60px 20px",
              textAlign: "center",
              overflow: "hidden",
            }}
          >
            <SectionLabel center>Your Journey Through the Book</SectionLabel>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                maxWidth: "900px",
                margin: "40px auto 0",
                flexWrap: "wrap",
                gap: "4px",
              }}
            >
              {timelineItems.map((item) => (
                <div
                  key={item.label}
                  className="rok-tl-item"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flex: 1,
                    minWidth: "90px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "11px",
                      color: C.gold,
                      marginBottom: "4px",
                    }}
                  >
                    {item.date}
                  </div>
                  <div
                    className="rok-tl-dot"
                    style={{
                      width: "10px",
                      height: "10px",
                      background: C.gold,
                      borderRadius: "50%",
                      marginBottom: "8px",
                      position: "relative",
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "10px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: C.muted,
                      textAlign: "center",
                      maxWidth: "80px",
                    }}
                  >
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        <div
          style={{
            width: "100%",
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${C.gold}4D, transparent)`,
          }}
        />

        {/* BOOK REVEAL */}
        <FadeUp>
          <section
            className="rok-section"
            style={{ padding: "100px 20px", background: C.navy }}
          >
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
              <div
                className="rok-book-layout"
                style={{
                  display: "grid",
                  gridTemplateColumns: "280px 1fr",
                  gap: "72px",
                  alignItems: "start",
                }}
              >
                <div
                  className="rok-book-cover-wrap"
                  style={{
                    position: "sticky",
                    top: "40px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      maxWidth: "260px",
                      aspectRatio: "6/9",
                      margin: "0 auto 20px",
                      borderRadius: "2px",
                      overflow: "hidden",
                      border: `1px solid ${C.gold}66`,
                      boxShadow:
                        "-8px 8px 40px rgba(0,0,0,0.8), 0 0 40px rgba(201,168,76,0.1)",
                    }}
                  >
                    <Image
                      src="/ministry-images/book-king.jpg"
                      alt="The Return of the King of Kings — Book Cover by Ismael Silva"
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="260px"
                      priority
                    />
                  </div>
                  <div
                    style={{
                      color: C.gold,
                      fontSize: "1.1rem",
                      letterSpacing: "2px",
                    }}
                  >
                    ★★★★★{" "}
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "12px",
                        color: C.muted,
                        marginLeft: "6px",
                      }}
                    >
                      Amazon Reviews
                    </span>
                  </div>
                </div>

                <div>
                  <SectionLabel>What&apos;s Inside</SectionLabel>
                  <h2
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                      fontWeight: 700,
                      color: C.white,
                      lineHeight: 1.2,
                      marginBottom: "24px",
                    }}
                  >
                    Everything You Need to{" "}
                    <span style={{ color: C.gold }}>Understand the End</span> —
                    and Hold On to Hope
                  </h2>
                  <Divider align="left" />

                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: "0 0 40px",
                    }}
                  >
                    {discoverItems.map((item) => (
                      <li
                        key={item.title}
                        style={{
                          display: "flex",
                          gap: "16px",
                          padding: "20px 0",
                          borderBottom: `1px solid ${C.gold}1A`,
                          alignItems: "flex-start",
                        }}
                      >
                        <div
                          style={{
                            flexShrink: 0,
                            width: "24px",
                            height: "24px",
                            background: `${C.gold}26`,
                            border: `1px solid ${C.gold}66`,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: "3px",
                          }}
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <polyline
                              points="2,6 5,9 10,3"
                              stroke={C.gold}
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "1rem",
                            color: C.parchment,
                          }}
                        >
                          <strong style={{ color: C.goldLt }}>
                            {item.title}
                          </strong>{" "}
                          —{" "}
                          {item.emphasizeBody ? (
                            <em
                              style={{ color: C.goldLt, fontStyle: "italic" }}
                            >
                              {item.body}
                            </em>
                          ) : (
                            item.body
                          )}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <PrimaryCta href={amazonLink}>Get Your Copy Now →</PrimaryCta>
                  <span
                    style={{
                      display: "block",
                      marginTop: "10px",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "12px",
                      color: C.muted,
                      letterSpacing: "0.05em",
                    }}
                  >
                    Paperback · Kindle · Free Preview Available on Amazon
                  </span>
                </div>
              </div>
            </div>
          </section>
        </FadeUp>

        <div
          style={{
            width: "100%",
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${C.gold}4D, transparent)`,
          }}
        />

        {/* AUTHOR */}
        <FadeUp>
          <section
            className="rok-section"
            style={{ padding: "100px 20px", textAlign: "center" }}
          >
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
              <SectionLabel center>About the Author</SectionLabel>
              <h2
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  fontWeight: 700,
                  color: C.white,
                  lineHeight: 1.2,
                  marginBottom: "24px",
                }}
              >
                Written by Someone Who{" "}
                <span style={{ color: C.gold }}>Lived It</span>
              </h2>
              <Divider />

              <div
                className="rok-author-layout"
                style={{
                  display: "flex",
                  gap: "60px",
                  alignItems: "flex-start",
                  textAlign: "left",
                  maxWidth: "800px",
                  margin: "0 auto",
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: "180px",
                    height: "220px",
                    position: "relative",
                    borderRadius: "2px",
                    overflow: "hidden",
                    border: `1px solid ${C.gold}4D`,
                  }}
                >
                  <Image
                    src="/ministry-images/ismael-profile23.jpg"
                    alt="Ismael Silva — Pastor, Theologian & Author"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                    sizes="180px"
                  />
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "3px",
                      background: `linear-gradient(90deg, ${C.gold}, ${C.crimson})`,
                    }}
                  />
                </div>

                <div>
                  <h3
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      color: C.gold,
                      marginBottom: "10px",
                    }}
                  >
                    Ismael Silva
                  </h3>
                  <div
                    className="rok-credential-row"
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      margin: "20px 0",
                    }}
                  >
                    {[
                      "⛪ Pastor & Theologian",
                      "🥋 BJJ World Champion",
                      "🎓 Harvard CS50",
                      "📚 Master's in Leadership",
                    ].map((c) => (
                      <span
                        key={c}
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "11px",
                          fontWeight: 500,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: C.gold,
                          background: `${C.gold}1A`,
                          border: `1px solid ${C.gold}40`,
                          padding: "4px 12px",
                          borderRadius: "2px",
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                  <p
                    style={{
                      color: C.parchment,
                      opacity: 0.9,
                      marginBottom: "1.2em",
                    }}
                  >
                    Ismael Silva is not writing from the outside looking in. He
                    spent more than two decades inside the institutions this
                    book describes — planting churches, discipling leaders, and
                    navigating the apostasy he writes about firsthand in New
                    Zealand and Brazil.
                  </p>
                  <p
                    style={{
                      color: C.parchment,
                      opacity: 0.9,
                      marginBottom: "1.2em",
                    }}
                  >
                    He has delivered over{" "}
                    <strong style={{ color: C.goldLt }}>1,000 talks</strong> to
                    audiences on four continents, composed more than 30 original
                    songs, and authored multiple books in the{" "}
                    <em style={{ fontStyle: "italic" }}>Cosmic Conflict</em>{" "}
                    series. He is a two-time Brazilian Jiu-Jitsu World Champion
                    — the same tenacity, clarity and refusal to quit that won
                    Double Gold in Japan runs through every page of this book.
                  </p>
                  <p
                    style={{
                      color: C.parchment,
                      opacity: 0.6,
                      fontSize: "0.9rem",
                      marginBottom: "1.2em",
                    }}
                  >
                    Ismael writes, leads, and builds from the conviction that
                    the local church — messy, unglamorous, and entirely
                    indestructible — is worth fighting for.
                  </p>
                  <a
                    href="https://ismaelsilva.org"
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{
                      color: C.gold,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                    }}
                  >
                    ismaelsilva.org →
                  </a>
                </div>
              </div>
            </div>
          </section>
        </FadeUp>

        <div
          style={{
            width: "100%",
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${C.gold}4D, transparent)`,
          }}
        />

        {/* TESTIMONIALS */}
        <FadeUp>
          <section
            className="rok-section"
            style={{ padding: "100px 20px", background: C.navy }}
          >
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
              <SectionLabel center>What Readers Are Saying</SectionLabel>
              <h2
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  fontWeight: 700,
                  color: C.white,
                  lineHeight: 1.2,
                  marginBottom: "24px",
                  textAlign: "center",
                }}
              >
                Lives Changed by{" "}
                <span style={{ color: C.gold }}>The Great Hope</span>
              </h2>
              <Divider />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "28px",
                  marginTop: "56px",
                }}
              >
                {testimonials.map((t) => (
                  <div
                    key={t.name}
                    className="rok-testimonial-card"
                    style={{
                      background: "rgba(10,10,15,0.6)",
                      border: `1px solid ${C.gold}26`,
                      borderRadius: "2px",
                      padding: "32px 28px",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: "4rem",
                        color: C.gold,
                        opacity: 0.2,
                        lineHeight: 1,
                        marginBottom: "-10px",
                        display: "block",
                      }}
                    >
                      &ldquo;
                    </span>
                    <div
                      style={{
                        color: C.gold,
                        fontSize: "0.8rem",
                        marginBottom: "8px",
                      }}
                    >
                      ★★★★★
                    </div>
                    <p
                      style={{
                        fontSize: "1rem",
                        fontStyle: "italic",
                        marginBottom: "20px",
                        opacity: 0.85,
                        color: C.parchment,
                      }}
                    >
                      {t.quote}
                    </p>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: C.gold,
                      }}
                    >
                      {t.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "11px",
                        color: C.muted,
                        marginTop: "2px",
                      }}
                    >
                      {t.location}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeUp>

        <div
          style={{
            width: "100%",
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${C.gold}4D, transparent)`,
          }}
        />

        {/* OFFER */}
        <FadeUp>
          <section
            className="rok-section"
            style={{
              padding: "100px 20px",
              textAlign: "center",
              background: C.black,
            }}
          >
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
              <SectionLabel center>Get Your Copy</SectionLabel>
              <h2
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  fontWeight: 700,
                  color: C.white,
                  lineHeight: 1.2,
                  marginBottom: "24px",
                  textAlign: "center",
                }}
              >
                Ready to See the{" "}
                <span style={{ color: C.gold }}>End of the Story?</span>
              </h2>
              <Divider />

              <div
                className="rok-offer-box"
                style={{
                  maxWidth: "580px",
                  margin: "0 auto",
                  background: "linear-gradient(145deg, #0F0F1F, #1A0A0A)",
                  border: `1px solid ${C.gold}66`,
                  borderRadius: "4px",
                  padding: "60px 48px",
                  position: "relative",
                }}
              >
                <p
                  style={{
                    fontSize: "1.1rem",
                    textAlign: "center",
                    marginBottom: "8px",
                    color: C.parchment,
                  }}
                >
                  Choose your format:
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    justifyContent: "center",
                    margin: "28px 0",
                    flexWrap: "wrap",
                  }}
                >
                  {formats.map((f) => (
                    <a
                      key={f.label}
                      href={amazonLink}
                      target="_blank"
                      rel="noreferrer noopener"
                      onClick={() => setActiveFormat(f.label)}
                      className={`rok-format-btn${
                        activeFormat === f.label ? " active" : ""
                      }`}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        padding: "10px 24px",
                        border: `1px solid ${C.gold}66`,
                        color: C.parchment,
                        background: "transparent",
                        borderRadius: "2px",
                        cursor: "pointer",
                        textDecoration: "none",
                      }}
                    >
                      {f.label}
                    </a>
                  ))}
                </div>
                <div style={{ margin: "32px 0" }}>
                  <div
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "3.5rem",
                      fontWeight: 700,
                      color: C.gold,
                      lineHeight: 1,
                    }}
                  >
                    From $14.99
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "12px",
                      color: C.muted,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginTop: "6px",
                    }}
                  >
                    Kindle Edition Available · Free with Kindle Unlimited
                  </div>
                </div>
                <PrimaryCta href={amazonLink} block>
                  Order on Amazon →
                </PrimaryCta>
                <span
                  style={{
                    display: "block",
                    textAlign: "center",
                    marginTop: "10px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px",
                    color: C.muted,
                    letterSpacing: "0.05em",
                  }}
                >
                  Ships Worldwide · Instant Kindle Delivery
                </span>
              </div>

              <div
                className="rok-guarantee-box"
                style={{
                  display: "flex",
                  gap: "24px",
                  alignItems: "flex-start",
                  maxWidth: "560px",
                  margin: "48px auto 0",
                  textAlign: "left",
                  padding: "32px",
                  border: `1px solid ${C.gold}33`,
                  borderRadius: "2px",
                  background: `${C.gold}08`,
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: "56px",
                    height: "56px",
                    border: `2px solid ${C.gold}`,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                  }}
                >
                  🛡
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: C.gold,
                      marginBottom: "8px",
                    }}
                  >
                    Amazon&apos;s 30-Day Guarantee
                  </h3>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      opacity: 0.7,
                      margin: 0,
                      color: C.parchment,
                    }}
                  >
                    All purchases are protected by Amazon&apos;s standard return
                    policy. If this book does not move you, return it — no
                    questions asked.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </FadeUp>

        {/* FINAL CTA */}
        <FadeUp>
          <section
            style={{
              textAlign: "center",
              padding: "120px 20px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.12) 0%, transparent 60%), radial-gradient(ellipse at 50% 0%, rgba(123,45,45,0.15) 0%, transparent 50%)",
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                maxWidth: "680px",
                margin: "0 auto",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  fontWeight: 700,
                  color: C.white,
                  lineHeight: 1.2,
                  marginBottom: "24px",
                }}
              >
                The Desert You Are Walking Through
                <br />
                Has an <span style={{ color: C.gold }}>End.</span>
              </h2>
              <p
                style={{
                  fontSize: "1.15rem",
                  margin: "24px auto 40px",
                  maxWidth: "500px",
                  color: C.parchment,
                  opacity: 0.9,
                }}
              >
                And what comes after it is beyond anything you have ever
                imagined. The King is returning. And He is bringing everything
                He promised.
              </p>
              <p
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: "1.3rem",
                  fontStyle: "italic",
                  color: C.goldLt,
                  maxWidth: "500px",
                  margin: "0 auto 12px",
                }}
              >
                &ldquo;Blessed is the one who reads aloud the words of this
                prophecy.&rdquo;
              </p>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: C.muted,
                  marginBottom: "48px",
                  display: "block",
                }}
              >
                — Revelation 1:3
              </span>
              <PrimaryCta href={amazonLink}>Begin the Journey →</PrimaryCta>
              <span
                style={{
                  display: "block",
                  marginTop: "10px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "12px",
                  color: C.muted,
                  letterSpacing: "0.05em",
                }}
              >
                Available Now on Amazon
              </span>
            </div>
          </section>
        </FadeUp>

        {/* FOOTER */}
        <footer
          style={{
            background: C.black,
            borderTop: `1px solid ${C.gold}1A`,
            padding: "40px 20px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              color: C.muted,
              margin: 0,
              opacity: 0.6,
            }}
          >
            © {new Date().getFullYear()} Ismael Silva ·{" "}
            <a
              href="https://ismaelsilva.org"
              style={{ color: C.gold, textDecoration: "none" }}
            >
              ismaelsilva.org
            </a>{" "}
            · Series: The Cosmic Conflict
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              color: C.muted,
              margin: "8px 0 0",
              opacity: 0.6,
            }}
          >
            This site is not affiliated with or endorsed by Amazon. Amazon and
            Kindle are trademarks of Amazon.com, Inc.
          </p>
        </footer>

        <FacebookPixel />
      </main>
    </>
  );
}

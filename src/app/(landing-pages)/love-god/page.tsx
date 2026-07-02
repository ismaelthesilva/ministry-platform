/* eslint-disable @next/next/no-page-custom-font */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import FacebookPixel from "../../../components/FacebookPixel";

// ─── Brand Tokens ──────────────────────────────────────────────────────────────
const C = {
  navy: "#1a2a4a",
  navyDark: "#0d1a2e",
  gold: "#b8860b",
  cream: "#f5f3f0",
  red: "#c41e3a",
  white: "#ffffff",
  muted: "#9da8b9",
  mutedDark: "#6a7a8a",
  bodyText: "#3a4a5a",
} as const;

// ─── Sub-components ────────────────────────────────────────────────────────────

function CountdownTimer() {
  // Always start with a stable value so SSR and initial client render match.
  // sessionStorage is read only inside useEffect (client-only).
  const [time, setTime] = useState({ h: 23, m: 59, s: 59 });

  useEffect(() => {
    let deadline = Number(sessionStorage.getItem("lghc_deadline") ?? 0);
    if (!deadline || deadline < Date.now()) {
      deadline = Date.now() + 24 * 60 * 60 * 1000;
      sessionStorage.setItem("lghc_deadline", String(deadline));
    }

    const update = () => {
      const diff = Math.max(0, Math.floor((deadline - Date.now()) / 1000));
      setTime({
        h: Math.floor(diff / 3600),
        m: Math.floor((diff % 3600) / 60),
        s: diff % 60,
      });
    };

    update(); // sync immediately on mount
    const tick = setInterval(update, 1000);
    return () => clearInterval(tick);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
      {(["h", "m", "s"] as const).map((unit, i) => (
        <React.Fragment key={unit}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                background: C.navyDark,
                border: `1px solid ${C.gold}60`,
                color: C.gold,
                fontSize: "clamp(28px, 5vw, 40px)",
                fontWeight: 800,
                padding: "10px 18px",
                borderRadius: "8px",
                minWidth: "68px",
                fontFamily: "monospace",
                letterSpacing: "2px",
              }}
            >
              {pad(time[unit])}
            </div>
            <div
              style={{
                color: C.muted,
                fontSize: "10px",
                marginTop: "5px",
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              {["Hours", "Mins", "Secs"][i]}
            </div>
          </div>
          {i < 2 && (
            <div
              style={{
                color: C.gold,
                fontSize: "clamp(28px, 5vw, 40px)",
                fontWeight: 800,
                alignSelf: "flex-start",
                paddingTop: "10px",
                lineHeight: 1,
              }}
            >
              :
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        border: `1px solid ${C.gold}50`,
        borderRadius: "10px",
        overflow: "hidden",
        marginBottom: "12px",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{
          width: "100%",
          background: C.navy,
          color: C.cream,
          padding: "20px 24px",
          textAlign: "left",
          border: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          fontSize: "16px",
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 600,
          lineHeight: 1.4,
        }}
      >
        <span>{question}</span>
        <span
          style={{
            color: C.gold,
            fontSize: "22px",
            fontWeight: 400,
            lineHeight: 1,
            flexShrink: 0,
            transition: "transform 0.2s",
            transform: open ? "rotate(45deg)" : "none",
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div
          style={{
            background: C.cream,
            color: C.navy,
            padding: "20px 24px",
            fontSize: "16px",
            lineHeight: 1.75,
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {answer}
        </div>
      )}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function LoveGodPage() {
  const amazonLink = "https://www.amazon.com/dp/B0H6TZXKZB";

  const chapters = [
    {
      n: "01",
      title: "The Parking Lot Epiphany",
      desc: "Why the moment you couldn't go back was the beginning of something new.",
    },
    {
      n: "02",
      title: "What 'Church' Actually Means",
      desc: "Separating the Greek ekklesia from the American institution.",
    },
    {
      n: "03",
      title: "The NDA and the Machine",
      desc: "How institutional self-preservation silences the wounded.",
    },
    {
      n: "04",
      title: "The Exit Interview",
      desc: "What happens when retention strategies replace restoration.",
    },
    {
      n: "05",
      title: "Leaving Without Losing Jesus",
      desc: "You don't have to choose between your faith and your sanity.",
    },
    {
      n: "06",
      title: "The 40 Million",
      desc: "You are not alone — and your story is part of a larger movement.",
    },
    {
      n: "07",
      title: "Finding the Family Again",
      desc: "What authentic Christian community actually looks like.",
    },
    {
      n: "08",
      title: "Permission to Grieve",
      desc: "The church hurt is real. The grief is valid. Here's how to move through it.",
    },
    {
      n: "09",
      title: "Leadership That Bleeds",
      desc: "What shepherds who protect their sheep look like — and how to find them.",
    },
    {
      n: "10",
      title: "Corruption, Cover-up, and Accountability",
      desc: "Naming the problem without surrendering to cynicism.",
    },
    {
      n: "11",
      title: "The Remnant Always Remains",
      desc: "Why the true Church never dies, even when institutions collapse.",
    },
    {
      n: "12",
      title: "Your Next Step",
      desc: "A practical roadmap for finding, or building, the community you were made for.",
    },
  ];

  const faqs = [
    {
      q: "Is this a memoir or theology?",
      a: "It's both — and intentionally so. Each chapter weaves personal narrative with theological reflection. You'll find rigorous biblical analysis grounded in real-life stories from Ismael's decades in ministry, church planting, and pastoral care.",
    },
    {
      q: "Will this help me if I'm still attending church?",
      a: "Absolutely. Many readers are still inside the institution and wrestling with what they see. This book helps you think clearly, love wisely, and discern the difference between the Church of Jesus and the machine that sometimes replaces it.",
    },
    {
      q: "What if I was never in a mega-church?",
      a: "The wounds described in this book are not unique to mega-churches. Small congregations, denominations, and independent churches all wrestle with institutional dysfunction. If you've felt disillusioned, this book speaks to you.",
    },
    {
      q: "How long is the book?",
      a: "78,000 words across 12 chapters. It reads like a conversation — not a lecture. Most readers finish it in 5–7 sittings.",
    },
    {
      q: "Can I get a signed copy?",
      a: "Signed hardcover copies are available for pre-order through this page. Scroll up or click 'Pre-order Signed Hardcover' — limited quantities available.",
    },
  ];

  const testimonials = [
    {
      quote:
        "I left my church three years ago and carried the guilt like a stone. This book finally put it down. Ismael doesn't let the institution off the hook — and he doesn't let us wallow either. It's the most honest thing I've read about faith in years.",
      name: "Rachel M.",
      role: "Former worship leader, now house church member",
    },
    {
      quote:
        "As a pastor, I've watched too many people leave without anyone asking why. Ismael's framework gave me language for those conversations. This book should be in every pastor's library.",
      name: "Pastor David K.",
      role: "Senior Pastor, Covenant Church",
    },
    {
      quote:
        "I was skeptical — another 'church hurt' book? But this isn't that. It's theological. It's precise. And it changed how I lead. I required my entire staff to read it.",
      name: "Pastor Leah T.",
      role: "Executive Pastor, multi-site church",
    },
  ];

  return (
    <>
      {/* ── Font imports ── */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* ── Global page styles ── */}
      <style>{`
        .lghc-root * { box-sizing: border-box; }
        .lghc-root { font-family: 'Poppins', system-ui, sans-serif; }
        .lghc-cta-red:hover  { filter: brightness(1.1);  transform: translateY(-2px); }
        .lghc-cta-gold:hover { filter: brightness(1.08); transform: translateY(-2px); }
        .lghc-cta-outline:hover { background: rgba(245,243,240,0.1) !important; }
        .lghc-cta-red, .lghc-cta-gold, .lghc-cta-outline { transition: all 0.2s ease; }
        .lghc-chapter-card:hover { border-color: ${C.gold} !important; background: ${C.navy}08 !important; }
        .lghc-chapter-card { transition: all 0.2s ease; }

        /* ── Tablet (769 – 1024 px) ── */
        @media (min-width: 769px) and (max-width: 1024px) {
          .lghc-testimonial-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .lghc-pillar-grid      { grid-template-columns: repeat(2, 1fr) !important; }
          .lghc-chapter-grid     { grid-template-columns: 1fr !important; }
        }

        /* ── Mobile (≤ 768 px) ── */
        @media (max-width: 768px) {
          /* Section padding */
          .lghc-section-padded { padding: 56px 20px !important; }
          .lghc-hero-section   { padding: 48px 20px 40px !important; }

          /* Problem section: stack vertically, photo on top */
          .lghc-problem-grid    { flex-direction: column !important; align-items: center !important; }
          .lghc-author-photo-col {
            order: -1 !important;
            display: block !important;
            width: 170px !important;
            height: 170px !important;
            border-radius: 50% !important;
            aspect-ratio: auto !important;
          }

          /* Author bio: stack avatar + center it */
          .lghc-author-bio-grid { grid-template-columns: 1fr !important; justify-items: center !important; }
          .lghc-author-bio-grid > div:last-child { text-align: left !important; width: 100% !important; }

          /* All 3-col and 2-col grids collapse to 1 col */
          .lghc-pillar-grid      { grid-template-columns: 1fr !important; }
          .lghc-testimonial-grid { grid-template-columns: 1fr !important; }
          .lghc-chapter-grid     { grid-template-columns: 1fr !important; }
          .lghc-pricing-grid     { grid-template-columns: 1fr !important; max-width: 300px !important; margin-left: auto !important; margin-right: auto !important; }
          .lghc-email-form       { flex-direction: column !important; }
        }

        /* ── Small phones (≤ 480 px) ── */
        @media (max-width: 480px) {
          .lghc-section-padded { padding: 44px 16px !important; }
          .lghc-hero-section   { padding: 36px 16px 32px !important; }
          .lghc-author-photo-col { width: 140px !important; height: 140px !important; }
        }
      `}</style>

      <main
        className="lghc-root"
        style={{ background: C.cream, color: C.navy }}
      >
        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 1 — HERO / VSL
        ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="lghc-hero-section"
          style={{
            background: `linear-gradient(160deg, ${C.navy} 0%, ${C.navyDark} 100%)`,
            padding: "64px 24px 56px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "820px", margin: "0 auto" }}>
            {/* Eyebrow */}
            <p
              style={{
                color: C.gold,
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "4px",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              A New Book by Ismael Silva
            </p>

            {/* H1 */}
            <h1
              style={{
                fontSize: "clamp(34px, 6.5vw, 58px)",
                fontWeight: 800,
                color: C.cream,
                lineHeight: 1.12,
                marginBottom: "20px",
                letterSpacing: "-0.5px",
              }}
            >
              You Still Love God.
              <br />
              <span style={{ color: C.gold }}>
                You Just Can&apos;t Go Back.
              </span>
            </h1>

            {/* Subheadline */}
            <p
              style={{
                fontSize: "clamp(17px, 2.5vw, 22px)",
                color: C.muted,
                lineHeight: 1.6,
                marginBottom: "40px",
                maxWidth: "580px",
                margin: "0 auto 40px",
              }}
            >
              The Parking Lot Epiphany That Changes Everything
            </p>

            {/* Video Embed */}
            <div
              style={{
                maxWidth: "740px",
                margin: "0 auto 32px",
                borderRadius: "14px",
                overflow: "hidden",
                border: `2px solid ${C.gold}80`,
                boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  background: C.navyDark,
                }}
              >
                <iframe
                  title="Love God, Hate Church? — VSL Coming Soon"
                  src="https://www.youtube.com/embed/k29ONyjCyOE?si=81l0lgrTH-IH5L0D"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>

            {/* Countdown */}
            <div style={{ marginBottom: "36px" }}>
              <p
                style={{
                  color: C.gold,
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  marginBottom: "14px",
                }}
              >
                ⚡ Launch Pricing Ends In
              </p>
              <CountdownTimer />
            </div>

            {/* Primary CTA */}
            <a
              href="#order"
              className="lghc-cta-red"
              style={{
                display: "inline-block",
                background: C.red,
                color: C.white,
                fontSize: "18px",
                fontWeight: 700,
                padding: "18px 52px",
                borderRadius: "50px",
                textDecoration: "none",
                letterSpacing: "0.3px",
                boxShadow: `0 10px 36px rgba(196,30,58,0.45)`,
              }}
            >
              Watch My Story →
            </a>
            <p
              style={{
                color: C.mutedDark,
                fontSize: "13px",
                marginTop: "14px",
              }}
            >
              No spam. No pressure. Just the truth.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 2 — PROBLEM IDENTIFICATION
        ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="lghc-section-padded"
          style={{ padding: "80px 24px", background: C.cream }}
        >
          <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
            <div
              className="lghc-problem-grid"
              style={{ display: "flex", gap: "48px", alignItems: "center" }}
            >
              {/* Pain points */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h2
                  style={{
                    fontSize: "clamp(22px, 3.5vw, 34px)",
                    fontWeight: 700,
                    color: C.gold,
                    marginBottom: "32px",
                    lineHeight: 1.3,
                  }}
                >
                  Maybe This Sounds Familiar...
                </h2>

                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  {[
                    "The exit interview that felt like a retention strategy",
                    "The NDA you signed to keep silent",
                    "Watching leadership protect the machine instead of the people",
                    "The Sunday morning you couldn't go back",
                    "Wondering if leaving the church means leaving Jesus",
                  ].map((point, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "16px",
                        fontSize: "18px",
                        lineHeight: 1.6,
                        color: C.navy,
                      }}
                    >
                      <span
                        style={{
                          color: C.gold,
                          fontSize: "20px",
                          lineHeight: 1.2,
                          flexShrink: 0,
                        }}
                      >
                        ✦
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>

                <p
                  style={{
                    marginTop: "36px",
                    fontSize: "18px",
                    lineHeight: 1.75,
                    color: C.bodyText,
                    borderLeft: `4px solid ${C.gold}`,
                    paddingLeft: "20px",
                  }}
                >
                  If any of these stopped you cold — you are not broken. You are
                  not faithless. You are honest. And you deserve answers.
                </p>
              </div>

              {/* Author photo */}
              <div
                className="lghc-author-photo-col"
                style={{
                  width: "220px",
                  height: "220px",
                  flexShrink: 0,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: `3px solid ${C.gold}`,
                  boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
                  position: "relative",
                }}
              >
                <Image
                  src="/ministry-images/ismael-profile23.jpg"
                  alt="Ismael Silva — Pastor, Theologian & Author"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  sizes="220px"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 3 — AGITATION
        ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="lghc-section-padded"
          style={{
            background: C.navy,
            padding: "80px 24px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "clamp(22px, 3.5vw, 34px)",
                fontWeight: 700,
                color: C.gold,
                marginBottom: "24px",
              }}
            >
              The Institutional Church Has a Problem
            </h2>

            <p
              style={{
                fontSize: "18px",
                lineHeight: 1.8,
                color: C.cream,
                marginBottom: "40px",
              }}
            >
              Over the past 25 years, 40 million Americans have quietly walked
              away from church. Not from God — from the institution. They
              didn&apos;t leave because they stopped believing. They left
              because they started paying attention.
            </p>

            {/* Statistic callout */}
            <div
              style={{
                background: `${C.gold}12`,
                border: `1px solid ${C.gold}60`,
                borderRadius: "14px",
                padding: "36px 28px",
                marginBottom: "40px",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(48px, 8vw, 72px)",
                  fontWeight: 800,
                  color: C.gold,
                  lineHeight: 1,
                  marginBottom: "12px",
                }}
              >
                27%
              </p>
              <p style={{ color: C.cream, fontSize: "18px", lineHeight: 1.6 }}>
                of those who left cited{" "}
                <strong style={{ color: C.gold }}>
                  institutional corruption
                </strong>{" "}
                as their primary reason for walking away.
              </p>
            </div>

            {/* Pull quote */}
            <blockquote
              style={{
                fontSize: "clamp(18px, 2.5vw, 24px)",
                fontStyle: "italic",
                color: C.gold,
                fontFamily: "Georgia, 'Times New Roman', serif",
                lineHeight: 1.65,
                borderLeft: `4px solid ${C.gold}`,
                paddingLeft: "28px",
                textAlign: "left",
                margin: 0,
              }}
            >
              &ldquo;The machine protects itself. The people go
              undefended.&rdquo;
              <footer
                style={{
                  color: C.muted,
                  fontSize: "14px",
                  marginTop: "14px",
                  fontStyle: "normal",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                — Ismael Silva,{" "}
                <em style={{ fontFamily: "Georgia, serif" }}>
                  Love God, Hate Church?
                </em>
              </footer>
            </blockquote>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 4 — SOLUTION (BOOK PROMISE)
        ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="lghc-section-padded"
          style={{ padding: "80px 24px", background: C.cream }}
        >
          <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "clamp(22px, 3.5vw, 34px)",
                fontWeight: 700,
                color: C.gold,
                textAlign: "center",
                marginBottom: "16px",
              }}
            >
              There&apos;s a Way Out. And a Way Forward.
            </h2>
            <p
              style={{
                textAlign: "center",
                fontSize: "18px",
                color: C.bodyText,
                maxWidth: "600px",
                margin: "0 auto 52px",
                lineHeight: 1.7,
              }}
            >
              This book doesn&apos;t just name the wound. It walks you through
              healing — and toward something real.
            </p>

            {/* Three pillars */}
            <div
              className="lghc-pillar-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px",
                marginBottom: "60px",
              }}
            >
              {[
                {
                  icon: "🔍",
                  title: "Clarity",
                  desc: "Understand the difference between the institution and the Church — the one Jesus said hell itself could not overcome.",
                },
                {
                  icon: "🕊️",
                  title: "Permission",
                  desc: "Free yourself from the guilt, shame, and spiritual confusion that kept you returning to a place that was hurting you.",
                },
                {
                  icon: "🏡",
                  title: "Direction",
                  desc: "Find the authentic community that's been waiting for you — not a building, but a family.",
                },
              ].map((p) => (
                <div
                  key={p.title}
                  style={{
                    background: C.navy,
                    color: C.cream,
                    borderRadius: "14px",
                    padding: "40px 28px",
                    textAlign: "center",
                    border: `1px solid ${C.gold}30`,
                  }}
                >
                  <div style={{ fontSize: "44px", marginBottom: "18px" }}>
                    {p.icon}
                  </div>
                  <h3
                    style={{
                      color: C.gold,
                      fontSize: "22px",
                      fontWeight: 700,
                      marginBottom: "14px",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "16px",
                      lineHeight: 1.7,
                      color: "#b0bed0",
                    }}
                  >
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Book cover */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  display: "inline-block",
                  position: "relative",
                  width: "220px",
                  aspectRatio: "2/3",
                  border: `3px solid ${C.gold}`,
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                }}
              >
                <Image
                  src="/ministry-images/cover-God-church7-web.jpeg"
                  alt="Love God, Hate Church? — Book Cover by Ismael Silva"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="220px"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 5 — AUTHORITY & SOCIAL PROOF
        ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="lghc-section-padded"
          style={{
            padding: "80px 24px",
            background: `${C.navy}06`,
            borderTop: `1px solid ${C.gold}25`,
            borderBottom: `1px solid ${C.gold}25`,
          }}
        >
          <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "clamp(22px, 3.5vw, 34px)",
                fontWeight: 700,
                color: C.gold,
                textAlign: "center",
                marginBottom: "52px",
              }}
            >
              Who Is Ismael Silva?
            </h2>

            {/* Bio */}
            <div
              className="lghc-author-bio-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "40px",
                alignItems: "start",
                marginBottom: "60px",
              }}
            >
              <div
                style={{
                  width: "170px",
                  height: "170px",
                  borderRadius: "50%",
                  border: `3px solid ${C.gold}`,
                  overflow: "hidden",
                  position: "relative",
                  flexShrink: 0,
                  boxShadow: "0 8px 28px rgba(0,0,0,0.2)",
                }}
              >
                <Image
                  src="/ministry-images/ismael-profile23.jpg"
                  alt="Ismael Silva"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  sizes="170px"
                />
              </div>

              <div>
                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    color: C.navy,
                    marginBottom: "14px",
                  }}
                >
                  Ismael Silva
                </h3>
                <p
                  style={{
                    fontSize: "17px",
                    lineHeight: 1.8,
                    color: C.bodyText,
                    marginBottom: "16px",
                  }}
                >
                  Ismael Silva is a pastor, theologian, church planter, and — in
                  a different arena — a{" "}
                  <strong>two-time Brazilian Jiu-Jitsu World Champion</strong>.
                  He has served in ministry for over two decades, planted
                  churches on three continents, and walked through the kind of
                  institutional betrayal that leaves lifelong ministers
                  questioning everything.
                </p>
                <p
                  style={{
                    fontSize: "17px",
                    lineHeight: 1.8,
                    color: C.bodyText,
                  }}
                >
                  He didn&apos;t write this book from a place of anger. He wrote
                  it from a place of arrival — having found, on the other side
                  of the wound, something more true, more durable, and more
                  beautiful than what the institution ever promised.
                </p>

                {/* Trust badges */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginTop: "24px",
                  }}
                >
                  {[
                    "✓ Publish-Ready Manuscript",
                    "✓ 78,000 Words",
                    "✓ 12-Chapter Theological Framework",
                  ].map((badge) => (
                    <span
                      key={badge}
                      style={{
                        background: C.navy,
                        color: C.cream,
                        fontSize: "13px",
                        fontWeight: 600,
                        padding: "8px 16px",
                        borderRadius: "50px",
                        border: `1px solid ${C.gold}60`,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div
              className="lghc-testimonial-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px",
              }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  style={{
                    background: C.navy,
                    color: C.cream,
                    borderRadius: "14px",
                    padding: "32px",
                    border: `1px solid ${C.gold}60`,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontSize: "48px",
                      color: `${C.gold}50`,
                      fontFamily: "Georgia, serif",
                      lineHeight: 1,
                      marginBottom: "14px",
                    }}
                  >
                    &ldquo;
                  </div>
                  <p
                    style={{
                      fontSize: "15px",
                      lineHeight: 1.75,
                      fontStyle: "italic",
                      fontFamily: "Georgia, 'Times New Roman', serif",
                      flex: 1,
                      marginBottom: "20px",
                    }}
                  >
                    {t.quote}
                  </p>
                  <div
                    style={{
                      borderTop: `1px solid ${C.gold}35`,
                      paddingTop: "16px",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: 700,
                        color: C.gold,
                        fontSize: "14px",
                        marginBottom: "2px",
                      }}
                    >
                      {t.name}
                    </p>
                    <p style={{ color: C.muted, fontSize: "13px" }}>{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 6 — BOOK DETAILS & OFFER
        ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="lghc-section-padded"
          style={{ padding: "80px 24px", background: C.cream }}
          id="order"
        >
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "clamp(22px, 3.5vw, 34px)",
                fontWeight: 700,
                color: C.gold,
                textAlign: "center",
                marginBottom: "52px",
              }}
            >
              Inside You&apos;ll Discover...
            </h2>

            {/* Chapter list */}
            <div
              className="lghc-chapter-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "14px",
                marginBottom: "64px",
              }}
            >
              {chapters.map((ch) => (
                <div
                  key={ch.n}
                  className="lghc-chapter-card"
                  style={{
                    display: "flex",
                    gap: "16px",
                    padding: "20px",
                    borderRadius: "10px",
                    border: `1px solid ${C.gold}25`,
                    background: C.white,
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      color: C.gold,
                      fontWeight: 800,
                      fontSize: "12px",
                      letterSpacing: "1px",
                      flexShrink: 0,
                      marginTop: "3px",
                      minWidth: "26px",
                    }}
                  >
                    {ch.n}
                  </span>
                  <div>
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: "15px",
                        color: C.navy,
                        marginBottom: "4px",
                      }}
                    >
                      {ch.title}
                    </p>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#5a6a7a",
                        lineHeight: 1.55,
                      }}
                    >
                      {ch.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing card */}
            <div
              style={{
                background: C.navy,
                borderRadius: "18px",
                padding: "48px 36px",
                textAlign: "center",
                border: `2px solid ${C.gold}`,
              }}
            >
              <p
                style={{
                  color: C.gold,
                  fontSize: "11px",
                  letterSpacing: "4px",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                  fontWeight: 700,
                }}
              >
                Available Now
              </p>
              <h3
                style={{
                  color: C.cream,
                  fontSize: "clamp(22px, 3vw, 28px)",
                  fontWeight: 700,
                  marginBottom: "36px",
                }}
              >
                Choose Your Format
              </h3>

              <div
                className="lghc-pricing-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "16px",
                  maxWidth: "560px",
                  margin: "0 auto 36px",
                }}
              >
                {[
                  {
                    format: "Kindle",
                    price: "$9.99",
                    icon: "📱",
                    popular: false,
                  },
                  {
                    format: "Paperback",
                    price: "$16.99",
                    icon: "📚",
                    popular: true,
                  },
                  {
                    format: "Hardcover",
                    price: "$27.99",
                    icon: "📖",
                    popular: false,
                  },
                ].map((item) => (
                  <div
                    key={item.format}
                    style={{
                      background: item.popular ? `${C.gold}18` : `${C.cream}08`,
                      border: `1px solid ${
                        item.popular ? C.gold : `${C.cream}25`
                      }`,
                      borderRadius: "12px",
                      padding: "28px 14px",
                      position: "relative",
                    }}
                  >
                    {item.popular && (
                      <span
                        style={{
                          position: "absolute",
                          top: "-13px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: C.gold,
                          color: C.navy,
                          fontSize: "10px",
                          fontWeight: 800,
                          padding: "5px 12px",
                          borderRadius: "50px",
                          whiteSpace: "nowrap",
                          letterSpacing: "1px",
                        }}
                      >
                        MOST POPULAR
                      </span>
                    )}
                    <div style={{ fontSize: "32px", marginBottom: "10px" }}>
                      {item.icon}
                    </div>
                    <div
                      style={{
                        color: C.cream,
                        fontWeight: 600,
                        fontSize: "15px",
                        marginBottom: "4px",
                      }}
                    >
                      {item.format}
                    </div>
                    <div
                      style={{
                        color: C.gold,
                        fontWeight: 800,
                        fontSize: "24px",
                      }}
                    >
                      {item.price}
                    </div>
                  </div>
                ))}
              </div>

              {/* Amazon badge */}
              <div
                style={{
                  display: "inline-block",
                  background: `${C.gold}15`,
                  border: `1px solid ${C.gold}`,
                  borderRadius: "8px",
                  padding: "12px 24px",
                  marginBottom: "28px",
                }}
              >
                <span
                  style={{ color: C.gold, fontSize: "15px", fontWeight: 600 }}
                >
                  📦 Available Now on Amazon KDP
                </span>
              </div>

              <div>
                <a
                  href={amazonLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="lghc-cta-red"
                  style={{
                    display: "inline-block",
                    background: C.red,
                    color: C.white,
                    fontSize: "18px",
                    fontWeight: 700,
                    padding: "18px 52px",
                    borderRadius: "50px",
                    textDecoration: "none",
                    boxShadow: `0 10px 32px rgba(196,30,58,0.4)`,
                  }}
                >
                  Get Your Copy on Amazon →
                </a>
                <p
                  style={{
                    color: C.muted,
                    fontSize: "13px",
                    marginTop: "14px",
                  }}
                >
                  Join 40 million wounded Christians finding their way home
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 7 — HIGH URGENCY CTA
        ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="lghc-section-padded"
          style={{
            background: `linear-gradient(160deg, ${C.navy} 0%, ${C.navyDark} 100%)`,
            padding: "88px 24px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "clamp(26px, 4.5vw, 44px)",
                fontWeight: 800,
                color: C.cream,
                marginBottom: "18px",
                lineHeight: 1.2,
              }}
            >
              Your Healing Begins When You
              <br />
              <span style={{ color: C.gold }}>Walk Into the Family</span>
            </h2>
            <p
              style={{
                color: C.muted,
                fontSize: "18px",
                lineHeight: 1.7,
                marginBottom: "48px",
              }}
            >
              You don&apos;t have to choose between your faith and your healing.
              This book walks you through both.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <a
                href={amazonLink}
                target="_blank"
                rel="noreferrer noopener"
                className="lghc-cta-gold"
                style={{
                  display: "inline-block",
                  background: C.gold,
                  color: C.navy,
                  fontSize: "20px",
                  fontWeight: 800,
                  padding: "20px 60px",
                  borderRadius: "50px",
                  textDecoration: "none",
                  boxShadow: `0 10px 36px rgba(184,134,11,0.45)`,
                  letterSpacing: "0.3px",
                }}
              >
                Order Now — Amazon →
              </a>

              <a
                href="#preorder"
                className="lghc-cta-outline"
                style={{
                  display: "inline-block",
                  background: "transparent",
                  color: C.cream,
                  fontSize: "16px",
                  fontWeight: 600,
                  padding: "14px 40px",
                  borderRadius: "50px",
                  textDecoration: "none",
                  border: `1px solid ${C.cream}35`,
                }}
              >
                Pre-order Signed Hardcover
              </a>

              <p
                style={{
                  color: C.mutedDark,
                  fontSize: "13px",
                  marginTop: "4px",
                }}
              >
                🔒 30-Day Money-Back Guarantee · Secure Checkout · Amazon
                Fulfilled
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 8 — FAQ
        ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="lghc-section-padded"
          style={{ padding: "80px 24px", background: C.cream }}
        >
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "clamp(22px, 3.5vw, 34px)",
                fontWeight: 700,
                color: C.gold,
                textAlign: "center",
                marginBottom: "48px",
              }}
            >
              Common Questions
            </h2>

            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 9 — EMAIL OPT-IN + FINAL CTA + FOOTER
        ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="lghc-section-padded"
          style={{
            background: C.navy,
            padding: "80px 24px 48px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "580px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "clamp(22px, 3.5vw, 32px)",
                fontWeight: 700,
                color: C.cream,
                marginBottom: "14px",
              }}
            >
              Join the Community
            </h2>
            <p
              style={{
                color: C.muted,
                fontSize: "17px",
                lineHeight: 1.7,
                marginBottom: "36px",
              }}
            >
              Get exclusive updates, author insights, and chapter discussions
              delivered to your inbox. No spam — ever.
            </p>

            {/* ConvertKit / Mailchimp form — swap YOUR_FORM_ID */}
            <form
              action="https://app.convertkit.com/forms/YOUR_FORM_ID/subscriptions"
              method="post"
              target="_blank"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                marginBottom: "56px",
              }}
            >
              <input
                type="text"
                name="fields[first_name]"
                placeholder="Your First Name"
                required
                style={{
                  padding: "16px 20px",
                  borderRadius: "10px",
                  border: `1px solid ${C.gold}40`,
                  fontSize: "16px",
                  background: `${C.cream}12`,
                  color: C.cream,
                  outline: "none",
                  fontFamily: "'Poppins', sans-serif",
                }}
              />
              <input
                type="email"
                name="email_address"
                placeholder="Your Best Email"
                required
                autoComplete="email"
                style={{
                  padding: "16px 20px",
                  borderRadius: "10px",
                  border: `1px solid ${C.gold}40`,
                  fontSize: "16px",
                  background: `${C.cream}12`,
                  color: C.cream,
                  outline: "none",
                  fontFamily: "'Poppins', sans-serif",
                }}
              />
              {/* Honeypot anti-spam field */}
              <div
                style={{ position: "absolute", left: "-9999px", opacity: 0 }}
              >
                <input
                  type="text"
                  name="fields[website]"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <button
                type="submit"
                className="lghc-cta-red"
                style={{
                  padding: "17px 32px",
                  background: C.red,
                  color: C.white,
                  fontSize: "17px",
                  fontWeight: 700,
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Join the Community →
              </button>
              <p style={{ color: C.mutedDark, fontSize: "12px" }}>
                No spam. Unsubscribe anytime. Your data is safe.
              </p>
            </form>

            {/* Final Order CTA */}
            <div style={{ marginBottom: "64px" }}>
              <a
                href={amazonLink}
                target="_blank"
                rel="noreferrer noopener"
                className="lghc-cta-gold"
                style={{
                  display: "inline-block",
                  background: C.gold,
                  color: C.navy,
                  fontSize: "18px",
                  fontWeight: 800,
                  padding: "18px 52px",
                  borderRadius: "50px",
                  textDecoration: "none",
                  boxShadow: `0 8px 28px rgba(184,134,11,0.4)`,
                }}
              >
                Order Now →
              </a>
            </div>

            {/* Footer */}
            <footer
              style={{
                borderTop: `1px solid ${C.gold}30`,
                paddingTop: "36px",
              }}
            >
              <p
                style={{
                  color: C.gold,
                  fontWeight: 700,
                  fontSize: "16px",
                  marginBottom: "20px",
                  fontStyle: "italic",
                  fontFamily: "Georgia, serif",
                }}
              >
                Love God, Hate Church?
              </p>
              <nav
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "28px",
                  flexWrap: "wrap",
                  marginBottom: "28px",
                }}
              >
                {[
                  { label: "About", href: "/about" },
                  { label: "Contact", href: "/contact" },
                  { label: "Privacy Policy", href: "/privacy" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    style={{
                      color: C.muted,
                      fontSize: "14px",
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <p
                style={{
                  color: C.mutedDark,
                  fontSize: "12px",
                  lineHeight: 1.7,
                }}
              >
                © {new Date().getFullYear()} Ismael Silva. All rights reserved.
                <br />
                This page may contain affiliate links. Purchases through Amazon
                may earn a small commission at no additional cost to you.
              </p>
            </footer>
          </div>
        </section>

        <FacebookPixel />
      </main>
    </>
  );
}

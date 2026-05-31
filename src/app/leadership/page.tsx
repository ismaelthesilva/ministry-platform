import type { Metadata } from "next";
import Image from "next/image";
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";
import { Heart, Code2, Trophy } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Community Leadership | Ismael Santos da Silva",
  description:
    "An integrated community project for Aotearoa's rangatahi — connecting pastoral care, technology, and sport to address the youth mental health crisis in West Auckland.",
  openGraph: {
    title: "Ismael Santos da Silva — Community Leadership",
    description: "Three pillars. One mission. Aotearoa's youth.",
    url: "https://ismaelsilva.org/leadership",
    siteName: "Ismael Silva",
    locale: "en_NZ",
    type: "website",
  },
};

const fontDmSans = "var(--font-dm-sans), system-ui, sans-serif";
const fontPlayfair = "var(--font-playfair), Georgia, serif";
const fontDmMono = "var(--font-dm-mono), 'Courier New', monospace";

export default function LeadershipPage() {
  return (
    <main
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}
      style={{
        fontFamily: fontDmSans,
        backgroundColor: "#0A0A0F",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes orbPulse {
          0%, 100% { transform: scale(1); opacity: 0.65; }
          50%       { transform: scale(1.07); opacity: 0.85; }
        }
        .leadership-fade { animation: fadeInUp 0.85s ease both; }
        .leadership-fade-d1 { animation-delay: 0.12s; }
        .leadership-fade-d2 { animation-delay: 0.24s; }
        .leadership-fade-d3 { animation-delay: 0.38s; }
        .leadership-orb { animation: orbPulse 7s ease-in-out infinite; }
        .pillar-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .pillar-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 24px 48px rgba(99, 102, 241, 0.14);
        }
        .leadership-cta:hover { background-color: #6366f1 !important; }
      `}</style>

      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 py-36 md:py-52 flex flex-col items-center text-center">
        {/* Background image */}
        <Image
          src="/ministry-images/social-youth-project.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          style={{ zIndex: 0 }}
        />
        {/* Dark overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,15,0.72) 0%, rgba(10,10,15,0.55) 50%, rgba(10,10,15,0.85) 100%)",
            zIndex: 1,
          }}
        />
        {/* Animated gradient orb */}
        <div
          className="leadership-orb absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 75% 60% at 50% 38%, rgba(99,102,241,0.25) 0%, rgba(6,182,212,0.10) 55%, transparent 80%)",
            zIndex: 2,
          }}
        />

        {/* Eyebrow */}
        <span
          className="leadership-fade relative z-10 inline-block text-xs tracking-widest uppercase border rounded-full px-4 py-1.5 mb-8"
          style={{
            fontFamily: fontDmMono,
            color: "#818cf8",
            borderColor: "rgba(99,102,241,0.35)",
          }}
        >
          Tāmaki Makaurau · West Auckland · Active Project
        </span>

        {/* Headline */}
        <h1
          className="leadership-fade leadership-fade-d1 relative z-10 text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 max-w-4xl"
          style={{ fontFamily: fontPlayfair }}
        >
          Three Pillars. <span style={{ color: "#818cf8" }}>One Mission.</span>{" "}
          <span style={{ color: "#22d3ee" }}>Aotearoa&apos;s Youth.</span>
        </h1>

        {/* Subtext */}
        <p
          className="leadership-fade leadership-fade-d2 relative z-10 text-lg md:text-xl leading-relaxed max-w-2xl mb-10"
          style={{ fontFamily: fontDmSans, color: "#94a3b8" }}
        >
          Pastoral care, technology, and sport — three inseparable pillars
          working in concert to support rangatahi across Aotearoa. Not three
          separate programmes. One integrated response to a crisis that demands
          more than policy.
        </p>

        {/* CTA */}
        <a
          href="#kaupapa"
          className="leadership-fade leadership-fade-d3 leadership-cta relative z-10 inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-full transition-colors duration-200 text-sm tracking-wide"
          style={{ backgroundColor: "#4f46e5", color: "#fff" }}
        >
          Discover Our Kaupapa →
        </a>
      </section>

      {/* ── 2. CRISIS STATS ─────────────────────────────────── */}
      <section className="px-6 py-20 md:py-28 max-w-6xl mx-auto">
        <p
          className="text-xs tracking-widest uppercase mb-12 text-center"
          style={{ fontFamily: fontDmMono, color: "#64748b" }}
        >
          Te Āhua o te Mate | Why This Matters
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              stat: "31%",
              label: "of secondary students report being bullied",
              source: "ERO, 2019",
            },
            {
              stat: "26% / 11%",
              label: "of girls / boys experience sexual abuse before age 15",
              source: "NZ Family Violence Survey, 2019",
            },
            {
              stat: "16.8 per 100k",
              label: "youth suicide rate aged 15–24 — highest of any age group",
              source: "Ministry of Health, 2016",
            },
          ].map(({ stat, label, source }) => (
            <div
              key={stat}
              className="rounded-r-lg px-6 py-8"
              style={{
                backgroundColor: "#0f172a",
                borderLeft: "2px solid #6366f1",
              }}
            >
              <div
                className="text-4xl md:text-5xl font-bold mb-3"
                style={{ fontFamily: fontPlayfair, color: "#fff" }}
              >
                {stat}
              </div>
              <p className="leading-snug mb-3" style={{ color: "#cbd5e1" }}>
                {label}
              </p>
              <p
                className="text-xs"
                style={{ fontFamily: fontDmMono, color: "#64748b" }}
              >
                {source}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. THREE PILLARS ─────────────────────────────────── */}
      <section
        className="px-6 py-20 md:py-28"
        style={{ backgroundColor: "rgba(15,23,42,0.55)" }}
      >
        <div className="max-w-6xl mx-auto">
          <p
            className="text-xs tracking-widest uppercase mb-4 text-center"
            style={{ fontFamily: fontDmMono, color: "#64748b" }}
          >
            Ngā Pou Toru | Three Pillars
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold text-center mb-16"
            style={{ fontFamily: fontPlayfair }}
          >
            Integrated. <span style={{ color: "#818cf8" }}>Replicable.</span>{" "}
            <span style={{ color: "#22d3ee" }}>Scaling.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 — Pastoral */}
            <div
              className="pillar-card rounded-2xl p-8 flex flex-col"
              style={{
                backgroundColor: "#0f172a",
                border: "1px solid #1e293b",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: "rgba(99,102,241,0.18)" }}
              >
                <Heart style={{ color: "#818cf8", width: 24, height: 24 }} />
              </div>
              <h3
                className="text-xl font-bold mb-1"
                style={{ fontFamily: fontPlayfair }}
              >
                Youth Pastoral Ministry
              </h3>
              <p
                className="text-sm mb-4"
                style={{ fontFamily: fontDmMono, color: "#818cf8" }}
              >
                Youth Pastor, Northwest Anglican Church
              </p>
              <p
                className="text-sm leading-relaxed flex-1"
                style={{ color: "#cbd5e1" }}
              >
                Direct mentoring and pastoral care for 150+ young people.
                Support groups, sacramental ministry, trauma-informed care for
                young people facing bullying, sexual abuse, and mental health
                crises.
              </p>
              <div
                className="mt-6 pt-5"
                style={{ borderTop: "1px solid #1e293b" }}
              >
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#22d3ee" }}
                >
                  150+ young people weekly
                </span>
              </div>
            </div>

            {/* Card 2 — Technology */}
            <div
              className="pillar-card rounded-2xl p-8 flex flex-col"
              style={{
                backgroundColor: "#0f172a",
                border: "1px solid #1e293b",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: "rgba(99,102,241,0.18)" }}
              >
                <Code2 style={{ color: "#818cf8", width: 24, height: 24 }} />
              </div>
              <h3
                className="text-xl font-bold mb-1"
                style={{ fontFamily: fontPlayfair }}
              >
                Technology &amp; Scale
              </h3>
              <p
                className="text-sm mb-4"
                style={{ fontFamily: fontDmMono, color: "#818cf8" }}
              >
                Founder, Base Logic Labs
              </p>
              <p
                className="text-sm leading-relaxed flex-1"
                style={{ color: "#cbd5e1" }}
              >
                Built The Preacher — a bilingual (EN/PT) digital platform for
                youth mentoring, spiritual formation, and peer support. Built
                JFit digital fitness platform improving wellbeing in West
                Auckland. One pastor can now support thousands.
              </p>
              <div
                className="mt-6 pt-5"
                style={{ borderTop: "1px solid #1e293b" }}
              >
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#22d3ee" }}
                >
                  Thousands reached digitally
                </span>
              </div>
            </div>

            {/* Card 3 — Sport */}
            <div
              className="pillar-card rounded-2xl p-8 flex flex-col"
              style={{
                backgroundColor: "#0f172a",
                border: "1px solid #1e293b",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: "rgba(99,102,241,0.18)" }}
              >
                <Trophy style={{ color: "#818cf8", width: 24, height: 24 }} />
              </div>
              <h3
                className="text-xl font-bold mb-1"
                style={{ fontFamily: fontPlayfair }}
              >
                Sporting Excellence
              </h3>
              <p
                className="text-sm mb-4"
                style={{ fontFamily: fontDmMono, color: "#818cf8" }}
              >
                NZ National Champion &amp; World Champion, BJJ
              </p>
              <p
                className="text-sm leading-relaxed flex-1"
                style={{ color: "#cbd5e1" }}
              >
                NZ BJJ Federation National Champion (Dec 2024). World Champion,
                SJJIF (Sept 2025). Sport is pastoral technology — teaching young
                abuse survivors that failure is safe, recoverable, and
                instructive. Witnessed resilience in action.
              </p>
              <div
                className="mt-6 pt-5"
                style={{ borderTop: "1px solid #1e293b" }}
              >
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#22d3ee" }}
                >
                  World Champion 2025
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. MĀORI VALUES ──────────────────────────────────── */}
      <section
        className="px-6 py-20 md:py-28"
        style={{ backgroundColor: "rgba(15,23,42,0.55)" }}
      >
        <div className="max-w-6xl mx-auto">
          <p
            className="text-xs tracking-widest uppercase mb-4 text-center"
            style={{ fontFamily: fontDmMono, color: "#64748b" }}
          >
            Ā Mātou Uaratanga | Our Values
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold text-center mb-4"
            style={{ fontFamily: fontPlayfair }}
          >
            Grounded in <span style={{ color: "#818cf8" }}>Te Ao Māori</span>
          </h2>
          <p
            className="text-center max-w-xl mx-auto leading-relaxed mb-14"
            style={{ color: "#94a3b8" }}
          >
            This work is shaped by values that Māori communities have practised
            for generations — woven into every mentoring session, every platform
            feature, every training mat.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                te: "Manaakitanga",
                en: "Care & Dignity",
                desc: "Honouring the mana of every rangatahi — their worth is unconditional, regardless of circumstance or history.",
              },
              {
                te: "Whanaungatanga",
                en: "Relationships & Belonging",
                desc: "Healing begins in connection. Every programme centres on building genuine, lasting whānau bonds that outlast crisis.",
              },
              {
                te: "Kaitiakitanga",
                en: "Guardianship",
                desc: "We serve not just today's rangatahi — we build systems and leaders that will protect and uplift generations to come.",
              },
              {
                te: "Ako",
                en: "Reciprocal Learning",
                desc: "Mentors and rangatahi teach each other. Authority flows from relationship and lived experience, not hierarchy.",
              },
            ].map(({ te, en, desc }) => (
              <div
                key={te}
                className="rounded-xl px-7 py-7 flex gap-5 items-start"
                style={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #1e293b",
                }}
              >
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: "#6366f1", marginTop: "10px" }}
                />
                <div>
                  <p
                    className="text-lg font-bold mb-0.5"
                    style={{ fontFamily: fontPlayfair, color: "#fff" }}
                  >
                    {te}
                  </p>
                  <p
                    className="text-xs uppercase tracking-widest mb-3"
                    style={{ fontFamily: fontDmMono, color: "#818cf8" }}
                  >
                    {en}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#cbd5e1" }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. COLLABORATION ─────────────────────────────────── */}
      <section className="px-6 py-20 md:py-28 max-w-6xl mx-auto">
        <p
          className="text-xs tracking-widest uppercase mb-4 text-center"
          style={{ fontFamily: fontDmMono, color: "#64748b" }}
        >
          Ngā Hononga | Our Partnerships
        </p>
        <h2
          className="text-3xl md:text-5xl font-bold text-center mb-6"
          style={{ fontFamily: fontPlayfair }}
        >
          Built on <span style={{ color: "#818cf8" }}>Reciprocal</span>{" "}
          Relationships
        </h2>
        <p
          className="text-center max-w-2xl mx-auto leading-relaxed mb-16 italic"
          style={{ fontFamily: fontPlayfair, color: "#cbd5e1" }}
        >
          &ldquo;Kāore e taea e tētahi tangata anake — no single person can do
          this alone. The project operates through reciprocal relationships with
          the Leataata Trust, Royal Road School, and the Anglican Diocese,
          connecting systems that strengthen each other.&rdquo;
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Leataata Trust",
              desc: "Community navigator service supporting vulnerable whanau. Reciprocal referrals — food bank, crisis support, mentoring.",
            },
            {
              name: "Royal Road School",
              desc: "On-campus mentoring and chaplaincy. Schools see youth daily; churches provide extended support.",
            },
            {
              name: "Anglican Diocese",
              desc: "Institutional backing for youth mentorship network development across Auckland.",
            },
          ].map(({ name, desc }) => (
            <div
              key={name}
              className="rounded-xl px-7 py-8"
              style={{
                backgroundColor: "#0f172a",
                border: "1px solid #1e293b",
              }}
            >
              <h3
                className="text-lg font-bold mb-3"
                style={{ fontFamily: fontPlayfair, color: "#fff" }}
              >
                {name}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#cbd5e1" }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. KAUPAPA (OUR PURPOSE) ────────────────────────────── */}
      <section
        id="kaupapa"
        className="px-6 py-20 md:py-28"
        style={{ backgroundColor: "rgba(15,23,42,0.55)" }}
      >
        <div className="max-w-[720px] mx-auto">
          <p
            className="text-xs tracking-widest uppercase mb-4 text-center"
            style={{ fontFamily: fontDmMono, color: "#64748b" }}
          >
            Ā Mātou Kaupapa | Our Purpose
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ fontFamily: fontPlayfair }}
          >
            The Work <span style={{ color: "#818cf8" }}>We Do</span>
          </h2>

          <div
            className="space-y-6 leading-relaxed text-[1.0625rem]"
            style={{ color: "#cbd5e1", fontFamily: fontDmSans }}
          >
            <p>
              This project was built on a single premise: rangatahi in crisis
              need more than policy. They need adults who have lived the
              integration — who carry pastoral insight, technical fluency, and
              physical resilience not as separate credentials, but as a unified
              practice.
            </p>
            <p>
              The statistics are stark. 31% of secondary students report
              bullying; 26% of girls and 11% of boys experience sexual abuse
              before age 15; 16.8 per 100,000 youth aged 15–24 die by suicide.
              These young people need more than policy. They need witnessed
              resilience: adults who have integrated psychological insight,
              practical skill, and genuine faith into a replicable model.
            </p>
            <p>
              As Youth Pastor at Northwest Anglican Church, I work directly with
              150+ young people, and many will face bullying, sexual abuse,
              mental health crises, and isolation. I hold a Master&apos;s in
              Leadership and a postgraduate qualification in Psychology (Family
              Counselling). This is not volunteer work; this is my professional
              commitment.
            </p>
            <p>
              But pastoral care alone cannot scale. So I built The Preacher, a
              bilingual digital platform reaching thousands of people, featuring
              curated content, peer support networks, mentoring, and progress
              tracking. This technology removes the bottleneck: one pastor can
              now support many.
            </p>
            <blockquote
              className="my-8 pl-6 text-lg italic"
              style={{
                borderLeft: "2px solid #6366f1",
                fontFamily: fontPlayfair,
                color: "#e2e8f0",
              }}
            >
              The third pillar—sport—may seem disconnected. It is not. I am the
              proud New Zealand BJJ Federation National Champion (December 2024)
              and World Champion (September 2025). In Brazilian Jiu-Jitsu,
              failure is safe, recoverable, and instructive.
            </blockquote>
            <p>
              Young people in our church actively learn and embody this
              mentality. We translate explicitly:{" "}
              <em>
                You survived abuse. You came home in pain. But you didn&apos;t
                break. You got back up. You&apos;re stronger.
              </em>
            </p>
            <p>
              This is witnessed resilience. This is embodied teaching. This is
              pastoral work conducted through sport.
            </p>
            <p>
              This model is collaborative — rooted in partnerships with the
              Leataata Trust, Royal Road School, and the Anglican Diocese. It is
              sustainable through institutional backing and digital
              infrastructure. And it is scalable: The Preacher platform is
              designed to be adopted by churches and organisations across
              Aotearoa and beyond.
            </p>
            <p>
              Aotearoa deserves leaders who refuse to choose between care and
              craft, between faith and technology, between the gym and the
              pulpit. This project demonstrates that integration is not a
              compromise — it is the model.
            </p>
          </div>
        </div>
      </section>

      {/* ── 6. TESTIMONIALS ─────────────────────────────────── */}
      <section className="px-6 py-20 md:py-28 max-w-6xl mx-auto">
        <p
          className="text-xs tracking-widest uppercase mb-12 text-center"
          style={{ fontFamily: fontDmMono, color: "#64748b" }}
        >
          Ngā Kōrero | Community Voices
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              quote:
                "He very quickly endeared himself to the young people and their parents and the leadership of our church community. He has a heart to teach and guide young people into healthy attitudes and behaviours that grow them into strong individuals and citizens.",
              name: "Robyn Fasi",
              role: "Community Deacon, Northwest Anglican Church",
            },
            {
              quote:
                "Under Pastor Ismael's leadership, my two teenage girls have grown spiritually, emotionally, and personally. He has been a wonderful role model—teaching them the importance of faith, respect, kindness, and integrity.",
              name: "Lowata Rokowati",
              role: "Parent, Northwest Anglican Church community",
            },
          ].map(({ quote, name, role }) => (
            <div
              key={name}
              className="rounded-2xl p-8 md:p-10 relative"
              style={{
                backgroundColor: "#0f172a",
                border: "1px solid #1e293b",
              }}
            >
              {/* Large opening quote mark */}
              <span
                className="absolute top-5 left-7 text-6xl leading-none select-none"
                style={{
                  fontFamily: fontPlayfair,
                  color: "rgba(99,102,241,0.45)",
                }}
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <blockquote
                className="italic leading-relaxed text-lg mt-6 relative z-10"
                style={{ fontFamily: fontPlayfair, color: "#e2e8f0" }}
              >
                {quote}
              </blockquote>
              <div
                className="mt-6 pt-5"
                style={{ borderTop: "1px solid #1e293b" }}
              >
                <p className="font-semibold" style={{ color: "#fff" }}>
                  {name}
                </p>
                <p className="text-sm" style={{ color: "#64748b" }}>
                  {role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. VISION ─────────────────────────────────── */}
      <section
        className="px-6 py-20 md:py-28"
        style={{ backgroundColor: "rgba(15,23,42,0.55)" }}
      >
        <div className="max-w-4xl mx-auto">
          <p
            className="text-xs tracking-widest uppercase mb-4 text-center"
            style={{ fontFamily: fontDmMono, color: "#64748b" }}
          >
            Ā Muri Ake | Looking Ahead to 2030
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold text-center mb-16"
            style={{ fontFamily: fontPlayfair }}
          >
            Building Systems That{" "}
            <span style={{ color: "#818cf8" }}>Outlast</span> Any Single Person
          </h2>
          <div className="space-y-10">
            {[
              {
                n: "01",
                title: "Diocese Mentor Network",
                desc: "A trained network of youth mentors and leaders across the Anglican Diocese, rooted in trauma-informed frameworks and embodied resilience practices.",
              },
              {
                n: "02",
                title: "West Auckland Community Gym",
                desc: "A resilience-building training hub with youth scholarships, normalising strength-building as a pathway to healing.",
              },
              {
                n: "03",
                title: "Real, Measurable Reach",
                desc: "Through these integrated efforts—pastoral, technological, sporting—150+ young people are directly supported weekly. Through partnerships with Leataata Trust, Royal Road School, and other community organisations, the reach extends to hundreds more. The Preacher platform reaches thousands.",
              },
            ].map(({ n, title, desc }) => (
              <div key={n} className="flex gap-8 items-start">
                <span
                  className="text-5xl font-bold shrink-0 leading-none mt-1"
                  style={{
                    fontFamily: fontPlayfair,
                    color: "rgba(99,102,241,0.28)",
                  }}
                >
                  {n}
                </span>
                <div>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ fontFamily: fontPlayfair, color: "#fff" }}
                  >
                    {title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: "#cbd5e1" }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FOOTER ─────────────────────────────────── */}
      <footer
        className="px-6 py-16"
        style={{ borderTop: "1px solid rgba(30,41,59,0.7)" }}
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 text-center">
          <p
            className="text-lg font-semibold"
            style={{ fontFamily: fontPlayfair, color: "#fff" }}
          >
            Ismael Silva
          </p>
          <div className="flex gap-6 text-sm" style={{ color: "#94a3b8" }}>
            <a
              href="https://www.linkedin.com/in/ismaelthesilva"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-indigo-400"
              style={{ color: "inherit" }}
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/ismaelthesilva"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-indigo-400"
              style={{ color: "inherit" }}
            >
              GitHub
            </a>
          </div>
          <p
            className="text-xs tracking-wide uppercase"
            style={{ fontFamily: fontDmMono, color: "#334155" }}
          >
            Rangatahi · Hauora · Aotearoa
          </p>
        </div>
      </footer>
    </main>
  );
}

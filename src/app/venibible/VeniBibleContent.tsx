"use client";

import { useSyncExternalStore, useEffect, useCallback } from "react";
import Image from "next/image";
import { Ubuntu } from "next/font/google";
import { useLanguage } from "../../context/LanguageContext";
import content, { type Lang } from "./content";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
});

// Module-level store: reads URL/?lang= and localStorage on first client call,
// defaults to "br" (PT) on the server. No useState + no setState-in-effect.
let _lang: Lang = "br";
let _initialized = false;
const _subs = new Set<() => void>();

const langStore = {
  subscribe(cb: () => void) {
    _subs.add(cb);
    return () => _subs.delete(cb);
  },
  getSnapshot(): Lang {
    if (!_initialized && typeof window !== "undefined") {
      _initialized = true;
      const urlLang = new URLSearchParams(window.location.search).get("lang");
      if (urlLang === "en") {
        _lang = "en";
      } else if (urlLang !== "pt") {
        try {
          const stored = localStorage.getItem("language");
          if (stored === "en" || stored === "br") _lang = stored as Lang;
        } catch {}
      }
    }
    return _lang;
  },
  getServerSnapshot(): Lang {
    return "br"; // PT default on server
  },
  set(l: Lang) {
    _lang = l;
    _subs.forEach((cb) => cb());
  },
};

const NAVY = "#3A7CA5";
const BLUE = "#1D4E89";
const ACCENT = "#3A7CA5";
const SKY = "#8DB3D6";
const PALE = "#D9E7F2";
const GOLD = "#C9A227";
const INK = "#1E1E1E";

const LICENSE_URL = "https://creativecommons.org/licenses/by-nd/4.0/";
const SBLGNT_LICENSE_URL = "https://creativecommons.org/licenses/by/4.0/";

function VerseNum({ n }: { n: number }) {
  return (
    <sup
      style={{
        fontWeight: "700",
        color: INK,
        fontSize: "0.6em",
        verticalAlign: "super",
        lineHeight: 0,
        marginRight: "1px",
      }}
    >
      {n}
    </sup>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        color: ACCENT,
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        fontSize: "0.8rem",
        fontWeight: "500",
        marginBottom: "1rem",
      }}
    >
      {children}
    </h2>
  );
}

export default function VeniBibleContent() {
  const { setLanguage } = useLanguage();

  // useSyncExternalStore: server renders PT ("br"), client reads URL/?lang= then
  // localStorage on first snapshot call. No useState, no setState-in-effect.
  const lang = useSyncExternalStore(
    langStore.subscribe,
    langStore.getSnapshot,
    langStore.getServerSnapshot
  );

  // DOM-only side effect — no setState, satisfies react-hooks/set-state-in-effect
  useEffect(() => {
    document.documentElement.lang = lang === "br" ? "pt-BR" : "en";
    setLanguage(lang); // keep global context in sync
  }, [lang, setLanguage]);

  const handleSetLanguage = useCallback((l: Lang) => {
    langStore.set(l);
    try {
      localStorage.setItem("language", l);
    } catch {}
    const url = new URL(window.location.href);
    if (l === "en") {
      url.searchParams.set("lang", "en");
    } else {
      url.searchParams.delete("lang");
    }
    window.history.replaceState({}, "", url.toString());
  }, []);

  const c = content[lang];
  const isEn = lang === "en";

  return (
    <div
      className={ubuntu.variable}
      style={{ fontFamily: "var(--font-ubuntu, system-ui)", color: INK }}
      lang={isEn ? "en" : "pt-BR"}
    >
      <style>{`
        @keyframes vbt-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: no-preference) {
          .vbt-animate { animation: vbt-fade-up 500ms ease both; }
          .vbt-animate-d1 { animation-delay: 100ms; }
          .vbt-animate-d2 { animation-delay: 200ms; }
          .vbt-animate-d3 { animation-delay: 320ms; }
          .vbt-animate-d4 { animation-delay: 440ms; }
        }
        .vbt-drop-cap {
          float: left;
          font-size: 4.5rem;
          line-height: 0.78;
          color: ${BLUE};
          font-weight: 700;
          margin-right: 5px;
          margin-top: 6px;
        }
        .vbt-prose-clear { clear: both; }
        .vbt-scroll-anchor { scroll-margin-top: 80px; }
        .vbt-nav-link:focus-visible,
        .vbt-btn:focus-visible { outline: 2px solid ${GOLD}; outline-offset: 3px; }
        .vbt-gold-line {
          height: 1px;
          background: linear-gradient(to right, transparent, ${GOLD}, transparent);
          border: none;
          margin: 0;
        }
        .vbt-brand-full { display: inline; }
        .vbt-brand-short { display: none; }
        @media (max-width: 480px) {
          .vbt-brand-full { display: none; }
          .vbt-brand-short { display: inline; }
        }
      `}</style>

      {/* ── Fixed Header ── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: `${NAVY}cc`,
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 1rem",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          {/* Left: mini logo + VBT */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Image
              src="/ministry-images/vbt-logo-star-v3-nobg.png"
              alt={c.logoMiniAlt}
              width={714}
              height={508}
              style={{ height: "36px", width: "auto" }}
              priority={false}
            />
            <span
              style={{
                color: "#ffffff",
                fontWeight: "700",
                fontSize: "1rem",
                letterSpacing: "0.08em",
              }}
            >
              <span className="vbt-brand-full">
                Veni Bible Translation (VBT)
              </span>
              <span className="vbt-brand-short">VBT</span>
            </span>
          </div>

          {/* Right: lang toggle + GitHub */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <div
              role="group"
              aria-label={c.langSelectLabel}
              style={{ display: "flex", gap: "2px" }}
            >
              {(["br", "en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  className="vbt-btn"
                  onClick={() => handleSetLanguage(l)}
                  aria-pressed={lang === l}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                    letterSpacing: "0.06em",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: lang === l ? BLUE : "transparent",
                    color: lang === l ? "#fff" : SKY,
                    transition: "background-color 150ms ease, color 150ms ease",
                  }}
                >
                  {l === "br" ? "PT" : "EN"}
                </button>
              ))}
            </div>
            <a
              href="https://github.com/veni-bible"
              target="_blank"
              rel="noopener noreferrer"
              className="vbt-nav-link"
              style={{
                color: SKY,
                fontSize: "0.8rem",
                textDecoration: "none",
                padding: "4px 2px",
              }}
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section
        style={{
          background: "#142b46",
          paddingTop: "100px",
          paddingBottom: "80px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial glow behind logo */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -60%)",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(201,162,39,0.18) 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            maxWidth: "720px",
            margin: "0 auto",
            padding: "0 1rem",
          }}
        >
          {/* Full logo */}
          <div className="vbt-animate" style={{ marginBottom: "2rem" }}>
            <Image
              src="/ministry-images/vbt-logo-star-v3-premium-nobg.png"
              alt={c.logoAlt}
              width={2048}
              height={2048}
              priority
              style={{
                width: "clamp(220px, 40vw, 380px)",
                height: "auto",
                borderRadius: "8px",
                display: "inline-block",
              }}
            />
          </div>

          <h1
            className="vbt-animate vbt-animate-d1"
            style={{
              color: "#ffffff",
              fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
              fontWeight: "700",
              marginBottom: "1rem",
              lineHeight: 1.15,
            }}
          >
            {c.heroTitle}
          </h1>

          <p
            className="vbt-animate vbt-animate-d2"
            style={{ marginBottom: "1.25rem" }}
          >
            <em style={{ color: GOLD, fontSize: "1.1rem" }}>{c.epigrafe}</em>
            <br />
            <span style={{ color: SKY, fontSize: "0.85rem" }}>
              {c.epigrafeRef}
            </span>
          </p>

          <p
            className="vbt-animate vbt-animate-d3"
            style={{
              color: "#d4e4f5",
              fontSize: "1.05rem",
              lineHeight: "1.7",
              marginBottom: "2.5rem",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {c.subtitle}
          </p>

          <div
            className="vbt-animate vbt-animate-d4"
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="https://github.com/veni-bible"
              target="_blank"
              rel="noopener noreferrer"
              className="vbt-btn"
              style={{
                backgroundColor: GOLD,
                color: NAVY,
                padding: "0.75rem 1.75rem",
                borderRadius: "6px",
                fontWeight: "700",
                textDecoration: "none",
                fontSize: "0.95rem",
                display: "inline-block",
              }}
            >
              {c.btnGithub}
            </a>
            <a
              href="#amostra"
              className="vbt-btn"
              style={{
                backgroundColor: "transparent",
                color: "#ffffff",
                padding: "0.75rem 1.75rem",
                borderRadius: "6px",
                fontWeight: "500",
                textDecoration: "none",
                fontSize: "0.95rem",
                border: `1px solid ${SKY}`,
                display: "inline-block",
              }}
            >
              {c.btnSample}
            </a>
          </div>
        </div>
      </section>

      <hr className="vbt-gold-line" />

      {/* ── About ── */}
      <section
        id="sobre"
        className="vbt-scroll-anchor"
        style={{
          backgroundColor: "#ffffff",
          padding: "5rem 1rem",
        }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <SectionHeading>{c.aboutTitle}</SectionHeading>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: "1.8",
              marginBottom: "1.25rem",
            }}
          >
            {c.aboutP1}
          </p>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: "1.8",
              marginBottom: "1.25rem",
            }}
          >
            {c.aboutP2}
          </p>
          <p style={{ fontSize: "1.05rem", lineHeight: "1.8" }}>{c.aboutP3}</p>
        </div>
      </section>

      <hr className="vbt-gold-line" />

      {/* ── How we translate ── */}
      <section
        id="metodo"
        className="vbt-scroll-anchor"
        style={{
          backgroundColor: PALE,
          padding: "5rem 1rem",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ maxWidth: "720px" }}>
            <SectionHeading>{c.metodoTitle}</SectionHeading>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.5rem",
              marginTop: "0.5rem",
            }}
          >
            {c.cards.map((card, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  padding: "1.5rem",
                  borderTop: `3px solid ${BLUE}`,
                }}
              >
                <div
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "700",
                    color: BLUE,
                    lineHeight: 1,
                    marginBottom: "0.75rem",
                  }}
                >
                  {i + 1}
                </div>
                <p
                  style={{
                    fontWeight: "700",
                    marginBottom: "0.5rem",
                    fontSize: "0.95rem",
                  }}
                >
                  {card.title}
                </p>
                <p
                  style={{
                    color: "#444",
                    lineHeight: "1.7",
                    fontSize: "0.9rem",
                  }}
                >
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="vbt-gold-line" />

      {/* ── Transparency ── */}
      <section
        id="transparencia"
        className="vbt-scroll-anchor"
        style={{ backgroundColor: "#ffffff", padding: "5rem 1rem" }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div
            style={{
              backgroundColor: PALE,
              borderLeft: `4px solid ${GOLD}`,
              borderRadius: "0 8px 8px 0",
              padding: "2rem 2rem 2rem 1.75rem",
            }}
          >
            <SectionHeading>{c.transparenciaTitle}</SectionHeading>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: "1.8",
                marginBottom: "1rem",
              }}
            >
              {c.transparenciaP1}
            </p>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: "1.8",
                fontStyle: "italic",
              }}
            >
              {c.transparenciaP2}
            </p>
          </div>
        </div>
      </section>

      <hr className="vbt-gold-line" />

      {/* ── Sample ── */}
      <section
        id="amostra"
        className="vbt-scroll-anchor"
        lang={isEn ? "en" : "pt-BR"}
        style={{ backgroundColor: PALE, padding: "5rem 1rem" }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <SectionHeading>{c.amostraTitle}</SectionHeading>

          {isEn ? (
            /* ── EN: no sample available yet ── */
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                padding: "2rem",
                borderLeft: `4px solid ${ACCENT}`,
                marginBottom: "1.5rem",
              }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: "1.75",
                  marginBottom: "1.5rem",
                  color: INK,
                }}
              >
                {c.sampleEnCardText}
              </p>
              <button
                className="vbt-btn"
                onClick={() => handleSetLanguage("br")}
                style={{
                  backgroundColor: BLUE,
                  color: "#fff",
                  padding: "0.65rem 1.5rem",
                  borderRadius: "6px",
                  fontWeight: "600",
                  fontSize: "0.9rem",
                  border: "none",
                  cursor: "pointer",
                  display: "inline-block",
                }}
              >
                {c.sampleEnCardBtn}
              </button>
            </div>
          ) : (
            /* ── PT: full Portuguese sample ── */
            <>
              {/* Sub-heading 1 */}
              <p
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontSize: "0.75rem",
                  color: ACCENT,
                  fontWeight: "500",
                  marginBottom: "1.25rem",
                }}
              >
                {c.sampleSubheading1}
              </p>

              {/* Prose: vv. 1–3, chapter drop cap */}
              <p
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "1.05rem",
                  lineHeight: "1.85",
                  color: INK,
                  marginBottom: "0.25rem",
                }}
              >
                <span className="vbt-drop-cap" aria-hidden="true">
                  1
                </span>
                Revelação de Jesus Cristo, que Deus Lhe deu para mostrar aos
                Seus servos as coisas que devem acontecer em breve; e Ele a deu
                a conhecer por sinais, enviando-a por meio do Seu anjo ao Seu
                servo João, <VerseNum n={2} />o qual testemunhou a Palavra de
                Deus e o Testemunho de Jesus Cristo, tudo quanto viu.{" "}
                <VerseNum n={3} />
                Bem-aventurado aquele que lê, e aqueles que ouvem as palavras da
                profecia e guardam o que nela está escrito, pois o tempo está
                próximo.
              </p>
              <div className="vbt-prose-clear" />

              <div style={{ height: "1.75rem" }} />

              {/* Sub-heading 2 */}
              <p
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontSize: "0.75rem",
                  color: ACCENT,
                  fontWeight: "500",
                  marginBottom: "1.25rem",
                }}
              >
                {c.sampleSubheading2}
              </p>

              {/* Poetry */}
              <div
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "1.05rem",
                  lineHeight: "1.95",
                  color: INK,
                  paddingLeft: "clamp(1rem, 4vw, 2.5rem)",
                  borderLeft: `2px solid ${SKY}`,
                }}
              >
                <p style={{ marginBottom: 0 }}>
                  <VerseNum n={4} />
                  João, às sete igrejas que estão na Ásia:
                </p>
                <p style={{ marginBottom: 0 }}>graça a vós e paz</p>
                <p style={{ marginBottom: 0 }}>
                  da parte Daquele Que É, e Daquele Que Era, e Daquele Que Vem,
                </p>
                <p style={{ marginBottom: "1.25rem" }}>
                  e da parte dos Sete Espíritos que estão diante do Seu trono,
                </p>
                <p style={{ marginBottom: 0 }}>
                  <VerseNum n={5} />e da parte de Jesus Cristo, a Testemunha
                  fiel, o Primogênito dos mortos e o Soberano dos reis da terra.
                </p>

                <div style={{ height: "1.25rem" }} />

                <p style={{ marginBottom: 0 }}>Àquele que nos ama</p>
                <p style={{ marginBottom: 0 }}>
                  e nos libertou dos nossos pecados pelo Seu sangue,
                </p>
                <p style={{ marginBottom: "1.25rem" }}>
                  <VerseNum n={6} />e fez de nós um reino, sacerdotes para o Seu
                  Deus e Pai,
                  <br />a Ele a glória e o domínio pelos séculos dos séculos.
                  Amém.
                </p>

                <p style={{ marginBottom: 0 }}>
                  <VerseNum n={7} />
                  Eis que Ele vem com as nuvens,
                </p>
                <p style={{ marginBottom: 0 }}>e todo olho O verá,</p>
                <p style={{ marginBottom: 0 }}>
                  e também os que O traspassaram;
                </p>
                <p style={{ marginBottom: 0 }}>
                  e todas as tribos da terra se lamentarão por causa Dele.
                </p>
                <p style={{ marginBottom: "1.25rem" }}>Sim, amém.</p>

                <p style={{ marginBottom: 0 }}>
                  <VerseNum n={8} />
                  Eu sou o Alfa e o Ômega, diz o Senhor Deus,
                </p>
                <p style={{ marginBottom: 0 }}>
                  Aquele Que É, e Aquele Que Era, e Aquele Que Vem, o
                  Todo-Poderoso.
                </p>
              </div>

              {/* PT status note */}
              {c.samplePtNote && (
                <p
                  style={{
                    marginTop: "1.5rem",
                    fontSize: "0.85rem",
                    color: ACCENT,
                    fontStyle: "italic",
                  }}
                >
                  {c.samplePtNote}
                </p>
              )}
            </>
          )}

          {/* Scholar note — both languages */}
          <p
            style={{
              marginTop: "1.25rem",
              fontSize: "0.78rem",
              color: ACCENT,
              lineHeight: "1.6",
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            {c.amostraNote}
          </p>
        </div>
      </section>

      <hr className="vbt-gold-line" />

      {/* ── In Progress ── */}
      <section
        id="andamento"
        className="vbt-scroll-anchor"
        style={{ backgroundColor: "#ffffff", padding: "5rem 1rem" }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <SectionHeading>{c.andamentoTitle}</SectionHeading>
          <div style={{ position: "relative", paddingLeft: "1.75rem" }}>
            {/* Vertical line */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "6px",
                top: "10px",
                bottom: "10px",
                width: "2px",
                backgroundColor: PALE,
                borderRadius: "1px",
              }}
            />
            {c.progress.map((item, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  marginBottom: i < c.progress.length - 1 ? "2.5rem" : 0,
                }}
              >
                {/* Dot */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-1.75rem",
                    top: "5px",
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    backgroundColor: i === 0 ? BLUE : PALE,
                    border: `2px solid ${i === 0 ? BLUE : ACCENT}`,
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "0.5rem",
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ fontWeight: "700", fontSize: "1rem" }}>
                    {item.name}
                  </span>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: "600",
                      letterSpacing: "0.07em",
                      padding: "2px 8px",
                      borderRadius: "99px",
                      backgroundColor: i === 0 ? BLUE : i === 1 ? ACCENT : PALE,
                      color: i === 0 ? "#fff" : i === 1 ? "#fff" : ACCENT,
                      textTransform: "uppercase",
                    }}
                  >
                    {item.badge}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#555",
                    lineHeight: "1.7",
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="vbt-gold-line" />

      {/* ── License ── */}
      <section
        id="licenca"
        className="vbt-scroll-anchor"
        style={{ backgroundColor: PALE, padding: "5rem 1rem" }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <SectionHeading>{c.licencaTitle}</SectionHeading>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: "1.8",
              marginBottom: "1.25rem",
            }}
          >
            {c.licencaP1}
          </p>
          <p
            style={{
              fontSize: "0.9rem",
              lineHeight: "1.7",
              color: "#555",
              marginBottom: "1.5rem",
            }}
          >
            {c.licencaP2a}
            <a
              href={SBLGNT_LICENSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="vbt-btn"
              style={{ color: BLUE }}
            >
              CC BY 4.0
            </a>
            {c.licencaP2b}
          </p>
          <a
            href={LICENSE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="vbt-btn"
            style={{
              color: BLUE,
              textDecoration: "underline",
              fontSize: "0.9rem",
              fontWeight: "500",
            }}
          >
            {c.licencaLink}
          </a>
        </div>
      </section>

      <hr className="vbt-gold-line" />

      {/* ── CTA ── */}
      <section
        style={{
          background: `linear-gradient(160deg, ${NAVY} 0%, ${BLUE} 100%)`,
          padding: "5rem 1rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <Image
            src="/ministry-images/vbt-logo-star-v3-nobg.png"
            alt={c.logoMiniAlt}
            width={714}
            height={508}
            style={{ height: "48px", width: "auto", marginBottom: "1.25rem" }}
          />
          <p
            style={{
              color: GOLD,
              fontSize: "1.25rem",
              fontStyle: "italic",
              marginBottom: "2rem",
            }}
          >
            Veni, Domine Iesu
          </p>
          <a
            href="https://github.com/veni-bible"
            target="_blank"
            rel="noopener noreferrer"
            className="vbt-btn"
            style={{
              backgroundColor: GOLD,
              color: NAVY,
              padding: "0.8rem 2rem",
              borderRadius: "6px",
              fontWeight: "700",
              textDecoration: "none",
              fontSize: "1rem",
              display: "inline-block",
            }}
          >
            {c.ctaBtn}
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ backgroundColor: NAVY, padding: "3.5rem 1rem 1.5rem" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2.5rem",
            marginBottom: "2.5rem",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "0.75rem",
              }}
            >
              <Image
                src="/ministry-images/vbt-logo-star-v3-nobg.png"
                alt={c.logoMiniAlt}
                width={714}
                height={508}
                style={{ height: "32px", width: "auto" }}
              />
              <span
                style={{ color: "#fff", fontWeight: "700", fontSize: "0.9rem" }}
              >
                Veni Bible Translation (VBT)
              </span>
            </div>
            <p
              style={{
                color: SKY,
                fontSize: "0.85rem",
                fontStyle: "italic",
              }}
            >
              Veni, Domine Iesu
            </p>
          </div>

          {/* Project links */}
          <div>
            <p
              style={{
                color: GOLD,
                fontSize: "0.7rem",
                fontWeight: "600",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              {c.footerProjeto}
            </p>
            {[
              { href: "#sobre", label: c.footerAbout },
              { href: "#metodo", label: c.footerMetodo },
              { href: "#amostra", label: c.footerAmostra },
              { href: "#andamento", label: c.footerAndamento },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="vbt-nav-link"
                style={{
                  display: "block",
                  color: SKY,
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  marginBottom: "0.4rem",
                }}
              >
                {label}
              </a>
            ))}
          </div>

          {/* External links */}
          <div>
            <p
              style={{
                color: GOLD,
                fontSize: "0.7rem",
                fontWeight: "600",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              {c.footerLinks}
            </p>
            {[
              {
                href: "https://ismaelsilva.org",
                label: "ismaelsilva.org",
              },
              {
                href: "https://github.com/veni-bible",
                label: "GitHub",
              },
              {
                href: LICENSE_URL,
                label: c.licencaLink,
              },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="vbt-nav-link"
                style={{
                  display: "block",
                  color: SKY,
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  marginBottom: "0.4rem",
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom line */}
        <div
          style={{
            borderTop: `1px solid ${BLUE}`,
            paddingTop: "1.25rem",
            textAlign: "center",
          }}
        >
          <p style={{ color: SKY, fontSize: "0.78rem" }}>{c.footerCopyright}</p>
        </div>
      </footer>
    </div>
  );
}

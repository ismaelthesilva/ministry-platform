/* eslint-disable @next/next/no-page-custom-font */
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import FacebookPixel from "../../../components/FacebookPixel";

// ─── Brand Tokens ──────────────────────────────────────────────────────────────
const C = {
  bg: "#09090b",
  surface: "#18181b",
  indigo: "#6366f1",
  cyan: "#06b6d4",
  text: "#f4f4f5",
  muted: "#a1a1aa",
  red: "#dc2626",
  redHover: "#b91c1c",
  white: "#ffffff",
  border: "rgba(99,102,241,0.25)",
} as const;

// TODO: replace with the real checkout link once the payment platform is set up.
const checkoutLink = "https://checkout.example.com/YOUR_PRODUCT_ID";
const contactEmail = "ministry@ismaelsilva.org";
// TODO: replace with the real YouTube video ID once the VSL is recorded.
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
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function CountdownTimer() {
  const [time, setTime] = useState({ h: 71, m: 59, s: 59 });

  useEffect(() => {
    let deadline = Number(sessionStorage.getItem("ecc_deadline") ?? 0);
    if (!deadline || deadline < Date.now()) {
      deadline = Date.now() + 72 * 60 * 60 * 1000;
      sessionStorage.setItem("ecc_deadline", String(deadline));
    }

    const update = () => {
      const diff = Math.max(0, Math.floor((deadline - Date.now()) / 1000));
      setTime({
        h: Math.floor(diff / 3600),
        m: Math.floor((diff % 3600) / 60),
        s: diff % 60,
      });
    };

    update();
    const tick = setInterval(update, 1000);
    return () => clearInterval(tick);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
      {(["h", "m", "s"] as const).map((unit, i) => (
        <React.Fragment key={unit}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                background: C.surface,
                border: `1px solid ${C.indigo}60`,
                color: C.cyan,
                fontSize: "clamp(24px, 5vw, 34px)",
                fontWeight: 800,
                padding: "10px 16px",
                borderRadius: "8px",
                minWidth: "60px",
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
              {["Horas", "Min", "Seg"][i]}
            </div>
          </div>
          {i < 2 && (
            <div
              style={{
                color: C.indigo,
                fontSize: "clamp(24px, 5vw, 34px)",
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

function VslBox() {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "680px",
          margin: "0 auto 32px",
          aspectRatio: "16/9",
          background: C.surface,
          border: `1px solid ${C.indigo}66`,
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <iframe
          title="Encontros com o Cordeiro — Vídeo"
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
      className="ecc-vsl-box"
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "680px",
        margin: "0 auto 32px",
        background: `linear-gradient(135deg, ${C.surface} 0%, ${C.bg} 100%)`,
        border: `1px solid ${C.indigo}66`,
        borderRadius: "12px",
        overflow: "hidden",
        aspectRatio: "16/9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        padding: 0,
      }}
      aria-label="Assistir ao vídeo"
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 50%, ${C.indigo}22 0%, transparent 70%)`,
        }}
      />
      <div
        className="ecc-play-btn"
        style={{
          position: "relative",
          zIndex: 2,
          width: "68px",
          height: "68px",
          background: C.red,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s, box-shadow 0.2s",
          boxShadow: `0 0 36px ${C.red}80`,
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill={C.white}
          style={{ marginLeft: "4px" }}
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
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: C.muted,
          zIndex: 2,
          whiteSpace: "nowrap",
        }}
      >
        Assista — 2 minutos que podem mudar sua manhã
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
      className="ecc-cta-red"
      style={{
        display: block ? "block" : "inline-block",
        textAlign: "center",
        background: C.red,
        color: C.white,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 700,
        fontSize: "1.05rem",
        letterSpacing: "0.02em",
        textDecoration: "none",
        padding: "18px 44px",
        borderRadius: "50px",
        boxShadow: `0 10px 32px ${C.red}66`,
      }}
    >
      {children}
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "block",
        textAlign: "center",
        fontFamily: "'Inter', sans-serif",
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: C.cyan,
        marginBottom: "14px",
      }}
    >
      {children}
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.7rem, 3.5vw, 2.5rem)",
        fontWeight: 700,
        color: C.text,
        textAlign: "center",
        lineHeight: 1.25,
        marginBottom: "40px",
      }}
    >
      {children}
    </h2>
  );
}

const promiseItems = [
  {
    title: "1 versículo",
    body: "na tradução Almeida Revista e Atualizada, verificado e completo",
  },
  {
    title: "1 história real",
    body: "de figuras históricas, personagens bíblicos ou observações do cotidiano que ilustram o tema",
  },
  {
    title: "1 reflexão teológica",
    body: "profunda mas acessível, sem jargão técnico",
  },
  {
    title: "1 aplicação prática",
    body: "para o seu dia, não para a academia",
  },
  {
    title: "1 oração",
    body: "para fechar com a presença do Cordeiro",
  },
];

const testimonials = [
  {
    quote:
      "Finalmente entendi o Apocalipse. Não tecnicamente — existencialmente. Cada manhã eu sinto que estou encontrando Jesus de novo.",
    name: "Maria C.",
    role: "leitora do devocional",
  },
  {
    quote:
      "Usei em nosso grupo de mulheres por três meses. A transformação foi visível. O medo virou expectativa.",
    name: "Pastora Ana R.",
    role: "São Paulo",
  },
  {
    quote:
      "Nunca pensei que um devocional sobre o Apocalipse me faria chorar de gratidão toda manhã. Mas aqui estamos.",
    name: "João P.",
    role: "leitor digital",
  },
];

const includedColumns = [
  {
    icon: "📖",
    title: "VERSÃO DIGITAL",
    subtitle: "(PDF/Kindle)",
    items: [
      "365 devocionais completos",
      "Índice por data e por passagem bíblica",
      "Lista bibliográfica completa das fontes históricas",
      "Acesso imediato após a compra",
    ],
  },
  {
    icon: "📚",
    title: "VERSÃO FÍSICA",
    subtitle: "",
    items: [
      "Formato A5 — perfeito para a mesa de cabeceira",
      "Impressão premium, capa dura",
      "Entrega para todo o Brasil",
    ],
  },
  {
    icon: "🎁",
    title: "BÔNUS EXCLUSIVO",
    subtitle: "(por tempo limitado)",
    items: [
      "Guia de Leitura em 12 Semanas — para usar em grupos de célula ou em família",
      "Mapa Simbólico do Apocalipse — os principais símbolos e seus significados em uma página",
    ],
  },
];

const pricingOptions = [
  {
    id: "digital",
    icon: "📖",
    label: "Digital",
    sub: "PDF + Kindle",
    price: "R$ 47",
  },
  {
    id: "fisico",
    icon: "📚",
    label: "Físico",
    sub: "frete incluso",
    price: "R$ 97",
  },
  {
    id: "completo",
    icon: "📖📚",
    label: "Digital + Físico",
    sub: "acesso completo",
    price: "R$ 127",
    popular: true,
  },
];

const objections = [
  {
    q: "“Não tenho tempo para ler todo dia.”",
    a: "São 435 palavras. Menos de 3 minutos. Você tem 3 minutos para encontrar o Cordeiro.",
  },
  {
    q: "“Não entendo o Apocalipse.”",
    a: "Esse é exatamente o problema que este devocional resolve. Você não precisa entender antes de começar — o livro te ensina enquanto você lê.",
  },
  {
    q: "“Já tenho outros devocionais.”",
    a: "Nenhum deles passa 365 dias no Apocalipse, versículo por versículo, com história real, teologia acessível e oração. Este é único.",
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function EncontrosCordeiroPage() {
  return (
    <>
      {/* ── Font imports ── */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* ── Global page styles ── */}
      <style>{`
        html { scroll-behavior: smooth; }
        .ecc-root * { box-sizing: border-box; }
        .ecc-root { font-family: 'Inter', system-ui, sans-serif; }
        .ecc-cta-red, .ecc-header-cta { transition: all 0.2s ease; }
        .ecc-cta-red:hover { filter: brightness(1.1); transform: translateY(-2px); }
        .ecc-header-cta:hover { filter: brightness(1.1); }
        .ecc-vsl-box:hover .ecc-play-btn { transform: scale(1.08); box-shadow: 0 0 50px ${C.red}B3 !important; }
        .ecc-testimonial-card, .ecc-pricing-card, .ecc-included-card { transition: border-color 0.25s ease, transform 0.25s ease; }
        .ecc-testimonial-card:hover, .ecc-included-card:hover { border-color: ${C.indigo}80 !important; }
        .ecc-pricing-card:hover { transform: translateY(-4px); border-color: ${C.cyan} !important; }

        @media (max-width: 768px) {
          .ecc-section { padding: 56px 20px !important; }
          .ecc-hero-section { padding: 40px 20px 40px !important; }
          .ecc-pricing-grid, .ecc-included-grid, .ecc-testimonial-grid { grid-template-columns: 1fr !important; }
          .ecc-header-inner { gap: 10px !important; }
          .ecc-header-title { font-size: 13px !important; }
        }
      `}</style>

      <main className="ecc-root" style={{ background: C.bg, color: C.text }}>
        {/* ═══════════════════ STICKY HEADER ═══════════════════ */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            background: "rgba(9,9,11,0.9)",
            backdropFilter: "blur(8px)",
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <div
            className="ecc-header-inner"
            style={{
              maxWidth: "1080px",
              margin: "0 auto",
              padding: "14px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <span
              className="ecc-header-title"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "15px",
                color: C.text,
              }}
            >
              Encontros com o <span style={{ color: C.cyan }}>Cordeiro</span>
            </span>
            <a
              href="#oferta"
              className="ecc-header-cta"
              style={{
                background: C.red,
                color: C.white,
                fontSize: "13px",
                fontWeight: 700,
                padding: "10px 18px",
                borderRadius: "50px",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Quero o Meu →
            </a>
          </div>
        </header>

        {/* ═══════════════════ HERO ═══════════════════ */}
        <section
          className="ecc-hero-section"
          style={{
            padding: "72px 24px 56px",
            textAlign: "center",
            background: `radial-gradient(ellipse at 50% 0%, ${C.indigo}22 0%, transparent 60%), ${C.bg}`,
          }}
        >
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <p
              style={{
                fontStyle: "italic",
                color: C.muted,
                fontSize: "15px",
                marginBottom: "24px",
              }}
            >
              Para cristãos que querem mais do que leitura bíblica — querem
              encontro diário com Cristo
            </p>

            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(30px, 6vw, 52px)",
                fontWeight: 800,
                lineHeight: 1.2,
                color: C.text,
                marginBottom: "20px",
              }}
            >
              Você Tem Medo do Apocalipse?
              <br />
              <span style={{ color: C.cyan }}>
                Este Livro Vai Mudar Isso — Um Dia de Cada Vez.
              </span>
            </h1>

            <p
              style={{
                fontSize: "clamp(16px, 2.2vw, 20px)",
                color: C.muted,
                lineHeight: 1.7,
                maxWidth: "620px",
                margin: "0 auto 40px",
              }}
            >
              <strong style={{ color: C.text }}>
                365 devocionais diários que transformam o livro mais temido da
                Bíblia no mais consolador
              </strong>{" "}
              — versículo por versículo, do capítulo 1 ao 22.
            </p>

            <VslBox />

            <PrimaryCta href="#oferta">Quero Meu Exemplar Agora</PrimaryCta>
            <p style={{ color: C.muted, fontSize: "13px", marginTop: "14px" }}>
              Digital + Físico disponíveis
            </p>
          </div>
        </section>

        {/* ═══════════════════ SEÇÃO 1 — O PROBLEMA ═══════════════════ */}
        <FadeUp>
          <section className="ecc-section" style={{ padding: "80px 24px" }}>
            <div style={{ maxWidth: "680px", margin: "0 auto" }}>
              <SectionLabel>
                Você não está sozinho nessa sensação...
              </SectionLabel>
              <SectionHeading>O Mesmo Ciclo, Toda Vez</SectionHeading>

              <p
                style={{
                  fontSize: "17px",
                  lineHeight: 1.8,
                  color: C.muted,
                  marginBottom: "20px",
                }}
              >
                A maioria dos cristãos faz o mesmo com o Apocalipse:
              </p>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {[
                  "Abre o livro.",
                  "Lê dois versículos.",
                  "Fecha.",
                  "Não volta mais.",
                ].map((line) => (
                  <li
                    key={line}
                    style={{
                      fontSize: "17px",
                      color: C.text,
                      borderLeft: `3px solid ${C.indigo}`,
                      paddingLeft: "16px",
                    }}
                  >
                    {line}
                  </li>
                ))}
              </ul>

              <p
                style={{
                  fontSize: "17px",
                  lineHeight: 1.8,
                  color: C.muted,
                  marginBottom: "20px",
                }}
              >
                Não por falta de fé. Por excesso de confusão.
              </p>

              <p
                style={{
                  fontSize: "17px",
                  lineHeight: 1.8,
                  color: C.muted,
                  marginBottom: "20px",
                }}
              >
                Dragões, bestas, trombetas, selos, taças de ira — parece código
                secreto que só teólogos entendem. E no meio dessa névoa, a
                pergunta que ninguém faz em voz alta:
              </p>

              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontSize: "22px",
                  color: C.cyan,
                  textAlign: "center",
                  margin: "32px 0",
                }}
              >
                &ldquo;O Apocalipse foi escrito para mim?&rdquo;
              </p>

              <p style={{ fontSize: "17px", lineHeight: 1.8, color: C.text }}>
                A resposta é sim. E este devocional foi escrito para provar isso
                — 365 manhãs seguidas.
              </p>
            </div>
          </section>
        </FadeUp>

        {/* ═══════════════════ SEÇÃO 2 — A PROMESSA ═══════════════════ */}
        <FadeUp>
          <section
            className="ecc-section"
            style={{
              padding: "80px 24px",
              background: C.surface,
              borderTop: `1px solid ${C.border}`,
              borderBottom: `1px solid ${C.border}`,
            }}
          >
            <div style={{ maxWidth: "760px", margin: "0 auto" }}>
              <SectionLabel>Imagine começar cada manhã assim...</SectionLabel>
              <SectionHeading>
                Da Confusão à Clareza — Todos os Dias
              </SectionHeading>

              <p
                style={{
                  fontSize: "18px",
                  lineHeight: 1.8,
                  color: C.text,
                  textAlign: "center",
                  marginBottom: "16px",
                }}
              >
                Você abre o livro. Lê um versículo do Apocalipse. E em vez de
                confusão — clareza. Em vez de medo — esperança. Em vez de
                distância de Deus — encontro com o Cordeiro.
              </p>

              <p
                style={{
                  fontSize: "18px",
                  lineHeight: 1.8,
                  color: C.muted,
                  textAlign: "center",
                  marginBottom: "44px",
                }}
              >
                Isso é o que{" "}
                <strong style={{ color: C.cyan }}>
                  Encontros com o Cordeiro
                </strong>{" "}
                faz por você, todos os dias, durante um ano inteiro.
              </p>

              <p
                style={{
                  fontSize: "16px",
                  color: C.muted,
                  marginBottom: "20px",
                }}
              >
                Cada devocional tem:
              </p>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {promiseItems.map((item) => (
                  <li
                    key={item.title}
                    style={{
                      display: "flex",
                      gap: "14px",
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      style={{
                        color: C.cyan,
                        fontSize: "18px",
                        lineHeight: 1.4,
                        flexShrink: 0,
                      }}
                    >
                      ✅
                    </span>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "17px",
                        lineHeight: 1.6,
                        color: C.text,
                      }}
                    >
                      <strong style={{ color: C.cyan }}>{item.title}</strong> —{" "}
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>

              <p
                style={{
                  textAlign: "center",
                  fontSize: "17px",
                  color: C.text,
                  borderTop: `1px solid ${C.border}`,
                  paddingTop: "24px",
                }}
              >
                <strong style={{ color: C.cyan }}>425 a 435 palavras.</strong>{" "}
                Nem mais, nem menos. O suficiente para transformar sua manhã sem
                roubar seu dia.
              </p>
            </div>
          </section>
        </FadeUp>

        {/* ═══════════════════ SEÇÃO 3 — O AUTOR ═══════════════════ */}
        <FadeUp>
          <section className="ecc-section" style={{ padding: "80px 24px" }}>
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
              <SectionLabel>Quem está por trás deste devocional?</SectionLabel>
              <SectionHeading>A História do Autor</SectionHeading>

              <div
                style={{
                  display: "flex",
                  gap: "44px",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: "170px",
                    height: "170px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    position: "relative",
                    border: `3px solid ${C.indigo}`,
                    boxShadow: `0 8px 30px ${C.indigo}40`,
                    margin: "0 auto",
                  }}
                >
                  <Image
                    src="/ministry-images/ismael-profile23.jpg"
                    alt="Ismael Silva — Pastor, Teólogo e Autor"
                    fill
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                    sizes="170px"
                  />
                </div>

                <div style={{ flex: "1 1 380px", minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: "17px",
                      lineHeight: 1.8,
                      color: C.muted,
                      marginBottom: "16px",
                    }}
                  >
                    <strong style={{ color: C.text }}>Ismael Silva</strong> é
                    pastor, teólogo, autor e campeão mundial de jiu-jítsu — e
                    passou anos percebendo que o Apocalipse assustava mais do
                    que consolava o povo que ele amava.
                  </p>
                  <p
                    style={{
                      fontSize: "17px",
                      lineHeight: 1.8,
                      color: C.muted,
                      marginBottom: "16px",
                    }}
                  >
                    Durante anos de ministério, viu cristãos dedicados evitar o
                    último livro da Bíblia como se fosse armadilha, não tesouro.
                  </p>
                  <p
                    style={{
                      fontSize: "17px",
                      lineHeight: 1.8,
                      color: C.muted,
                      marginBottom: "16px",
                    }}
                  >
                    Então decidiu sentar-se versículo por versículo e escrever o
                    que ele havia descoberto: que o Apocalipse não é o livro do
                    fim do mundo. É o livro da vitória do Cordeiro.
                  </p>
                  <p
                    style={{ fontSize: "17px", lineHeight: 1.8, color: C.text }}
                  >
                    <strong style={{ color: C.cyan }}>
                      Encontros com o Cordeiro
                    </strong>{" "}
                    nasceu dessas descobertas — 365 manhãs construídas palavra
                    por palavra para levar você de leitor hesitante a adorador
                    confiante.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </FadeUp>

        {/* ═══════════════════ SEÇÃO 4 — PROVA SOCIAL ═══════════════════ */}
        <FadeUp>
          <section
            className="ecc-section"
            style={{
              padding: "80px 24px",
              background: C.surface,
              borderTop: `1px solid ${C.border}`,
              borderBottom: `1px solid ${C.border}`,
            }}
          >
            <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
              <SectionLabel>O que dizem quem já leu...</SectionLabel>
              <SectionHeading>Prova Social</SectionHeading>

              <div
                className="ecc-testimonial-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "24px",
                }}
              >
                {testimonials.map((t) => (
                  <div
                    key={t.name}
                    className="ecc-testimonial-card"
                    style={{
                      background: C.bg,
                      border: `1px solid ${C.border}`,
                      borderRadius: "14px",
                      padding: "30px 26px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "42px",
                        color: C.indigo,
                        opacity: 0.5,
                        lineHeight: 1,
                        marginBottom: "8px",
                      }}
                    >
                      &ldquo;
                    </div>
                    <p
                      style={{
                        fontSize: "15px",
                        lineHeight: 1.75,
                        fontStyle: "italic",
                        color: C.text,
                        flex: 1,
                        marginBottom: "18px",
                      }}
                    >
                      {t.quote}
                    </p>
                    <div
                      style={{
                        borderTop: `1px solid ${C.border}`,
                        paddingTop: "14px",
                      }}
                    >
                      <p
                        style={{
                          fontWeight: 700,
                          color: C.cyan,
                          fontSize: "14px",
                          marginBottom: "2px",
                        }}
                      >
                        — {t.name}
                      </p>
                      <p style={{ color: C.muted, fontSize: "13px" }}>
                        {t.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeUp>

        {/* ═══════════════════ SEÇÃO 5 — O QUE VOCÊ RECEBE ═══════════════════ */}
        <FadeUp>
          <section className="ecc-section" style={{ padding: "80px 24px" }}>
            <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
              <SectionLabel>Tudo o que está incluído...</SectionLabel>
              <SectionHeading>O Que Você Recebe</SectionHeading>

              <div
                className="ecc-included-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "24px",
                }}
              >
                {includedColumns.map((col) => (
                  <div
                    key={col.title}
                    className="ecc-included-card"
                    style={{
                      background: C.surface,
                      border: `1px solid ${C.border}`,
                      borderRadius: "14px",
                      padding: "32px 26px",
                    }}
                  >
                    <div style={{ fontSize: "32px", marginBottom: "12px" }}>
                      {col.icon}
                    </div>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "17px",
                        fontWeight: 700,
                        color: C.text,
                        marginBottom: "2px",
                      }}
                    >
                      {col.title}
                    </h3>
                    {col.subtitle && (
                      <p
                        style={{
                          fontSize: "12px",
                          color: C.muted,
                          marginBottom: "16px",
                        }}
                      >
                        {col.subtitle}
                      </p>
                    )}
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: col.subtitle ? 0 : "16px 0 0",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      {col.items.map((item) => (
                        <li
                          key={item}
                          style={{
                            display: "flex",
                            gap: "10px",
                            alignItems: "flex-start",
                            fontSize: "14px",
                            lineHeight: 1.6,
                            color: C.muted,
                          }}
                        >
                          <span style={{ color: C.cyan, flexShrink: 0 }}>
                            —
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeUp>

        {/* ═══════════════════ SEÇÃO 6 — OFERTA + PREÇO ═══════════════════ */}
        <FadeUp>
          <section
            id="oferta"
            className="ecc-section"
            style={{
              padding: "80px 24px",
              background: C.surface,
              borderTop: `1px solid ${C.border}`,
              borderBottom: `1px solid ${C.border}`,
            }}
          >
            <div
              style={{
                maxWidth: "1080px",
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              <SectionLabel>
                Invista no encontro diário com o Cordeiro
              </SectionLabel>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.7rem, 3.5vw, 2.5rem)",
                  fontWeight: 700,
                  color: C.text,
                  lineHeight: 1.25,
                  marginBottom: "16px",
                }}
              >
                Escolha o Seu Formato
              </h2>

              <div
                style={{
                  display: "inline-block",
                  background: `${C.red}1A`,
                  border: `1px solid ${C.red}`,
                  borderRadius: "50px",
                  padding: "8px 20px",
                  marginBottom: "20px",
                  color: C.red,
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                ⚡ Oferta de Lançamento — Válida por Tempo Limitado
              </div>

              <div style={{ marginBottom: "48px" }}>
                <CountdownTimer />
              </div>

              <div
                className="ecc-pricing-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "24px",
                  maxWidth: "900px",
                  margin: "0 auto",
                }}
              >
                {pricingOptions.map((opt) => (
                  <div
                    key={opt.id}
                    className="ecc-pricing-card"
                    style={{
                      position: "relative",
                      background: C.bg,
                      border: `1px solid ${opt.popular ? C.cyan : C.border}`,
                      borderRadius: "16px",
                      padding: "36px 24px",
                      textAlign: "center",
                    }}
                  >
                    {opt.popular && (
                      <span
                        style={{
                          position: "absolute",
                          top: "-13px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: C.cyan,
                          color: C.bg,
                          fontSize: "10px",
                          fontWeight: 800,
                          padding: "5px 14px",
                          borderRadius: "50px",
                          letterSpacing: "0.05em",
                          whiteSpace: "nowrap",
                        }}
                      >
                        MAIS ESCOLHIDO
                      </span>
                    )}
                    <div style={{ fontSize: "30px", marginBottom: "10px" }}>
                      {opt.icon}
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        color: C.text,
                        fontSize: "16px",
                        marginBottom: "2px",
                      }}
                    >
                      {opt.label}
                    </div>
                    <div
                      style={{
                        color: C.muted,
                        fontSize: "12px",
                        marginBottom: "16px",
                      }}
                    >
                      {opt.sub}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: C.cyan,
                        fontWeight: 800,
                        fontSize: "30px",
                        marginBottom: "20px",
                      }}
                    >
                      {opt.price}
                    </div>
                    <PrimaryCta href={checkoutLink} block>
                      Quero Este
                    </PrimaryCta>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeUp>

        {/* ═══════════════════ SEÇÃO 7 — GARANTIA ═══════════════════ */}
        <FadeUp>
          <section className="ecc-section" style={{ padding: "80px 24px" }}>
            <div
              style={{
                maxWidth: "620px",
                margin: "0 auto",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
                padding: "40px 32px",
                border: `1px solid ${C.border}`,
                borderRadius: "16px",
                background: C.surface,
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  border: `2px solid ${C.cyan}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "26px",
                }}
              >
                🛡️
              </div>
              <SectionLabel>Sem risco para você</SectionLabel>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: C.text,
                  margin: 0,
                }}
              >
                Garantia de 30 dias.
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: 1.8,
                  color: C.muted,
                  margin: 0,
                }}
              >
                Se em 30 dias você não sentir que o Apocalipse ficou mais claro,
                mais próximo e mais consolador — devolvemos 100% do seu
                investimento. Sem perguntas.
              </p>
              <p style={{ fontSize: "16px", color: C.text, margin: 0 }}>
                Você não tem nada a perder. A não ser o medo do Apocalipse.
              </p>
            </div>
          </section>
        </FadeUp>

        {/* ═══════════════════ SEÇÃO 8 — OBJEÇÕES ═══════════════════ */}
        <FadeUp>
          <section
            className="ecc-section"
            style={{
              padding: "80px 24px",
              background: C.surface,
              borderTop: `1px solid ${C.border}`,
              borderBottom: `1px solid ${C.border}`,
            }}
          >
            <div style={{ maxWidth: "700px", margin: "0 auto" }}>
              <SectionLabel>Você pode estar pensando...</SectionLabel>
              <SectionHeading>Objeções Respondidas</SectionHeading>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {objections.map((o) => (
                  <div
                    key={o.q}
                    style={{
                      background: C.bg,
                      border: `1px solid ${C.border}`,
                      borderRadius: "12px",
                      padding: "24px 28px",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: 700,
                        color: C.cyan,
                        fontSize: "16px",
                        marginBottom: "8px",
                      }}
                    >
                      {o.q}
                    </p>
                    <p
                      style={{
                        fontSize: "15px",
                        lineHeight: 1.7,
                        color: C.muted,
                        margin: 0,
                      }}
                    >
                      {o.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeUp>

        {/* ═══════════════════ SEÇÃO 9 — CTA FINAL ═══════════════════ */}
        <FadeUp>
          <section
            className="ecc-section"
            style={{
              padding: "96px 24px",
              textAlign: "center",
              background: `radial-gradient(ellipse at 50% 100%, ${C.indigo}22 0%, transparent 60%), ${C.bg}`,
            }}
          >
            <div style={{ maxWidth: "620px", margin: "0 auto" }}>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.7rem, 4vw, 2.6rem)",
                  fontWeight: 800,
                  color: C.text,
                  lineHeight: 1.3,
                  marginBottom: "20px",
                }}
              >
                Um Versículo. Uma História.
                <br />
                <span style={{ color: C.cyan }}>Um Encontro. Todo Dia.</span>
              </h2>
              <p
                style={{
                  fontSize: "17px",
                  lineHeight: 1.8,
                  color: C.muted,
                  marginBottom: "40px",
                }}
              >
                O Apocalipse foi escrito para consolação, não para terror. O
                Cordeiro está no centro de cada capítulo. E você pode
                encontrá-Lo — amanhã cedo, à mesa do café, em 3 minutos.
              </p>

              <PrimaryCta href={checkoutLink}>
                Sim, Quero Encontros com o Cordeiro
              </PrimaryCta>
              <p
                style={{
                  color: C.muted,
                  fontSize: "13px",
                  margin: "16px 0 28px",
                }}
              >
                Escolha seu formato abaixo:
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {pricingOptions.map((opt) => (
                  <a
                    key={opt.id}
                    href={checkoutLink}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      padding: "12px 20px",
                      border: `1px solid ${C.border}`,
                      borderRadius: "50px",
                      color: C.text,
                      textDecoration: "none",
                    }}
                  >
                    {opt.icon} {opt.label} — {opt.price}
                  </a>
                ))}
              </div>
            </div>
          </section>
        </FadeUp>

        {/* ═══════════════════ FOOTER ═══════════════════ */}
        <footer
          style={{
            borderTop: `1px solid ${C.border}`,
            padding: "40px 20px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              color: C.cyan,
              fontWeight: 700,
              fontSize: "15px",
              marginBottom: "10px",
            }}
          >
            © {new Date().getFullYear()} Ismael Silva — Encontros com o Cordeiro
          </p>
          <p style={{ fontSize: "13px", color: C.muted, marginBottom: "6px" }}>
            Dúvidas? Fale conosco:{" "}
            <a
              href={`mailto:${contactEmail}`}
              style={{ color: C.cyan, textDecoration: "none" }}
            >
              {contactEmail}
            </a>
          </p>
          <p
            style={{
              fontSize: "12px",
              color: C.muted,
              opacity: 0.7,
              margin: 0,
            }}
          >
            Pagamento seguro. Acesso imediato ao digital.
          </p>
        </footer>

        <FacebookPixel />
      </main>
    </>
  );
}

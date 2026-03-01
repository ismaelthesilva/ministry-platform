import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  const amazonLink = "https://www.amazon.com.br/dp/B082J64R4X";
  const videoId = "MEa3sf8DnUo";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-amber-200">
      {/* Header Section (The Hook) */}
      <section className="bg-white border-b border-slate-200 py-12 md:py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-amber-500 hover:bg-amber-600 text-white font-bold py-1 px-4 text-xs uppercase tracking-widest">
              Lançamento Exclusivo
            </Badge>
            <h1
              className="text-4xl md:text-6xl font-black tracking-tight leading-tight md:leading-tight text-slate-900"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Descubra como o{" "}
              <span className="text-amber-600">Rei dos Reis</span> pode
              transformar sua visão sobre autoridade e propósito espiritual
            </h1>
            <h2
              className="mt-6 text-xl md:text-2xl font-medium text-slate-600 max-w-2xl mx-auto"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              O guia prático para quem deseja viver os princípios do Reino no
              mundo real e manifestar o governo de Deus em todas as áreas da
              vida.
            </h2>
          </div>

          <div className="mt-12 max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-4 border-white bg-black ring-1 ring-slate-200">
              <div className="aspect-video">
                <iframe
                  title="VSL - O Retorno do Rei"
                  src={`https://www.youtube.com/embed/${videoId}?si=YJDLuIrGFUfMrW0N&autoplay=0&rel=0`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="mt-10 flex flex-col items-center">
              <Button
                asChild
                size="lg"
                className="w-full md:w-auto px-12 py-8 text-xl font-bold bg-amber-600 hover:bg-amber-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                <a href={amazonLink} target="_blank" rel="noreferrer">
                  QUERO MEU EXEMPLAR AGORA →
                </a>
              </Button>
              <p className="mt-4 text-sm text-slate-500 font-medium">
                🔒 Compra Segura via Amazon
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Story / The Struggle (Russell Brunson Style) */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 max-w-3xl">
          <div
            className="space-y-8 text-slate-800 text-lg leading-relaxed"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <h3 className="text-3xl font-bold text-slate-900 border-l-4 border-amber-500 pl-4 mb-8">
              Você sente que algo está faltando na sua caminhada espiritual?
            </h3>

            <p>
              Muitos cristãos hoje vivem frustrados, sentindo que sua fé é
              apenas teórica e não se manifesta na realidade do seu dia a dia.
              Eles conhecem as histórias, mas não vivem a{" "}
              <strong>autoridade</strong> que o Rei nos delegou.
            </p>

            <p>
              Eu escrevi o{" "}
              <span className="font-bold underline decoration-amber-500">
                O Retorno do Rei dos reis
              </span>{" "}
              porque percebi que havia um abismo entre o que a Bíblia prometia e
              o que as pessoas estavam vivenciando.
            </p>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 italic text-slate-700">
              &ldquo;Este livro não é apenas sobre teologia, é sobre a retomada da sua
              identidade como filho e representante do Reino aqui na Terra.&rdquo;
            </div>

            <p>
              Nestas páginas, você vai descobrir como romper com a mentalidade
              de escravo e assumir o governo que lhe foi confiado. Você
              aprenderá os fundamentos práticos para manifestar o Reino de Deus
              na sua família, no seu trabalho e no seu ministério.
            </p>
          </div>
        </div>
      </section>

      {/* The Solution / Features */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O que você vai aprender nas páginas do livro:
            </h2>
            <div className="h-1 w-20 bg-amber-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                01
              </div>
              <h4 className="text-xl font-bold mb-3">Identidade Real</h4>
              <p className="text-slate-600">
                Entenda de uma vez por todas quem você é no Reino e como essa
                convicção muda tudo.
              </p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                02
              </div>
              <h4 className="text-xl font-bold mb-3">Governo Espiritual</h4>
              <p className="text-slate-600">
                Como exercer autoridade sobre as circunstâncias e não ser mais
                dominado por elas.
              </p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                03
              </div>
              <h4 className="text-xl font-bold mb-3">Impacto Prático</h4>
              <p className="text-slate-600">
                Princípios do Reino aplicados para transformar sua cultura e o
                ambiente ao seu redor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section id="depoimentos" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
            O que os leitores estão dizendo
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <blockquote className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-700 italic relative">
              <span className="text-6xl text-amber-200 absolute top-4 left-4 font-serif">
                “
              </span>
              <p className="relative z-10">
                &quot;Este livro mudou minha caminhada espiritual. Leitura
                obrigatória para quem deseja profundidade!&quot;
              </p>
              <cite className="block mt-4 not-italic font-bold text-slate-900">
                — Maria, São Paulo
              </cite>
            </blockquote>
            <blockquote className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-700 italic relative">
              <span className="text-6xl text-amber-200 absolute top-4 left-4 font-serif">
                “
              </span>
              <p className="relative z-10">
                &quot;Uma clareza impressionante sobre o Reino de Deus. Finalmente
                entendi meu papel como cristão na sociedade.&quot;
              </p>
              <cite className="block mt-4 not-italic font-bold text-slate-900">
                — João Pedro, Lisboa
              </cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Final CTA (The Offer) */}
      <section className="py-20 bg-amber-600 text-white">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
            Chegou a hora de parar de apenas &quot;existir&quot; e começar a &quot;governar&quot;
            com o Rei.
          </h2>
          <p className="text-xl mb-10 text-amber-100">
            Garanta agora o seu exemplar e receba as chaves para uma vida de
            propósito e autoridade.
          </p>

          <Button
            asChild
            size="lg"
            className="px-16 py-8 text-2xl font-black bg-white text-amber-600 hover:bg-slate-100 rounded-full shadow-2xl transition-all"
          >
            <a href={amazonLink} target="_blank" rel="noreferrer">
              GARANTIR MEU LIVRO NA AMAZON →
            </a>
          </Button>

          <p className="mt-8 text-amber-200 text-sm font-medium">
            Disponível em formato físico e digital na Amazon.
          </p>
        </div>
      </section>

      <footer className="py-12 bg-slate-900 text-slate-500 text-center text-sm">
        <div className="container mx-auto px-6">
          <p className="mb-4">
            O Retorno do Rei dos reis - {new Date().getFullYear()}
          </p>
          <p className="max-w-md mx-auto opacity-50">
            Este livro é um guia para crescimento espiritual e não substitui a
            leitura diária das Escrituras.
          </p>
        </div>
      </footer>
    </main>
  );
}

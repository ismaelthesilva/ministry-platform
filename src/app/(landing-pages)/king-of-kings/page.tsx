/* eslint-disable @next/next/no-page-custom-font */
import React from "react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";

export default function Page() {
  const amazonLink = "https://www.amazon.com/dp/YOUR_ASIN_HERE";
  const videoId = "YOUR_VIDEO_ID";

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 antialiased">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Playfair+Display:wght@600;700&display=swap"
        rel="stylesheet"
      />

      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            O Retorno do Rei
          </h1>
          <p
            className="mt-4 text-lg text-slate-600"
            style={{ fontFamily: "'Montserrat', system-ui, -apple-system" }}
          >
            O livro que revela como viver com autoridade espiritual e propósito.
            Assista ao vídeo abaixo e descubra por que milhares estão sendo
            transformados.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3 md:items-start">
          <div className="md:col-span-2">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <div className="aspect-video bg-black">
                <iframe
                  title="VSL - O Retorno do Rei"
                  src={`https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="mt-6 flex gap-3 justify-center md:justify-start">
              <Badge className="bg-amber-500 text-white">Novo</Badge>
              <span className="text-sm text-slate-500">
                Lançamento exclusivo — edição limitada
              </span>
            </div>
          </div>

          <aside className="md:col-span-1">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">
                  Por que ler este livro?
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Princípios práticos e relatos reais de transformação.
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-slate-700">
                  <li>• Fundamentos do Reino e identidade</li>
                  <li>• Autoridade espiritual aplicada no dia a dia</li>
                  <li>• Testemunhos e estratégias práticas</li>
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button asChild className="w-full">
                  <a href={amazonLink} target="_blank" rel="noreferrer">
                    Comprar na Amazon
                  </a>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <a href="#depoimentos">Ver depoimentos</a>
                </Button>
              </CardFooter>
            </Card>
          </aside>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold">
                O que você vai encontrar
              </h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg shadow">
                  <h4 className="font-semibold">Capítulo 1</h4>
                  <p className="text-sm text-slate-600 mt-2">
                    Fundamentos do Reino e identidade.
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow">
                  <h4 className="font-semibold">Capítulo 2</h4>
                  <p className="text-sm text-slate-600 mt-2">
                    Autoridade espiritual aplicada no dia a dia.
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow">
                  <h4 className="font-semibold">Capítulo 3</h4>
                  <p className="text-sm text-slate-600 mt-2">
                    Histórias de vida e transformação.
                  </p>
                </div>
              </div>
            </section>

            <section id="depoimentos">
              <h3 className="text-xl font-semibold">Depoimentos</h3>
              <blockquote className="mt-4 p-6 bg-white rounded-lg shadow text-slate-700">
                “Este livro mudou minha caminhada espiritual. Leitura
                obrigatória!” — Maria, SP
              </blockquote>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="p-6 bg-amber-50 rounded-lg">
              <h4 className="font-semibold">Oferta especial</h4>
              <p className="text-sm text-slate-600 mt-2">
                Compre agora e receba materiais bônus exclusivos.
              </p>
              <div className="mt-4">
                <Button asChild>
                  <a href={amazonLink} target="_blank" rel="noreferrer">
                    Comprar agora
                  </a>
                </Button>
              </div>
            </div>

            <div className="p-6 bg-white rounded-lg shadow text-sm text-slate-600">
              <strong>Envio:</strong>
              <p className="mt-2">
                Envio internacional disponível — confira na página do produto.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

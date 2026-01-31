"use client";
import React from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ExternalLink, Download, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

interface Book {
  title: string;
  subtitle: string;
  image: string;
  link: string;
  buttonText: string;
}

interface Props {
  books: Book[];
}

export default function Books({ books }: Props) {
  const { t } = useLanguage();

  return (
    <section
      id="books"
      className="py-20 bg-gradient-to-b from-blue-50 to-purple-50 relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 shadow-xl">
            <svg className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            {t("home.books.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t(
              "home.books.subtitle",
              "Sacred writings that illuminate the path to eternal truth and divine understanding",
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {books.map((book: Book, index: number) => (
            <Card
              key={index}
              className="group relative overflow-hidden bg-white/90 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-transparent to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative p-8 flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-purple-400/30 rounded-2xl blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block transform transition-transform duration-500 hover:scale-110"
                  >
                    <Image
                      src={book.image}
                      alt={book.title}
                      width={192}
                      height={256}
                      className="w-40 md:w-48 h-auto shadow-2xl rounded-lg border-4 border-white/50"
                      sizes="(min-width: 768px) 12rem, 10rem"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                        <ExternalLink className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </a>
                </div>

                <CardHeader className="text-center p-0 mb-6">
                  <CardTitle className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                    {book.title}
                  </CardTitle>
                  <CardDescription className="text-lg text-gray-600 font-medium">
                    {book.subtitle}
                  </CardDescription>
                </CardHeader>

                <Button
                  asChild
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold shadow-xl border-0 transform group-hover:scale-105 transition-all duration-300"
                >
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    {book.buttonText}
                  </a>
                </Button>

                <div className="mt-4 flex items-center text-purple-500">
                  <Crown className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">
                    {t("home.books.label", "Sacred Literature")}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

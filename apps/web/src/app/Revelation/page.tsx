"use client";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Target, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function RevelationPage() {
  const { tr } = useLanguage();
  const chapters = Array.from({ length: 22 }, (_, i) => i + 1);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-6">
            <BookOpen className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {tr("revelation.title")}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
            {tr("revelation.subtitle")}
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
            {tr("revelation.description")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <div className="flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-blue-600 mb-2" />
              </div>
              <CardTitle className="text-2xl font-bold">22</CardTitle>
              <CardDescription>Chapters</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <div className="flex items-center justify-center">
                <Clock className="h-8 w-8 text-green-600 mb-2" />
              </div>
              <CardTitle className="text-2xl font-bold">404</CardTitle>
              <CardDescription>Verses</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <div className="flex items-center justify-center">
                <Target className="h-8 w-8 text-purple-600 mb-2" />
              </div>
              <CardTitle className="text-2xl font-bold">Deep</CardTitle>
              <CardDescription>Study Experience</CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Study by Chapter
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {chapters.map((chapterNum) => (
              <Link
                key={chapterNum}
                href={`/Revelation/Revelation${chapterNum}`}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group-hover:scale-105 border-2 hover:border-blue-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200"
                      >
                        Chapter {chapterNum}
                      </Badge>
                      <Star className="h-4 w-4 text-gray-400 group-hover:text-yellow-500 transition-colors" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {tr(`revelation.chapters.${chapterNum}.title`) ||
                        `Chapter ${chapterNum}`}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                      {tr(`revelation.chapters.${chapterNum}.summary`) ||
                        `Study chapter ${chapterNum} verse by verse`}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardHeader>
              <CardTitle className="text-2xl">Begin Your Journey</CardTitle>
              <CardDescription className="text-blue-100">
                Start with Chapter 1 and discover the profound truths of
                Revelation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/Revelation/Revelation1">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Start with Chapter 1
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import {
  Music,
  Heart,
  Mail,
  Instagram,
  Youtube,
  BookOpen,
  Star,
  Crown,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { DeveloperFooter as Footer } from "@/components/Footer";
import Messages from "@/components/home/Messages";
import Books from "@/components/home/Books";
import Songs from "@/components/home/Songs";
import HeroSection from "@/components/home/HeroSection";
import DailyInspiration from "@/components/home/DailyInspiration";
import FeaturesGrid from "@/components/home/FeaturesGrid";

interface Video {
  link: string;
  title: string;
  description: string;
}

interface Book {
  title: string;
  subtitle: string;
  image: string;
  link: string;
  buttonText: string;
}

export default function Page() {
  const { t } = useLanguage();

  // Helper function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  // Build arrays from locale — IDs come from the JSON so switching language
  // picks up the correct video set automatically.
  const messages: Video[] = Array.from({ length: 3 }, (_, i) => ({
    link: `https://www.youtube.com/watch?v=${t(`home.messages.videos.${i}.id`)}`,
    title: t(`home.messages.videos.${i}.title`),
    description: t(`home.messages.videos.${i}.description`),
  }));

  const books: Book[] = Array.from({ length: 2 }, (_, i) => ({
    title: t(`home.books.items.${i}.title`),
    subtitle: t(`home.books.items.${i}.subtitle`),
    image: t(`home.books.items.${i}.image`),
    link: t(`home.books.items.${i}.link`),
    buttonText: t(`home.books.items.${i}.buttonText`),
  }));

  const songs: Video[] = Array.from({ length: 3 }, (_, i) => ({
    link: `https://www.youtube.com/watch?v=${t(`home.songs.videos.${i}.id`)}`,
    title: t(`home.songs.videos.${i}.title`),
    description: t(`home.songs.videos.${i}.description`),
  }));

  const musicDescription: string[] = Array.from({ length: 3 }, (_, i) =>
    t(`home.music.description.${i}`),
  );

  return (
    <div className="min-h-screen bg-heavenly relative overflow-hidden">
      <Navbar />

      {/* Floating Call-to-Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button
          asChild
          className="group bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-700 hover:via-blue-700 hover:to-purple-700 text-white px-6 py-3 text-base font-semibold shadow-2xl border-0 rounded-full animate-divine-pulse transform hover:scale-110 transition-all duration-300"
        >
          <a href="/Revelation" className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2 group-hover:animate-pulse" />
            {t("revelation.title")} Study
          </a>
        </Button>
      </div>

      {/* Floating Starfall Elements for Heavenly Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute animate-starfall opacity-30"
          style={{ left: "10%", animationDelay: "0s" }}
        >
          <Star className="h-2 w-2 text-yellow-300" />
        </div>
        <div
          className="absolute animate-starfall opacity-20"
          style={{ left: "30%", animationDelay: "2s" }}
        >
          <Star className="h-1 w-1 text-white" />
        </div>
        <div
          className="absolute animate-starfall opacity-40"
          style={{ left: "70%", animationDelay: "4s" }}
        >
          <Star className="h-1.5 w-1.5 text-yellow-200" />
        </div>
        <div
          className="absolute animate-starfall opacity-25"
          style={{ left: "90%", animationDelay: "6s" }}
        >
          <Star className="h-2 w-2 text-blue-200" />
        </div>
      </div>

      {/* New Hero Section with Bible Tracker CTA */}
      <HeroSection />

      {/* New Daily Inspiration Section */}
      <DailyInspiration />

      {/* New Features Grid */}
      <FeaturesGrid />

      {/* Existing Sections */}
      <Messages messages={messages} getYouTubeVideoId={getYouTubeVideoId} />

      <Songs songs={songs} getYouTubeVideoId={getYouTubeVideoId} />

      <Books books={books} />

      {/* Music Album Section - Enhanced with Divine Harmony Theme */}
      <section
        id="music"
        className="py-20 bg-gradient-to-b from-blue-50 to-purple-50 relative overflow-hidden"
      >
        {/* Background Music Notes */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 text-6xl text-blue-600">
            ♪
          </div>
          <div className="absolute top-1/2 right-1/3 text-4xl text-purple-600">
            ♫
          </div>
          <div className="absolute bottom-1/3 left-1/2 text-5xl text-pink-600">
            ♪
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6 shadow-xl">
              <Music className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {t("home.music.title")}
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-center max-w-7xl mx-auto">
            {/* Music Text and Links */}
            <div className="lg:w-2/3 space-y-8">
              {musicDescription.map((paragraph: string, index: number) => (
                <p
                  key={index}
                  className="text-gray-700 leading-relaxed text-lg p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                >
                  {paragraph}
                </p>
              ))}

              {/* Enhanced Music Platform Buttons */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <Button
                  asChild
                  className="group bg-gradient-to-r from-gray-800 to-black hover:from-gray-900 hover:to-gray-800 text-white h-16 text-base font-semibold shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <a
                    href="https://distrokid.com/hyperfollow/ismaelsilva/o-teu-amor-me-salvou-live"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center"
                  >
                    <Music className="h-6 w-6 mb-1 group-hover:animate-pulse" />
                    <span>
                      {t("home.music.platforms.apple", "Apple Music")}
                    </span>
                  </a>
                </Button>

                <Button
                  asChild
                  className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white h-16 text-base font-semibold shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <a
                    href="https://distrokid.com/hyperfollow/ismaelsilva/o-teu-amor-me-salvou-live"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center"
                  >
                    <Music className="h-6 w-6 mb-1 group-hover:animate-pulse" />
                    <span>{t("home.music.platforms.spotify", "Spotify")}</span>
                  </a>
                </Button>

                <Button
                  asChild
                  className="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white h-16 text-base font-semibold shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <a
                    href="https://distrokid.com/hyperfollow/ismaelsilva/o-teu-amor-me-salvou-live"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center"
                  >
                    <Heart className="h-6 w-6 mb-1 group-hover:animate-pulse" />
                    <span>
                      {t("home.music.platforms.all", "All Platforms")}
                    </span>
                  </a>
                </Button>
              </div>
            </div>

            {/* Album Image with Enhanced Styling */}
            <div className="lg:w-1/3 flex-shrink-0 order-first lg:order-last">
              <div className="relative group">
                {/* Glowing background effect */}
                <div className="absolute -top-6 -right-6 w-full h-full bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="absolute -top-3 -right-3 w-full h-full bg-blue-600/80 rounded-2xl"></div>
                <div className="relative overflow-hidden rounded-2xl border-4 border-white shadow-2xl">
                  <Image
                    src="/ministry-images/isma-album.jpg"
                    alt="Ismael Silva Music"
                    width={400}
                    height={400}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 25rem, 100vw"
                    priority
                  />
                  {/* Musical overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent"></div>
                </div>

                {/* Floating Musical Note */}
                <div className="absolute -top-4 -left-4 bg-purple-500 rounded-full p-3 shadow-xl animate-bounce">
                  <Music className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divine Promise Section - Eschatological Hope */}
      <section className="py-24 bg-gradient-to-b from-blue-50 via-purple-50 to-gray-900 relative overflow-hidden">
        {/* Heavenly Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-gray-900/90"></div>
          {/* Constellation Pattern */}
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-yellow-300 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
          <div className="absolute bottom-1/2 left-1/3 w-1 h-1 bg-yellow-200 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-white rounded-full animate-ping"></div>
          <div className="absolute bottom-1/3 right-1/2 w-1 h-1 bg-blue-200 rounded-full animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="relative mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-full shadow-2xl animate-divine-pulse">
                <Crown className="h-10 w-10 text-gray-900" />
              </div>
              {/* Royal Radiance */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/40 to-yellow-300/40 rounded-full blur-xl animate-pulse scale-150"></div>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-yellow-200 text-divine-glow">
              {t("home.promise.title", "HIS GLORIOUS RETURN")}
            </h2>
            <p className="text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light">
              {t(
                "home.promise.subtitle",
                "The hope of every believer - the blessed promise of our Lord's return",
              )}
            </p>
          </div>

          {/* Promise Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {/* Promise 1 */}
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 group">
              <CardHeader className="p-8 text-center">
                <div className="mb-6">
                  <Star className="h-12 w-12 text-yellow-300 mx-auto animate-divine-pulse" />
                </div>
                <CardTitle className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-300 transition-colors duration-300">
                  {t("home.promise.items.0.title", "HIS PROMISE")}
                </CardTitle>
                <CardDescription className="text-white/80 text-lg leading-relaxed">
                  {t(
                    "home.promise.items.0.description",
                    '"And if I go and prepare a place for you, I will come again and receive you to Myself; that where I am, there you may be also."',
                  )}
                </CardDescription>
                <p className="text-yellow-300 font-semibold mt-4">
                  {t("home.promise.items.0.reference", "- John 14:3")}
                </p>
              </CardHeader>
            </Card>

            {/* Promise 2 */}
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 group">
              <CardHeader className="p-8 text-center">
                <div className="mb-6">
                  <Crown className="h-12 w-12 text-yellow-300 mx-auto animate-grace-glow" />
                </div>
                <CardTitle className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-300 transition-colors duration-300">
                  {t("home.promise.items.1.title", "HIS KINGDOM")}
                </CardTitle>
                <CardDescription className="text-white/80 text-lg leading-relaxed">
                  {t(
                    "home.promise.items.1.description",
                    "\"Then the King will say to those on His right hand, 'Come, you blessed of My Father, inherit the kingdom prepared for you from the foundation of the world.'\"",
                  )}
                </CardDescription>
                <p className="text-yellow-300 font-semibold mt-4">
                  {t("home.promise.items.1.reference", "- Matthew 25:34")}
                </p>
              </CardHeader>
            </Card>

            {/* Promise 3 */}
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 group">
              <CardHeader className="p-8 text-center">
                <div className="mb-6">
                  <Heart className="h-12 w-12 text-yellow-300 mx-auto animate-breathe" />
                </div>
                <CardTitle className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-300 transition-colors duration-300">
                  {t("home.promise.items.2.title", "HIS LOVE")}
                </CardTitle>
                <CardDescription className="text-white/80 text-lg leading-relaxed">
                  {t(
                    "home.promise.items.2.description",
                    '"And God will wipe away every tear from their eyes; there shall be no more death, nor sorrow, nor crying. There shall be no more pain, for the former things have passed away."',
                  )}
                </CardDescription>
                <p className="text-yellow-300 font-semibold mt-4">
                  {t("home.promise.items.2.reference", "- Revelation 21:4")}
                </p>
              </CardHeader>
            </Card>
          </div>

          {/* Central Declaration */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-yellow-400/20 via-white/10 to-yellow-400/20 backdrop-blur-sm border border-yellow-300/30 rounded-3xl p-12 max-w-4xl mx-auto shadow-2xl">
              <div className="flex items-center justify-center mb-6 space-x-4">
                <Star className="h-8 w-8 text-yellow-300 animate-pulse" />
                <Crown className="h-10 w-10 text-yellow-300 animate-divine-pulse" />
                <Star className="h-8 w-8 text-yellow-300 animate-pulse" />
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-yellow-300 mb-6 text-divine-glow">
                {t(
                  "home.promise.declaration.title",
                  '"EVEN SO, COME LORD JESUS!"',
                )}
              </h3>
              <p className="text-white/90 text-xl leading-relaxed mb-4">
                {t(
                  "home.promise.declaration.text",
                  'The Spirit and the bride say, "Come!" And let him who hears say, "Come!" And let him who thirsts come. Whoever desires, let him take the water of life freely.',
                )}
              </p>
              <p className="text-yellow-300 font-bold text-lg">
                {t(
                  "home.promise.declaration.reference",
                  "- Revelation 22:17, 20",
                )}
              </p>

              {/* Call to Preparation */}
              <div className="mt-8">
                <Button
                  asChild
                  className="bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-500 hover:to-yellow-400 text-gray-900 px-10 py-4 text-lg font-bold shadow-2xl border-0 animate-divine-pulse transform hover:scale-105 transition-all duration-300"
                >
                  <a href="#revelation" className="flex items-center">
                    <BookOpen className="h-6 w-6 mr-3" />
                    {t("home.promise.declaration.cta", "Study Revelation")}
                    <Sparkles className="h-6 w-6 ml-3" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Enhanced with Divine Connection Theme */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-b from-purple-50 to-gray-900 relative"
      >
        {/* Starry background effect */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-800/50 to-gray-900"></div>
          {/* Stars */}
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-yellow-300 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
          <div className="absolute bottom-1/2 left-1/3 w-1 h-1 bg-yellow-200 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-white rounded-full animate-ping"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6 shadow-xl">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              {t("home.contact.title")}
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {t(
                "home.contact.subtitle",
                "Connect with us as we journey together toward His eternal kingdom",
              )}
            </p>
          </div>

          {/* Social Media Buttons with Enhanced Design */}
          <div className="flex justify-center space-x-6">
            <Button
              asChild
              className="group w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border-0 shadow-2xl transform hover:scale-110 transition-all duration-300"
            >
              <a
                href="https://www.youtube.com/@ismaelthesilva"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="relative"
              >
                <Youtube className="h-8 w-8 text-white group-hover:animate-pulse" />
                <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </Button>

            <Button
              asChild
              className="group w-16 h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 border-0 shadow-2xl transform hover:scale-110 transition-all duration-300"
            >
              <a
                href="https://www.instagram.com/ismaelthesilva/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="relative"
              >
                <Instagram className="h-8 w-8 text-white group-hover:animate-pulse" />
                <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </Button>

            <Button
              asChild
              className="group w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-0 shadow-2xl transform hover:scale-110 transition-all duration-300"
            >
              <a
                href="mailto:ministry@ismaelsilva.org"
                aria-label="Email"
                className="relative"
              >
                <Mail className="h-8 w-8 text-white group-hover:animate-pulse" />
                <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </Button>
          </div>

          {/* Divine Message */}
          <div className="text-center mt-12">
            <p className="text-gray-300 text-lg italic">
              {t(
                "home.contact.message",
                '"Come, Lord Jesus!" - Revelation 22:20',
              )}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

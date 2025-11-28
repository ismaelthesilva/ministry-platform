import React from "react";
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ExternalLink, 
  Music, 
  Heart, 
  Mail, 
  Instagram, 
  Youtube, 
  BookOpen,
  Star,
  Crown,
  Zap,
  Globe,
  MessageCircle,
  Play,
  Download,
  ChevronDown,
  Cross,
  Shield,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

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

const Home: React.FC = () => {
  const { t } = useLanguage();

  // Helper function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : '';
  };

  // Define the data directly since the translation system expects simple strings
  const messages: Video[] = [
    {
      link: "https://www.youtube.com/watch?v=Gk1NMp3g_b0",
      title: t('home.messages.videos.0.title', 'The Incomparable Christ'),
      description: t('home.messages.videos.0.description', 'Who is Jesus Christ? How important is Jesus to my life today?')
    },
    {
      link: "https://www.youtube.com/watch?v=EZ4LBnEZPlg",
      title: t('home.messages.videos.1.title', 'The way to Happiness'),
      description: t('home.messages.videos.1.description', 'Do you want to be happy? Discover the path to true happiness.')
    },
    {
      link: "https://www.youtube.com/watch?v=jf9Kogw6FU4",
      title: t('home.messages.videos.2.title', 'O Incomparável Cristo'),
      description: t('home.messages.videos.2.description', 'Quem é Jesus Cristo? Qual a importância de Jesus na minha vida hoje?')
    }
  ];

  const books: Book[] = [
    {
      title: t('home.books.items.0.title', 'eBook'),
      subtitle: t('home.books.items.0.subtitle', 'English Edition'),
      image: "/ministry-images/book-king.jpg",
      link: "https://www.amazon.com/dp/B082LX6ZWZ",
      buttonText: t('home.books.items.0.buttonText', 'Buy on Amazon Kindle')
    },
    {
      title: t('home.books.items.1.title', 'eBook & Paperback'),
      subtitle: t('home.books.items.1.subtitle', 'Portuguese Edition'),
      image: "/ministry-images/livro-rei.jpg",
      link: "https://www.amazon.com.br/dp/B082J64R4X",
      buttonText: t('home.books.items.1.buttonText', 'Buy on Amazon')
    }
  ];

  const songs: Video[] = [
    {
      link: "https://www.youtube.com/watch?v=TncbtUXcFRs",
      title: t('home.songs.videos.0.title', 'O Toque que Cura'),
      description: t('home.songs.videos.0.description', 'Original Song')
    },
    {
      link: "https://www.youtube.com/watch?v=YI-vkMp2Gjk",
      title: t('home.songs.videos.1.title', 'Virtuosa'),
      description: t('home.songs.videos.1.description', 'Original Song')
    },
    {
      link: "https://www.youtube.com/watch?v=mtK__QsG0bk",
      title: t('home.songs.videos.2.title', 'O Teu Amor me salvou'),
      description: t('home.songs.videos.2.description', 'Original Song')
    }
  ];

  const aboutContent: string[] = [
    t('home.about.content.0', 'Embracing the Christian faith is both a profound privilege and a weighty responsibility...'),
    t('home.about.content.1', 'Partnering with God, these seasons are ordinary yet may I reflect on my journey...'),
    t('home.about.content.2', 'My life\'s path led me to Brazil and New Zealand with my beloved wife, Jandai...'),
    t('home.about.content.3', 'Following Jesus\'s command in Matthew 28:19-20, we\'re committed to spreading the gospel...'),
    t('home.about.content.4', 'As Theodore Roosevelt wisely said, "People don\'t care how much you know..."'),
    t('home.about.content.5', 'In summation, I declare, "God is love" (1 John 4:8)...')
  ];

  const musicDescription: string[] = [
    t('home.music.description.0', 'My passion for music has led me to create original worship songs...'),
    t('home.music.description.1', 'Listen to my original songs on popular streaming platforms...'),
    t('home.music.description.2', 'Click links to listen to my Original songs on Apple Music, Spotify and many others!')
  ];

  return (
    <div className="min-h-screen bg-heavenly relative overflow-hidden">
      {/* Floating Call-to-Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button asChild className="group bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-700 hover:via-blue-700 hover:to-purple-700 text-white px-6 py-3 text-base font-semibold shadow-2xl border-0 rounded-full animate-divine-pulse transform hover:scale-110 transition-all duration-300">
          <a href="/revelation" className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2 group-hover:animate-pulse" />
            Revelation Study
          </a>
        </Button>
      </div>

      {/* Floating Starfall Elements for Heavenly Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute animate-starfall opacity-30" style={{ left: '10%', animationDelay: '0s' }}>
          <Star className="h-2 w-2 text-yellow-300" />
        </div>
        <div className="absolute animate-starfall opacity-20" style={{ left: '30%', animationDelay: '2s' }}>
          <Star className="h-1 w-1 text-white" />
        </div>
        <div className="absolute animate-starfall opacity-40" style={{ left: '70%', animationDelay: '4s' }}>
          <Star className="h-1.5 w-1.5 text-yellow-200" />
        </div>
        <div className="absolute animate-starfall opacity-25" style={{ left: '90%', animationDelay: '6s' }}>
          <Star className="h-2 w-2 text-blue-200" />
        </div>
      </div>

      {/* Hero Section - Enhanced with Divine Majesty */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image with Enhanced Divine Overlay */}
        <div className="absolute inset-0">
          <img
            src="/ministry-images/header-felicidade.png"
            alt="Ministry Header"
            className="w-full h-full object-cover object-center scale-105 animate-[zoom_20s_ease-in-out_infinite_alternate]"
          />
          {/* Multiple Divine Light Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 via-purple-900/60 to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent"></div>
          <div className="absolute inset-0 bg-divine-radiance"></div>
        </div>
        
        {/* Floating Divine Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Heavenly Light Particles */}
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-yellow-300 rounded-full animate-divine-pulse opacity-60"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white rounded-full animate-heavenly-float opacity-50"></div>
          <div className="absolute bottom-1/3 left-1/5 w-2.5 h-2.5 bg-blue-200 rounded-full animate-divine-pulse opacity-70"></div>
          <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-purple-200 rounded-full animate-heavenly-float opacity-40"></div>
          
          {/* Divine Cross Elements */}
          <div className="absolute top-1/6 right-1/6 animate-grace-glow">
            <Cross className="h-8 w-8 text-yellow-300/30" />
          </div>
          <div className="absolute bottom-1/4 left-1/8 animate-breathe">
            <Cross className="h-6 w-6 text-white/20" />
          </div>
        </div>
        
        <div className="container mx-auto h-full flex flex-col items-center justify-center relative z-10 px-4 text-center">
          {/* Divine Crown with Enhanced Animation */}
          <div className="mb-8 relative">
            <div className="animate-divine-pulse">
              <Crown className="h-20 w-20 text-yellow-400 drop-shadow-2xl mx-auto mb-4 text-divine-glow" />
            </div>
            {/* Radiating Light Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent blur-3xl animate-pulse"></div>
          </div>
          
          {/* Main Title with Enhanced Divine Styling */}
          <div className="relative mb-6">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-yellow-200 drop-shadow-2xl leading-tight text-divine-glow">
              {t('home.hero.title')}
            </h1>
            {/* Multiple Glow Layers */}
            <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl -z-10"></div>
            <div className="absolute -top-2 -left-2 w-full h-full bg-gradient-to-r from-yellow-400/10 to-white/10 blur-2xl -z-10"></div>
          </div>
          
          {/* Subtitle with Grace Styling */}
          <p className="text-2xl md:text-4xl lg:text-5xl text-blue-100 font-light tracking-wider drop-shadow-lg uppercase text-grace-shadow mb-8">
            {t('home.hero.subtitle')}
          </p>
          
          {/* Divine Light Badge with Enhanced Effect */}
          <div className="relative mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent blur-2xl animate-pulse"></div>
            <Badge className="relative bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-gray-900 font-bold px-8 py-3 text-xl border-0 shadow-2xl animate-divine-pulse">
              <Sparkles className="h-6 w-6 mr-3" />
              {t('home.hero.tagline')}
              <Sparkles className="h-6 w-6 ml-3" />
            </Badge>
          </div>
          
          {/* Call to Action with Divine Power */}
          <div className="space-y-6">
            <Button 
              asChild 
              size="lg" 
              className="group bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 text-white px-12 py-6 text-xl font-bold shadow-2xl border-0 animate-divine-pulse transform hover:scale-105 transition-all duration-300"
            >
              <a href="#messages" className="flex items-center">
                <Shield className="h-6 w-6 mr-3 group-hover:animate-pulse" />
                {t('home.hero.cta')}
                <Play className="h-6 w-6 ml-3 group-hover:animate-pulse" />
              </a>
            </Button>
            
            {/* Scroll Invitation */}
            <div className="flex flex-col items-center text-white/90 animate-bounce">
              <ChevronDown className="h-8 w-8 mb-2" />
              <span className="text-lg font-light tracking-wide">{t('home.hero.scroll')}</span>
            </div>
          </div>
        </div>
        
        {/* Enhanced Bottom Fade with Divine Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-50 via-blue-50/50 to-transparent"></div>
      </section>

      {/* Messages Section - Enhanced with Divine Proclamation Theme */}
      <section id="messages" className="py-24 bg-gradient-to-b from-white via-blue-50 to-purple-50 relative">
        {/* Divine Background Pattern */}
        <div className="absolute inset-0 bg-grace-aura opacity-30"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Enhanced Section Header */}
          <div className="text-center mb-20">
            <div className="relative mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-2xl animate-divine-pulse">
                <MessageCircle className="h-10 w-10 text-white" />
              </div>
              {/* Radiating Divine Light */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse scale-150"></div>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 text-divine-glow">
              {t('home.messages.title')}
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              {t('home.messages.subtitle')}
            </p>
            
            {/* Divine Separator */}
            <div className="flex items-center justify-center mt-8 space-x-4">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-blue-400"></div>
              <Star className="h-6 w-6 text-blue-500 animate-pulse" />
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-purple-400"></div>
            </div>
          </div>
          
          {/* Enhanced Messages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {messages.map((video: Video, index: number) => (
              <Card key={index} className="group card-divine overflow-hidden bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-3 relative">
                {/* Divine Glow Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-blue-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                
                {/* Video Container with Enhanced Overlay */}
                <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                  <iframe 
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(video.link)}?enablejsapi=1&origin=${window.location.origin}&rel=0&showinfo=0&modestbranding=1&autoplay=0&controls=1`}
                    title={video.title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
                
                {/* Enhanced Content */}
                <CardHeader className="p-8 relative">
                  <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 mb-4 leading-tight">
                    {video.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed text-lg mb-6">
                    {video.description}
                  </CardDescription>
                  
                  {/* Divine Badge with Enhanced Styling */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-blue-500">
                      <Star className="h-5 w-5 mr-3 animate-pulse" />
                      <span className="text-sm font-semibold tracking-wide uppercase">{t('home.messages.label')}</span>
                    </div>
                    <Cross className="h-5 w-5 text-blue-300 animate-grace-glow" />
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
          
          {/* Call to Action */}
          <div className="text-center mt-16">
            <p className="text-gray-600 text-lg mb-6 italic">
              "Faith comes by hearing, and hearing by the word of God" - Romans 10:17
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold shadow-xl transform hover:scale-105 transition-all duration-300">
              <Youtube className="h-5 w-5 mr-2" />
              Watch More Messages
            </Button>
          </div>
        </div>
      </section>

      {/* Books Section - Enhanced with Sacred Literature Theme */}
      <section id="books" className="py-20 bg-gradient-to-b from-blue-50 to-purple-50 relative overflow-hidden">
        {/* Divine Light Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 shadow-xl">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              {t('home.books.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t('home.books.subtitle', 'Sacred writings that illuminate the path to eternal truth and divine understanding')}
            </p>
          </div>
          
          {/* Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {books.map((book: Book, index: number) => (
              <Card key={index} className="group relative overflow-hidden bg-white/90 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3">
                {/* Divine Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-transparent to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative p-8 flex flex-col items-center text-center">
                  {/* Book Image with Enhanced Styling */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-purple-400/30 rounded-2xl blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <a 
                      href={book.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative block transform transition-transform duration-500 hover:scale-110"
                    >
                      <img 
                        src={book.image} 
                        alt={book.title} 
                        className="w-40 md:w-48 h-auto shadow-2xl rounded-lg border-4 border-white/50"
                      />
                      {/* Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                          <ExternalLink className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </a>
                  </div>
                  
                  {/* Book Info */}
                  <CardHeader className="text-center p-0 mb-6">
                    <CardTitle className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                      {book.title}
                    </CardTitle>
                    <CardDescription className="text-lg text-gray-600 font-medium">
                      {book.subtitle}
                    </CardDescription>
                  </CardHeader>
                  
                  {/* CTA Button */}
                  <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg font-semibold shadow-xl border-0 transform group-hover:scale-105 transition-all duration-300">
                    <a href={book.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <Download className="h-5 w-5 mr-2" />
                      {book.buttonText}
                    </a>
                  </Button>
                  
                  {/* Divine Badge */}
                  <div className="mt-4 flex items-center text-purple-500">
                    <Crown className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">{t('home.books.label', 'Sacred Literature')}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Original Songs Section - Enhanced with Heavenly Music Theme */}
      <section id="songs" className="py-20 bg-gradient-to-b from-purple-50 to-white relative">
        {/* Musical Note Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ec4899' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mb-6 shadow-xl">
              <Music className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">
              {t('home.songs.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t('home.songs.subtitle', 'Heavenly melodies that lift the soul and prepare hearts for worship in His presence')}
            </p>
          </div>
          
          {/* Songs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {songs.map((song: Video, index: number) => (
              <Card key={index} className="group overflow-hidden bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {/* Video Container with Musical Overlay */}
                <div className="relative aspect-video w-full overflow-hidden">
                  <iframe 
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(song.link)}?enablejsapi=1&origin=${window.location.origin}&rel=0&showinfo=0&modestbranding=1&autoplay=0&controls=1`}
                    title={song.title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
                
                {/* Content */}
                <CardHeader className="p-6">
                  <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors duration-300 mb-3">
                    {song.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 flex items-center mb-3">
                    <Music className="h-4 w-4 mr-2 text-pink-500" />
                    {song.description}
                  </CardDescription>
                  
                  {/* Musical Badge */}
                  <div className="flex items-center text-pink-500">
                    <Zap className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">{t('home.songs.label', 'Worship Song')}</span>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Me Section - Enhanced with Love, Grace and Servant Heart Theme */}
      <section className="py-24 bg-gradient-to-b from-white via-green-50 to-blue-50 relative" id="about">
        {/* Background Elements of Grace */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-0 w-80 h-80 bg-green-200/20 rounded-full blur-3xl animate-grace-glow"></div>
          <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-breathe"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-200/10 rounded-full blur-3xl animate-divine-pulse"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="relative mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full shadow-2xl animate-grace-glow">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/30 to-teal-400/30 rounded-full blur-xl animate-pulse scale-150"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 text-grace-shadow">
              {t('home.about.title')}
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              {t('home.about.subtitle')}
            </p>
            <div className="flex items-center justify-center mt-8 space-x-4">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-green-400"></div>
              <Heart className="h-6 w-6 text-green-500 animate-pulse" />
              <div className="w-8 h-0.5 bg-green-400"></div>
              <Cross className="h-6 w-6 text-teal-500 animate-grace-glow" />
              <div className="w-8 h-0.5 bg-teal-400"></div>
              <Heart className="h-6 w-6 text-teal-500 animate-pulse" />
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-teal-400"></div>
            </div>
          </div>

          {/* 2x2 Grid: Photo (top left), First Paragraph (top right), Rest (bottom full row) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start mb-12">
            {/* Photo */}
            <div className="flex justify-center">
              <div className="relative group w-80">
                <div className="absolute -top-8 -left-8 w-full h-full bg-gradient-to-br from-green-400/30 to-teal-400/30 rounded-3xl blur-2xl animate-grace-glow"></div>
                <div className="absolute -top-4 -left-4 w-full h-full bg-green-600/60 rounded-2xl shadow-2xl"></div>
                <div className="absolute -top-2 -left-2 w-full h-full bg-gradient-to-br from-green-500/40 to-teal-500/40 rounded-2xl blur-lg"></div>
                <div className="relative overflow-hidden rounded-2xl border-4 border-white shadow-2xl">
                  <img 
                    src="/ministry-images/ismael-profile20.jpg" 
                    alt="Ismael Silva" 
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 via-transparent to-transparent"></div>
                </div>
                <div className="absolute -top-6 -right-6 bg-yellow-400 rounded-full p-4 shadow-xl animate-divine-pulse">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-teal-500 rounded-full p-3 shadow-xl animate-grace-glow">
                  <Heart className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            {/* First Paragraph */}
            <div className="flex items-center">
              <div className="group relative w-full">
                <div className="absolute -left-4 top-2 w-1 h-full bg-gradient-to-b from-green-400 to-teal-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <p className="text-gray-700 leading-relaxed text-lg group-hover:text-gray-900 transition-all duration-300 p-6 rounded-xl hover:bg-white/60 hover:shadow-lg border border-transparent hover:border-green-200/50">
                  {aboutContent[0]}
                </p>
              </div>
            </div>
            {/* Bottom Full Row: Rest of the paragraphs */}
            <div className="lg:col-span-2">
              <div className="space-y-0">
                {aboutContent.slice(1).map((paragraph: string, index: number) => (
                  <div key={index} className="group relative">
                    <div className="absolute -left-4 top-2 w-1 h-full bg-gradient-to-b from-green-400 to-teal-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <p className="text-gray-700 leading-relaxed text-lg group-hover:text-gray-900 transition-all duration-300 p-6 rounded-xl hover:bg-white/60 hover:shadow-lg border border-transparent hover:border-green-200/50">
                      {paragraph}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Global Mission - Full Row */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="p-8 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 rounded-3xl border border-green-200/50 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4">
                  <Globe className="h-16 w-16 text-green-500 animate-breathe" />
                </div>
                <div className="absolute bottom-4 left-4">
                  <Heart className="h-12 w-12 text-teal-500 animate-pulse" />
                </div>
              </div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-green-500 to-teal-500 p-3 rounded-full mr-4 shadow-lg">
                    <Globe className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-800">
                    {t('home.about.mission')}
                  </h3>
                </div>
                <p className="text-green-700 leading-relaxed text-lg mb-6">
                  {t('home.about.missionText')}
                </p>
                <div className="border-l-4 border-green-400 pl-6 bg-white/50 p-4 rounded-r-lg">
                  <p className="text-green-800 italic font-medium">
                    "{t('home.about.missionScripture')}" 
                    <span className="text-green-600 font-bold ml-2">- {t('home.about.missionScriptureRef')}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* God is Love - Full Row */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center p-8 bg-gradient-to-r from-green-100 to-teal-100 rounded-2xl border-2 border-green-300/30 shadow-xl">
              <div className="flex items-center justify-center mb-4 space-x-2">
                <Heart className="h-6 w-6 text-red-500 animate-pulse" />
                <span className="text-2xl font-bold text-green-800">{t('home.about.godIsLoveTitle')}</span>
                <Heart className="h-6 w-6 text-red-500 animate-pulse" />
              </div>
              <p className="text-green-700 text-lg italic">
                "{t('home.about.godIsLoveScripture')}" - {t('home.about.godIsLoveScriptureRef')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Music Album Section - Enhanced with Divine Harmony Theme */}
      <section id="music" className="py-20 bg-gradient-to-b from-blue-50 to-purple-50 relative overflow-hidden">
        {/* Background Music Notes */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 text-6xl text-blue-600">♪</div>
          <div className="absolute top-1/2 right-1/3 text-4xl text-purple-600">♫</div>
          <div className="absolute bottom-1/3 left-1/2 text-5xl text-pink-600">♪</div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6 shadow-xl">
              <Music className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {t('home.music.title')}
            </h2>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-12 items-center max-w-7xl mx-auto">
            {/* Music Text and Links */}
            <div className="lg:w-2/3 space-y-8">
              {musicDescription.map((paragraph: string, index: number) => (
                <p key={index} className="text-gray-700 leading-relaxed text-lg p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                  {paragraph}
                </p>
              ))}
              
              {/* Enhanced Music Platform Buttons */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <Button asChild className="group bg-gradient-to-r from-gray-800 to-black hover:from-gray-900 hover:to-gray-800 text-white h-16 text-base font-semibold shadow-xl transform hover:scale-105 transition-all duration-300">
                  <a 
                    href="https://distrokid.com/hyperfollow/ismaelsilva/o-teu-amor-me-salvou-live" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center"
                  >
                    <Music className="h-6 w-6 mb-1 group-hover:animate-pulse" />
                    <span>Apple Music</span>
                  </a>
                </Button>
                
                <Button asChild className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white h-16 text-base font-semibold shadow-xl transform hover:scale-105 transition-all duration-300">
                  <a 
                    href="https://distrokid.com/hyperfollow/ismaelsilva/o-teu-amor-me-salvou-live" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center"
                  >
                    <Music className="h-6 w-6 mb-1 group-hover:animate-pulse" />
                    <span>Spotify</span>
                  </a>
                </Button>
                
                <Button asChild className="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white h-16 text-base font-semibold shadow-xl transform hover:scale-105 transition-all duration-300">
                  <a 
                    href="https://distrokid.com/hyperfollow/ismaelsilva/o-teu-amor-me-salvou-live" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center"
                  >
                    <Heart className="h-6 w-6 mb-1 group-hover:animate-pulse" />
                    <span>All Platforms</span>
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
                  <img 
                    src="/ministry-images/isma-album.jpg" 
                    alt="Ismael Silva Music" 
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
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
              HIS GLORIOUS RETURN
            </h2>
            <p className="text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light">
              The hope of every believer - the blessed promise of our Lord's return
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
                  HIS PROMISE
                </CardTitle>
                <CardDescription className="text-white/80 text-lg leading-relaxed">
                  "And if I go and prepare a place for you, I will come again and receive you to Myself; that where I am, there you may be also."
                </CardDescription>
                <p className="text-yellow-300 font-semibold mt-4">- John 14:3</p>
              </CardHeader>
            </Card>
            
            {/* Promise 2 */}
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 group">
              <CardHeader className="p-8 text-center">
                <div className="mb-6">
                  <Crown className="h-12 w-12 text-yellow-300 mx-auto animate-grace-glow" />
                </div>
                <CardTitle className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-300 transition-colors duration-300">
                  HIS KINGDOM
                </CardTitle>
                <CardDescription className="text-white/80 text-lg leading-relaxed">
                  "Then the King will say to those on His right hand, 'Come, you blessed of My Father, inherit the kingdom prepared for you from the foundation of the world.'"
                </CardDescription>
                <p className="text-yellow-300 font-semibold mt-4">- Matthew 25:34</p>
              </CardHeader>
            </Card>
            
            {/* Promise 3 */}
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 group">
              <CardHeader className="p-8 text-center">
                <div className="mb-6">
                  <Heart className="h-12 w-12 text-yellow-300 mx-auto animate-breathe" />
                </div>
                <CardTitle className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-300 transition-colors duration-300">
                  HIS LOVE
                </CardTitle>
                <CardDescription className="text-white/80 text-lg leading-relaxed">
                  "And God will wipe away every tear from their eyes; there shall be no more death, nor sorrow, nor crying. There shall be no more pain, for the former things have passed away."
                </CardDescription>
                <p className="text-yellow-300 font-semibold mt-4">- Revelation 21:4</p>
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
                "EVEN SO, COME LORD JESUS!"
              </h3>
              <p className="text-white/90 text-xl leading-relaxed mb-4">
                The Spirit and the bride say, "Come!" And let him who hears say, "Come!" 
                And let him who thirsts come. Whoever desires, let him take the water of life freely.
              </p>
              <p className="text-yellow-300 font-bold text-lg">- Revelation 22:17, 20</p>
              
              {/* Call to Preparation */}
              <div className="mt-8">
                <Button asChild className="bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-500 hover:to-yellow-400 text-gray-900 px-10 py-4 text-lg font-bold shadow-2xl border-0 animate-divine-pulse transform hover:scale-105 transition-all duration-300">
                  <a href="#revelation" className="flex items-center">
                    <BookOpen className="h-6 w-6 mr-3" />
                    Study Revelation
                    <Sparkles className="h-6 w-6 ml-3" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Enhanced with Divine Connection Theme */}
      <section id="contact" className="py-20 bg-gradient-to-b from-purple-50 to-gray-900 relative">
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
              {t('home.contact.title')}
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {t('home.contact.subtitle', 'Connect with us as we journey together toward His eternal kingdom')}
            </p>
          </div>
          
          {/* Social Media Buttons with Enhanced Design */}
          <div className="flex justify-center space-x-6">
            <Button asChild className="group w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border-0 shadow-2xl transform hover:scale-110 transition-all duration-300">
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
            
            <Button asChild className="group w-16 h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 border-0 shadow-2xl transform hover:scale-110 transition-all duration-300">
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
            
            <Button asChild className="group w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-0 shadow-2xl transform hover:scale-110 transition-all duration-300">
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
              {t('home.contact.message', '"Come, Lord Jesus!" - Revelation 22:20')}
            </p>
          </div>
        </div>
      </section>

      {/* Footer - Enhanced with Eternal Hope Theme */}
      <footer className="py-16 bg-gray-900 border-t border-gray-700 relative overflow-hidden">
        {/* Heavenly Background */}
        <div className="absolute inset-0">
          <div className="absolute top-4 left-4 w-1 h-1 bg-yellow-300 rounded-full animate-pulse"></div>
          <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
          <div className="absolute bottom-4 left-1/3 w-1 h-1 bg-blue-200 rounded-full animate-pulse"></div>
          <div className="absolute bottom-8 right-1/4 w-1 h-1 bg-yellow-200 rounded-full animate-ping"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Divine Crown */}
          <div className="mb-6">
            <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-4 animate-divine-pulse" />
          </div>
          
          {/* Ministry Title */}
          <p className="text-gray-100 mb-3 font-bold text-2xl text-divine-glow">{t('home.hero.title')}</p>
          <p className="text-yellow-300 mb-6 text-lg font-semibold tracking-wide">{t('home.hero.subtitle')}</p>
          
          {/* Eternal Message */}
          <div className="mb-6 max-w-md mx-auto">
            <div className="bg-gradient-to-r from-yellow-400/20 to-blue-400/20 backdrop-blur-sm border border-yellow-300/30 rounded-2xl p-6">
              <div className="flex items-center justify-center text-yellow-300 text-lg font-semibold mb-2">
                <Star className="h-5 w-5 mr-2" />
                <span>{t('home.footer.message')}</span>
                <Star className="h-5 w-5 ml-2" />
              </div>
              <p className="text-gray-300 text-sm italic">
                "Surely I am coming quickly" - Revelation 22:20
              </p>
            </div>
          </div>
          
          {/* Copyright & Final Blessing */}
          <div className="border-t border-gray-700 pt-6">
            <p className="text-gray-500 text-sm mb-3">© 2025 All rights reserved</p>
            <div className="flex items-center justify-center text-gray-400 text-sm space-x-4">
              <Cross className="h-4 w-4 text-blue-300" />
              <span className="text-blue-300 font-medium">Grace & Peace</span>
              <Heart className="h-4 w-4 text-red-300" />
              <span className="text-green-300 font-medium">Love & Hope</span>
              <Crown className="h-4 w-4 text-yellow-300" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

import React from "react";
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Music, Heart, Mail, Instagram, Youtube } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface Video {
  id: string;
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

  // Define the data directly since the translation system expects simple strings
  const messages: Video[] = [
    {
      id: "Gk1NMp3g_b0",
      title: t('home.messages.videos.0.title', 'The Incomparable Christ'),
      description: t('home.messages.videos.0.description', 'Who is Jesus Christ? How important is Jesus to my life today?')
    },
    {
      id: "EZ4LBnEZPlg", 
      title: t('home.messages.videos.1.title', 'The way to Happiness'),
      description: t('home.messages.videos.1.description', 'Do you want to be happy? Discover the path to true happiness.')
    },
    {
      id: "jf9Kogw6FU4",
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
      id: "TncbtUXcFRs",
      title: t('home.songs.videos.0.title', 'O Toque que Cura'),
      description: t('home.songs.videos.0.description', 'Original Song')
    },
    {
      id: "YI-vkMp2Gjk",
      title: t('home.songs.videos.1.title', 'Virtuosa'),
      description: t('home.songs.videos.1.description', 'Original Song')
    },
    {
      id: "mtK__QsG0bk",
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-80 md:h-96 lg:h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/ministry-images/header-felicidade.jpg"
            alt="Ministry Header"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        <div className="container mx-auto h-full flex flex-col items-center justify-center relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center drop-shadow-lg">
            {t('home.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-white mt-2 uppercase tracking-wider drop-shadow-lg">
            {t('home.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Messages Section */}
      <section id="messages" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            {t('home.messages.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {messages.map((video: Video, index: number) => (
              <Card key={index} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="relative aspect-video w-full">
                  <iframe 
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">{video.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {video.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section id="books" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            {t('home.books.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {books.map((book: Book, index: number) => (
              <Card key={index} className="flex flex-col items-center p-6 hover:shadow-lg transition-all duration-300">
                <a 
                  href={book.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transform transition-transform hover:scale-105 mb-4"
                >
                  <img 
                    src={book.image} 
                    alt={book.title} 
                    className="w-32 md:w-40 h-auto shadow-lg rounded"
                  />
                </a>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl text-gray-800 mb-1">{book.title}</CardTitle>
                  <CardDescription className="text-gray-600 mb-4">{book.subtitle}</CardDescription>
                </CardHeader>
                <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-white">
                  <a href={book.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {book.buttonText}
                  </a>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Original Songs Section */}
      <section id="songs" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            {t('home.songs.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {songs.map((song: Video, index: number) => (
              <Card key={index} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="relative aspect-video w-full">
                  <iframe 
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${song.id}`}
                    title={song.title}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">{song.title}</CardTitle>
                  <CardDescription className="text-gray-600 flex items-center">
                    <Music className="h-4 w-4 mr-2" />
                    {song.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-16 bg-gray-50" id="about">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            {t('home.about.title')}
          </h2>
          <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
            {/* Profile Image */}
            <div className="md:w-1/3 flex-shrink-0">
              <div className="relative">
                <div className="bg-green-700 absolute -top-4 -left-4 w-full h-full rounded-lg"></div>
                <img 
                  src="/ministry-images/ismael-profile20.jpg" 
                  alt="Ismael Silva" 
                  className="w-full h-auto rounded-lg shadow-lg relative z-10 object-cover"
                />
              </div>
            </div>
            
            {/* About Text */}
            <div className="md:w-2/3 space-y-4">
              {aboutContent.map((paragraph: string, index: number) => (
                <p key={index} className="text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Music Album Section */}
      <section id="music" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            {t('home.music.title')}
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-center max-w-6xl mx-auto">
            {/* Music Text and Links */}
            <div className="md:w-2/3 space-y-6">
              {musicDescription.map((paragraph: string, index: number) => (
                <p key={index} className="text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
              <div className="flex space-x-4 pt-4">
                <Button asChild variant="outline" size="icon" className="w-12 h-12 bg-gray-200 hover:bg-gray-300">
                  <a 
                    href="https://distrokid.com/hyperfollow/ismaelsilva/o-teu-amor-me-salvou-live" 
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Apple Music"
                  >
                    <Music className="h-5 w-5 text-gray-700" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="icon" className="w-12 h-12 bg-green-500 hover:bg-green-600">
                  <a 
                    href="https://distrokid.com/hyperfollow/ismaelsilva/o-teu-amor-me-salvou-live" 
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Spotify"
                  >
                    <Music className="h-5 w-5 text-white" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="icon" className="w-12 h-12 bg-orange-500 hover:bg-orange-600">
                  <a 
                    href="https://distrokid.com/hyperfollow/ismaelsilva/o-teu-amor-me-salvou-live" 
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Other Music Platforms"
                  >
                    <Heart className="h-5 w-5 text-white" />
                  </a>
                </Button>
              </div>
            </div>
            
            {/* Album Image */}
            <div className="md:w-1/3 flex-shrink-0 order-first md:order-last">
              <div className="relative">
                <div className="bg-blue-700 absolute -top-4 -right-4 w-full h-full rounded-lg"></div>
                <img 
                  src="/ministry-images/isma-album.jpg" 
                  alt="Ismael Silva Music" 
                  className="w-full h-auto rounded-lg shadow-lg relative z-10 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            {t('home.contact.title')}
          </h2>
          <div className="flex justify-center space-x-4">
            <Button asChild variant="outline" size="icon" className="w-12 h-12 bg-red-600 hover:bg-red-700 border-red-600">
              <a 
                href="https://www.youtube.com/@ismaelthesilva" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5 text-white" />
              </a>
            </Button>
            <Button asChild variant="outline" size="icon" className="w-12 h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 border-none">
              <a 
                href="https://www.instagram.com/ismaelthesilva/" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-white" />
              </a>
            </Button>
            <Button asChild variant="outline" size="icon" className="w-12 h-12 bg-red-500 hover:bg-red-600 border-red-500">
              <a 
                href="mailto:ministry@ismaelsilva.org"
                aria-label="Email"
              >
                <Mail className="h-5 w-5 text-white" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 mb-2 font-semibold">{t('home.hero.title')}</p>
          <p className="text-gray-500 text-sm">© 2025 All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

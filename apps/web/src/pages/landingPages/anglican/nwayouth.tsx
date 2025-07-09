import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Youtube, Users, Sparkles, Music, Smile } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";

const featuredVideo = {
  title: 'Welcome to NWA Youth!',
  url: 'https://www.youtube.com/embed/EayMrraTQa4?si=Cwwv0ePfUHIHqsDD', // Replace with your featured video
  description: 'A place for youth to connect, grow, and shine for Jesus!'
};

const moreVideos = [
  {
    title: 'Youth Worship Night',
    url: 'https://www.youtube.com/embed/EayMrraTQa4?si=Cwwv0ePfUHIHqsDD',
    description: 'Experience the energy and passion of our youth worship.'
  },
  {
    title: 'Testimony: Changed Lives',
    url: 'https://www.youtube.com/embed/EayMrraTQa4?si=Cwwv0ePfUHIHqsDD',
    description: 'Hear how God is moving among our youth.'
  },
  {
    title: 'Fun & Fellowship',
    url: 'https://www.youtube.com/embed/EayMrraTQa4?si=Cwwv0ePfUHIHqsDD',
    description: 'See highlights from our latest youth events!'
  }
];

const navLinks = [
  { label: "Home", to: "/nwayouth" },
  { label: "Pastoral", to: "/nwa-pastoral" },
  { label: "Reports", to: "/nwa-report-term2" },
  { label: "Resources", to: "/nwa-resources" },
];

const YouthPage: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center py-8">
      {/* Navbar */}
      <nav className="w-full max-w-5xl mb-8">
        <Card className="flex flex-row items-center justify-center gap-4 py-3 px-4 bg-white/90 dark:bg-gray-900/90 shadow-md border-0">
          {navLinks.map((link) => {
            const isActive =
              (link.to === "/landingPages/anglican/nwayouth" && location.pathname === link.to) ||
              (link.to !== "/landingPages/anglican/nwayouth" && location.pathname.startsWith(link.to));
            return (
              <Link key={link.label} to={link.to}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`text-base font-semibold px-4 ${
                    isActive
                      ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow"
                      : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  {link.label}
                </Button>
              </Link>
            );
          })}
        </Card>
      </nav>

      {/* Hero Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mb-6 shadow-lg">
          <Sparkles className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
          NWA <span className="text-pink-600">Youth</span>
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 max-w-xl mx-auto">
          Where faith, fun, and friendship meet! Join us for worship, real talk, and unforgettable moments.
        </p>
        <Badge className="bg-pink-500 text-white text-base px-4 py-2 mb-2">#ShineBright</Badge>
        <div className="mt-4">
          <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:from-pink-600 hover:to-purple-700">
            Join Our Next Event
          </Button>
        </div>
      </div>

      {/* Featured Video */}
      <Card className="w-full max-w-2xl mb-12 shadow-xl border-2 border-pink-200 dark:border-pink-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-pink-600 dark:text-pink-300">
            <Youtube className="h-6 w-6" />
            {featuredVideo.title}
          </CardTitle>
          <CardDescription>{featuredVideo.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md">
            <iframe
              src={featuredVideo.url}
              title={featuredVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-64 md:h-80 rounded-lg border-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* More Videos Section */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {moreVideos.map((video, idx) => (
          <Card key={idx} className="shadow-md border-2 border-purple-200 dark:border-purple-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                <Music className="h-5 w-5" />
                {video.title}
              </CardTitle>
              <CardDescription>{video.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <iframe
                  src={video.url}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-40 md:h-48 rounded-lg border-none"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Inspirational Quote */}
      <Card className="w-full max-w-2xl bg-gradient-to-r from-purple-100 to-pink-100 dark:from-gray-800 dark:to-gray-900 border-0 shadow-none mb-8">
        <CardContent>
          <div className="flex flex-col items-center gap-2 py-6">
            <Smile className="h-8 w-8 text-pink-500 mb-2" />
            <blockquote className="text-xl italic text-center text-gray-700 dark:text-gray-200">
              "Don’t let anyone look down on you because you are young, but set an example for the believers in speech, in conduct, in love, in faith and in purity."
            </blockquote>
            <span className="text-sm text-gray-500 dark:text-gray-400 mt-2">— 1 Timothy 4:12</span>
          </div>
        </CardContent>
      </Card>

      {/* Community Section */}
      <div className="text-center mt-8 mb-16">
        <Users className="h-8 w-8 mx-auto text-purple-500 mb-2" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Connect. Grow. Lead.</h2>
        <p className="text-gray-700 dark:text-gray-300 max-w-xl mx-auto mb-4">
          NWA Youth is a community where you belong. Bring your friends, share your story, and discover your purpose in Christ. We can’t wait to meet you!
        </p>
        <Button variant="outline" className="border-pink-400 text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900">
          Contact Youth Leaders
        </Button>
      </div>
    </div>
  );
};

export default YouthPage;

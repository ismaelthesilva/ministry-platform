import { Card } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { ArrowLeft, ExternalLink, Download } from 'lucide-react';

const NWAResourcesPage = () => {
  const resources = [
    {
      title: "Roster Term 3",
      description: "Ministry Schedule",
      url: "/nwayouth-resources/roster-term3.pdf",
      icon: "📄",
      type: "PDF Document",
      color: "bg-gradient-to-r from-red-500 to-pink-500",
      hoverColor: "hover:from-red-600 hover:to-pink-600"
    },
    {
      title: "Season 6: The Unlikely Ones",
      description: "Youth Study Guide - PDF Resource",
      url: "/nwayouth-resources/Season-6-The-Unlikely-Ones.pdf",
      icon: "📚",
      type: "Study Guide",
      color: "bg-gradient-to-r from-orange-500 to-red-500",
      hoverColor: "hover:from-orange-600 hover:to-red-600"
    },
    {
      title: "Mere Christianity Study Guide",
      description: "C.S. Lewis Study Guide - PDF Resource",
      url: "/nwayouth-resources/Mere-Christianity-Study-Guide.pdf",
      icon: "📖",
      type: "Study Guide",
      color: "bg-gradient-to-r from-amber-500 to-orange-500",
      hoverColor: "hover:from-amber-600 hover:to-orange-600"
    },
    {
      title: "NWA Youth WhatsApp",
      description: "Join our youth community chat",
      url: "https://chat.whatsapp.com/IWvAWtSOk7c7MnzjX8yAAo",
      icon: "💬",
      type: "WhatsApp Group",
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
      hoverColor: "hover:from-green-600 hover:to-emerald-600"
    },
    {
      title: "Instagram",
      description: "@northwestanglican_youth",
      url: "https://www.instagram.com/northwestanglican_youth",
      icon: "📸",
      type: "Social Media",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      hoverColor: "hover:from-purple-600 hover:to-pink-600"
    },
    {
      title: "Young Adults Group",
      description: "Connect with our young adults community",
      url: "https://m.me/ch/AbZ8SkFKT0vuCc-H/?send_source=cm:copy_invite_link",
      icon: "👥",
      type: "Messenger Group",
      color: "bg-gradient-to-r from-blue-500 to-indigo-500",
      hoverColor: "hover:from-blue-600 hover:to-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 relative">
      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => window.location.href = '/nwayouth'}
          className="bg-white/90 backdrop-blur-sm border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to NWA Youth
        </Button>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-32 w-28 h-28 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 dark:from-indigo-800/30 dark:to-purple-800/30"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
          <div className="text-center">
            {/* Logo/Avatar with enhanced animation */}
            <div className="mb-10">
              <div className="w-28 h-28 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold shadow-2xl transform hover:scale-110 transition-all duration-500 hover:rotate-6 animate-pulse">
                NWA
              </div>
              <div className="absolute inset-0 w-28 h-28 bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-full mx-auto blur-xl animate-pulse scale-150"></div>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]">
              NWA Youth
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 animate-pulse">
                {" "}Resources
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]">
              Your one-stop hub for all ministry resources, study guides, and community connections
            </p>
            
            {/* Stats or highlights */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl px-6 py-3 shadow-lg">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">6</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Resources</div>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl px-6 py-3 shadow-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">3</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Study Guides</div>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl px-6 py-3 shadow-lg">
                <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">3</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Communities</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="space-y-6">
          {resources.map((resource, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] cursor-pointer border-0 shadow-lg hover:shadow-purple-500/25 opacity-0 animate-[slideInUp_0.6s_ease-out_forwards]"
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => window.open(resource.url, '_blank')}
            >
              <div className={`${resource.color} ${resource.hoverColor} transition-all duration-500 p-8 relative overflow-hidden`}>
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full transform translate-x-16 -translate-y-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full transform -translate-x-12 translate-y-12"></div>
                </div>
                
                <div className="flex items-center space-x-6 relative z-10">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                      {resource.icon}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold text-white truncate group-hover:scale-105 transition-transform duration-300">
                        {resource.title}
                      </h3>
                      <ExternalLink className="h-5 w-5 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                    </div>
                    <p className="text-white/90 text-base leading-relaxed mb-4">
                      {resource.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-white/25 text-white border-white/40 backdrop-blur-sm hover:bg-white/35 transition-colors duration-300">
                        {resource.type}
                      </Badge>
                      
                      {(resource.type === "PDF Document" || resource.type === "Study Guide") && (
                        <div className="flex items-center text-white/80 text-sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Card>
          ))}
        </div>

        {/* Enhanced Footer */}
        <div className="mt-20 text-center">
          <Card className="p-10 bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-800/60 backdrop-blur-lg border-0 shadow-2xl">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                🤝
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Connect with Our Community
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
              Join our vibrant youth community and stay connected with all our activities, 
              resources, and fellowship opportunities. Together, we grow in faith and friendship.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="px-6 py-3 text-base hover:bg-indigo-50 hover:border-indigo-300 transition-colors duration-300">Youth Ministry</Badge>
              <Badge variant="outline" className="px-6 py-3 text-base hover:bg-purple-50 hover:border-purple-300 transition-colors duration-300">Young Adults</Badge>
              <Badge variant="outline" className="px-6 py-3 text-base hover:bg-pink-50 hover:border-pink-300 transition-colors duration-300">Community</Badge>
              <Badge variant="outline" className="px-6 py-3 text-base hover:bg-blue-50 hover:border-blue-300 transition-colors duration-300">Fellowship</Badge>
            </div>
          </Card>
        </div>

        {/* Enhanced Quick Access Cards */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <Card className="group p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-blue-200 dark:border-blue-700 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="text-3xl mr-3">📱</span>
              Quick Access
            </h4>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Save this page to your home screen for instant access to all resources and group links. 
              Never miss an update or important document again.
            </p>
            <div className="mt-4 text-blue-600 dark:text-blue-400 text-sm font-medium">
              Tap Share → Add to Home Screen
            </div>
          </Card>
          
          <Card className="group p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border-purple-200 dark:border-purple-700 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="text-3xl mr-3">🔗</span>
              Share This Page
            </h4>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Help other youth members stay connected by sharing this resources hub. 
              Building community starts with staying connected.
            </p>
            <div className="mt-4 text-purple-600 dark:text-purple-400 text-sm font-medium">
              Copy link to share
            </div>
          </Card>
        </div>

        {/* Back to top hint */}
        <div className="mt-16 text-center">
          <Button 
            variant="ghost" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Back to Top ↑
          </Button>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `
      }} />
    </div>
  );
};

export default NWAResourcesPage;

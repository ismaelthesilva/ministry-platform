import { Card } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';

const NWAResourcesPage = () => {
  const resources = [
    {
      title: "Roster Term 3",
      description: "The Gates of the Soul - Ministry Schedule",
      url: "/nwayouth-resources/S5-TheGatesoftheSoul.pdf",
      icon: "📄",
      type: "PDF Document",
      color: "bg-gradient-to-r from-red-500 to-pink-500",
      hoverColor: "hover:from-red-600 hover:to-pink-600"
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 dark:from-indigo-800/30 dark:to-purple-800/30"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            {/* Logo/Avatar placeholder */}
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                NWA
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              NWA Youth
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                {" "}Resources
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              All your ministry resources, groups, and connections in one place
            </p>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="space-y-4">
          {resources.map((resource, index) => (
            <Card 
              key={index} 
              className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer"
              onClick={() => window.open(resource.url, '_blank')}
            >
              <div className={`${resource.color} ${resource.hoverColor} transition-all duration-300 p-6`}>
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{resource.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-white truncate">
                      {resource.title}
                    </h3>
                    <p className="text-white/90 text-sm mt-1">
                      {resource.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {resource.type}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Connect with Us
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Join our vibrant youth community and stay connected with all our activities, 
              resources, and fellowship opportunities.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="outline" className="px-4 py-2">Youth Ministry</Badge>
              <Badge variant="outline" className="px-4 py-2">Young Adults</Badge>
              <Badge variant="outline" className="px-4 py-2">Community</Badge>
              <Badge variant="outline" className="px-4 py-2">Fellowship</Badge>
            </div>
          </Card>
        </div>

        {/* Quick Access Info */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-blue-200 dark:border-blue-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <span className="text-blue-600 dark:text-blue-400 mr-2">📱</span>
              Quick Access
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Save this page to your home screen for quick access to all resources and group links.
            </p>
          </Card>
          
          <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border-purple-200 dark:border-purple-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
              <span className="text-purple-600 dark:text-purple-400 mr-2">🔗</span>
              Share This Page
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Share this resources page with other youth members to help them stay connected.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NWAResourcesPage;

import { Card } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';

const NWAPastoralPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 dark:from-blue-800/30 dark:to-purple-800/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            {/* Profile Image */}
            <div className="mb-8">
              <img 
                src="/ministry-images/ismael-profile20.jpg" 
                alt="Pastor Ismael Silva" 
                className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto border-4 border-white/20 shadow-xl object-cover"
              />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              A Journey of
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}Faith & Service
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Over 25 years of faithful ministry, serving God with grateful hearts and hopeful spirits
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Story Beginning */}
        <Card className="mb-12 p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              1999
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white ml-4">
              Where It All Began
            </h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            My Christian journey started at the Catholic church in 1999. What began as a simple step of faith 
            has blossomed into over 25 years of serving God in ministry. When I look back, I'm filled with 
            overwhelming gratitude for what God has done in my life. When I look forward, I'm filled with hope 
            for the blessings and mercy that God has prepared for me and my family.
          </p>
        </Card>

        {/* Ministry Statistics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/50 dark:to-blue-800/50 border-blue-200 dark:border-blue-700">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">~1,000</div>
            <div className="text-gray-700 dark:text-gray-300 font-medium">Sermons Preached</div>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/50 dark:to-purple-800/50 border-purple-200 dark:border-purple-700">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">636</div>
            <div className="text-gray-700 dark:text-gray-300 font-medium">Baptisms</div>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/50 dark:to-green-800/50 border-green-200 dark:border-green-700">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">2</div>
            <div className="text-gray-700 dark:text-gray-300 font-medium">Church Plants</div>
          </Card>
          <Card className="p-6 text-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/50 dark:to-orange-800/50 border-orange-200 dark:border-orange-700">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">Thousands...</div>
            <div className="text-gray-700 dark:text-gray-300 font-medium">Young Fellows Discipled</div>
          </Card>
        </div>

        {/* God's Calling */}
        <Card className="mb-12 p-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border-indigo-200 dark:border-indigo-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="text-indigo-600 dark:text-indigo-400 mr-3">✨</span>
            God's Gracious Choice
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            God has chosen me—a simple sinner—for His glory. Through His grace, thousands of young people 
            have been discipled and are now serving the church in many capacities, some even as pastors. 
            All of this is for God's glory alone.
          </p>
          <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg italic text-gray-600 dark:text-gray-400">
            "For it is by grace you have been saved, through faith—and this is not from yourselves, 
            it is the gift of God." - Ephesians 2:8
          </div>
        </Card>

        {/* Ministry Experience */}
        <Card className="mb-12 p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="text-green-600 dark:text-green-400 mr-3">🌍</span>
            Multicultural Ministry
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            I have been serving God in mission even before my baptism. God has given me the privilege 
            to help in various areas such as evangelism, youth ministry, preaching, and pastoral care 
            within multicultural contexts in both Brazil and New Zealand, alongside my beloved wife, Jackie.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Ministry Areas</h3>
              <div className="space-y-2">
                <Badge variant="secondary" className="mr-2 mb-2">Evangelism</Badge>
                <Badge variant="secondary" className="mr-2 mb-2">Youth Ministry</Badge>
                <Badge variant="secondary" className="mr-2 mb-2">Preaching</Badge>
                <Badge variant="secondary" className="mr-2 mb-2">Pastoral Care</Badge>
                <Badge variant="secondary" className="mr-2 mb-2">Discipleship</Badge>
                <Badge variant="secondary" className="mr-2 mb-2">Church Planting</Badge>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Contexts</h3>
              <div className="space-y-2">
                <Badge variant="outline" className="mr-2 mb-2">🇧🇷 Brazil</Badge>
                <Badge variant="outline" className="mr-2 mb-2">🇳🇿 New Zealand</Badge>
                <Badge variant="outline" className="mr-2 mb-2">Multicultural</Badge>
                <Badge variant="outline" className="mr-2 mb-2">Cross-cultural</Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Daily Ministry */}
        <Card className="mb-12 p-8 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 border-teal-200 dark:border-teal-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="text-teal-600 dark:text-teal-400 mr-3">💝</span>
            Daily Ministry Focus
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            My daily work involves encouraging people to have personal communion with God, fostering 
            healthy and constructive relationships with others, and helping them become involved in 
            the mission of the church.
          </p>
          
          <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-lg">
            <blockquote className="text-xl italic text-gray-600 dark:text-gray-400 mb-4">
              "Freely you have received; freely give"
            </blockquote>
            <cite className="text-sm text-gray-500 dark:text-gray-500">Matthew 10:8</cite>
          </div>
        </Card>

        {/* Great Commission */}
        <Card className="mb-12 p-8 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border-amber-200 dark:border-amber-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="text-amber-600 dark:text-amber-400 mr-3">📜</span>
            Our Commission
          </h2>
          <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-lg">
            <blockquote className="text-lg italic text-gray-600 dark:text-gray-400 leading-relaxed">
              "Therefore go and make disciples of all nations, baptizing them in the name of the Father 
              and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you. 
              And surely, I am with you always, to the very end of the age."
            </blockquote>
            <cite className="text-sm text-gray-500 dark:text-gray-500 mt-4 block">Matthew 28:19–20</cite>
          </div>
        </Card>

        {/* Background & Calling */}
        <Card className="p-8 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/30 dark:to-gray-900/30 border-slate-200 dark:border-slate-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="text-slate-600 dark:text-slate-400 mr-3">⚡</span>
            Equipped for Ministry
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            God has blessed me with excellent Tech and Sales experience, which proves invaluable in 
            dealing with today's challenges. This background helps me persevere under challenging 
            situations while remaining dependent on God to fight the good fight.
          </p>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            I maintain a healthy lifestyle, practicing biblical principles, and use all the knowledge 
            God gives me to bring hope to all people.
          </p>
          
          <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg italic text-gray-600 dark:text-gray-400">
            "I have fought the good fight, I have finished the race, I have kept the faith." - 2 Timothy 4:7
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NWAPastoralPage;
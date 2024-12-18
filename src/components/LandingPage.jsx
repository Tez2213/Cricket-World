import React from 'react';
import { 
  FaBaseballBall, 
  FaChartLine, 
  FaTrophy, 
  FaNewspaper 
} from 'react-icons/fa';

const LandingPage = () => {
  return (
        <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-screen w-full text-white">
        <div className="absolute inset-0">
          <img 
            src="https://i.pinimg.com/originals/62/ea/1a/62ea1ae5701045cd66f7d91c32a5d16d.jpg"
            alt="Cricket Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-white-800/80"></div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Live Cricket Scores & Updates
            </h1>
            <p className="text-xl mb-8">
              Stay updated with real-time scores, team ranking, and comprehensive cricket coverage.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-200 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                <div className="text-blue-600 mb-4 text-3xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Scores Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Live Matches</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <LiveMatchCard 
              team1="India"
              team2="Australia"
              score1="245/6"
              score2="223/8"
              overs="20.0"
              tournament="T20 World Cup"
            />
            <LiveMatchCard 
              team1="England"
              team2="South Africa"
              score1="189/4"
              score2="Yet to bat"
              overs="50.0"
              tournament="ODI Series"
            />
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Latest News</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {news.map((article, index) => (
              <div key={index} className="bg-gray-200 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                <img src={article.image} alt={article.title} className="mb-4 rounded" />
                <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                <p className="text-gray-600">{article.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// LiveMatchCard Component
const LiveMatchCard = ({ team1, team2, score1, score2, overs, tournament }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
      <div className="flex justify-between items-center mb-4">
        <span className="text-red-600 font-semibold">LIVE</span>
        <span className="text-gray-500">{tournament}</span>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold">{team1}</p>
          <p className="text-2xl font-bold">{score1}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">vs</p>
          <p className="text-sm text-gray-500">{overs} overs</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">{team2}</p>
          <p className="text-2xl font-bold">{score2}</p>
        </div>
      </div>
    </div>
  );
};

// Features Data
const features = [
  {
    icon: <FaBaseballBall />,
    title: "Live Scores",
    description: "Real-time updates for all matches"
  },
  {
    icon: <FaChartLine />,
    title: "Ranking",
    description: "Comprehensive player and team stats"
  },
  {
    icon: <FaTrophy />,
    title: "Tournaments",
    description: "Coverage of all major tournaments"
  },
  {
    icon: <FaNewspaper />,
    title: "News",
    description: "Latest cricket news and updates"
  }
];

// News Data
const news = [
  {
    title: "Rain plays spoilsport on the opening day in Brisbane",
    description: "Only 13.2 overs were possible on a rain-hit opening day of the Brisbane Test but Australia's ...",
    image: "https://www.cricbuzz.com/a/img/v1/595x396/i1/c586770/day-1-was-washed-out-with-only.jpg" // Add your image URL here
  },
  {
    title: "Tim Southee prepares for his farewell match at Seddon Park",
    description: "For England, while there may be a sense of 'job done', having taken the series with one to play ....",
    image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_640,q_50/lsci/db/PICTURES/CMS/392900/392904.6.jpg" // Add your image URL here
  },
  {
    title: "Australia batting first as India win toss, ring changes",
    description: "Get ready for the upcoming cricket tournaments this season...",
    image: "https://resources.cricket-australia.pulselive.com/photo-resources/2024/12/13/2e15c645-84eb-44d1-87bc-6bda885c8506/bumrah.jpg?width=950&height=535" // Add your image URL here
  }
];

export default LandingPage;
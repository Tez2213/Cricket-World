import React, { useState } from 'react';
import { FaSearch, FaTrophy } from 'react-icons/fa';

// Mock data for featured players
const featuredPlayers = [
  {
    name: 'Virat Kohli',
    image: 'https://th.bing.com/th?id=ODL.ad06b7464ef351205b8bc8ba63c3fa52&w=126&h=169&c=10&rs=1&qlt=99&o=6&dpr=1.3&pid=23.1',
    country: 'India',
    format: 'test',
    stats: { matches: 254, runsOrWickets: '12,000+' },
    achievements: 'Most centuries in Tests',
  },
  {
    name: 'Babar Azam',
    image: 'https://th.bing.com/th?id=OIP.3rI9QDZarMPwiG3yssBvCgHaJk&w=120&h=120&c=8&rs=1&qlt=80&o=6&dpr=1.3&pid=3.1',
    country: 'Pakistan',
    format: 'odi',
    stats: { matches: 100, runsOrWickets: '5,000+' },
    achievements: 'Fastest to 8,000 runs in ODIs',
  },
  {
    name: 'Kane Williamson',
    image: 'https://www.bing.com/th?id=OIP.nca8F4gUg5DEmcJj33SL1wHaEv&w=202&h=200&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
    country: 'New Zealand',
    format: 't20',
    stats: { matches: 90, runsOrWickets: '2,500+' },
    achievements: 'Leading run-scorer in T20 World Cup',
  },
];

// Mock data for player stats
const getStatsData = (format, tab) => ({
  test: {
    batting: [
      { rank: 1, name: 'Virat Kohli', country: 'India', runs: 12000, average: 50, strikeRate: 55 },
      { rank: 2, name: 'Steve Smith', country: 'Australia', runs: 7000, average: 60, strikeRate: 50 },
      { rank: 3, name: 'Joe Root', country: 'England', runs: 8500, average: 55, strikeRate: 52 },
    ],
    bowling: [
      { rank: 1, name: 'Jasprit Bumrah', country: 'India', wickets: 100, economy: 3.5, average: 22 },
      { rank: 2, name: 'Pat Cummins', country: 'Australia', wickets: 150, economy: 3.8, average: 21 },
      { rank: 3, name: 'James Anderson', country: 'England', wickets: 200, economy: 3.2, average: 25 },
    ],
  },
  odi: {
    batting: [
      { rank: 1, name: 'Babar Azam', country: 'Pakistan', runs: 5000, average: 60, strikeRate: 90 },
      { rank: 2, name: 'Rohit Sharma', country: 'India', runs: 9500, average: 45, strikeRate: 92 },
      { rank: 3, name: 'David Warner', country: 'Australia', runs: 8000, average: 48, strikeRate: 95 },
    ],
    bowling: [
      { rank: 1, name: 'Shaheen Afridi', country: 'Pakistan', wickets: 50, economy: 4.5, average: 25 },
      { rank: 2, name: 'Trent Boult', country: 'New Zealand', wickets: 120, economy: 4.3, average: 26 },
      { rank: 3, name: 'Mitchell Starc', country: 'Australia', wickets: 150, economy: 4.8, average: 24 },
    ],
  },
  t20: {
    batting: [
      { rank: 1, name: 'Suryakumar Yadav', country: 'India', runs: 1500, average: 42, strikeRate: 180 },
      { rank: 2, name: 'Mohammad Rizwan', country: 'Pakistan', runs: 2000, average: 50, strikeRate: 130 },
      { rank: 3, name: 'Glenn Maxwell', country: 'Australia', runs: 1700, average: 35, strikeRate: 160 },
    ],
    bowling: [
      { rank: 1, name: 'Rashid Khan', country: 'Afghanistan', wickets: 110, economy: 6.2, average: 20 },
      { rank: 2, name: 'Yuzvendra Chahal', country: 'India', wickets: 85, economy: 7.1, average: 22 },
      { rank: 3, name: 'Shadab Khan', country: 'Pakistan', wickets: 75, economy: 7.5, average: 23 },
    ],
  },
}[format]?.[tab]);

const PlayerStats = () => {
  const [activeFormat, setActiveFormat] = useState('test');
  const [activeTab, setActiveTab] = useState('batting');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlayers = featuredPlayers.filter(
    (player) =>
      player.format === activeFormat &&
      player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statsData = getStatsData(activeFormat, activeTab);

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-gray-600 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Player Statistics</h1>
          <p className="mt-2">Comprehensive cricket player statistics and rankings</p>
        </div>
      </header>

      {/* Search */}
      <div className="container mx-auto px-4 py-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for a player..."
            className="w-full p-4 rounded-lg border focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Format Selection */}
      <div className="container mx-auto px-4">
        <div className="flex space-x-4 mb-6">
          {['test', 'odi', 't20'].map((format) => (
            <button
              key={format}
              className={`px-6 py-2 rounded-lg font-semibold ${
                activeFormat === format ? 'bg-gray-800 text-white' : 'bg-white text-gray-700 border'
              }`}
              onClick={() => setActiveFormat(format)}
            >
              {format.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Stats Tabs */}
        <div className="flex space-x-4 mb-6">
          {['batting', 'bowling'].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-2 rounded-lg font-semibold ${
                activeTab === tab ? 'bg-gray-600 text-white' : 'bg-white text-gray-700 border'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Stats Table */}
        {statsData && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Player
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  {activeTab === 'batting' ? (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Runs
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Average
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Strike Rate
                      </th>
                    </>
                  ) : (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Wickets
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Economy
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Average
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {statsData.map((player, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{player.rank}</td>
                    <td className="px-6 py-4">{player.name}</td>
                    <td className="px-6 py-4">{player.country}</td>
                    {activeTab === 'batting' ? (
                      <>
                        <td className="px-6 py-4">{player.runs}</td>
                        <td className="px-6 py-4">{player.average}</td>
                        <td className="px-6 py-4">{player.strikeRate}</td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4">{player.wickets}</td>
                        <td className="px-6 py-4">{player.economy}</td>
                        <td className="px-6 py-4">{player.average}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerStats;

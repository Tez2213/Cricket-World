import React, { useState, useEffect } from 'react';
import { FaCircle } from 'react-icons/fa';
import { cricketApi } from '../services/cricketApi';

const LiveScores = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchMatches();
    // Auto refresh every 30 seconds
    const interval = setInterval(fetchMatches, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const response = await cricketApi.getCurrentMatches();
      if (response.status === 'success') {
        setMatches(response.data || []);
      } else {
        setError(response.message || 'Failed to fetch matches');
      }
    } catch (err) {
      setError('Failed to fetch matches');
    } finally {
      setLoading(false);
    }
  };

  const filterMatches = (matches) => {
    // First filter by search query
    let filtered = matches.filter(match => 
      match.teams.some(team => 
        team.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      match.series_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Then apply existing filters
    switch (activeFilter) {
      case 'live':
        return filtered.filter(match => match.matchStarted && !match.matchEnded);
      case 'upcoming':
        return filtered.filter(match => !match.matchStarted);
      case 'completed':
        return filtered.filter(match => match.matchEnded);
      default:
        return filtered;
    }
  };

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-gray-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">Live Cricket Scores</h1>
              <p className="mt-2">Real-time updates from matches around the world</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-4 mb-6">
            <button 
              className={`${activeFilter === 'all' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 border'} px-4 py-2 rounded-lg`}
              onClick={() => setActiveFilter('all')}
            >
              All Matches
            </button>
            <button 
              className={`${activeFilter === 'live' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 border'} px-4 py-2 rounded-lg`}
              onClick={() => setActiveFilter('live')}
            >
              Live Now
            </button>
            <button 
              className={`${activeFilter === 'upcoming' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 border'} px-4 py-2 rounded-lg`}
              onClick={() => setActiveFilter('upcoming')}
            >
              Upcoming
            </button>
            <button 
              className={`${activeFilter === 'completed' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'} px-4 py-2 rounded-lg`}
              onClick={() => setActiveFilter('completed')}
            >
              Completed
            </button>
          </div>
          <input
            type="text"
            placeholder="Search teams or tournaments..."
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Loading and Error States */}
      {loading && (
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading matches...</p>
        </div>
      )}

      {error && (
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={fetchMatches}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* Matches Display */}
      {!loading && !error && (
        <div className="container mx-auto px-4 py-6">
          <div className="grid gap-6">
            {filterMatches(matches).map((match, index) => (
              <MatchCard
                key={index}
                status={match.matchStarted ? (match.matchEnded ? 'completed' : 'live') : 'upcoming'}
                tournament={match.series_name}
                team1={match.teams[0]}
                team2={match.teams[1]}
                score1={match.score?.[0]?.r || ''}
                score2={match.score?.[1]?.r || ''}
                overs={`${match.score?.[match.score.length - 1]?.o || ''} overs`}
                time={match.dateTimeGMT}
              />
            ))}
          </div>
          
          {filterMatches(matches).length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No matches found for the selected filter.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const MatchCard = ({ status, tournament, team1, team2, score1, score2, overs, time }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          {status === 'live' && (
            <>
              <FaCircle className="text-red-500 w-3 h-3 mr-2 animate-pulse" />
              <span className="text-red-500 font-semibold">LIVE</span>
            </>
          )}
          {status === 'upcoming' && (
            <span className="text-blue-500 font-semibold">Upcoming</span>
          )}
        </div>
        <span className="text-gray-600">{tournament}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="w-5/12">
          <div className="flex items-center space-x-3">
            <TeamImage teamName={team1} />
            <span className="font-semibold">{team1}</span>
          </div>
          {score1 && <p className="text-2xl font-bold mt-1">{score1}</p>}
        </div>
        
        <div className="w-2/12 text-center">
          <p className="text-sm text-gray-500">vs</p>
          {overs && <p className="text-sm text-gray-500 mt-1">{overs}</p>}
          {time && <p className="text-sm text-gray-500 mt-1">{time}</p>}
        </div>
        
        <div className="w-5/12 text-right">
          <div className="flex items-center justify-end space-x-3">
            <span className="font-semibold">{team2}</span>
            <TeamImage teamName={team2} />
          </div>
          {score2 && <p className="text-2xl font-bold mt-1">{score2}</p>}
        </div>
      </div>
      
      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Match Type: T20/ODI/Test</p>
              <p className="text-gray-600">Venue: Stadium Name</p>
            </div>
            <div>
              <p className="text-gray-600">Toss: Team won & elected to bat/bowl</p>
              <p className="text-gray-600">Current Run Rate: 6.5</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TeamImage = ({ teamName }) => {
  const [imageError, setImageError] = useState(false);
  
  // Add team-specific colors (you can expand this object)
  const teamColors = {
    'india': 'from-blue-500 to-blue-700',
    'australia': 'from-yellow-400 to-green-500',
    'england': 'from-blue-600 to-red-500',
    // Add more teams as needed
  };

  const teamKey = teamName.toLowerCase().replace(/\s+/g, '-');
  const gradientClass = teamColors[teamKey] || 'from-gray-400 to-gray-600';

  return imageError ? (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r ${gradientClass}`}>
      <span className="text-white font-bold text-sm">
        {teamName.charAt(0)}
      </span>
    </div>
  ) : (
    <img 
      src={`/flags/${teamKey}.png`}
      alt={teamName}
      className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
      onError={() => setImageError(true)}
    />
  );
};

export default LiveScores;
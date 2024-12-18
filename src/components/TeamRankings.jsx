import React, { useState, useEffect } from 'react';
import { cricketApi } from '../services/cricketApi';

const TeamRankings = () => {
  const [rankings, setRankings] = useState({
    test: [],
    odi: [],
    t20: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFormat, setActiveFormat] = useState('test');

  useEffect(() => {
    fetchRankings();
  }, []);

  const fetchRankings = async () => {
    try {
      setLoading(true);
      const response = await cricketApi.getTeamRankings();
      if (response.status === 'success') {
        setRankings({
          test: response.data.test || [],
          odi: response.data.odi || [],
          t20: response.data.t20 || []
        });
      } else {
        setError(response.message || 'Failed to fetch rankings');
      }
    } catch (err) {
      setError('Failed to fetch rankings');
    } finally {
      setLoading(false);
    }
  };

  const formatLabels = {
    test: 'Test Rankings',
    odi: 'ODI Rankings',
    t20: 'T20 Rankings'
  };

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-gray-600 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">ICC Team Rankings</h1>
          <p className="mt-2">Current cricket team rankings across all formats</p>
        </div>
      </div>

      {/* Format Selector */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex space-x-4 mb-6">
          {Object.keys(formatLabels).map((format) => (
            <button
              key={format}
              className={`px-6 py-2 rounded-lg font-semibold ${
                activeFormat === format
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 border'
              }`}
              onClick={() => setActiveFormat(format)}
            >
              {formatLabels[format]}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading rankings...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
            <button
              onClick={fetchRankings}
              className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
            >
              Retry
            </button>
          </div>
        )}

        {/* Rankings Table */}
        {!loading && !error && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Team
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Points
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rankings[activeFormat].map((team, index) => (
                  <tr
                    key={team.id}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {team.rank}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={`/flags/${team.name.toLowerCase()}.png`}
                          alt={team.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/placeholder-flag.png';
                          }}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {team.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{team.points}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{team.rating}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* No Data State */}
        {!loading && !error && rankings[activeFormat].length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No ranking data available for this format.
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamRankings;
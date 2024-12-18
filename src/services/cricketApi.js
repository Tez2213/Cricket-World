const API_KEY = import.meta.env.VITE_CRICKET_API_KEY;
const BASE_URL = 'https://api.cricapi.com/v1';

export const cricketApi = {
  // Get current matches
  getCurrentMatches: async () => {
    try {
      const response = await fetch(`${BASE_URL}/currentMatches?apikey=${API_KEY}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching current matches:', error);
      throw error;
    }
  },

  // get player stats
  getPlayerStats: async (playerId) => {
    try {
      const response = await fetch(`${BASE_URL}/players_info?apikey=${API_KEY}&id=${playerId}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching player stats:', error);
      throw error;
    }
  },

  // get team rankings
  getTeamRankings: async () => {
    try {
      // I want to change
      const response = await fetch('https://api.cricapi.com/v1/rankings', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // API key here
          'api-key': '97938eab-a514-44f4-9bb3-0dc87a96d408'
        }
      });

      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Try to parse JSON
      const data = await response.json();
      
      return {
        status: 'success',
        data: {
          test: data.rankings?.test || [],
          odi: data.rankings?.odi || [],
          t20: data.rankings?.t20 || []
        }
      };
    } catch (error) {
      console.error('API Error:', error);
      return {
        status: 'error',
        message: 'Failed to fetch rankings. Please try again later.'
      };
    }
  }
}; 
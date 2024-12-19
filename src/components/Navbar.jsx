import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBaseballBall } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-900 shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-white">
              &nbsp;<FaBaseballBall /> &nbsp;
            </span>
            <span className="text-2xl font-bold text-white">
              &nbsp;CricketWorld &nbsp;
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-300 font-bold hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              to="/live-scores"
              className="text-gray-300 font-bold hover:text-white transition-colors"
            >
              Live Scores
            </Link>
            <Link
              to="/rankings"
              className="text-gray-300 font-bold hover:text-white transition-colors"
            >
              Rankings
            </Link>
            <Link
              to="/player-stats"
              className="text-gray-300 font-bold hover:text-white transition-colors"
            >
              Player Stats
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
              >
                Home
              </Link>
              <Link
                to="/live-scores"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
              >
                Live Scores
              </Link>
              <Link
                to="/rankings"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
              >
                Rankings
              </Link>
              <Link
                to="/player-stats"
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
              >
                Player Stats
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Matches Section */}
      <div className="bg-gray-800 py-2 px-4 shadow-md">
        <div className="max-w-7xl mx-auto flex overflow-x-auto space-x-6 items-center">
          <span className="text-white font-bold">MATCHES</span>
          <span className="text-gray-300 whitespace-nowrap cursor-pointer hover:text-white">
            AFG vs ZIM - Ings Break
          </span>
          <span className="text-gray-300 whitespace-nowrap cursor-pointer hover:text-white">
            RSA vs PAK - Preview
          </span>
          <span className="text-gray-300 whitespace-nowrap cursor-pointer hover:text-white">
            HBH vs MLR - MLR Won
          </span>
          <span className="text-gray-300 whitespace-nowrap cursor-pointer hover:text-white">
            INDW vs WIW - Preview
          </span>
          <span className="text-gray-300 whitespace-nowrap cursor-pointer hover:text-white">
            AUS vs IND - Match Drawn
          </span>
          <span className="text-gray-300 whitespace-nowrap cursor-pointer hover:text-white">
            ALL
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

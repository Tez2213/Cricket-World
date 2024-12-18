import React from 'react';
import { FaTwitter, FaInstagram,  FaPhone, FaEnvelope, FaMapMarkerAlt,FaBaseballBall, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2">
              <FaBaseballBall className="text-xl font-bold mb-4" />
              <span className="text-xl font-bold mb-4"> CricketWorld</span>
            </div>
            <p className="text-gray-400 mb-4">
              CricketWorld is your ultimate destination for cricket scores, 
              statistics, and live updates. We provide comprehensive coverage 
              of international cricket across all formats.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="/live-scores" className="text-gray-400 hover:text-white">Live Scores</a></li>
              <li><a href="/rankings" className="text-gray-400 hover:text-white">Rankings</a></li>
              <li><a href="/player-stats" className="text-gray-400 hover:text-white">Player Stats</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <FaPhone className="mr-2" />
                <span>+91 82990 23284</span>
              </li>
              <li className="flex items-center text-gray-400">
                <FaEnvelope className="mr-2" />
                <span>tejasvi.2428it1079@kiet.edu</span>
              </li>
              <li className="flex items-center text-gray-400">
                <FaMapMarkerAlt className="mr-2" />
                <span>Aryabhatt Hostel, KIET Group of Institutions, Modinagar -201206</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://x.com/?mx=2" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/tejasvi-kesarwani-0ab04b323/?originalSubdomain=in" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin  className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/tejasvi_kesarwani/" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="https://github.com/Tez2213" className="text-gray-400 hover:text-white transition-colors">
                <FaGithub className="h-6 w-6" />
              </a>
            </div>
            <div className="mt-4 text-gray-400">
              <p>Stay connected with us on social media for the latest updates and highlights.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>💖 Made with Love</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
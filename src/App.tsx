import React, { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Home } from './components/Home';
import { Services } from './components/Services';
import { AboutMe } from './components/AboutMe';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Blog } from './components/Blog';
import { Admin } from './components/Admin';
import { supabase } from './lib/supabase';

const API_KEY ="RVBQ9YY40HY7"; // Access the API key from the environment

function App() {
  useEffect(() => {
    // Function to log visit details to Supabase
    const logVisit = async () => {
      try {
        // Fetch the IP address of the user
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const ipAddress = ipData.ip;

        // Fetch the current time in Delhi, India timezone using TimeZoneDB API
        const timeResponse = await fetch(`https://api.timezonedb.com/v2.1/get-time-zone?key=${API_KEY}&format=json&by=zone&zone=Asia/Kolkata`);
        const timeData = await timeResponse.json();
        const delhiTime = timeData.formatted; // Time in the desired timezone (e.g., 2025-01-26 15:45:25)

        // Insert the visit details into Supabase
        const { data: insertData, error } = await supabase
          .from('visits')
          .insert({
            ip_address: ipAddress,
            visit_time: delhiTime, // Time in the desired timezone
          });

        if (error) {
          console.error('Error logging visit:', error);
        } else {
          console.log('Visit logged successfully:', insertData);
        }
      } catch (err) {
        console.error('Failed to fetch IP or log visit:', err);
      }
    };

    logVisit();
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
          <nav className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">Udit Goyal</Link>
              
              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                className="lg:hidden text-gray-700 hover:text-blue-600"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex space-x-8 items-center">
                <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
                <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</Link>
                <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About me</Link>
                <Link to="/projects" className="text-gray-700 hover:text-blue-600 transition-colors">Projects</Link>
                <Link to="/admin" className="text-gray-700 hover:text-blue-600 transition-colors">Admin</Link>
                <Link 
                  to="/contact" 
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
                >
                  Contact me
                </Link>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4`}>
              <div className="flex flex-col space-y-4">
                <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={toggleMenu}>Home</Link>
                <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={toggleMenu}>Services</Link>
                <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={toggleMenu}>About me</Link>
                <Link to="/projects" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={toggleMenu}>Projects</Link>
                <Link to="/admin" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={toggleMenu}>Admin</Link>
                <Link 
                  to="/contact" 
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors inline-block text-center"
                  onClick={toggleMenu}
                >
                  Contact me
                </Link>
              </div>
            </div>
          </nav>
        </header>

        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

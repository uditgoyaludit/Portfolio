import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Home } from './components/Home';
import { Services } from './components/Services';
import { AboutMe } from './components/AboutMe';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Blog } from './components/Blog';
import { Admin } from './components/Admin';

function App() {
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
                {/* <Link to="/blog" className="text-gray-700 hover:text-blue-600 transition-colors">Blog</Link> */}
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
                {/* <Link to="/blog" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={toggleMenu}>Blog</Link> */}
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
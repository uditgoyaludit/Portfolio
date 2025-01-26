
  import React, { useState, useEffect } from 'react';
  import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
  import { Github, Linkedin, Twitter, Instagram, Mail, Globe } from 'lucide-react';
  import { Messages } from './components/Messages';
  import { ContactForm } from './components/ContactForm';
  import { trackVisit } from './utils/visitTracker'; // Import the function

  function App() {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [visitCount, setVisitCount] = useState(0);

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const x = ((clientY - innerHeight / 2) / innerHeight) * 20;
        const y = ((clientX - innerWidth / 2) / innerWidth) * 20;
        
        setRotation({ x, y });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
      const fetchVisitCount = async () => {
        const count = await trackVisit();
        setVisitCount(count);
      };

      fetchVisitCount();
    }, []);

    return (
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 to-pink-900 text-white">
          <header className="p-6">
            <nav className="max-w-7xl mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold">Portfolio</h1>
              <div className="space-x-4">
                <Link to="/" className="text-2xl font-bold hover:text-purple-400 transition-colors">Home</Link>
                <Link to="/messages" className="text-2xl font-bold hover:text-purple-400 transition-colors">Messages</Link>
              </div>
            </nav>
          </header>

          <Routes>
            <Route path="/messages" element={<Messages />} />
            <Route path="/" element={<MainContent rotation={rotation} visitCount={visitCount} />} />
          </Routes>
        </div>
      </Router>
    );
  }

  function MainContent({ rotation, visitCount }: { rotation: { x: number; y: number }, visitCount: number }) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center justify-center gap-12 text-center">
          {/* 3D Model Section */}
          <div 
    className="relative w-64 h-64 mb-8 bg-black/20 rounded-full flex items-center justify-center"
    style={{
      transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      transition: 'transform 0.1s ease-out'
    }}
  >
           <img 
    src="img.jpeg"
    alt="3D Model"
    className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(168,85,247,0.5)] rounded-full"
  />
          </div>

          {/* Hero Section */}
          <div className="space-y-6 max-w-2xl">
            <h2 className="text-5xl font-bold">Udit Goyal</h2>
            <p className="text-xl text-gray-300">
              Backend Specialist | Making the Invisible Work Seamlessly
            </p>
            <p className="text-gray-400">
             Transforming ideas into reliable and scalable server-side solutions.
            </p>
          </div>

          {/* Visit Counter */}
          <p className="text-gray-500">Visits: {visitCount}</p>

          {/* Projects Section */}
          <div className="w-full max-w-4xl">
            <h3 className="text-3xl font-bold mb-8">Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                
                {
                  title: "Web Chat Application",
                  description: "A real-time web chat application built using PHP for server-side communication, JavaScript for dynamic interactions, and AJAX for seamless updates without refreshing the page.",
                  image: "p2.png",
                  tech: ["PHP", "JavaScript", "AJAX"],
                  link: "https://github.com/uditgoyaludit/Chatroom-updated-"
                },
                {
                  title: "Followers Count Monitor",
                  description: "A Python-based application built with Flask that monitors Instagram followers count in real-time, sending notifications via Pushover when there are changes in follower count.",
                  image: "3",
                  tech: ["Python", "Flask", "Pushover API"],
                  link: "https://github.com/uditgoyaludit/FollowersWeb/"
                },
                {
                  title: "Attendance Management System",
                  description: "A web-based attendance management system built with PHP that allows users to track and manage attendance records for students or employees, providing real-time updates and reports.",
                   image: "p1.png",
                  tech: ["PHP", "MySQL", "JavaScript"],
                  link: "#"
                }
              ].map((project, index) => (
                <div key={index} className="group bg-black/20 backdrop-blur-sm rounded-lg overflow-hidden border border-purple-500/30 hover:border-purple-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                  <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                    <p className="text-gray-400 mb-2">
                      {project.description}
                    </p>
                    <p className="text-gray-400 mb-4">
                      <span className="font-semibold">Tech:</span> {project.tech.map((tech, index) => (
                        <span key={index} className="text-purple-400">{tech}{index < project.tech.length - 1 ? ', ' : ''}</span>
                      ))}
                    </p>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
                    >
                      View Project
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div className="w-full max-w-4xl">
            <h3 className="text-3xl font-bold mb-8">Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Best Developer Award",
                  year: "2023",
                  description: "Recognized for outstanding contributions to open-source projects"
                },
                {
                  title: "Tech Conference Speaker",
                  year: "2023",
                  description: "Delivered keynote speech at WebDev Summit 2023"
                },
                {
                  title: "Innovation Champion",
                  year: "2021",
                  description: "Led the development of an award-winning AI application"
                }
              ].map((achievement, index) => (
                <div key={index} className="group bg-black/20 backdrop-blur-sm p-6 rounded-lg border border-purple-500/30 hover:border-purple-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                  <h4 className="text-xl font-bold mb-2">{achievement.title}</h4>
                  <p className="text-purple-400 mb-2">{achievement.year}</p>
                  <p className="text-gray-400">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Social Media Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {/* GitHub */}
            <a
              href="https://github.com/uditgoyaludit"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-black/20 backdrop-blur-sm px-6 py-4 rounded-lg border border-purple-500/30 hover:border-purple-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-105"
            >
              <Github className="w-8 h-8 text-purple-500 group-hover:text-purple-400 transition-colors" />
              <div className="text-left">
                <p className="font-semibold group-hover:text-purple-400 transition-colors">GitHub</p>
                <p className="text-sm text-gray-400">@uditgoyaludit</p>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/uditgoyal9911/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-black/20 backdrop-blur-sm px-6 py-4 rounded-lg border border-purple-500/30 hover:border-purple-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-105"
            >
              <Linkedin className="w-8 h-8 text-purple-500 group-hover:text-purple-400 transition-colors" />
              <div className="text-left">
                <p className="font-semibold group-hover:text-purple-400 transition-colors">LinkedIn</p>
                <p className="text-sm text-gray-400">@uditgoyal9911</p>
              </div>
            </a>

            {/* Twitter */}
            {/* <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-black/20 backdrop-blur-sm px-6 py-4 rounded-lg border border-purple-500/30 hover:border-purple-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-105"
            >
              <Twitter className="w-8 h-8 text-purple-500 group-hover:text-purple-400 transition-colors" />
              <div className="text-left">
                <p className="font-semibold group-hover:text-purple-400 transition-colors">Twitter</p>
                <p className="text-sm text-gray-400">@username</p>
              </div>
            </a> */}

            {/* Instagram */}
            <a
              href="https://www.instagram.com/udit.goyal_/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-black/20 backdrop-blur-sm px-6 py-4 rounded-lg border border-purple-500/30 hover:border-purple-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-105"
            >
              <Instagram className="w-8 h-8 text-purple-500 group-hover:text-purple-400 transition-colors" />
              <div className="text-left">
                <p className="font-semibold group-hover:text-purple-400 transition-colors">Instagram</p>
                <p className="text-sm text-gray-400">@udit.goyal_</p>
              </div>
            </a>

            {/* Portfolio */}
            {/* <a
              href="https://portfolio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-black/20 backdrop-blur-sm px-6 py-4 rounded-lg border border-purple-500/30 hover:border-purple-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-105"
            >
              <Globe className="w-8 h-8 text-purple-500 group-hover:text-purple-400 transition-colors" />
              <div className="text-left">
                <p className="font-semibold group-hover:text-purple-400 transition-colors">Portfolio</p>
                <p className="text-sm text-gray-400">View Work</p>
              </div>
            </a> */}

            {/* Email */}
            <a
              href="mailto:uditgoyaludit0@gmail.com"
              className="group flex items-center gap-3 bg-black/20 backdrop-blur-sm px-6 py-4 rounded-lg border border-purple-500/30 hover:border-purple-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-105"
            >
              <Mail className="w-8 h-8 text-purple-500 group-hover:text-purple-400 transition-colors" />
              <div className="text-left">
                <p className="font-semibold group-hover:text-purple-400 transition-colors">Email</p>
                <p className="text-sm text-gray-400">Uditgoyaludit0@gmail.com</p>
              </div>
            </a>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </main>
    );
  }

  export default App;
  ```
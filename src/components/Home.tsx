import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Instagram, Mail, Globe } from 'lucide-react';
import Typed from 'typed.js';

export function Home() {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ['Hello !', 'नमस्ते !', 'Bonjour !', 'Hola !','Olá !'],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const socialLinks = [
    {
      icon: <Github className="w-6 h-6" />, 
      label: 'GitHub',
      username: '@uditgoyaludit',
      href: 'https://github.com/uditgoyaludit',
      color: 'hover:text-gray-900'
    },
    {
      icon: <Linkedin className="w-6 h-6" />, 
      label: 'LinkedIn',
      username: '@uditgoyal9911',
      href: 'https://www.linkedin.com/in/uditgoyal9911/',
      color: 'hover:text-blue-700'
    },
    {
      icon: <Instagram className="w-6 h-6" />, 
      label: 'Instagram',
      username: '@udit.goyal_',
      href: 'https://www.instagram.com/udit.goyal_/',
      color: 'hover:text-pink-600'
    },
    {
      icon: <Mail className="w-6 h-6" />, 
      label: 'Email',
      username: 'uditgoyaludit0@gmail.com',
      href: 'mailto:uditgoyaludit0@gmail.com',
      color: 'hover:text-red-600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-block border-2 border-blue-600 rounded-lg px-4 py-2">
            <span ref={typedRef} className="text-xl text-gray-800"></span>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
              I'm <span className="gradient-text animate-fade-in-out border-b border-gray-700">Udit Goyal</span>,
            </h1>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Backend Developer & <br />
              Software Engineer
            </h2>
            <p className="text-gray-600 max-w-lg">
              Innovative Backend Developer with expertise in building scalable 
              server-side solutions and optimizing system performance.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
            >
              Hire Me
            </Link>
            <a
              href="https://wa.me/+919910672130"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-gray-300 text-gray-700 px-6 sm:px-8 py-3 rounded-full hover:border-blue-600 hover:text-blue-600 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full filter blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
              alt="Profile"
              className="w-full h-auto rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      <div className="mt-20 py-8 border-t border-gray-200">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 p-4 rounded-xl border-2 border-gray-100 hover:border-blue-600 transition-all group ${link.color}`}
            >
              <div className="text-gray-600 group-hover:scale-110 transition-transform">
                {link.icon}
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm text-gray-900">{link.label}</p>
                <p className="text-xs text-gray-600">{link.username}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

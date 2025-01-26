import React from 'react';

export function Projects() {
  const projects = [
    {
      title: "Web Chat Application",
      description: "Real-time chat application with PHP backend and JavaScript frontend",
      image: "p2.png",
      link: "https://github.com/uditgoyaludit/Chatroom-updated-"
    },
    {
      title: "Followers Count Monitor",
      description: "Python-based Instagram followers monitoring system",
      image: "p3.png",
      link: "https://github.com/uditgoyaludit/FollowersWeb/"
    },
    {
      title: "Attendance Management System",
      description: "Web-based system for tracking attendance records",
      image: "p1.png",
      link: "#"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="space-y-4 text-center mb-16">
        <p className="text-blue-600 font-medium">Portfolio</p>
        <h2 className="text-4xl font-bold text-gray-900">Featured Projects</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="rounded-xl overflow-hidden border-2 border-gray-100 hover:border-blue-600 transition-all">
              <div className="relative aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-20 transition-all"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
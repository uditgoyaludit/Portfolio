import React from 'react';
import { Database, Globe, PenTool, Link, Cloud, Server } from 'lucide-react';

export function Services() {
  const services = [
    {
      icon: <Database className="w-12 h-12 text-blue-600" />,
      title: 'Backend Development',
      description: 'Building robust and scalable server-side solutions with modern technologies.'
    },
    {
      icon: <Globe className="w-12 h-12 text-blue-600" />,
      title: 'Website Development',
      description: 'Creating modern and user-friendly websites that deliver exceptional experiences.'
    },
    {
      icon: <PenTool className="w-12 h-12 text-blue-600" />,
      title: 'System Design',
      description: 'Architecting efficient and scalable systems that meet business needs.'
    },
    {
      icon: <Link className="w-12 h-12 text-blue-600" />,
      title: 'API Development & Integration',
      description: 'Designing and implementing secure, efficient APIs and integrating third-party services seamlessly.'
    },
    {
      icon: <Cloud className="w-12 h-12 text-blue-600" />,
      title: 'Cloud Infrastructure & DevOps',
      description: 'Building and managing scalable, reliable cloud solutions with CI/CD pipelines.'
    },
    {
      icon: <Server className="w-12 h-12 text-blue-600" />,
      title: 'Database Design & Optimization',
      description: 'Designing efficient database schemas and optimizing queries for better performance.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="space-y-4 text-center mb-16">
        <p className="text-blue-600 font-medium">Services</p>
        <h2 className="text-4xl font-bold text-gray-900">Services I Provide</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-8 rounded-xl border-2 border-gray-100 hover:border-blue-600 transition-colors group"
          >
            <div className="mb-6">{service.icon}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from 'react';

export function AboutMe() {
  const education = [
    {
      period: "2021 - 2024",
      title: "Bachelor of Computer Applications",
      institution: "Bharati Vidyapeeth (Deemed to be University)"
    },
    {
      period: "2024 - 2026",
      title: "Master of Computer Applications",
      institution: "Jagan Institute of Management Studies"
    }
  ];
  const experience = [
    {
      period: "2023 - Present",
      title: "Freelance Backend Developer",
      company: "Personal Projects"
    },
    {
      period: "2022 - 2023",
      title: "Software Engineering Projects",
      company: "Academic & Personal Projects"
    }
  ];
  

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="space-y-4 text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900">Who is <span className="gradient-text">Udit Goyal</span></h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A passionate backend developer with expertise in building scalable solutions
          and optimizing system performance. I love turning complex problems into
          simple, beautiful, and intuitive solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-20">
        <div>
          <h3 className="text-2xl font-bold text-blue-600 mb-8">Education</h3>
          <div className="space-y-8">
            {education.map((item, index) => (
              <div key={index} className="border-l-2 border-blue-600 pl-6">
                <p className="text-sm text-blue-600">{item.period}</p>
                <h4 className="text-xl font-bold text-gray-900 mt-2">{item.title}</h4>
                <p className="text-gray-600">{item.institution}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-blue-600 mb-8">Work Experience</h3>
          <div className="space-y-8">
            {experience.map((item, index) => (
              <div key={index} className="border-l-2 border-blue-600 pl-6">
                <p className="text-sm text-blue-600">{item.period}</p>
                <h4 className="text-xl font-bold text-gray-900 mt-2">{item.title}</h4>
                <p className="text-gray-600">{item.company}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';

const AinetTeam = () => {
  return (
    <div className="w-full px-4 md:px-6 lg:px-8 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Key Activities Section */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Key Activities of AINET
          </h2>

          <ul className="list-disc list-inside space-y-4 text-base md:text-lg lg:text-xl text-gray-800">
            <li>Organizes annual online and biannual in-person conferences</li>
            <li>
              Publishes conference proceedings, monographs, project reports,
              magazines, and occasional papers
            </li>
            <li>Conducts need-based workshops</li>
            <li>Hosts webinars on contemporary and relevant themes</li>
            <li>Organizes competitions for teachers and students</li>
            <li>Awards grants and scholarships to English language teachers</li>
            <li>
              Undertakes various projects such as:
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>AINET Teacher Research Initiatives</li>
                <li>Rural ELT</li>
                <li>Women in TA Leadership</li>
                <li>AINET Connect</li>
              </ul>
            </li>
            <li>
              Collaborates with other teacher associations and academic institutions
            </li>
            <li>
              Offers consultancy and extension services focused on teacher development
            </li>
            <li>Runs online short-term courses</li>
          </ul>

          <p className="mt-8 text-base md:text-lg lg:text-xl text-gray-700">
            AINET remains a vibrant platform for English language teaching professionals
            to connect, grow, and lead innovation in ELT across India. We’re thrilled
            to have you as part of our community. Let’s work together to elevate English
            language education across India!
          </p>
        </div>

        {/* Team Section */}
        <div className="pt-16">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold mb-6 text-left">
            The AINET Team
          </h1>
          <img
            src="/ainetTeam.jpeg"
            alt="AINET Team"
            className="w-full max-w-4xl mx-auto rounded-md shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default AinetTeam;

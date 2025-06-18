import React, { useRef } from 'react';
import { 
  Instagram, 
  Facebook, 
  Youtube, 
  Twitter, 
  Send, 
  MapPin, 
  MessageCircle,
  User,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Breadcrumbs from '../Components/shared/Breadcrumbs';
import Highlight from '../Components/shared/Highlight';

const AINETConnect = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  // Dynamic data
  const projectData = {
    title: "About AINET Connect Project",
    subtitle: "AINET Connect: Stronger Networking for Stronger Association",
    description: `AINET Connect is an innovative initiative of AINET to promote our social media networks for ELT practitioners!

The AINET Connect project was launched with an aim to support professional development and to build stronger and more sustainably managed channels of communication, especially on social media platforms. AINET Connect is funded by Skills Development and Quality Assurance Authority (SDA) in Sri Lanka through The Hornby Trust, UK, under its TA Projects Grants Scheme.

The project led to building a team of volunteer teacher-trainers from its membership. The project was launched and now manages AINET accounts on Facebook, Twitter, Instagram, WhatsApp, Pinterest, and LinkedIn. The project is focused on professional interaction and development. During the COVID Pandemic times the AINET Connect Associates did a tremendous job in engaging its members and keeping AINET going.

AINET Connect brings you immense opportunities to network with ELT communities, participate in a wide range of activities and learn, grow and enjoy!`,
    contactEmail: "theainet@gmail.com",
    clickHereText: "Click here."
  };

  const socialMediaIcons = [
    { icon: Instagram, name: "Instagram" },
    { icon: Facebook, name: "Facebook" },
    { icon: Youtube, name: "YouTube" },
    { icon: Twitter, name: "Twitter" },
    { icon: Send, name: "Telegram" },
    { icon: MapPin, name: "Pinterest" },
    { icon: MessageCircle, name: "WhatsApp" }
  ];

  const leadTeamTop = [
    {
      name: "Dr. Vivek Joshi",
      role: "Coordinator",
      image: null
    },
    {
      name: "Dr. Milind Mane",
      role: "",
      image: "/milindmane.png"
    },
    {
      name: "Nadeem Khan",
      role: "",
      image: "/nadeemkhan.png"
    }
  ];

  const leadTeamBottom = [
    {
      name: "Alfiya Alamdar",
      role: "",
      image: null
    },
    {
      name: "Amit Dhore",
      role: "",
      image: null
    },
    {
      name: "Avinash Kulkarni",
      role: "",
      image: null
    },
    {
      name: "Chandreck Shaher",
      role: "",
      image: null
    }
  ];

  const breadcrumb = ["Home", "AINET Projects", "AINET Connect"];

  return (
    <>
    
    <Highlight
                heading={"HIGHLIGHTS"}
                subheading={"Registration for 8th AINET International Conference 2025"}
            />
   
    <div className="min-h-screen relative bg-gray-50">



      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 relative">
      <Breadcrumbs
                        links={[
                            { label: "Home", to: "/" },
                            { label: "AINET Projects", to: null },
                            { label: "AINET Connect", to: null },
                        ]}
                    />
                    <img src="/ainetconnectlogo.png" alt="logoconnect" className=' absolute right-0 top-2' />
        {/* Hero Section */}
        <div className="overflow-hidden mb-8 mt-8">
          <div className="lg:flex">
            <div className="lg:w-1/2 ">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                {projectData.title}
              </h1>
              <h2 className="text-lg lg:text-xl font-semibold text-blue-800 mb-6">
                {projectData.subtitle}
              </h2>
              <div className="prose prose-gray">
                {projectData.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 p-6 lg:p-8 flex items-center justify-center">
              <img
                src="/connect.jpg"
                alt="AINET Connect"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg p-6 mb-8 text-center">
          <h3 className="text-white text-lg font-semibold mb-4">Join our Social Media accounts:</h3>
          <div className="flex justify-center space-x-4 flex-wrap gap-2">
            {socialMediaIcons.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <button
                  key={index}
                  className="bg-white/20 hover:bg-white/30 transition-colors duration-200 rounded-full p-3"
                  title={social.name}
                >
                  <IconComponent className="w-5 h-5 text-white" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Contact Section */}
        <div className=" rounded-lg shadow-md p-6 mb-8">
          <p className="text-gray-700 mb-4">
            Want to know more about AINET Connect?{' '}
            <span className="text-blue-600 hover:text-blue-800 cursor-pointer underline">
              {projectData.clickHereText}
            </span>
          </p>
          <p className="text-gray-700">
            If you are active social media user and want to contribute to AINET, we invite you to join the AINET Connect team. Write to us at{' '}
            <a href={`mailto:${projectData.contactEmail}`} className="text-blue-600 hover:text-blue-800 underline">
              {projectData.contactEmail}
            </a>
            . [Mention 'AINET Connect' in the subject.]
          </p>
        </div>

        {/* Lead Team Section */}
        <div className=" rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">AINET Connect Lead Team</h2>
          
          {/* First Row - Static Grid (as per original design) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {leadTeamTop.map((member, index) => (
              <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
                <div className="h-48 flex items-center justify-center ">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full  flex items-center justify-center">
                      <User className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-900 text-lg">{member.name}</h3>
                  {member.role && <p className="text-sm text-gray-600">{member.role}</p>}
                </div>
              </div>
            ))}
          </div>

          {/* Second Team Section Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-8">AINET Connect Lead Team</h2>
          
          {/* Second Row - Scrollable (only this section) */}
          <div className="relative">
            <button 
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            
            <div 
              ref={scrollRef}
              className="flex overflow-x-auto no-scrollbar space-x-6 px-12 py-4"
            >
              {leadTeamBottom.map((member, index) => (
                <div key={index} className="flex-shrink-0 border rounded-lg overflow-hidden shadow-sm w-48">
                  <div className="h-48 flex items-center justify-center bg-gray-200">
                    {member.image ? (
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full  flex items-center justify-center">
                        <User className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-4 text-center">
                    <h4 className="font-medium text-gray-900">{member.name}</h4>
                    {member.role && <p className="text-sm text-gray-600">{member.role}</p>}
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={scrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </main>
    </div>
    </>
  );
};

export default AINETConnect;
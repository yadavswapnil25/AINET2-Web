import React from "react";
import { FaUser, FaUniversity, FaCheck } from "react-icons/fa";

const MembershipArea = () => {
  const membershipSections = [
    {
      title: "Membership privileges",
      content: [
        "Become part of large and impactful community in India and globally.",
        "Get regular information about AINET events, activities and offerings.",
        "Get membership rate to attend AINET events and other collaborative events.",
        "Receive AINET publications, newsletters and other products free or at discounted prices.",
        "Have access to the Member's Hub with special services and resources available for members only.",
        "Be eligible to join AINET at heavily discounted rate under the Silver Membership scheme.",
        "Be eligible to apply for various AINET scholarships, travel grants and other kinds of support."
      ]
    },
    {
      title: "Member Rights",
      content: [
        "Right to free admission to AINET bodies and committees (not applicable to overseas members).",
        "Right to contest elections of AINET bodies and committees (not applicable to overseas members)."
      ]
    },
    {
      title: "Members' Responsibilities",
      content: [
        "Not do anything detrimental to the interest, goodwill and image of AINET.",
        "To actively support AINET activities and mission.",
        "To keep the AINET office informed about any changes in personal and professional details."
      ]
    },
    {
      title: "Membership Terms",
      content: [
        "Email id to be used for lifetime.",
        "Unique membership number valid for lifetime.",
        "Membership renewable using email ID and unique membership number."
      ]
    }
  ];

  const membershipTypes = [
    {
      type: "Individual",
      icon: <FaUser className="mr-2 text-lg" />,
      iconForCard: <FaUser className="inline-block text-xl mr-2" />,
      plans: [
        {
          name: "Individual Annual",
          price: "₹500.00",
          features: [
            "1-year Membership",
            "Indian Access only",
            "Membership Privileges",
            "Member Rights"
          ]
        },
        {
          name: "Individual Long Term",
          price: "₹1200.00",
          features: [
            "3-year Membership",
            "Indian Access only",
            "Membership Privileges",
            "Member Rights"
          ]
        },
        {
          name: "Individual Overseas",
          price: "₹1725.00",
          features: [
            "1-year Membership",
            "Global Access",
            "Membership Privileges",
            "Member Rights"
          ]
        }
      ]
    },
    {
      type: "Institutional",
      icon: <FaUniversity className="mr-2 text-lg" />,
      iconForCard: <FaUniversity className="inline-block text-xl mr-2" />,
      plans: [
        {
          name: "Institutional Annual",
          price: "₹1000.00",
          features: [
            "1-year Membership",
            "Indian Access only",
            "Discounted Rates",
            "Member Rights"
          ]
        },
        {
          name: "Institutional Long Term",
          price: "₹2500.00",
          features: [
            "3-year Membership",
            "Indian Access only",
            "Discounted Rates",
            "Member Rights"
          ]
        },
        {
          name: "Institutional Overseas",
          price: "2600.00",
          features: [
            "1-year Membership",
            "Global Access only",
            "Discounted Rates",
            "Member Rights"
          ]
        }
      ]
    }
  ];

  // 🔔 Handle individual Pay Now button
  const handlePayNow = (plan, type) => {
    console.log("Initiating payment for:", {
      membershipType: type,
      planName: plan.name,
      price: plan.price,
      features: plan.features
    });

  };

  return (
    <div className="max-w-[1300px] mx-auto my-20 px-4 md:px-10 bg-white rounded-3xl border border-gray-300 overflow-hidden">
      {/* Header with logo and title */}
      <div className="p-6 text-center">
        <img src="./footlogo.png" alt="AINET Logo" className="h-45 mx-auto mb-4" />
        <h1 className="text-3xl font-bold">Membership Information Document</h1>
      </div>

      {/* Membership Info Sections */}
      {membershipSections.map((section, index) => (
        <div key={index} className="mb-8">
          <div className="bg-[#A6AEBF] text-white px-4 py-2">
            <h2 className="text-lg md:text-xl font-medium">{section.title}</h2>
          </div>
          <div className="p-4">
            <p className="font-semibold mb-2">As an AINET member, you will</p>
            <ul className="space-y-2 text-sm md:text-base">
              {section.content.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="mr-2 mt-1 text-base">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      {/* Membership Types */}
      <div className="mb-10">
        <div className="bg-gray-400 text-white px-4 py-2">
          <h2 className="text-lg font-medium">Membership Types</h2>
        </div>

        {membershipTypes.map((type, idx) => (
          <div key={idx} className="mb-12">
            <div className="flex items-center px-4 pt-8 pb-4 text-xl font-semibold">
              {type.icon}
              <span>{type.type}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
              {type.plans.map((plan, planIdx) => (
                <div key={planIdx} className="bg-[#FFF8DE] rounded-xl shadow-md py-6 px-4 flex flex-col justify-between">
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-8">
                      {type.iconForCard}
                      {plan.name}
                    </h3>
                    <p className="text-4xl font-extrabold mb-4 text-gray-800">{plan.price}</p>
                  </div>
                  <ul className="mt-4 mb-4 space-y-2 text-base">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center">
                        <span className="bg-black w-4 h-4 rounded-full flex items-center justify-center mr-2">
                          <FaCheck className="text-white text-[10px]" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="text-center mt-auto">
                    <button
                      onClick={() => handlePayNow(plan, type.type)}
                      className="bg-[#D0E8C5] hover:bg-green-200 text-black px-10 py-2 rounded-full font-semibold"
                    >
                      PAY NOW
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembershipArea;

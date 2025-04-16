import React, { useState } from 'react';
import { FaUser, FaUniversity, FaCheck } from 'react-icons/fa';
import { TbCirclePercentageFilled } from 'react-icons/tb';
import {IoIosArrowDropright } from "react-icons/io";
import bg3 from "/bg3.png";

export default function MembershipPlans({ discountPercentage = 50 }) {
    const [planType, setPlanType] = useState('individual');

    const planFeatures = [
        "Membership Privileges",
        "Member Rights",
        "Membership Terms"
    ];

    const handlePlanTypeChange = (type) => {
        setPlanType(type);
    };

    // Plan card component to avoid repeating code
    const PlanCard = ({ title, price, currency, duration, accessType }) => (
        <div className="bg-yellow-50 p-8 rounded-lg shadow-sm">
            <div className="flex justify-between mb-2">
                {planType === 'individual' ?
                    <FaUser className="text-gray-900 text-3xl" /> :
                    <FaUniversity className="text-gray-900 text-2xl" />
                }
                <div className="bg-[#C5D3E8] text-black font-bold text-lg py-2 px-5 rounded-md flex items-center">
                    <TbCirclePercentageFilled className="mr-1 text-black " />
                    {discountPercentage}% OFF
                </div>
            </div>

            <h3 className="text-2xl font-semibold mb-5 mt-5">{planType === 'individual' ? 'Individual' : 'Institutional'} {title}</h3>
            <div className="text-4xl font-bold mb-4">{currency} {price}</div>

            <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                    <div className="bg-black rounded-full w-5 h-5 flex items-center justify-center">
                        <FaCheck className="text-white text-xs" />
                    </div>
                    <span>{duration} year Membership</span>
                </li>
                <li className="flex items-center gap-2">
                    <div className="bg-black rounded-full w-5 h-5 flex items-center justify-center">
                        <FaCheck className="text-white text-xs" />
                    </div>
                    <span>{accessType}</span>
                </li>

                {planFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                        <div className="bg-black rounded-full w-5 h-5 flex items-center justify-center">
                            <FaCheck className="text-white text-xs" />
                        </div>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <button className="bg-green-100 hover:bg-green-200 transition-colors w-full py-3 rounded-full flex items-center justify-center relative">
                <span className="font-medium mr-2">PAY NOW</span>
                <img src="/arrow_pay.svg" alt="arrow_white" className='absolute left-1'/>
            </button>
        </div>
    );

    // Individual plan data
    const individualPlans = [
        {
            title: "Annual",
            price: "500.00",
            currency: "₹",
            duration: "1",
            accessType: "Indian Access only"
        },
        {
            title: "Long Term",
            price: "1200.00",
            currency: "₹",
            duration: "3",
            accessType: "Indian Access only"
        },
        {
            title: "Overseas",
            price: "20.00",
            currency: "$",
            duration: "1",
            accessType: "Global Access"
        }
    ];

    // Institutional plan data (with different values)
    const institutionalPlans = [
        {
            title: "Annual",
            price: "5000.00",
            currency: "₹",
            duration: "1",
            accessType: "Multi-user Access"
        },
        {
            title: "Long Term",
            price: "12000.00",
            currency: "₹",
            duration: "3",
            accessType: "Multi-user Access"
        },
        {
            title: "Enterprise",
            price: "200.00",
            currency: "$",
            duration: "1",
            accessType: "Global Enterprise Access"
        }
    ];

    // Select which plans to show based on selected plan type
    const plansToShow = planType === 'individual' ? individualPlans : institutionalPlans;

    return (
        <div className="relative w-full h-full md:h-screen rounded-[25px] overflow-hidden z-1 flex flex-col bg-no-repeat bg-cover bg-center p-14 " style={{ backgroundImage: `url(${bg3})` }}>
            <div className="flex justify-between items-center mb-6 pt-4 pb-4 mr-6">
                <h1 className="text-5xl font-bold text-gray-900">Select Plan</h1>

                <div className="flex items-center gap-10">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => handlePlanTypeChange('individual')}>
                        <FaUser className="text-gray-900" />
                        <span className="text-2xl">Individual</span>
                        <div className={`w-5 h-5 rounded-full border-2 border-gray-900 flex items-center justify-center ${planType === 'individual' ? 'bg-gray-900' : 'bg-transparent'}`}>
                            {planType === 'individual' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => handlePlanTypeChange('institutional')}>
                        <FaUniversity className="text-gray-900" />
                        <span className="text-2xl">Institutional</span>
                        <div className={`w-5 h-5 rounded-full border-2 border-gray-900 flex items-center justify-center ${planType === 'institutional' ? 'bg-gray-900' : 'bg-transparent'}`}>
                            {planType === 'institutional' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Dynamically render plan cards based on selected plan type */}
                {plansToShow.map((plan, index) => (
                    <PlanCard
                        key={index}
                        title={plan.title}
                        price={plan.price}
                        currency={plan.currency}
                        duration={plan.duration}
                        accessType={plan.accessType}
                    />
                ))}
            </div>
        </div>
    );
}
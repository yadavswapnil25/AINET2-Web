import React, { useState } from 'react';
import { FaUser, FaUniversity } from 'react-icons/fa';
import PlanCard from '../shared/Plancard';
import bg3 from "/bg3.png";
import { useNavigate } from 'react-router-dom';

export default function MembershipPlans() {
    const [planType, setPlanType] = useState('individual');
    const navigate = useNavigate()

    const planFeatures = [
        "Membership Privileges",
        "Member Rights",
        "Membership Terms"
    ];

    const handlePlanTypeChange = (type) => {
        setPlanType(type);
    };

    const individualPlans = [
        {
            title: "Annual",
            price: "500.00",
            currency: "INR",
            duration: "1",
            type: "Individual",
            discountPercentage: 40
        },
        {
            title: "LongTerm",
            price: "1200.00",
            currency: "INR",
            duration: "3",
            type: "Individual",
            discountPercentage: 50
        },
        {
            title: "Overseas",
            price: "20.00",
            currency: "USD",
            duration: "1",
            type: "Individual",
            discountPercentage: 25
        }
    ];

    const institutionalPlans = [
        {
            title: "Annual",
            price: "1000.00",
            currency: "INR",
            duration: "1",
            discountPercentage: 40,
            type: "Institutional"
        },
        {
            title: "LongTerm",
            price: "2500.00",
            currency: "INR",
            duration: "3",
            discountPercentage: 35,
            type: "Institutional"
        },
        {
            title: "Overseas",
            price: "30.00",
            currency: "USD",
            duration: "1",
            discountPercentage: 55,
            type: "Institutional"
        }
    ];

    const plansToShow = planType === 'individual' ? individualPlans : institutionalPlans;


    const handlePayNow = (plan) => {
        console.log("plan", plan)
        navigate("/MembershipFormforIndividualAnnual", { state: plan })
    }

    return (
        <div id='membershipplan'
            className="relative w-full  min-h-screen  rounded-[25px] overflow-hidden bg-no-repeat bg-cover bg-center px-6 sm:px-10 md:px-14 py-10 md:py-14"
            style={{ backgroundImage: `url(${bg3})` }}
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-6">
                <h1 className="md:text-5xl font-bold text-gray-900 text-center md:text-left  text-3xl">
                    Select Plan
                </h1>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-10">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => handlePlanTypeChange('individual')}>
                        <FaUser className="text-gray-900 text-xl sm:text-2xl" />
                        <span className="text-lg sm:text-xl">Individual</span>
                        <div className={`w-5 h-5 rounded-full border-2 border-gray-900 flex items-center justify-center ${planType === 'individual' ? 'bg-gray-900' : 'bg-transparent'}`}>
                            {planType === 'individual' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => handlePlanTypeChange('institutional')}>
                        <FaUniversity className="text-gray-900 text-xl sm:text-2xl" />
                        <span className="text-lg sm:text-xl">Institutional</span>
                        <div className={`w-5 h-5 rounded-full border-2 border-gray-900 flex items-center justify-center ${planType === 'institutional' ? 'bg-gray-900' : 'bg-transparent'}`}>
                            {planType === 'institutional' && <div className="w-2 h-2 rounded-full bg-white"></div>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
                {plansToShow.map((plan, index) => (
                    <PlanCard
                        key={index}
                        title={plan.title}
                        price={plan.price}
                        currency={plan.currency}
                        duration={plan.duration}
                        accessType={plan.accessType}
                        planType={planType}
                        discountPercentage={plan.discountPercentage}
                        planFeatures={planFeatures}
                        handleClick={() => handlePayNow(plan)}
                    />
                ))}
            </div>
        </div>
    );
}

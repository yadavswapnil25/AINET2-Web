import React, { useState } from 'react';
import { FaUser, FaUniversity } from 'react-icons/fa';
import PlanCard from '../shared/Plancard';
import bg3 from "/bg3.png";
import { useNavigate } from 'react-router-dom';
import { useMembershipPricing, PRICING_CONTEXT } from '../../utils/pricing';

// Prices and the promotional discount come from the API, so this list only
// describes each plan - never what it costs.
const PLAN_META = {
    individual: {
        type: 'Individual',
        plans: [
            { title: 'Annual', duration: '1', badge: 'Basic' },
            { title: 'LongTerm', duration: '3', badge: '20 % OFF' },
            { title: 'Overseas', duration: '1', badge: '' },
        ],
    },
    institutional: {
        type: 'Institutional',
        plans: [
            { title: 'Annual', duration: '1', badge: 'Basic' },
            { title: 'LongTerm', duration: '3', badge: '20 % OFF' },
            { title: 'Overseas', duration: '1', badge: '' },
        ],
    },
};

export default function MembershipPlans() {
    const [planType, setPlanType] = useState('individual');
    const navigate = useNavigate()
    const { plans: pricing, promo, loading: pricingLoading } = useMembershipPricing(PRICING_CONTEXT.NEW);

    const planFeatures = [
        "Membership Privileges",
        "Member Rights",
        "Membership Terms"
    ];

    const handlePlanTypeChange = (type) => {
        setPlanType(type);
    };

    const { type: membershipType, plans: planMeta } = PLAN_META[planType];

    const plansToShow = planMeta.map((meta) => {
        const priced = pricing?.[membershipType]?.[meta.title];
        const discount = Number(priced?.discount_percentage ?? 0);

        return {
            ...meta,
            type: membershipType,
            currency: priced?.currency ?? 'INR',
            price: priced?.price,
            basePrice: priced?.base_price,
            discountPercentage: discount > 0
                ? `${Math.round(discount)}% OFF`
                : meta.badge,
            showStrikethrough: discount > 0,
        };
    });


    const handlePayNow = (plan) => {
        
        if (plan.type === "Individual") {
            if (plan.title === "LongTerm") {
                navigate("/FormIndLongterm", { state: plan })
            } else if (plan.title === "Overseas") {
                navigate("/MembershipFormforIndividualOverseas", { state: plan })
            } else if (plan.title === "Annual") {
                navigate("/MembershipFormforIndividualAnnual", { state: plan })
            }
        } else if (plan.type === "Institutional") {
            if (plan.title === "Annual") {
                navigate("/MembershipFormforInstitutionalAnnual", { state: plan })
            } else if (plan.title === "LongTerm") {
                navigate("/MembershipFormforInstitutionalLongTerm", { state: plan })
            } else if (plan.title === "Overseas") {
                navigate("/MembershipFormforInstitutionalOverseas", { state: plan })
            }
        }
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
                        basePrice={plan.showStrikethrough ? plan.basePrice : null}
                        currency={plan.currency}
                        duration={plan.duration}
                        accessType={plan.accessType}
                        planType={planType}
                        discountPercentage={plan.discountPercentage}
                        promoLabel={promo?.active ? promo?.label : null}
                        loading={pricingLoading || !plan.price}
                        planFeatures={planFeatures}
                        handleClick={() => handlePayNow(plan)}
                    />
                ))}
            </div>
        </div>
    );
}

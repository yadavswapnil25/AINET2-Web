import { useState } from 'react';
import { FaUser, FaUniversity } from 'react-icons/fa';
import PlanCard from '../shared/Plancard';
import { useNavigate } from 'react-router-dom';
import { useMembershipPricing, PRICING_CONTEXT } from '../../utils/pricing';
import SectionHeading from './SectionHeading';
import { containerClass } from './sectionStyles';

const PLAN_TYPES = [
    { key: 'individual', label: 'Individual', Icon: FaUser },
    { key: 'institutional', label: 'Institutional', Icon: FaUniversity },
];

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
        <section
            id='membershipplan'
            aria-labelledby="plans-title"
            className="scroll-mt-24 bg-cream-soft py-16 sm:py-20 lg:py-24"
        >
            <div className={containerClass}>
                <SectionHeading id="plans-title" eyebrow="Membership" title="Select Plan" align="center" />

                <div className="mt-8 flex justify-center">
                    <div
                        role="radiogroup"
                        aria-label="Membership type"
                        className="inline-flex rounded-full bg-white p-1.5 shadow-sm ring-1 ring-ink/10"
                    >
                        {PLAN_TYPES.map((option) => {
                            const { key, label, Icon } = option;
                            const active = planType === key;
                            return (
                                <button
                                    key={key}
                                    type="button"
                                    role="radio"
                                    aria-checked={active}
                                    onClick={() => setPlanType(key)}
                                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors sm:px-6 sm:text-base ${active ? 'bg-ink text-white shadow' : 'text-ink/70 hover:text-ink'}`}
                                >
                                    <Icon aria-hidden="true" />
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-12 grid items-stretch gap-6 md:grid-cols-3 md:gap-5 lg:gap-8">
                    {plansToShow.map((plan) => (
                        <PlanCard
                            key={plan.title}
                            featured={plan.title === 'LongTerm'}
                            title={plan.title}
                            price={plan.price}
                            basePrice={plan.showStrikethrough ? plan.basePrice : null}
                            currency={plan.currency}
                            duration={plan.duration}
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
        </section>
    );
}

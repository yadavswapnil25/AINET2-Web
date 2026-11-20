import { FaArrowRight, FaCheck, FaUniversity, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Highlight from "../Components/shared/Highlight";
import PageHeader from "../Components/shared/PageHeader";
import { containerClass } from "../Components/shared/sectionStyles";
import {
  useMembershipPricing,
  PRICING_CONTEXT,
  formatPrice,
} from "../utils/pricing";

// Same forms the home page plans open.
const PLAN_FORMS = {
  Individual: {
    Annual: "/MembershipFormforIndividualAnnual",
    LongTerm: "/FormIndLongterm",
    Overseas: "/MembershipFormforIndividualOverseas",
  },
  Institutional: {
    Annual: "/MembershipFormforInstitutionalAnnual",
    LongTerm: "/MembershipFormforInstitutionalLongTerm",
    Overseas: "/MembershipFormforInstitutionalOverseas",
  },
};

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
    typeKey: "Individual",
    Icon: FaUser,
    plans: [
      { name: "Individual Annual", planKey: "Annual", features: ["1-year Membership", "Indian Access only", "Membership Privileges", "Member Rights"] },
      { name: "Individual Long Term", planKey: "LongTerm", features: ["3-year Membership", "Indian Access only", "Membership Privileges", "Member Rights"] },
      { name: "Individual Overseas", planKey: "Overseas", features: ["1-year Membership", "Global Access", "Membership Privileges", "Member Rights"] },
    ]
  },
  {
    type: "Institutional",
    typeKey: "Institutional",
    Icon: FaUniversity,
    plans: [
      { name: "Institutional Annual", planKey: "Annual", features: ["1-year Membership", "Indian Access only", "Discounted Rates", "Member Rights"] },
      { name: "Institutional Long Term", planKey: "LongTerm", features: ["3-year Membership", "Indian Access only", "Discounted Rates", "Member Rights"] },
      { name: "Institutional Overseas", planKey: "Overseas", features: ["1-year Membership", "Global Access only", "Discounted Rates", "Member Rights"] },
    ]
  }
];

const PriceTag = ({ priced, loading, promoLabel }) => {
  if (loading || !priced) {
    return <div className="h-11 w-36 animate-pulse rounded-xl bg-sky-soft" />;
  }

  const discounted = Number(priced.discount_percentage) > 0;

  return (
    <div>
      <p className="text-4xl font-extrabold tracking-tight text-ink">₹{formatPrice(priced.price)}</p>
      {discounted && (
        <p className="mt-1 text-sm text-ink/50">
          <span className="mr-2 line-through">₹{formatPrice(priced.base_price)}</span>
          <span className="font-semibold text-sage-deep">
            {Math.round(priced.discount_percentage)}% off
            {promoLabel ? ` - ${promoLabel}` : ""}
          </span>
        </p>
      )}
    </div>
  );
};

const MembershipArea = () => {
  const navigate = useNavigate();
  const { plans: pricing, promo, loading: pricingLoading } = useMembershipPricing(
    PRICING_CONTEXT.NEW
  );

  return (
    <>
      <Highlight />

      <main>
        <PageHeader
          breadcrumbs={[
            { label: "Home", to: "/" },
            { label: "AINET Membership Area", to: null },
          ]}
          eyebrow="Membership"
          title="Membership Information Document"
        />

        {/* What membership means */}
        <section className="py-12 sm:py-16">
          <div className={`${containerClass} grid gap-6 md:grid-cols-2`}>
            {membershipSections.map((section) => (
              <div key={section.title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/10 sm:p-8">
                <h2 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">{section.title}</h2>
                <p className="mt-2 text-sm font-semibold text-sage-deep">As an AINET member, you will</p>
                <ul className="mt-4 space-y-3">
                  {section.content.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink/80">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-sage text-sage-deep">
                        <FaCheck className="text-[10px]" aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Membership types */}
        <section className="bg-cream-soft py-12 sm:py-16">
          <div className={containerClass}>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Membership Types</h2>

            {membershipTypes.map((type) => {
              const { Icon } = type;
              return (
                <div key={type.type} className="mt-10">
                  <h3 className="flex items-center gap-3 text-xl font-bold text-ink">
                    <span className="grid size-10 place-items-center rounded-2xl bg-sky text-ink">
                      <Icon aria-hidden="true" />
                    </span>
                    {type.type}
                  </h3>

                  <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {type.plans.map((plan) => (
                      <div key={plan.name} className="flex flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/10 sm:p-8">
                        <h4 className="text-xl font-bold text-ink">{plan.name}</h4>
                        <div className="mt-4">
                          <PriceTag
                            priced={pricing?.[type.typeKey]?.[plan.planKey]}
                            loading={pricingLoading}
                            promoLabel={promo?.active ? promo?.label : null}
                          />
                        </div>
                        <ul className="mt-6 space-y-3 border-t border-ink/10 pt-6">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-3 text-[15px] text-ink/80">
                              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-ink text-white">
                                <FaCheck className="text-[10px]" aria-hidden="true" />
                              </span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-auto pt-8">
                          <button
                            type="button"
                            onClick={() => navigate(PLAN_FORMS[type.typeKey][plan.planKey])}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3.5 font-bold text-white transition-colors hover:bg-ink/85"
                          >
                            PAY NOW
                            <FaArrowRight className="text-sm" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
};

export default MembershipArea;

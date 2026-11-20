import { useState } from "react";
import { toast } from "react-toastify";
import { baseUrl } from "../../utils/constant";
import { processMembershipRenewalPayment } from "../../utils/utility";
import { useMembershipPricing, PRICING_CONTEXT, formatPrice } from "../../utils/pricing";

const PLAN_META = {
  Individual: [
    { title: "Annual", label: "1 Year", badge: "Basic", highlight: false },
    { title: "LongTerm", label: "3 Years", badge: "20% OFF", highlight: true },
    { title: "Overseas", label: "1 Year", badge: "Overseas", highlight: false },
  ],
  Institutional: [
    { title: "Annual", label: "1 Year", badge: "Basic", highlight: false },
    { title: "LongTerm", label: "3 Years", badge: "20% OFF", highlight: true },
    { title: "Overseas", label: "1 Year", badge: "Overseas", highlight: false },
  ],
};

const PLAN_DISPLAY_NAMES = {
  Annual: "Annual",
  LongTerm: "Long Term",
  Overseas: "Overseas",
};

export default function RenewMembershipModal({ profile, onClose, onSuccess }) {
  const currentType = profile?.membership_type || "Individual";
  const currentPlan = profile?.membership_plan || "Annual";

  const [selectedPlan, setSelectedPlan] = useState(currentPlan);
  const [isProcessing, setIsProcessing] = useState(false);

  const token = localStorage.getItem("ainetToken");
  const { plans: pricing, promo, loading: pricingLoading } = useMembershipPricing(
    PRICING_CONTEXT.RENEWAL
  );

  const plans = (PLAN_META[currentType] || PLAN_META.Individual).map((meta) => {
    const priced = pricing?.[currentType]?.[meta.title];
    const discount = Number(priced?.discount_percentage ?? 0);

    return {
      ...meta,
      currency: priced?.currency ?? "INR",
      months: priced?.months,
      price: priced?.price,
      basePrice: priced?.base_price,
      discountPercentage: discount,
      badge: discount > 0 ? `${Math.round(discount)}% OFF` : meta.badge,
      highlight: discount > 0 ? true : meta.highlight,
    };
  });

  const chosenPlan = plans.find((p) => p.title === selectedPlan) || plans[0];

  const isUpgrade = selectedPlan !== currentPlan;

  const handleProceed = async () => {
    if (!chosenPlan) return;
    setIsProcessing(true);

    try {
      const { order, payment } = await processMembershipRenewalPayment({
        membershipPlan: chosenPlan.title,
        membershipType: currentType,
        token,
        customer: {
          name: profile?.name || "",
          email: profile?.email || "",
          contact: profile?.mobile || "",
        },
        notes: {
          user_id: String(profile?.id),
          membership_plan: chosenPlan.title,
          membership_type: currentType,
          renewal: "true",
        },
      });

      const res = await fetch(`${baseUrl}/client/auth/membership/renew/confirm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          razorpay_order_id: order.id,
          razorpay_payment_id: payment.razorpay_payment_id,
          razorpay_signature: payment.razorpay_signature,
          membership_plan: chosenPlan.title,
          membership_type: currentType,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data?.status) {
        toast.success(
          isUpgrade
            ? "Membership upgraded successfully!"
            : "Membership renewed successfully!"
        );
        onSuccess?.();
        onClose();
      } else {
        toast.error(data?.message || "Failed to confirm payment. Please contact support.");
      }
    } catch (err) {
      if (err?.message?.includes("cancelled") || err?.message?.includes("dismissed")) {
        toast.info("Payment cancelled.");
      } else {
        toast.error(err?.message || "Payment failed. Please try again.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="bg-ink px-6 py-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl font-bold leading-none"
            disabled={isProcessing}
          >
            &times;
          </button>
          <h2 className="text-xl font-bold">
            {isUpgrade ? "Upgrade Membership" : "Renew Membership"}
          </h2>
          <p className="text-white/70 text-sm mt-1">
            Current plan:{" "}
            <span className="font-semibold text-white">
              {currentType} — {PLAN_DISPLAY_NAMES[currentPlan] || currentPlan}
            </span>
          </p>
        </div>

        <div className="p-6">
          {/* Plan cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            {plans.map((plan) => {
              const isCurrent = plan.title === currentPlan;
              const isSelected = plan.title === selectedPlan;

              return (
                <button
                  key={plan.title}
                  onClick={() => setSelectedPlan(plan.title)}
                  className={`relative rounded-2xl border-2 p-4 text-left transition-all ${
                    isSelected
                      ? "border-ink bg-sky-soft"
                      : "border-ink/10 bg-white hover:border-ink/40"
                  }`}
                >
                  {isCurrent && (
                    <span className="absolute -top-2 left-3 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                      Current
                    </span>
                  )}
                  {plan.highlight && !isCurrent && (
                    <span className="absolute -top-2 left-3 bg-orange-400 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                      {plan.badge}
                    </span>
                  )}

                  <p className="font-bold text-ink text-base mb-0.5">
                    {PLAN_DISPLAY_NAMES[plan.title]}
                  </p>
                  <p className="text-ink/50 text-xs mb-2">{plan.label}</p>
                  {pricingLoading || !plan.price ? (
                    <div className="h-6 w-24 bg-sky-soft rounded animate-pulse" />
                  ) : (
                    <>
                      <p className="text-ink font-extrabold text-lg">
                        ₹{formatPrice(plan.price)}
                        <span className="text-ink/40 text-xs font-normal ml-1">
                          / {currentType === "Individual" ? "person" : "institution"}
                        </span>
                      </p>
                      {plan.discountPercentage > 0 && (
                        <p className="text-xs text-ink/50 line-through">
                          ₹{formatPrice(plan.basePrice)}
                        </p>
                      )}
                    </>
                  )}

                  {isSelected && (
                    <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-ink flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Summary box */}
          {chosenPlan && (
            <div className="bg-sky-soft rounded-2xl p-4 mb-5">
              <h4 className="text-sm font-semibold text-ink/75 mb-2">Payment Summary</h4>
              <div className="flex justify-between text-sm text-ink/60 mb-1">
                <span>Plan</span>
                <span className="font-medium text-ink">
                  {currentType} — {PLAN_DISPLAY_NAMES[chosenPlan.title]}
                </span>
              </div>
              <div className="flex justify-between text-sm text-ink/60 mb-1">
                <span>Duration</span>
                <span className="font-medium text-ink">{chosenPlan.label}</span>
              </div>
              <div className="flex justify-between text-sm text-ink/60 mb-1">
                <span>Valid for</span>
                <span className="font-medium text-ink">{chosenPlan.months} months</span>
              </div>
              <div className="border-t border-ink/10 mt-2 pt-2 flex justify-between text-sm">
                <span className="font-semibold text-ink">Total Amount</span>
                <span className="font-bold text-ink text-base">
                  {chosenPlan.discountPercentage > 0 && (
                    <span className="text-ink/40 font-normal line-through mr-2">
                      ₹{formatPrice(chosenPlan.basePrice)}
                    </span>
                  )}
                  ₹{formatPrice(chosenPlan.price)}
                </span>
              </div>
              {chosenPlan.discountPercentage > 0 && promo?.active && (
                <div className="mt-2 text-xs text-green-700 font-medium bg-green-50 rounded-lg px-3 py-1.5">
                  {promo.label}: {Math.round(chosenPlan.discountPercentage)}% off renewals
                  {promo.ends_at
                    ? ` until ${new Date(promo.ends_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`
                    : ""}
                  .
                </div>
              )}
              {isUpgrade && (
                <div className="mt-2 text-xs text-orange-600 font-medium bg-orange-50 rounded-lg px-3 py-1.5">
                  This will upgrade your plan from {PLAN_DISPLAY_NAMES[currentPlan]} to{" "}
                  {PLAN_DISPLAY_NAMES[chosenPlan.title]}.
                </div>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 py-3 rounded-full bg-white text-ink ring-1 ring-ink/15 font-semibold hover:bg-sky-soft transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleProceed}
              disabled={isProcessing || pricingLoading || !chosenPlan?.price}
              className="flex-1 py-3 rounded-full bg-ink text-white font-semibold hover:bg-ink/85 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isProcessing
                ? "Processing..."
                : pricingLoading || !chosenPlan?.price
                ? "Loading price..."
                : `Pay ₹${formatPrice(chosenPlan.price)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

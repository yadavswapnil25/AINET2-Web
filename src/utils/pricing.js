import { useCallback, useEffect, useState } from "react";
import { baseUrl } from "./constant";

/**
 * Membership prices, the promotional discount and its cut-off date all live in
 * the API (config/membership.php). Nothing here hardcodes an amount: the site
 * renders whatever the server says is currently payable, and the promotion
 * ends on its own once the cut-off passes.
 */

export const PRICING_CONTEXT = {
    NEW: "new",
    RENEWAL: "renewal",
};

let cachedPricing = null;
let inFlight = null;

export const fetchMembershipPricing = async ({ force = false } = {}) => {
    if (!force && cachedPricing) return cachedPricing;
    if (!force && inFlight) return inFlight;

    inFlight = (async () => {
        const response = await fetch(`${baseUrl}/client/membership/pricing`, {
            headers: { Accept: "application/json" },
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok || !data?.status) {
            throw new Error(data?.message || "Failed to load membership pricing.");
        }

        cachedPricing = data.data;
        return cachedPricing;
    })();

    try {
        return await inFlight;
    } finally {
        inFlight = null;
    }
};

export const formatINR = (value) =>
    Number(value ?? 0).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

/** Whole rupees where possible, e.g. 250 not 250.00 but 862.50 kept. */
export const formatPrice = (value) => {
    const n = Number(value ?? 0);
    return Number.isInteger(n)
        ? n.toLocaleString("en-IN")
        : n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

/**
 * Loads the pricing catalogue for one context ("new" or "renewal").
 *
 * Returns `plans[membership_type][membership_plan]` where each entry carries
 * base_price, discount_percentage, discount_amount and the payable price.
 */
export const useMembershipPricing = (context = PRICING_CONTEXT.NEW) => {
    const [pricing, setPricing] = useState(cachedPricing);
    const [loading, setLoading] = useState(!cachedPricing);
    const [error, setError] = useState(null);

    const load = useCallback(async ({ force = false } = {}) => {
        setLoading(true);
        setError(null);
        try {
            setPricing(await fetchMembershipPricing({ force }));
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        let alive = true;

        fetchMembershipPricing()
            .then((data) => alive && setPricing(data))
            .catch((err) => alive && setError(err))
            .finally(() => alive && setLoading(false));

        return () => {
            alive = false;
        };
    }, []);

    return {
        pricing,
        plans: pricing?.[context] ?? null,
        promo: pricing?.promo ?? null,
        loading,
        error,
        reload: load,
    };
};

/**
 * Pricing for a single plan, e.g. usePlanPrice("Individual", "Annual").
 */
export const usePlanPrice = (
    membershipType,
    membershipPlan,
    context = PRICING_CONTEXT.NEW
) => {
    const { plans, promo, loading, error } = useMembershipPricing(context);

    return {
        plan: plans?.[membershipType]?.[membershipPlan] ?? null,
        promo,
        loading,
        error,
    };
};

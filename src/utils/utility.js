import { baseUrl, razorpayKey } from "./constant";

const loadRazorpayScript = () =>
    new Promise((resolve) => {
        if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
            return resolve(true);
        }
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });

export const createRazorpayOrder = async ({
    amount,
    currency = "INR",
    receipt,
    notes = {},
    customer = {},
}) => {
    const response = await fetch(`${baseUrl}/client/payments/order`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            amount,
            currency,
            receipt,
            notes,
            customer,
        }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data?.status) {
        throw new Error(data?.message || "Failed to create Razorpay order.");
    }

    return data.data;
};

export const initiatePayment = async ({ order, customer = {}, notes = {} }) => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
        throw new Error("Razorpay SDK failed to load.");
    }

    return new Promise((resolve, reject) => {
        const options = {
            key: razorpayKey,
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
            name: "AINET",
            description: "Membership Payment",
            handler: function (response) {
                resolve(response);
            },
            prefill: {
                name: customer.name || "",
                email: customer.email || "",
                contact: customer.contact || "",
            },
            notes,
            theme: {
                color: "#3399cc",
            },
        };

        const paymentObject = new window.Razorpay(options);

        paymentObject.on("payment.failed", function (response) {
            reject(new Error(response?.error?.description || "Payment failed or was cancelled."));
        });

        paymentObject.open();
    });
};

export const processMembershipPayment = async ({
    amount,
    currency = "INR",
    customer,
    notes,
}) => {
    const orderData = await createRazorpayOrder({
        amount,
        currency,
        customer,
        notes,
        receipt: `AINET-${Date.now()}`,
    });

    const paymentResponse = await initiatePayment({
        order: orderData.order,
        customer: orderData.customer || customer,
        notes,
    });

    return {
        order: orderData.order,
        payment: paymentResponse,
    };
};

export const confirmMembershipPayment = async ({
    userId,
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
}) => {
    const response = await fetch(`${baseUrl}/client/membership-signup/confirm`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            user_id: userId,
            razorpay_order_id: razorpayOrderId,
            razorpay_payment_id: razorpayPaymentId,
            razorpay_signature: razorpaySignature,
        }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data?.status) {
        const message = data?.message || data?.error || "Failed to confirm payment.";
        const extra = data?.errors;
        const error = new Error(message);
        error.extra = extra;
        throw error;
    }

    return data.data;
};

import { razorpayKey } from "./constant";

export const initiatePayment = async ({ amount, name, email, contact, currency }) => {
    return new Promise(async (resolve, reject) => {
        const loadScript = () =>
            new Promise((resolve) => {
                const script = document.createElement("script");
                script.src = "https://checkout.razorpay.com/v1/checkout.js";
                script.onload = () => resolve(true);
                script.onerror = () => resolve(false);
                document.body.appendChild(script);
            });

        const isLoaded = await loadScript();
        if (!isLoaded) return reject("Razorpay SDK failed to load.");

        const options = {
            key: razorpayKey, // use live key in prod
            amount: amount * 100, // Razorpay works in paise
            currency: currency || "INR",
            name: "AINET",
            description: "Membership Payment",
            handler: function (response) {
                // ✅ Called only on payment success
                resolve(response); // move ahead
            },
            prefill: {
                name,
                email,
                contact,
            },
            theme: {
                color: "#3399cc",
            },
        };

        const paymentObject = new window.Razorpay(options);

        // ❌ Called on user cancel, failure, or error
        paymentObject.on("payment.failed", function (response) {
            reject(response.error.description || "Payment failed or was cancelled.");
        });

        paymentObject.open();
    });
};

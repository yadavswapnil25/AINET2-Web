import React, { useState } from "react";

const RazorpayCheckout = () => {
    const [paymentStatus, setPaymentStatus] = useState("idle");

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        const res = await loadRazorpayScript();

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const options = {
            key: razorpayKey,
            amount: 50000, // in paise = ₹500
            currency: "INR",
            name: "AINET",
            description: "Membership Payment",
            handler: function (response) {
                console.log("✅ Payment success:", response);
                setPaymentStatus("success");
            },
            prefill: {
                name: "Paresh Patil",
                email: "paresh@example.com",
                contact: "9999999999",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

        paymentObject.on("payment.failed", function (response) {
            console.error("❌ Payment failed:", response.error);
            setPaymentStatus("failed");
        });
    };

    return (
        <div className="p-4 text-center">
            <button
                onClick={handlePayment}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Pay ₹500
            </button>

            {paymentStatus === "success" && (
                <p className="mt-4 text-green-600 font-semibold">✅ Payment Done</p>
            )}
            {paymentStatus === "failed" && (
                <p className="mt-4 text-red-600 font-semibold">❌ Payment Failed</p>
            )}
        </div>
    );
};

export default RazorpayCheckout;

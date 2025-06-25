import React from "react";
import { CreditCard } from "lucide-react";

const PaymentConfirmationModal = ({ show, onClose, onProceed, amount, currency = "INR" }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center relative">
                <CreditCard className="text-blue-500 w-16 h-16 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Confirm Payment
                </h2>
                <p className="text-gray-600 mb-2">
                    You are about to make a payment for your membership.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg my-4">
                    <p className="text-gray-700 font-medium">Amount to Pay:</p>
                    <p className="text-3xl font-bold text-blue-600">
                        {currency === "INR" ? "₹" : "$"}{amount}
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onProceed}
                        className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                    >
                        <span>Pay Now</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentConfirmationModal;
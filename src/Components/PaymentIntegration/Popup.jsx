import React from "react";
import { CheckCircle } from "lucide-react";

const PaymentSuccessModal = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 overflow-auto">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-10 text-center relative animate-fade-in-up">
                
                {/* Animated Tick Icon */}
                <div className="flex justify-center mb-6">
                    <div className="animate-bounce">
                        <CheckCircle className="text-green-500 w-20 h-20" />
                    </div>
                </div>

                {/* Headline */}
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Payment & Registration Successful 🎉
                </h2>

                {/* Message */}
                <p className="text-lg text-gray-700 mb-2">
                    Thank you for your payment and registration!
                </p>
                <p className="text-gray-600 mb-6">
                    You’ll soon receive a confirmation email with all the necessary information.  
                    Please check your inbox or spam folder.
                </p>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="mt-2 px-8 py-3 bg-blue-600 text-white text-lg rounded-full hover:bg-blue-700 transition-all"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccessModal;

import React from "react";
import { CheckCircle } from "lucide-react";

const PaymentSuccessModal = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center relative">
                <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                   Registration Successful.
                </h2>
                <p className="text-gray-600 mb-4">
                    We have sent an email to your registered address.
                </p>
                <button
                    onClick={onClose}
                    className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
                >
                    Okay
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccessModal;

import React from "react";
import { CreditCard } from "lucide-react";
import { formatPrice } from "../../utils/pricing";

const PaymentConfirmationModal = ({
    show,
    onClose,
    onProceed,
    amount,
    basePrice,
    discountPercentage = 0,
    promoLabel,
    loading = false,
    currency = "INR",
}) => {
    if (!show) return null;

    const symbol = currency === "INR" ? "₹" : "$";
    const hasDiscount = Number(discountPercentage) > 0 && Number(basePrice) > Number(amount);

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
                    {loading ? (
                        <p className="text-xl font-semibold text-blue-600 animate-pulse">
                            Loading price...
                        </p>
                    ) : (
                        <>
                            <p className="text-3xl font-bold text-blue-600">
                                {symbol}{formatPrice(amount)}
                            </p>
                            {hasDiscount && (
                                <p className="mt-1 text-sm text-gray-600">
                                    <span className="line-through mr-2">
                                        {symbol}{formatPrice(basePrice)}
                                    </span>
                                    <span className="font-semibold text-green-700">
                                        {Math.round(discountPercentage)}% off
                                        {promoLabel ? ` - ${promoLabel}` : ""}
                                    </span>
                                </p>
                            )}
                        </>
                    )}
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
                        disabled={loading || !amount}
                        className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        <span>Pay Now</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentConfirmationModal;
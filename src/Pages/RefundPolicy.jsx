import React from 'react';

const RefundPolicy = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-12 px-4">
            <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-8 md:p-12">
                <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">Refund and Cancellation Policy</h1>


                <div className="space-y-8 text-gray-700 text-[16px] leading-7">
                    <p>
                        At <strong>AINET</strong>, we are committed to providing a seamless experience for all our users. This Refund and Cancellation Policy outlines the terms under which refunds and cancellations may be processed.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-800">1. Cancellation Policy</h2>
                    <p>
                        You may request cancellation of a service or transaction within <strong>24 hours</strong> of purchase, provided the service has not been used or initiated.
                        To request cancellation, please contact our support team at <a href="mailto:support@ainet.com" className="text-blue-600 underline">support@ainet.com</a> with your order details.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-800">2. Refund Eligibility</h2>
                    <p>
                        Refunds will only be issued under the following conditions:
                    </p>
                    <ul className="list-disc ml-6 space-y-2">
                        <li>You have canceled the service within the allowed time window.</li>
                        <li>The service or subscription has not been used or consumed.</li>
                        <li>A valid reason for the refund request is provided and accepted by AINET.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-gray-800">3. Refund Processing Time</h2>
                    <p>
                        Once your refund is approved, we will initiate the refund to your original payment method. Please allow <strong>5–7 working days</strong> for the amount to reflect in your account.
                        The actual time may vary depending on your bank or payment provider.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-800">4. Non-Refundable Cases</h2>
                    <p>
                        Please note that we do not offer refunds under the following circumstances:
                    </p>
                    <ul className="list-disc ml-6 space-y-2">
                        <li>The service has already been used or consumed.</li>
                        <li>Refund request made after the cancellation window.</li>
                        <li>Issues caused by the user, such as incorrect account information.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-gray-800">5. Contact Information</h2>
                    <p>
                        If you have any questions about cancellations or refunds, please contact us at:
                    </p>
                    <ul className="ml-6 mt-2 space-y-1">
                        <li>Email: <a href="mailto:support@ainet.com" className="text-blue-600 underline">support@ainet.com</a></li>
                        <li>Phone: +91 - 9322890031</li>
                        <li>Address: 7, Professor Colony, St. Kabir Ward, Bhandara (MS) 441904</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RefundPolicy;

import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-8 md:p-12">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">Shipping Policy</h1>
        <p className="text-center text-sm text-gray-500 mb-10">
          Effective Date: <span className="font-medium">May 8, 2025</span>
        </p>

        <div className="space-y-8 text-gray-700 text-[16px] leading-7">
          <p>
            At <strong>AINET</strong>, we are committed to delivering your orders in a timely and efficient manner. This Shipping Policy explains how we handle order fulfillment, shipping timelines, and delivery methods.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">1. Order Processing Time</h2>
          <p>
            All orders are processed within <strong>1–2 working days</strong> after the order confirmation and successful payment. Orders are not shipped or delivered on weekends or public holidays.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">2. Shipping Timelines</h2>
          <p>Estimated delivery times after dispatch:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Domestic (within India):</strong> 3–7 working days</li>
            <li><strong>International:</strong> 7–15 working days</li>
          </ul>
          <p>
            Delivery time may vary depending on your location, courier delays, weather conditions, or local disruptions.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">3. Shipping Charges</h2>
          <p>
            Shipping charges, if applicable, will be displayed at checkout before you make the payment. Free shipping may be available on selected products or promotions.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">4. Tracking Information</h2>
          <p>
            Once your order is shipped, we will send you a tracking number via email or SMS. You can use this number to track the status of your shipment through the courier's tracking page.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">5. Delays & Exceptions</h2>
          <p>
            In rare cases, shipping delays may occur due to unforeseen circumstances. We will do our best to inform you and support you during such events. AINET is not responsible for delays caused by courier services, customs, or force majeure events.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">6. Delivery Address</h2>
          <p>
            Please ensure the shipping address provided during checkout is accurate and complete. We are not responsible for failed deliveries due to incorrect or incomplete addresses.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800">7. Contact Information</h2>
          <p>
            If you have any questions about shipping, tracking, or your delivery, feel free to contact us:
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

export default ShippingPolicy;

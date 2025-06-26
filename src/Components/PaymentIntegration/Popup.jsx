import React from "react";

const PaymentSuccessModal = ({ show, onClose }) => {
  if (!show) return null;
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-white/90 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-[80%] shadow-lg p-8 flex flex-col items-center relative">
        <button
          className="absolute text-4xl top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <img
          src="/success.png"
          alt="Payment Successful"
          className="w-1/3 mb-4"
        />
        <h1 className="md:text-4xl text-2xl font-bold text-center">
          Thank you! Your payment has been <br /> successfully received.
        </h1>
        <p className="text-lg mt-4 text-center">
          All the necessary details have been sent to your registered email. If
          you have any questions or need <br /> further assistance, feel free to
          reach out to us at{" "}
          <a href="mailto:theainet@gmail.com" className="text-blue-600">
            theainet@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;

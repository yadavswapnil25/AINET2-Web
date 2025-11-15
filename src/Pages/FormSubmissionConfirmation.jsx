import React from 'react';
import { Link } from 'react-router-dom';

const FormSubmissionConfirmation = ({ line1, line2, line3, line4 }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
            <svg
              className="h-12 w-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Form Submitted Successfully!
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Thank you for submitting your presentation proposal form. Your submission has been received and is being reviewed.
          </p>


          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Return to Home
            </Link>
            
            <Link
              to="/conference"
              className="px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              View Conference Details
            </Link>
          </div>

          {/* Contact Information */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              If you have any questions, please contact us at{' '}
              <a
                href="mailto:theainet@gmail.com"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                theainet@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSubmissionConfirmation;

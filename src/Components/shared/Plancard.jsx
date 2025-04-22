import React from 'react';
import { FaUser, FaUniversity, FaCheck } from 'react-icons/fa';
import { TbCirclePercentageFilled } from 'react-icons/tb';

const PlanCard = ({
  title,
  price,
  currency,
  duration,
  accessType,
  planType,
  discountPercentage,
  planFeatures
}) => (
  <div className="flex flex-col justify-between h-full bg-yellow-50 p-10 py-15 rounded-xl shadow-sm">
    <div>
      <div className="flex justify-between mb-2">
        {planType === 'individual' ? (
          <FaUser className="text-gray-900 text-3xl" />
        ) : (
          <FaUniversity className="text-gray-900 text-3xl" />
        )}
        <div className="bg-[#C5D3E8] text-black font-bold text-lg py-2 px-5 rounded-md flex items-center">
          <TbCirclePercentageFilled className="mr-1 text-black" />
          {discountPercentage}% OFF
        </div>
      </div>

      <h3 className="text-3xl font-semibold mb-10 mt-10">
        {planType === 'individual' ? 'Individual' : 'Institutional'} {title}
      </h3>
      <div className="text-5xl font-bold mb-10">
        {currency} {price}
      </div>

      <ul className="space-y-4 mb-10">
        <li className="flex items-center gap-2">
          <div className="bg-black rounded-full w-5 h-5 flex items-center justify-center">
            <FaCheck className="text-white text-xs" />
          </div>
          <span>{duration} year Membership</span>
        </li>
        <li className="flex items-center gap-2">
          <div className="bg-black rounded-full w-5 h-5 flex items-center justify-center">
            <FaCheck className="text-white text-xs" />
          </div>
          <span>{accessType}</span>
        </li>

        {planFeatures.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <div className="bg-black rounded-full w-5 h-5 flex items-center justify-center">
              <FaCheck className="text-white text-xs" />
            </div>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>

    <button className="mt-auto bg-green-100 hover:bg-green-200 transition-colors w-full py-3 rounded-full flex items-center justify-center relative">
      <span className=" mr-2 font-semibold">PAY NOW</span>
      <img src="/arrow_pay.svg" alt="arrow_white" className="absolute left-1" />
    </button>
  </div>   
);

export default PlanCard;

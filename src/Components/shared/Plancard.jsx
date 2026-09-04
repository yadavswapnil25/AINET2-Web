import React from 'react';
import { FaUser, FaUniversity, FaCheck } from 'react-icons/fa';
import { TbCirclePercentageFilled } from 'react-icons/tb';
import { formatPrice } from '../../utils/pricing';

const PlanCard = ({
  title,
  price,
  basePrice,
  currency,
  duration,
  planType,
  discountPercentage,
  promoLabel,
  loading = false,
  planFeatures,
  handleClick
}) => (
  <div className="flex flex-col justify-between h-full bg-yellow-50 p-5 py-6 md:p-10 md:py-15 rounded-xl shadow-sm">
    <div>
      <div className="flex justify-between mb-2">
        {planType === 'individual' ? (
          <FaUser className="text-gray-900 text-3xl" />
        ) : (
          <FaUniversity className="text-gray-900 text-3xl" />
        )}
        {discountPercentage && (
          <div className="bg-[#C5D3E8] text-black font-bold text-lg py-2 px-5 rounded-md flex items-center">
            {discountPercentage}
          </div>
        )}
        

      
      </div>

      <h3 className="text-2xl md:text-3xl font-semibold mb-10 mt-10">
        {planType === 'individual' ? 'Individual' : 'Institutional'} {title}
      </h3>
      <div className="mb-10">
        {loading ? (
          <div className="h-12 w-40 bg-gray-200 rounded animate-pulse" />
        ) : (
          <>
            <div className="text-4xl md:text-5xl font-bold">
              {currency === 'INR' ? '₹' : '$'} {formatPrice(price)}
            </div>
            {basePrice ? (
              <div className="mt-2 flex flex-wrap items-baseline gap-2">
                <span className="text-xl text-gray-500 line-through">
                  {currency === 'INR' ? '₹' : '$'} {formatPrice(basePrice)}
                </span>
                {promoLabel && (
                  <span className="text-sm font-semibold text-green-700">
                    {promoLabel}
                  </span>
                )}
              </div>
            ) : null}
          </>
        )}
      </div>

      <ul className="space-y-4 mb-10">
        <li className="flex items-center gap-2">
          <div className="bg-black rounded-full w-5 h-5 flex items-center justify-center">
            <FaCheck className="text-white text-xs" />
          </div>
          <span>{duration} year Membership</span>
        </li>
        {/* <li className="flex items-center gap-2">
          <div className="bg-black rounded-full w-5 h-5 flex items-center justify-center">
            <FaCheck className="text-white text-xs" />
          </div>
          <span>{accessType}</span>
        </li> */}

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

    <button onClick={handleClick} disabled={loading} className="mt-auto bg-green-100 border border-green-300 hover:bg-green-200 transition-colors w-full py-3 rounded-full flex items-center justify-center relative disabled:opacity-60 disabled:cursor-not-allowed">
      <span className=" mr-2 font-semibold" >PAY NOW</span>
      <img src="/arrow_pay.svg" alt="arrow_white" className="absolute left-1" />
    </button>
  </div>   
);

export default PlanCard;

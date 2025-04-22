import React from 'react';
import { Link } from 'react-router-dom';

export default function AinetOccasionalPapers() {
  return (
    <div className="  p-4  mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold">AINET Occasional Papers</h2>
        <Link to="/publications/occasional-papers" className="text-[#A6AEBF] flex items-center">
          View All 
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      
     <div className="flex flex-wrap gap-6">
        <img src="./ainetPaper.png" alt="" className='h-[550px]' />
        <img src="./ainetPaper.png" alt="" className='h-[550px]' />
     </div>
    </div>
  );
}
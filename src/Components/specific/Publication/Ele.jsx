import React from 'react';
import { Link } from 'react-router-dom';
import ele1 from "/ele1.jpg"
import ele2 from "/ele2.png"
import ele3 from "/ele3.png"
import ele4 from "/ele4.png"

export default function ElePaper() {
  return (
    <div className="  p-4  mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold">ELE : English Language Education</h2>
        <Link to="/publications/occasional-papers" className="text-[#A6AEBF] flex items-center">
          View All 
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      
     <div className="flex flex-wrap gap-6">
        <img src={ele1} alt="" className='h-[550px]' />
        <img src={ele2} alt="" className='h-[550px]' />
        <img src={ele3} alt="" className='h-[550px]' />
        <img src={ele4} alt="" className='h-[550px]' />
     </div>
    </div>
  );
}
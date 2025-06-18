import React from 'react';
import { Link } from 'react-router-dom';
import muse1 from "/muse1.png"
import muse2 from "/muse2.jpg"
import muse3 from "/muse3.jpg"

export default function TeacherMuse() {
  return (
    <div className="  p-4  mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold">Teacher Muse</h2>
        <Link to="/publications/occasional-papers" className="text-[#A6AEBF] flex items-center">
          View All 
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      
     <div className="flex flex-wrap gap-6">
        <img src={muse1} alt="" className='h-[550px]' onClick={()=>window.location.href="https://store.pothi.com/book/amol-padwad-prithvirajsingh-thakur-teachers-muse/"}/>
        <img src={muse2} alt="" className='h-[550px]' onClick={()=>window.location.href="https://store.pothi.com/book/amol-padwad-prithvirajsingh-thakur-teachers-muse-volume-2/"}/>
        <img src={muse3} alt="" className='h-[550px]' onClick={()=>window.location.href="https://store.pothi.com/book/amol-padwad-teachers-muse-vol-3/"}/>
     </div>
    </div>
  );
}
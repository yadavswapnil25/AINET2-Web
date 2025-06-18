import React from 'react';
import ele1 from "/ele1.jpg"

import ele2 from "/ele2.png"
export default function AinetPublications() {
  return (
    <div className="  p-4  mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-2xl font-bold">Other Publications</h2>
        <a href="#" className="text-[#A6AEBF] flex items-center">
          View All 
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
      
     <div className="flex overflow-x-auto gap-6">
     <img src="./publicationAinet.png" alt="" className='h-[550px]' onClick={()=>window.location.href="https://store.pothi.com/book/dipika-gode-connecting-eight-effective-elt-classrooms-contexts-challenges-and-solutions/"}/>
     <img src={ele1} alt="" className='h-[550px]' onClick={()=>window.location.href="https://store.pothi.com/book/krishna-dixit-changing-learners-changing-teachers-ele-new-world/"}/>
     <img src={ele2} alt="" className='h-[550px]' onClick={()=>window.location.href="https://store.pothi.com/book/krishna-dixit-vivek-joshi-milind-mane-english-language-education-understanding-change/"}/>
     <img src="./otherpublicationssouth.png" alt="" className='h-[550px]' onClick={()=>window.location.href=" https://store.pothi.com/book/krishna-dixit-english-language-education-global-south-innovation-inclusion-empowerment/"}/>
     <img src="./otherpublicationsResearch.jpg" alt="" className='h-[550px]' onClick={()=>window.location.href="https://store.pothi.com/book/amol-padwad-research-english-language-education-indian-universities-directory/"}/>
       
        
     </div>
    </div>
  );
}
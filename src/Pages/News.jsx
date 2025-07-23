import React, { useState } from 'react'
import Highlight from '../Components/shared/Highlight';
import { BsYoutube } from 'react-icons/bs';
import { FaEye } from 'react-icons/fa';
import Breadcrumbs from '../Components/shared/Breadcrumbs';
import { useNavigate } from 'react-router-dom';

const News = () => {
      const [newsItems] = useState([
        {
          id: 1,
          image: "/news.png",
          location: "MUMBAI",
          title: "'TH AINET INTERNATIONAL CONFERENCE",
          headline: "Tech creating rift among teachers",
          content: "Nagpur: Division and discrimination have cropped up between teachers who are tech-savvy and those who aren't. This was endorsed in the open debate during the concluding day of the 3rd All India Network of English Teachers (AINET) International Conference on Saturday."
        },
        {
          id: 2,
          image: "/news.png",
          location: "MUMBAI",
          title: "'TH AINET INTERNATIONAL CONFERENCE",
          headline: "Tech creating rift among teachers",
          content: "Nagpur: Division and discrimination have cropped up between teachers who are tech-savvy and those who aren't. This was endorsed in the open debate during the concluding day of the 3rd All India Network of English Teachers (AINET) International Conference on Saturday."
        }
      ]);
      const navigate = useNavigate();
  return (
  <>
    <Highlight
        heading={"HIGHLIGHTS"}
        subheading={"9th AINET International Conference 2026 - To Be Announced SOON"}
      />
      <div className="max-w-full lg:max-w-[80%] mx-auto p-8 md:p-14 pt-[25px] h-auto">
      <Breadcrumbs
          links={[
            { label: "Home", to: "/" },
            { label: "About", to: null },
            { label: "News" },
          ]}
        />

            <h1 className="text-2xl font-semibold mt-10 mb-6 ">Latest News</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           
          {newsItems.map((item) => (
            <div key={item.id} className="border border-[#A6AEBF] rounded-[20px] overflow-hidden shadow-sm w-full">
              <div className="relative"
              
              >
                <img 
                  src={item.image} 
                  alt="Conference" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 bg-blue-700 text-white px-2 py-1 text-sm font-bold">
                  {item.location}
                </div>
                <div className="absolute bottom-2 right-2 flex space-x-2">
                  <div className="bg-black bg-opacity-70 text-white p-1 rounded-full">
                    <BsYoutube className="text-lg" />
                  </div>
                  <div className="bg-black bg-opacity-70 text-white p-1 rounded-full">
                    <FaEye className="text-lg" />
                  </div>
                </div>
              </div>
              <div className="p-4 ">
                <p className="text-sm text-gray-600 mb-2"  onClick={() => navigate(`/news/${item.title}`)}>{item.title}</p>
                <h3 className="text-[20px]  mb-2 text-center underline  border-t border-[#A6AEBF]">{item.headline}</h3>
                <p className=" text-base text-center font-medium">{item.content}</p>
              </div>
            </div>
          ))}
        </div>


        <h1 className="text-2xl font-semibold mt-10 mb-6 ">All News</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           
          {newsItems.map((item) => (
            <div key={item.id} className="border border-[#A6AEBF] rounded-[20px] overflow-hidden shadow-sm w-full" onClick={() => {
                navigate(`/news/${item.id}`);
              }}
              >
              <div className="relative">
                <img 
                  src={item.image} 
                  alt="Conference" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 bg-blue-700 text-white px-2 py-1 text-sm font-bold">
                  {item.location}
                </div>
                <div className="absolute bottom-2 right-2 flex space-x-2">
                  <div className="bg-black bg-opacity-70 text-white p-1 rounded-full">
                    <BsYoutube className="text-lg" />
                  </div>
                  <div className="bg-black bg-opacity-70 text-white p-1 rounded-full">
                    <FaEye className="text-lg" />
                  </div>
                </div>
              </div>
              <div className="p-4 ">
                <p className="text-sm text-gray-600 mb-2">{item.title}</p>
                <h3 className="text-[20px]  mb-2 text-center underline  border-t border-[#A6AEBF]">{item.headline}</h3>
                <p className=" text-base text-center font-medium">{item.content}</p>
              </div>
            </div>
          ))}
        </div>

        </div>
  </>
  )
}

export default News
import { useState } from 'react';
import { FaEye, FaChevronRight } from 'react-icons/fa';
import { BsYoutube } from 'react-icons/bs';
import ScrollToTop from '../../ScrollToTop';


export default function AinetNews() {
  const [newsItems] = useState([
    {
      id: 1,
      image: "/TOI.png",
      location: "MUMBAI",
      title: "'TH AINET INTERNATIONAL CONFERENCE",
      headline: "Tech creating rift among teachers",
      content: "Nagpur: Division and discrimination have cropped up between teachers who are tech-savvy and those who aren't. This was endorsed in the open debate during the concluding day of the 3rd All India Network of English Teachers (AINET) International Conference on Saturday."
    },
    // {
    //   id: 2,
    //   image: "/news.png",
    //   location: "MUMBAI",
    //   title: "'TH AINET INTERNATIONAL CONFERENCE",
    //   headline: "Tech creating rift among teachers",
    //   content: "Nagpur: Division and discrimination have cropped up between teachers who are tech-savvy and those who aren't. This was endorsed in the open debate during the concluding day of the 3rd All India Network of English Teachers (AINET) International Conference on Saturday."
    // }
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <ScrollToTop />
      <div className="flex flex-col md:flex-row justify-between  mb-6">
      <h1 className="text-2xl md:text-4xl font-semibold mb-[18px] text-left">AINET In News</h1>
        {/* <div className="flex items-center text-[#A6AEBF] cursor-pointer text-lg justify-end">
          <span className="mr-1" onClick={() => window.location.href = "/news"}>View All</span>
          <FaChevronRight className="text-sm" />
        </div> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {newsItems.map((item) => (
          <div key={item.id} className="border border-[#A6AEBF] rounded-[20px] overflow-hidden shadow-sm w-full" onClick={() => window.location.href = "/news/newsDetail"}>
            <div className="relative" >
              <img 
                src={item.image} 
                alt="Conference" 
                className="w-full h-60 object-cover"
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
  );
}
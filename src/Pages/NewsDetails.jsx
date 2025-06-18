import React, { useState } from "react";
import Highlight from "../Components/shared/Highlight";
import { BsYoutube } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import Breadcrumbs from "../Components/shared/Breadcrumbs";
import { useParams } from "react-router-dom";
const NewsDetails = () => {
  const { title } = useParams();

  const [newsItems] = useState([
    {
      id: 1,
      image: "/news.png",
      location: "MUMBAI",
      title: "'TH AINET INTERNATIONAL CONFERENCE",
      headline: "Tech creating rift among teachers",
      content:
        "Nagpur: Division and discrimination have cropped up between teachers who are tech-savvy and those who aren't. This was endorsed in the open debate during the concluding day of the 3rd All India Network of English Teachers (AINET) International Conference on Saturday.",
    },
    {
      id: 2,
      image: "/news.png",
      location: "MUMBAI",
      title: "'TH AINET INTERNATIONAL CONFERENCE",
      headline: "Tech creating rift among teachers",
      content:
        "Nagpur: Division and discrimination have cropped up between teachers who are tech-savvy and those who aren't. This was endorsed in the open debate during the concluding day of the 3rd All India Network of English Teachers (AINET) International Conference on Saturday.",
    },
  ]);
  return (
    <>
      <Highlight
        heading={"HIGHLIGHTS"}
        subheading={"Registration for 8th AINET International Conference 2025"}
      />
      <div className="max-w-full lg:max-w-[80%] mx-auto p-8 md:p-14 pt-[25px] h-auto">
        <Breadcrumbs
          links={[
            { label: "Home", to: "/" },
            { label: "About", to: null },
            { label: "News" },
          ]}
        />
        <div className=" hidden">News Detail Page for ID: {title}</div>

        <h2 className="text-2xl font-semibold mt-10 mb-6 ">Latest News</h2>
        <h1 className="text-2xl font-semibold mb-6 ">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s,
        </h1>

        <img src="/news.png" alt="news" className=" w-full h-full" />

        <div className="flex justify-between items-center my-6">
          <div className=" flex gap-4 justify-between items-center">
            <img src="/author.png" alt="author" />
            <div className=" text-left">
              <h5 className=" text-xl font-semibold">Jane Cooper</h5>
              <h6 className=" text-lg font-semibold">abc xyz</h6>
            </div>
          </div>

          <div className=" text-lg font-medium">17th Jan, 2025</div>
        </div>
        <div className=" w-full h-auto text-wrap space-y-6 text-left text-lg font-medium mt-6 mb-10">
          <p>
            Lorem Ipsumis simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.{" "}
          </p>
          <p>
            Lorem Ipsumis simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>

          <p>
            Lorem Ipsumis simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
          <p>
            Lorem Ipsumis simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
       

        <h1 className="text-2xl font-semibold mt-10 mb-6 ">Latest News</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full md:w-[80%]">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="border border-[#A6AEBF] rounded-[20px] overflow-hidden shadow-sm w-full"
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
                <h3 className="text-[20px]  mb-2 text-center underline  border-t border-[#A6AEBF]">
                  {item.headline}
                </h3>
                <p className=" text-base text-center font-medium">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewsDetails;

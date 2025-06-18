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
        Tech creating rift among teachers
        </h1>

        <img src="/TOI.png" alt="news" className=" w-full h-full" />

        <div className="flex justify-between items-center my-6">
          <div className=" flex gap-4 justify-between items-center">
            <img src="/author.png" alt="author" />
            <div className=" text-left">
              <h5 className=" text-xl font-semibold">Shakti Singh</h5>
              <h6 className=" text-lg font-semibold"></h6>
            </div>
          </div>

          <div className=" text-lg font-medium"> Jan 10, 2016, 14:42 IST</div>
        </div>
        <div className=" w-full h-auto text-wrap space-y-6 text-left text-lg font-medium mt-6 mb-10">
          <p>
          Nagpur: Division and discrimination have cropped up between teachers who are tech-savvy and those who aren't. This was endorsed in the open debate during the concluding day of the 3rd All India Network of English Teachers (AINET) International Conference on Saturday.

          </p>
          <p>
          Dr Amol Padwad, national convener of AINET, conducted the open debate titled "Whether technology is creating new division and discrimination among the teachers?".
          </p>

          <p>
          Teachers from six different countries including US, UK, Bangladesh and Nepal, participated. The participants were also asked to vote on the issue. Of the 180 voters, 132 agreed while 27 disagreed and remaining preferred to stay neutral.
          </p>
          <p>
          During the debate, Hom Raj Khadka from Nepal said a tech-savvy teacher is like a technocrat and has an advantage over others. Badrun Nayyar from Bangladesh said that technology can never replace a teacher.
          </p>
          <p>
          Dwayne, English language fellow from US embassy, advocated the use of technology saying that the coming generations are well ahead in technology and at times we have to catch up with our learners in terms of technology.
          </p>
          <p>
          Manisha Dak from British Council said that technology should be used where it is available, but a good teacher can achieve learning outcomes even without it.
          </p>
          <p>
          The government's role in promoting technology was also discussed. Mahesh Dudhankar from Osmanabad said the view that technology is being promoted by the administration is not proper as government and RMSA trainings to teachers in last couple of years focus more on low-resource classroom teaching.
          </p>
          <p>
          Panel discussion for learners on the concluding day was organized. Six students - Kartiki Sawane, Rajavi Ambulkar, Sagarika Jaywant, Sana Thombre, Kshitija Wade and Abhishek Barai - from the city participated. The session was moderated by Krishna Dixit, national coordinator of AINET.
          </p>

          <p>
          Dr Bradley Horn, regional English language officer for Afghanistan, Bhutan and India at the US Embassy, New Delhi, threw light on the roles and programmes undertaken by Regional English Language Office (RELO), New Delhi.
          </p>
          <p>
          Plenary was followed by Round Table paper reading session on different action and teacher research themes. Prof. R. Amritavalli, former Vice Chancellor of EFL University, Hyderabad, released a book- "A Basic Introduction to English Language Teaching" written by Ray McKay and published by The Oxford University Press.
          </p>
          <p>
          Best papers awards were given to principal Anshu Tiwari and Varsha Pargat from Gujrat, Manpreet Juneja from School of Scholars, Akola, Nilam Ajgaonkar, Badrun Nahar, Dhaka, Sudhir Hinge, Bhandara, Sonali Deshpande and Sucheta Shembekar from MEMS Nagpur. Surprise awards sponsored by RELO were also given to delegates and speakers.
          </p>
          <p>
          Dr Vivek Joshi, Dean, Gondwana University and Executive Member of AINET proposed a vote of thanks.
          </p>
        </div>
       

        {/* <h1 className="text-2xl font-semibold mt-10 mb-6 ">Latest News</h1>
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
        </div> */}
      </div>
    </>
  );
};

export default NewsDetails;

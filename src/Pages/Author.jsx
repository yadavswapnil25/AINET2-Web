import { FaAward, FaBook } from "react-icons/fa";
import Breadcrumbs from "../Components/shared/Breadcrumbs";
import Highlight from "../Components/shared/Highlight";
import BookSection from "../Components/specific/Publication/DecentringBook";
import { GoDotFill } from "react-icons/go";

export default function Author() {
  const awards = [
    {
      id: 1,
      title:
        'Goodreads Choice Award (2012)-"Throne of Glass" nominee for Best Debut Goodreads Author',
    },
    {
      id: 2,
      title: 'New York Times Best Seller - "Throne of Glass"',
    },
    {
      id: 3,
      title:
        'Goodreads Choice Award (2015)- "A Court of Thorns and Roses" nominee for Best Fantasy',
    },
    {
      id: 4,
      title: 'New York Times Best Seller - "A Court of Thorns and Roses”',
    },
  ];

  return (
    <>
      <Highlight />
      <div className="max-w-full lg:max-w-[80%] mx-auto p-8 md:p-14 pt-[25px] h-auto relative">
        {/* Breadcrumb */}
        <Breadcrumbs
          links={[
            { label: "Home", to: "/" },
            { label: "Publication", to: "/publication" },
            { label: "Author" },
          ]}
        />

        {/* Author Header */}
        <div className="w-full flex flex-col md:flex-row md:gap-[8rem] mb-8 mt-8 justify-between gap-4">
          <div className="md:w-1/2">
            <h1 className="text-2xl font-bold mb-4 md:text-4xl">
              Author: Amol Padwad
            </h1>
            <p className="mb-4 text-lg">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="/padwal.png"
              alt="Amol Padwad"
              className="w-full h-[326px] rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Books Section */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <FaBook className="mr-2" size={20} />
            Books by Amol Padwad
          </h2>

          {/* <div className="space-y-6">
            {books.map((book) => (
              <div
                key={book.id}
                className=" bg-gray-50 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row gap-12">
                  <div className="w-full md:w-1/4 p-4 flex justify-center">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-[350px] md:w-full max-w-xs rounded shadow-sm"
                    />
                  </div>
                  <div className="w-full md:w-3/4 p-4">
                    <h3 className=" font-semibold mb-2 text-3xl">{book.title}</h3>
                    <div className="mb-3 mt-6">
                      <p className="text-[20px] text-black font-semibold mb-6">Editors:</p>
                      <div className="flex flex-wrap gap-2">
                        {book.editors.map((editor, i) => (
                          <div key={i} className="flex items-center mr-8">
                            <div className="w-[35px] h-[35px] rounded-full bg-gray-300 flex items-center justify-center text-[20px] mr-4">
                              <img src="/author.png" alt="" />
                            </div>
                            <span className="text-lg font-normal">{editor}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-4">
                      {book.description}
                    </p>

                    <div className="flex flex-wrap justify-between gap-2 mb-4">
                      <div className="text-xs text-gray-500">
                        <span>Book Info:</span>
                        <div className="mt-1 flex flex-wrap gap-x-4">
                          <span>📅 {book.meta.published}</span>
                          <span>📄 {book.meta.pages} pages</span>
                          <span>📏 {book.meta.size}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="bg-blue-500 text-white px-4 py-1 rounded text-sm">
                        Buy Now
                      </button>
                      <button className="bg-gray-200 text-gray-700 px-4 py-1 rounded text-sm">
                        Preview
                      </button>
                      <button className="bg-green-500 text-white px-4 py-1 rounded text-sm">
                        Download Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div> */}
          <BookSection
            heading="Decentring ELT book"
            coverImage="/decentringBook.png"
            title="Decentring ELT: Practices and Possibilities"
            editors={[
              { name: "Amol Padwad", img: "/editors.png" },
              { name: "Richard Smith", img: "/editors.png" },
            ]}
            description={`The 'Decentring ELT' initiative launched in 2018 by the A.S. Hornby
                  Educational Trust ('Hornby Trust', for short) aims to support the
                  development and dissemination of English Language Teaching (ELT)
                  ideas and actions that are found to be appropriate in particular
                  contexts by the participants concerned, with an initial specific
                  focus on the needs of learners and teachers of English in public
                  education systems in relatively low-income countries.`}
            buyLinks={{
              amazon: "#",
              flipkart: "#",
              pothi: "#",
              download: "#",
            }}
            downloadText="Download Now"
            bookInfo={[
              { icon: "./translateicon.svg", text: "English" },
              { icon: "./calender.svg", text: "12 March 2023" },
              { icon: "./pagespin.svg", text: "92 pages" },
              { icon: "./dimentions.svg", text: "21.6 x 14 x 1 cm" },
            ]}
          />
          <BookSection
            heading="Decentring ELT book"
            coverImage="/decentringBook.png"
            title="Decentring ELT: Practices and Possibilities"
            editors={[
              { name: "Amol Padwad", img: "/editors.png" },
              { name: "Richard Smith", img: "/editors.png" },
            ]}
            description={`The 'Decentring ELT' initiative launched in 2018 by the A.S. Hornby
                  Educational Trust ('Hornby Trust', for short) aims to support the
                  development and dissemination of English Language Teaching (ELT)
                  ideas and actions that are found to be appropriate in particular
                  contexts by the participants concerned, with an initial specific
                  focus on the needs of learners and teachers of English in public
                  education systems in relatively low-income countries.`}
            buyLinks={{
              amazon: "#",
              flipkart: "#",
              pothi: "#",
              download: "#",
            }}
            downloadText="Download Now"
            bookInfo={[
              { icon: "./translateicon.svg", text: "English" },
              { icon: "./calender.svg", text: "12 March 2023" },
              { icon: "./pagespin.svg", text: "92 pages" },
              { icon: "./dimentions.svg", text: "21.6 x 14 x 1 cm" },
            ]}
          />
          <BookSection
            heading="Decentring ELT book"
            coverImage="/decentringBook.png"
            title="Decentring ELT: Practices and Possibilities"
            editors={[
              { name: "Amol Padwad", img: "/editors.png" },
              { name: "Richard Smith", img: "/editors.png" },
            ]}
            description={`The 'Decentring ELT' initiative launched in 2018 by the A.S. Hornby
                  Educational Trust ('Hornby Trust', for short) aims to support the
                  development and dissemination of English Language Teaching (ELT)
                  ideas and actions that are found to be appropriate in particular
                  contexts by the participants concerned, with an initial specific
                  focus on the needs of learners and teachers of English in public
                  education systems in relatively low-income countries.`}
            buyLinks={{
              amazon: "#",
              flipkart: "#",
              pothi: "#",
              download: "#",
            }}
            downloadText="Download Now"
            bookInfo={[
              { icon: "./translateicon.svg", text: "English" },
              { icon: "./calender.svg", text: "12 March 2023" },
              { icon: "./pagespin.svg", text: "92 pages" },
              { icon: "./dimentions.svg", text: "21.6 x 14 x 1 cm" },
            ]}
          />
        </div>

        {/* Awards Section */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center md:text-2xl mt-14">Awards</h2>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/4">
              <img
                src="/awards.png"
                alt="Awards"
                className="w-full rounded-lg h-[250px]"
              />
            </div>
            <div className="space-y-4 my-auto">
              {awards.map((award) => (
                <div
                  key={award.id}
                  className="text-base flex items-start gap-2 w-full max-w-[600px]"
                >
                  <GoDotFill className="mt-1 " />
                  <span className="font-lg font-normal ">{award.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

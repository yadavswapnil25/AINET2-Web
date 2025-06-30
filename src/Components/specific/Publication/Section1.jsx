import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../shared/Breadcrumbs";

const Section1 = () => {
  return (
    <>
      <div className="w-full h-auto md:h-auto" >
        <div className="w-full mx-auto mb-8">
          <Breadcrumbs
            links={[
              { label: "Home", to: "/" },
              { label: "Publication", to: null },
            ]}
          />
        </div>

        <div className="w-full mx-auto h-full " >
          <div className="w-full mt-8 h-auto flex md:justify-between md:items-start justify-center items-center gap-8 flex-col md:flex-row">
            {/* left */}
            <div className="md:w-1/2 w-full">
              <h3 className="text-5xl font-bold mb-8" >Publications</h3>
              <p className="text-[18px]">
              AINET brings out a wide range of publications including conference proceedings, teachers' creative work, resource materials and thematic anthologies. It also collaborates with several organisations to publish works with valuable research and innovation content. Enjoy the publications listed on this page and do share your feedback with us. Many of these publications are free to access.
              </p>
            </div>
            <div className="w-full md:w-1/2 mx-auto flex items-center justify-center">
              <img
                src="/publicationsimg.png"
                alt=""
                className="w-[90%] h-[327px]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section1;

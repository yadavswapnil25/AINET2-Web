import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../shared/Breadcrumbs";

const Section1 = () => {
  return (
    <>
      <div className="w-full h-auto md:h-auto">
        <div className="w-full mx-auto mb-8">
          <Breadcrumbs
            links={[
              { label: "Home", to: "/" },
              { label: "Publication", to: null },
            ]}
          />
        </div>

        <div className="w-full mx-auto h-full ">
          <div className="w-full mt-8 h-auto flex md:justify-between md:items-start justify-center items-center gap-8 flex-col md:flex-row">
            {/* left */}
            <div className="md:w-1/2 w-full">
              <h3 className="text-5xl font-bold mb-8">Publications</h3>
              <p className="text-[18px]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum
              </p>
            </div>
            <div className="w-full md:w-1/2 mx-auto flex items-center justify-center">
              <img
                src="/home_banner_1.png"
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

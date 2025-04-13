import React, { useState } from 'react'
import bg3 from "/bg3.png";

import { FaUser, FaUniversity } from "react-icons/fa";
import { TbCirclePercentageFilled } from "react-icons/tb";

function Login() {
    const [selectedType, setSelectedType] = useState("individual");

    const handleChange = (e) => {
        setSelectedType(e.target.value);
    };
    return (
        <>
            <div
                className="relative mt-12 p-14 w-full h-full md:h-screen rounded-[25px] overflow-hidden z-1 flex flex-col bg-no-repeat bg-cover"
                style={{ backgroundImage: `url(${bg3})` }}
            >
                <div className="p-6 min-h-screen">

                    {/* Radio Buttons */}
                    <div className=" min-h-screen">
                        {/* Main Flex Container */}
                        <div className="flex items-center justify-between mb-15 mr-20">
                            {/* Left Side Text */}
                            <div className="text-5xl font-semibold">Select Plan</div>

                            {/* Right Side Radio Buttons */}
                            <div className="flex items-center text-xl gap-10 ">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <FaUser />
                                    <span>Individual</span>
                                    <input
                                        type="radio"
                                        name="type"
                                        value="individual"
                                        checked={selectedType === "individual"}
                                        onChange={handleChange}
                                        className="accent-black ml-2 scale-125"
                                    />
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <FaUniversity />
                                    <span>Institutional</span>
                                    <input
                                        type="radio"
                                        name="type"
                                        value="institutional"
                                        checked={selectedType === "institutional"}
                                        onChange={handleChange}
                                        className="accent-black ml-2 scale-125"
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {selectedType === "individual" ? (
                                <>
                                    <div className="bg-white p-4 rounded-xl shadow">
                                        <div className="flex items-center justify-between rounded-xl  w-full max-w-md mx-auto">
                                            <div className="flex items-center gap-2 text-black text-2xl">
                                                <FaUser />
                                            </div>
                                            <div className="flex items-center gap-2 text-black text-xl font-semibold rounded-xl p-2 bg-[#C5D3E8]">
                                                <TbCirclePercentageFilled />
                                                <span>50% OFF</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl shadow"> <div className="flex items-center justify-between rounded-xl  w-full max-w-md mx-auto">
                                        <div className="flex items-center gap-2 text-black text-2xl">
                                            <FaUser />
                                        </div>
                                        <div className="flex items-center gap-2 text-black text-xl font-semibold rounded-xl p-2 bg-[#C5D3E8]">
                                            <TbCirclePercentageFilled />
                                            <span>50% OFF</span>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl shadow"> <div className="flex items-center justify-between rounded-xl  w-full max-w-md mx-auto">
                                        <div className="flex items-center gap-2 text-black text-2xl">
                                            <FaUser />
                                        </div>
                                        <div className="flex items-center gap-2 text-black text-xl font-semibold rounded-xl p-2 bg-[#C5D3E8]">
                                            <TbCirclePercentageFilled />
                                            <span>50% OFF</span>
                                        </div>
                                    </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="bg-white p-4 rounded-xl shadow"> <div className="flex items-center justify-between rounded-xl  w-full max-w-md mx-auto">
                                        <div className="flex items-center gap-2 text-black text-2xl">
                                            <FaUser />
                                        </div>
                                        <div className="flex items-center gap-2 text-black text-xl font-semibold rounded-xl p-2 bg-[#C5D3E8]">
                                            <TbCirclePercentageFilled />
                                            <span>50% OFF</span>
                                        </div>
                                    </div></div>
                                    <div className="bg-white p-4 rounded-xl shadow"> <div className="flex items-center justify-between rounded-xl  w-full max-w-md mx-auto">
                                        <div className="flex items-center gap-2 text-black text-2xl">
                                            <FaUser />
                                        </div>
                                        <div className="flex items-center gap-2 text-black text-xl font-semibold rounded-xl p-2 bg-[#C5D3E8]">
                                            <TbCirclePercentageFilled />
                                            <span>50% OFF</span>
                                        </div>
                                    </div></div>
                                    <div className="bg-white p-4 rounded-xl shadow"> <div className="flex items-center justify-between rounded-xl  w-full max-w-md mx-auto">
                                        <div className="flex items-center gap-2 text-black text-2xl">
                                            <FaUser />
                                        </div>
                                        <div className="flex items-center gap-2 text-black text-xl font-semibold rounded-xl p-2 bg-[#C5D3E8]">
                                            <TbCirclePercentageFilled />
                                            <span>50% OFF</span>
                                        </div>
                                    </div></div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Login
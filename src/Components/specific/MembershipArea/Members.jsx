import React from 'react'

const Members = () => {
    return (
        <>
            <>
                <Highlight heading={"HIGHLIGHTS"} subheading={"9th AINET International Conference 2026 - To Be Announced SOON"} />
                <div className="w-full mx-40 my-10">
                    <div className="flex items-center text-[20px] font-medium ">
                        <Link to="/" className="text-black hover:underline">Home</Link>
                        <span className="mx-2 text-gray-400">/</span>
                        <span className="text-gray-400">AINET Membership Area </span>
                    </div>
                </div>
                <div className='flex flex-col p-10 w-auto rounded-[25px] mx-40 mb-15 border-2 border-[#A6AEBF] h-auto '  >

                    <div className='w-full flex justify-center'> <img src="./footlogo.png" alt="AINET Logo" className='h-45 object-center' /></div>

                    <h1 className='text-5xl font-bold text-center'>Membership Information Document</h1>

                    <div className='w-full h-auto p-10 py-3 mt-15 text-white text-3xl font-bold bg-[#A6AEBF]'>
                        Membership privileges :
                    </div>

                    <p className='text-3xl font-bold mt-10 mb-5 ml-10'>As an AINET member, you will</p>

                    <ul className='list-disc ml-20 text-xl'>
                        <li > Become part of a large and vibrant ELE community in India and globally.
                            <li> Get regular information about AINET events, activities and offerings.</li>
                            <li> Get membership discounts and benefits at AINET events and other collaborative events.
                            </li>
                            <li> Receive AINET publications, newsletters and other products free or at discounted prices.
                            </li>
                            <li> Have access to the Member's Area with special services and resources available for members only.
                            </li>
                            <li> Be eligible to join IATEFL at heavily discounted rate under the Wider Membership Scheme.
                            </li>
                            <li> Be eligible to apply for various AINET scholarships, travel grants and other kinds of support.</li>
                        </li>
                    </ul>
                </div>
            </>
        </>
    )
}

export default Members
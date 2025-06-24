import React from 'react'


const Loader = () => {
    return (
        <>
            <div className='w-screen h-screen fixed top-0 left-0 bg-white flex justify-center items-center z-[9999]'>
                <div className="flex flex-row gap-2">
                    <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
                    <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
                    <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
                </div>
            </div>
        </>
    )
}

export default Loader
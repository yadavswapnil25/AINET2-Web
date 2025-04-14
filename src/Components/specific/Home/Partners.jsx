import React from 'react'

const images = [
    "/ATM.png",
    "/UAG.png",
    "/GSC.png",
    "/SJGS.png",
    "/POET.png",
    "/MNET.png",
    "/GOND.png",
]

const Partners = () => {
  return (
    <>
        <div className='w-full p-4 md:p-[34px] pt-[46px] h-auto '>
            <h3 className='font-bold text-[18px] uppercase underline underline-offset-2 tracking-wide'>Partners</h3>

            <div className='w-full h-full flex flex-wrap gap-4 justify-around mt-4'>
                {
                    images.map((image, index) => (
                        <img src={image} alt="index" key={index}  height={125} />
                    ))
                }
            </div>
        </div>
    </>
  )
}

export default Partners
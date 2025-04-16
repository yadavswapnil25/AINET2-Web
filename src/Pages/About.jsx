import React from 'react'
import Highlight from '../Components/shared/Highlight'
import AboutDetails from '../Components/specific/About/AboutDetails'


const About = () => {
  return (
    <>
    <Highlight  heading={"HIGHLIGHTS"} subheading={"Registration for 8th AINET International Conference 2025"}/>

    <div className='w-full h-auto p-4 md:p-[34px] pt-[46px]'>
    {/* Section 1 */}
    <AboutDetails/>
    </div>
    </>

  )
}

export default About
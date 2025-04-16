import React from 'react'
import Highlight from '../Components/shared/Highlight'
import AboutDetails from '../Components/specific/About/AboutDetails'
import AinetNews from '../Components/specific/About/AinetNews'
import AinetTeam from '../Components/specific/About/AinetTeam'


const About = () => {
  return (
    <>
    <Highlight  heading={"HIGHLIGHTS"} subheading={"Registration for 8th AINET International Conference 2025"}/>

    <div className='w-full h-auto p-4 md:p-[34px] pt-[46px]'>
    {/* Section 1 */}
    <AboutDetails/>
    </div>

    {/* Section 2 */}
    <AinetTeam/>
   

    {/* Section 3 */}
    <AinetNews/>
    </>

  )
}

export default About
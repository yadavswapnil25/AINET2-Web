import React from 'react'
import Highlight from '../Components/shared/Highlight'
import AboutDetails from '../Components/specific/About/AboutDetails'
import AinetNews from '../Components/specific/About/AinetNews'
import AinetTeam from '../Components/specific/About/AinetTeam'


const About = () => {
  return (
    <>
      <Highlight />

      <div className='w-full h-auto p-4 md:p-[34px] pt-0 md:pt-[46px]' id="about">
        {/* Section 1 */}
        <AboutDetails />
      </div>

      {/* Section 2 */}
      <AinetTeam />


      {/* Section 3 */}
      {/* <AinetNews /> */}
    </>

  )
}

export default About
import React from 'react'
import Highlight from '../Components/shared/Highlight'
import AinetOccasionalPapersList from '../Components/specific/Publication/AinetOccasionalPapersList'

const AinetOccasionalPaperDetailed = () => {
  return (
    <>
    <Highlight
      heading={"HIGHLIGHTS"}
      subheading={"Registration for 8th AINET International Conference 2025"}
    />
    <div className="max-w-full lg:max-w-[80%] mx-auto p-8 md:p-14 pt-[25px] h-auto">
      <AinetOccasionalPapersList/>
    </div>
  </>
  )
}

export default AinetOccasionalPaperDetailed
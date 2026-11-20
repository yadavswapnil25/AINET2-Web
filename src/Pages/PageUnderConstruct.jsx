import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { buttonPrimary } from '../Components/shared/sectionStyles'

// `headingAs` lets a page that already has its own h1 use an h2 here.
const PageUnderConstruct = ({ headingAs = 'h1' }) => {
  const Heading = headingAs
  return (
    <div className='mx-auto flex max-w-2xl flex-col items-center px-4 py-12 text-center sm:py-16'>
      <img src="/pageunderconst.png" alt="" className='w-full max-w-xs sm:max-w-sm' />
      <Heading className='mt-6 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl'>
        This Page is Under Construction
      </Heading>
      <p className='mt-4 text-lg leading-relaxed text-ink/70'>
        We're currently updating this section to serve you better. Please check back soon
      </p>
      <Link to="/" className={`${buttonPrimary} mt-8`}>
        <FaArrowLeft className='text-sm' aria-hidden="true" />
        Back to home
      </Link>
    </div>
  )
}

export default PageUnderConstruct

import Highlight from '../Components/shared/Highlight'
import PageHeader from '../Components/shared/PageHeader'
import AboutDetails from '../Components/specific/About/AboutDetails'
import AinetTeam from '../Components/specific/About/AinetTeam'

const About = () => {
  return (
    <>
      <Highlight />

      <main id="about">
        <PageHeader
          breadcrumbs={[
            { label: "Home", to: "/" },
            { label: "About", to: null },
          ]}
          eyebrow="About us"
          title="About AINET"
        />

        <AboutDetails />

        <AinetTeam />
      </main>
    </>
  )
}

export default About

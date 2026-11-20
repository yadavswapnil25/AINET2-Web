import Highlight from '../Components/shared/Highlight'
import PageHeader from '../Components/shared/PageHeader'
import { containerClass } from '../Components/shared/sectionStyles'
import AinetOccasionalPapersList from '../Components/specific/Publication/AinetOccasionalPapersList'

const AinetOccasionalPaperDetailed = () => {
  return (
    <>
      <Highlight />

      <main>
        <PageHeader
          breadcrumbs={[
            { label: "Home", to: "/" },
            { label: "Publications", to: "/publications" },
            { label: "Occasional Papers", to: null },
          ]}
          eyebrow="Publications"
          title="AINET Occasional Papers"
        />

        <section className="py-12 pb-20 sm:py-16 sm:pb-24">
          <div className={containerClass}>
            <AinetOccasionalPapersList />
          </div>
        </section>
      </main>
    </>
  )
}

export default AinetOccasionalPaperDetailed

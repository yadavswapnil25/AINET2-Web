import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Highlight from '../Components/shared/Highlight';
import PageHeader from '../Components/shared/PageHeader';
import { containerClass } from '../Components/shared/sectionStyles';

const newsItems = [
  {
    id: 1,
    image: "/news.png",
    location: "MUMBAI",
    title: "'TH AINET INTERNATIONAL CONFERENCE",
    headline: "Tech creating rift among teachers",
    content: "Nagpur: Division and discrimination have cropped up between teachers who are tech-savvy and those who aren't. This was endorsed in the open debate during the concluding day of the 3rd All India Network of English Teachers (AINET) International Conference on Saturday."
  },
  {
    id: 2,
    image: "/news.png",
    location: "MUMBAI",
    title: "'TH AINET INTERNATIONAL CONFERENCE",
    headline: "Tech creating rift among teachers",
    content: "Nagpur: Division and discrimination have cropped up between teachers who are tech-savvy and those who aren't. This was endorsed in the open debate during the concluding day of the 3rd All India Network of English Teachers (AINET) International Conference on Saturday."
  }
];

// The full article lives at /news/newsDetail.
const NewsCard = ({ item }) => (
  <Link
    to="/news/newsDetail"
    className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink/10 transition hover:-translate-y-1 hover:shadow-xl"
  >
    <div className="relative overflow-hidden">
      <img src={item.image} alt="" className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1 text-xs font-bold tracking-wider text-white">
        {item.location}
      </span>
    </div>
    <div className="flex flex-1 flex-col p-6">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-sage-deep">{item.title}</p>
      <h3 className="mt-2 text-xl font-bold leading-snug text-ink">{item.headline}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{item.content}</p>
      <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-sage-deep transition-all group-hover:gap-3">
        Read more
        <FaArrowRight className="text-xs" aria-hidden="true" />
      </span>
    </div>
  </Link>
);

const News = () => {
  return (
    <>
      <Highlight />

      <main>
        <PageHeader
          breadcrumbs={[
            { label: "Home", to: "/" },
            { label: "About", to: null },
            { label: "News", to: null },
          ]}
          eyebrow="News"
          title="Latest News"
        />

        <section className="py-12 sm:py-16">
          <div className={`${containerClass} grid gap-6 md:grid-cols-2`}>
            {newsItems.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section className="pb-20 sm:pb-24">
          <div className={containerClass}>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">All News</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {newsItems.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default News

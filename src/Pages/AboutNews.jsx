import { Calendar } from 'lucide-react';
import Highlight from '../Components/shared/Highlight';
import PageHeader from '../Components/shared/PageHeader';
import { containerClass, readingContainerClass } from '../Components/shared/sectionStyles';

// All dynamic content centralized here
const newsData = {
  header: {
    title: 'Latest News',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
  },
  featured: {
    id: 'dQw4w9WgXcQ',
    title: '4TH AINET INTERNATIONAL CONFERENCE',
    author: {
      name: 'Jane Cooper',
      org: 'abc xyz',
    },
    date: '17th Jan, 2025',
    content: [
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    ],
  },
  additionalNews: [
    {
      id: 'dQw4w9WgXcQ',
      title: '"Tech creating rift among teachers"',
      description:
        'Nagpur: Division and discrimination have cropped up between teachers who are tech-savvy and those who arent. This was endorsed in the open debate during the concluding day of the 3rd All India Network of English Teachers (AINET) International Conference on Saturday.',
    },
    {
      id: 'dQw4w9WgXcQ',
      title: '"Tech creating rift among teachers"',
      description:
        'Nagpur: Division and discrimination have cropped up between teachers who are tech-savvy and those who arent. This was endorsed in the open debate during the concluding day of the 3rd All India Network of English Teachers (AINET) International Conference on Saturday.',
    },
  ],
};

const VideoFrame = ({ id, title, className = "" }) => (
  <div className={`aspect-video overflow-hidden bg-ink ${className}`}>
    <iframe
      src={`https://www.youtube.com/embed/${id}`}
      title={title}
      className="h-full w-full"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
);

export default function AboutNews() {
  const { featured } = newsData;

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
          title={newsData.header.title}
          intro={newsData.header.description}
        />

        {/* Featured story */}
        <section className="py-12 sm:py-16">
          <div className={containerClass}>
            <VideoFrame id={featured.id} title={featured.title} className="rounded-[2rem] shadow-xl shadow-ink/10" />
          </div>
          <article className={`${readingContainerClass} mt-10`}>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{featured.title}</h2>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-6">
              <div className="flex items-center gap-3">
                <img src="/author.png" alt="" className="size-11 rounded-full bg-sky-soft" />
                <div>
                  <p className="font-semibold text-ink">{featured.author.name}</p>
                  <p className="text-sm text-ink/60">{featured.author.org}</p>
                </div>
              </div>
              <p className="inline-flex items-center gap-2 text-sm font-medium text-ink/60">
                <Calendar className="size-4" aria-hidden="true" />
                {featured.date}
              </p>
            </div>
            <div className="ainet-prose mt-8">
              {featured.content.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </article>
        </section>

        {/* More stories */}
        <section className="pb-20 sm:pb-24">
          <div className={containerClass}>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Latest News</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {newsData.additionalNews.map((news, index) => (
                <article key={index} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink/10">
                  <VideoFrame id={news.id} title={news.title} />
                  <div className="p-6">
                    <h3 className="text-xl font-bold leading-snug text-ink">{news.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{news.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

import { FaRegCalendarAlt } from "react-icons/fa";
import Highlight from "../Components/shared/Highlight";
import PageHeader from "../Components/shared/PageHeader";
import { readingContainerClass } from "../Components/shared/sectionStyles";

const NewsDetails = () => {
  return (
    <>
      <Highlight />

      <main>
        <PageHeader
          breadcrumbs={[
            { label: "Home", to: "/" },
            { label: "News", to: "/news" },
            { label: "Tech creating rift among teachers", to: null },
          ]}
          eyebrow="Latest News"
          title="Tech creating rift among teachers"
        />

        <article className={`${readingContainerClass} py-12 pb-20 sm:py-16 sm:pb-24`}>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 pb-6">
            <div className="flex items-center gap-3">
              <img src="/author.png" alt="" className="size-11 rounded-full bg-sky-soft" />
              <p className="font-semibold text-ink">Shakti Singh</p>
            </div>
            <p className="inline-flex items-center gap-2 text-sm font-medium text-ink/60">
              <FaRegCalendarAlt aria-hidden="true" />
              Jan 10, 2016, 14:42 IST
            </p>
          </div>

          <img src="/TOI.png" alt="news" className="mt-8 w-full rounded-3xl shadow-lg shadow-ink/10 ring-1 ring-ink/5" />

          <div className="ainet-prose mt-10">
            <p>
              Nagpur: Division and discrimination have cropped up between teachers who are tech-savvy and those who aren't. This was endorsed in the open debate during the concluding day of the 3rd All India Network of English Teachers (AINET) International Conference on Saturday.
            </p>
            <p>
              Dr Amol Padwad, national convener of AINET, conducted the open debate titled "Whether technology is creating new division and discrimination among the teachers?".
            </p>
            <p>
              Teachers from six different countries including US, UK, Bangladesh and Nepal, participated. The participants were also asked to vote on the issue. Of the 180 voters, 132 agreed while 27 disagreed and remaining preferred to stay neutral.
            </p>
            <p>
              During the debate, Hom Raj Khadka from Nepal said a tech-savvy teacher is like a technocrat and has an advantage over others. Badrun Nayyar from Bangladesh said that technology can never replace a teacher.
            </p>
            <p>
              Dwayne, English language fellow from US embassy, advocated the use of technology saying that the coming generations are well ahead in technology and at times we have to catch up with our learners in terms of technology.
            </p>
            <p>
              Manisha Dak from British Council said that technology should be used where it is available, but a good teacher can achieve learning outcomes even without it.
            </p>
            <p>
              The government's role in promoting technology was also discussed. Mahesh Dudhankar from Osmanabad said the view that technology is being promoted by the administration is not proper as government and RMSA trainings to teachers in last couple of years focus more on low-resource classroom teaching.
            </p>
            <p>
              Panel discussion for learners on the concluding day was organized. Six students - Kartiki Sawane, Rajavi Ambulkar, Sagarika Jaywant, Sana Thombre, Kshitija Wade and Abhishek Barai - from the city participated. The session was moderated by Krishna Dixit, national coordinator of AINET.
            </p>
            <p>
              Dr Bradley Horn, regional English language officer for Afghanistan, Bhutan and India at the US Embassy, New Delhi, threw light on the roles and programmes undertaken by Regional English Language Office (RELO), New Delhi.
            </p>
            <p>
              Plenary was followed by Round Table paper reading session on different action and teacher research themes. Prof. R. Amritavalli, former Vice Chancellor of EFL University, Hyderabad, released a book- "A Basic Introduction to English Language Teaching" written by Ray McKay and published by The Oxford University Press.
            </p>
            <p>
              Best papers awards were given to principal Anshu Tiwari and Varsha Pargat from Gujrat, Manpreet Juneja from School of Scholars, Akola, Nilam Ajgaonkar, Badrun Nahar, Dhaka, Sudhir Hinge, Bhandara, Sonali Deshpande and Sucheta Shembekar from MEMS Nagpur. Surprise awards sponsored by RELO were also given to delegates and speakers.
            </p>
            <p>
              Dr Vivek Joshi, Dean, Gondwana University and Executive Member of AINET proposed a vote of thanks.
            </p>
          </div>
        </article>
      </main>
    </>
  );
};

export default NewsDetails;

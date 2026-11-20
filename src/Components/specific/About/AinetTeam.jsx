import {
  FaAward,
  FaBook,
  FaChalkboardTeacher,
  FaHandshake,
  FaLaptop,
  FaLightbulb,
  FaProjectDiagram,
  FaTrophy,
  FaUsers,
  FaVideo,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { containerClass } from '../../shared/sectionStyles';

const activities = [
  { Icon: FaUsers, text: 'Organizes annual online and biannual in-person conferences' },
  { Icon: FaBook, text: 'Publishes conference proceedings, monographs, project reports, magazines, and occasional papers' },
  { Icon: FaChalkboardTeacher, text: 'Conducts need-based workshops' },
  { Icon: FaVideo, text: 'Hosts webinars on contemporary and relevant themes' },
  { Icon: FaTrophy, text: 'Organizes competitions for teachers and students' },
  { Icon: FaAward, text: 'Awards grants and scholarships to English language teachers' },
  { Icon: FaHandshake, text: 'Collaborates with other teacher associations and academic institutions' },
  { Icon: FaLightbulb, text: 'Offers consultancy and extension services focused on teacher development' },
  { Icon: FaLaptop, text: 'Runs online short-term courses' },
];

const projects = [
  { label: 'AINET Teacher Research Initiatives', to: '/teacherResearch' },
  { label: 'Rural ELT', to: '/AboutRuralELT' },
  { label: 'Women in TA Leadership', to: '/AboutWomenInAINET' },
  { label: 'AINET Connect', to: '/AINETConnect' },
];

const AinetTeam = () => {
  return (
    <>
      {/* Key activities */}
      <section className="pb-12 sm:pb-16">
        <div className={containerClass}>
          <div className="rounded-[2rem] bg-sage-soft px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
            <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Key Activities of AINET</h2>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {activities.map((activity) => {
                const { Icon } = activity;
                return (
                  <li key={activity.text} className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink/5">
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-sage text-lg text-sage-deep">
                      <Icon aria-hidden="true" />
                    </span>
                    <span className="pt-1 text-[15px] font-medium leading-relaxed text-ink/85">{activity.text}</span>
                  </li>
                );
              })}

              <li className="flex gap-4 rounded-2xl bg-ink p-5 text-white shadow-sm sm:col-span-2 lg:col-span-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/10 text-lg text-sage">
                  <FaProjectDiagram aria-hidden="true" />
                </span>
                <div className="pt-1">
                  <p className="text-[15px] font-medium">Undertakes various projects such as:</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {projects.map((project) => (
                      <Link
                        key={project.to}
                        to={project.to}
                        className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 transition-colors hover:bg-sage hover:text-ink"
                      >
                        {project.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <p className="mx-auto mt-12 max-w-4xl text-center text-xl font-semibold leading-relaxed text-ink sm:text-2xl">
            AINET remains a vibrant platform for English language teaching professionals
            to connect, grow, and lead innovation in ELT across India. We’re thrilled
            to have you as part of our community. Let’s work together to elevate English
            language education across India!
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="pb-20 sm:pb-24">
        <div className={containerClass}>
          <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">The AINET Team</h2>
          <img
            src="/ainetTeam.jpeg"
            alt="AINET Team"
            className="mt-8 w-full rounded-3xl shadow-xl shadow-ink/10 ring-1 ring-ink/5"
          />
        </div>
      </section>
    </>
  );
};

export default AinetTeam;

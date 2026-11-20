import { containerClass } from "../../shared/sectionStyles";

export default function AboutDetails() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className={`${containerClass} grid items-center gap-10 lg:grid-cols-2 lg:gap-14`}>
        <p className="ainet-prose text-lg">
          AINET Association of English Teachers (in short, AINET), an
          affiliate of IATEFL - UK, is a registered English language teacher
          association in India. It is an affiliate of IATEFL, UK. The
          primary focus of the association is to create opportunities of
          professional learning for teachers and thereby strive towards
          quality English language education for students. It is a community
          of people interested in teaching and learning of English in India
          - teachers (working in public and private sectors), teacher
          trainers, teacher educators, publishers, policy makers,
          educational administrators, researchers, students, and
          freelancers. AINET welcomes anyone working to promote the growth
          of teachers and learning of English.
        </p>

        <img
          src="/aboutmainimg.png"
          alt="AINET conference with audience"
          className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl shadow-ink/10 ring-1 ring-ink/5"
        />
      </div>
    </section>
  );
}

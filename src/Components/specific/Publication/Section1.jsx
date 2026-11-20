import PageHeader from "../../shared/PageHeader";

const Section1 = () => {
  return (
    <PageHeader
      breadcrumbs={[
        { label: "Home", to: "/" },
        { label: "Publication", to: null },
      ]}
      eyebrow="Publications"
      title="Publications"
      intro="AINET brings out a wide range of publications including conference proceedings, teachers' creative work, resource materials and thematic anthologies. It also collaborates with several organisations to publish works with valuable research and innovation content. Enjoy the publications listed on this page and do share your feedback with us. Many of these publications are free to access."
      aside={
        <img
          src="/publicationsimg.png"
          alt=""
          className="hidden w-80 rounded-3xl object-cover shadow-xl shadow-ink/10 lg:block"
        />
      }
    />
  );
};

export default Section1;

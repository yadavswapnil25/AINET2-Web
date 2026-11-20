import InitiativePage from '../Components/shared/InitiativePage';

const affiliateData = {
    title: 'PRELIMS',
    description: `AINET organised the PRELIMS project from January to March 2021 with the support of British Council, and in collaboration with IATEFL and Norwich Institute of Language Education (NILE). The course was offered by International House (IH), London, under the supervision of NILE.

Out of 300 applicants, 73 teachers with proficiency training needs were shortlisted for the course. The training was run online by IH in two sessions of 90 minutes every week for ten weeks.`,
    courseOverview: `The course was innovative and interesting for the mode of teaching through activities, the novelty of material, interactive nature of sessions, collaborative working principles, and innovative use of technology. The course led to significant improvement in the vocabulary and grammar of the participating teachers. Though Internet connectivity was a major challenge for many, the teachers completed the course and actually wanted a longer duration of training. In view of their enthusiasm, the teachers were given a small financial assistance towards internet charges by British Council.`,
    conclusion: `Overall, the project was a great initiative considering AINET's motto to collaborate with agencies and create professional learning opportunities. The project focused on helping teachers in improving their language proficiency, which attracted great interest among participants. The project was led by Dr. Krishna K. Dixit and Swapna Yadav.`,
};

export default function Page() {
    const data = affiliateData;
    return (
        <InitiativePage
            breadcrumbs={[
                { label: "Home", to: "/" },
                { label: "AINET Projects", to: null },
                { label: "PRELIMS", to: null },
            ]}
            title={data.title}
            image={{ src: "/prelimesimg.png", alt: "PRELIMS Event" }}
            description={data.description}
            sections={[{ text: data.courseOverview }, { text: data.conclusion }]}
        />
    );
}

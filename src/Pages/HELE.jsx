import InitiativePage from '../Components/shared/InitiativePage';

const affiliateData = {
    title: 'History of English Language Education (HELE)',
    description: `India has a very long and rich history of teaching and learning English, which has unfortunately been not much studied. AINET believes that a better historical understanding of English language education is extremely crucial and valuable for everyone interested and engaged in the teaching and/or learning of English, especially the teachers of English. AINET has been supporting various activities to promote HELE in India.`,
    benefitsTitle: 'Activities :',
    benefits: [
        'HELE-India group’s research project on “Textbooks in Colonial Times: Reviewing the Status of Historical Explorations” supported by the Hornby Trust (2021 – ongoing).',
        'First HELE India Conference on ‘Archiving Texts, Textualising History: Textbooks and Pedagogy of English’ at Delhi on 5-6 December 2022 in collaboration with HELE-India Group.',
        'Webinar by Prof. Richard Smith, University of Warwick, UK, on ‘Insights for English Language Education from Historical Research’ on 22 July 2022.',
        'Second HELE India Conference on ‘History of English Language Education in India: Theory and Practices’ at Hyderabad on 11-12 December 2023 in collaboration with HELE-India Group and CELS, University of Hyderabad.',
        'Support to the publication of an Annotated Bibliography of the History of English Language Education in India (ongoing).',
        'Support to the development of a digital archive of HELE resources from and on India (ongoing).',
        'Collaboration with teacher associations from the neighbouring countries for joint activities on HELE',
    ],
    contactEmail: 'theainet@gmail.com',
};

export default function Page() {
    const data = affiliateData;
    return (
        <InitiativePage
            breadcrumbs={[
                { label: "Home", to: "/" },
                { label: "AINET Projects", to: null },
                { label: "HELE", to: null },
            ]}
            title={data.title}
            image={{ src: "/archives8.png", alt: "HELE Event" }}
            description={data.description}
            listTitle={data.benefitsTitle}
            listItems={data.benefits}
            contact={{
                emails: [data.contactEmail],
                message: (
                    <>
                        If you are interested in joining our HELE activities or projects, or want to know more, please write to us at{' '}
                        <a href={`mailto:${data.contactEmail}`}>{data.contactEmail}</a>.{' '}
                        <span className="text-white/60">[Mention ‘HELE India’ in the subject.]</span>
                    </>
                ),
            }}
        />
    );
}

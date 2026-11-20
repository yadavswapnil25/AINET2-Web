import InitiativePage from '../Components/shared/InitiativePage';

const affiliateData = {
    title: 'Decentring ELT',
    description: `AINET is a collaborator in the ‘Decentring ELT’ initiative launched in 2018 by the A.S. Hornby Educational Trust. This initiative aims to support the development and dissemination of ELT ideas and actions that are found to be appropriate in particular contexts by the participants concerned, with an initial specific focus on the needs of learners and teachers of English in public education systems in relatively low-income countries. Activities under this initiative aim to help teachers, on the one hand, to examine and understand if they are subject to any ‘centring’ influences or practices which may adversely affect their own expertise, knowledge, autonomy and agency. On the other hand, they also aim to help teachers investigate and build on their own and others’ ways of countering these centring influences and practices.

Decentring ELT is a global initiative with the involvement of teachers and teacher association from all over the world.`,
    benefitsTitle: 'Activities :',
    benefits: [
        'First Decentring ELT Conference, 3-4 December 2021',
        'First Roundtable – Decentring ELT India, Nagpur, 7 November 2022',
        'Second Roundtable – Decentring ELT India, Bhandara, 10 November 2022',
        'Second Decentring ELT Conference, 10-11 March 2023',
        'Global Decentring Week Webinar, 8 April 2024 (jointly with NELTA, SPELT, BELTA and TESOL-BD)',
        'Publication: ‘Decentring ELT: Practices and Possibilities’ (edited by Amol Padwad and Richard Smith) 2023 [Download free from here.]',
    ],
    howToSteps: `AINET will undertake an India-specific project to explore notions and practices around decentring ELT during 2025-26. More details will be announced soon.`,
    contactText: 'For more information, write to ',
    contactEmail: 'theainet@gmail.com',
};

export default function Page() {
    const data = affiliateData;
    return (
        <InitiativePage
            breadcrumbs={[
                { label: "Home", to: "/" },
                { label: "AINET Initiatives", to: null },
                { label: "Decentring ELT", to: null },
            ]}
            eyebrow="AINET Initiatives"
            title={data.title}
            image={{ src: "/decentringImg.png", alt: "Decentring ELT Event" }}
            description={data.description}
            listTitle={data.benefitsTitle}
            listItems={data.benefits}
            sections={[{ text: data.howToSteps }]}
            contact={{
                emails: [data.contactEmail],
                message: (
                    <>
                        {data.contactText}<a href={`mailto:${data.contactEmail}`}>{data.contactEmail}</a>.
                    </>
                ),
            }}
        />
    );
}

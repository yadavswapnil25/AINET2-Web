import InitiativePage from '../Components/shared/InitiativePage';

const affiliateData = {
    title: 'About AINET Affiliates',
    subtitle: 'Developing Together – Affiliates’ Network for Community Empowerment',
    description: `Right from the beginning, it has been a conscious policy decision of AINET not to have any chapters spread over India, a common practice among national TAs. Instead, AINET firmly believes that supporting and promoting localised associations, groups or communities is a powerful and appropriate way of furthering them and also English teachers’ professional development. For this purpose, AINET develops a symbiotic relationship with such associations/ groups/ communities through an Affiliates’ Network.

Any English teachers’ association/ group/ community, whether formal or informal, located anywhere in India, can join hands with AINET as its affiliate. As an AINET Affiliate you will be part of the national and global ELE community without losing your identity or independence.`,
    benefitsTitle: 'Benefits for the Affiliate:',
    benefits: [
        'Opportunity to send representatives at all AINET events and activities',
        'Many privileges available to AINET members to be extended to your members',
        'Support from AINET in planning and delivering your activities or initiatives',
        'Joint initiatives and collaborative activities with AINET',
        'Mentoring from AINET to strengthen your association/ group/ community',
        'Opportunity to become part of the national and global ELE community',
        'Regular interaction and exchange of ideas and resources with AINET and with other associations or groups'
    ],
    howToTitle: 'How to be an affiliate?',
    howToSteps: `It’s simple! Ask your association, group or community to complete and submit an expression of interest form and we will get in touch with you to take the matter further.`,
    contactText: 'For more details or queries, please write to us at',
    contactEmail: 'theainet@gmail.com'
};

export default function Page() {
    const data = affiliateData;
    return (
        <InitiativePage
            breadcrumbs={[
                { label: "Home", to: "/" },
                { label: "AINET Projects", to: null },
                { label: "AINET Affiliates", to: null },
            ]}
            title={data.title}
            subtitle={data.subtitle}
            logo={{ src: "/AAAffliates.png", alt: "AINET Affiliates logo" }}
            image={{ src: "/affilatesmain.png", alt: "AINET Event" }}
            description={data.description}
            listTitle={data.benefitsTitle}
            listItems={data.benefits}
            sections={[{ title: data.howToTitle, text: data.howToSteps }]}
            contact={{
                emails: [data.contactEmail],
                message: (
                    <>
                        {data.contactText} <a href={`mailto:${data.contactEmail}`}>{data.contactEmail}</a>.
                    </>
                ),
            }}
        />
    );
}

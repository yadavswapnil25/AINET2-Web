import InitiativePage from '../Components/shared/InitiativePage';

const affiliateData = {
    title: 'About Women In AINET',
    description: `Through this initiative AINET tries to address issues related to the representation of women in leadership and decision-making roles in English teacher associations and communities. Women are present in huge numbers as teachers, trainers, researchers, educators, etc in the ELE domain. However, they have not been as visible as male colleagues in leadership roles, in positions of responsibility and in decision-making processes.

This initiative began as a Hornby Trust-sponsored project, focussed on identifying key reasons and barriers behind the low representation of women, and on planning and undertaking action to address the issue.`,
    benefitsTitle: 'Result of this initiative',
    benefits: [
        'AINET Executive Committee now has a mandated share of women members',
        'AINET conferences and events always include women speakers',
        'Women members play an increasing role in planning and managing various AINET activities',
        'Our pro-active women members contribute ideas to make AINET activities and policies more women-friendly'
    ],
    howToSteps: `AINET also collaborates with several other associations and teacher groups to organise women empowerment activities, share ideas and experiences on promoting women in leadership and develop resources and expertise in this regard.`,
    contactText: 'If you or your organisation is interested in joining hands with AINET for promoting women in leadership, please write to us at',
    contactEmail: 'theainet@gmail.com'
};

export default function Page() {
    const data = affiliateData;
    return (
        <InitiativePage
            breadcrumbs={[
                { label: "Home", to: "/" },
                { label: "AINET Projects", to: null },
                { label: "Women In AINET", to: null },
            ]}
            title={data.title}
            logo={{ src: "/AWomen.png", alt: "Women in AINET logo" }}
            image={{ src: "/womanmainimg.png", alt: "Women in AINET Event" }}
            description={data.description}
            listTitle={data.benefitsTitle}
            listItems={data.benefits}
            sections={[{ text: data.howToSteps }]}
            contact={{
                emails: [data.contactEmail],
                message: (
                    <>
                        {data.contactText} <a href={`mailto:${data.contactEmail}`}>{data.contactEmail}</a>.{' '}
                        <span className="text-white/60">[Mention ‘Women-in-AINET’ in the subject.]</span>
                    </>
                ),
            }}
        />
    );
}

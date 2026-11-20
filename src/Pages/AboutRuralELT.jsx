import InitiativePage from '../Components/shared/InitiativePage';

const affiliateData = {
    title: 'About Rural ELT',
    description: `‘Rural ELT’ is a unique and innovative initiative of AINET focussed on the teaching and learning of English in rural contexts of India (and elsewhere). The principle objective of this initiative is to enhance our understanding of what constitutes ‘rurality’ in ELT and accordingly develop relevant ways and resources for working effectively as teachers in rural settings.
The initiative emerged out of a small project undertaken by Prof. Amol Padwad and Dr. Krishna Dixit with some support from the A. S. Hornby Educational Trust Alumni Grants. The project (2020–22) prepared the groundwork for the Rural ELT initiative.

The first phase of this initiative took place from July 2022 to July 2024. In this phase a voluntary group of teachers from across India explored the general and specific features of their own rural contexts. They also tried to identify and address some particular issues related to rurality in their context. Preliminary insights and ideas from the phase were reported at the 8th AINET Conference in Guwahati (February 2024).`,
    benefitsTitle: 'Activities :',
    benefits: [
        'Rural ELT surveys (2020–22)',
        'First workshop on rural ELT (Nagpur, November 2022)',
        'Second workshop on rural ELT (online, October 2023)',
        'Presentation of select studies and the preliminary report (Guwahati, February 2024)',
        'First National Conference on Rural ELT (forthcoming, October 2025)'
    ],
    howToSteps: `The exploration and experimentation continues under the aegis of AINET. This initiative is open to any teacher working in a rural setting, who wants to investigate and understand the ‘rural’ in their work and context. This is an ongoing initiative and teachers are welcome to join at any point of time.`,
    contactText: 'For joining or more information, write to',
    contactEmail: 'rural.elt@gmail.com' // Alternative contact also mentioned
};

export default function Page() {
    const data = affiliateData;
    return (
        <InitiativePage
            breadcrumbs={[
                { label: "Home", to: "/" },
                { label: "AINET Projects", to: null },
                { label: "Rural ELT", to: null },
            ]}
            title={data.title}
            image={{ src: "/ainetrural.png", alt: "Rural ELT Event" }}
            description={data.description}
            listTitle={data.benefitsTitle}
            listItems={data.benefits}
            sections={[{ text: data.howToSteps }]}
            contact={{
                emails: [data.contactEmail, "theainet@gmail.com"],
                message: (
                    <>
                        {data.contactText} <a href={`mailto:${data.contactEmail}`}>{data.contactEmail}</a>. Or contact{' '}
                        <a href="mailto:theainet@gmail.com">theainet@gmail.com</a>{' '}
                        <span className="text-white/60">[mention “Rural ELT” in the subject]</span>
                    </>
                ),
            }}
        />
    );
}

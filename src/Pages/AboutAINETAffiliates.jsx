import React from 'react';

const affiliateData = {
    breadcrumb: ['Home', 'AINET Projects', 'AINET Affiliates'],
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

const AboutAINETAffiliates = ({ data }) => {
    const {
        title,
        subtitle,
        description,
        benefitsTitle,
        benefits,
        howToTitle,
        howToSteps,
        contactText,
        contactEmail
    } = data;

    return (
        <div className="px-4 py-10 md:px-8 lg:px-16 max-w-screen-xl mx-auto text-gray-700">

            {/* Page Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-10 ">{title}</h1>

            {/* First Section: Image + Subtitle + Description */}
            <div className="flex flex-col-reverse lg:flex-row items-center gap-10 mb-12">
                {/* Text */}
                <div className="lg:w-2/3">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">{subtitle}</h2>
                    <p className="whitespace-pre-line leading-relaxed">{description}</p>
                </div>

                {/* Image */}
                <div className="lg:w-1/2 w-full">
                    <img
                        src="/AboutAA.jpg"
                        alt="AINET Event"
                        className="w-full rounded-lg shadow-lg"
                    />
                </div>
            </div>

            {/* Benefits Section */}
            <div className="mb-10">
                <h3 className="text-xl md:text-2xl font-semibold mb-4">{benefitsTitle}</h3>
                <ul className="list-disc list-inside space-y-2">
                    {benefits.map((point, idx) => (
                        <li key={idx}>{point}</li>
                    ))}
                </ul>
            </div>

            {/* How to be an Affiliate Section */}
            <div className="mb-10">
                <h3 className="text-xl md:text-2xl font-semibold mb-2">{howToTitle}</h3>
                <p className="whitespace-pre-line">{howToSteps}</p>
            </div>

            {/* Contact Section */}
            <div>
                <p className="font-bold text-2xl">
                    {contactText}{' '}
                    <a href={`mailto:${contactEmail}`} className="text-blue-600 underline">
                        {contactEmail}
                    </a>
                    .
                </p>
            </div>
        </div>
    );
};

export default function Page() {
    return <AboutAINETAffiliates data={affiliateData} />;
}

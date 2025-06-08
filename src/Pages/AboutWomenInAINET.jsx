import React from 'react';

const affiliateData = {
    breadcrumb: ['Home', 'AINET Projects', 'Women in AINET'],
    title: 'About Women In AINET',
    subtitle: '',
    description: `Through this initiative AINET tries to address issues related to the representation of women in leadership and decision-making roles in English teacher associations and communities. Women are present in huge numbers as teachers, trainers, researchers, educators, etc in the ELE domain. However, they have not been as visible as male colleagues in leadership roles, in positions of responsibility and in decision-making processes.

This initiative began as a Hornby Trust-sponsored project, focussed on identifying key reasons and barriers behind the low representation of women, and on planning and undertaking action to address the issue.`,
    benefitsTitle: 'Result of this initiative',
    benefits: [
        'AINET Executive Committee now has a mandated share of women members',
        'AINET conferences and events always include women speakers',
        'Women members play an increasing role in planning and managing various AINET activities',
        'Our pro-active women members contribute ideas to make AINET activities and policies more women-friendly'
    ],
    howToTitle: '',
    howToSteps: `AINET also collaborates with several other associations and teacher groups to organise women empowerment activities, share ideas and experiences on promoting women in leadership and develop resources and expertise in this regard.`,
    contactText: 'If you or your organisation is interested in joining hands with AINET for promoting women in leadership, please write to us at',
    contactEmail: 'theainet@gmail.com'
};

const AboutWomenInAINET = ({ data }) => {
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
            <h1 className="text-3xl md:text-4xl font-bold mb-10">{title}</h1>

            {/* First Section: Image + Description */}
            <div className="flex flex-col-reverse lg:flex-row items-center gap-10 mb-12">
                {/* Text */}
                <div className="lg:w-2/3">
                    {subtitle && <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">{subtitle}</h2>}
                    <p className="whitespace-pre-line leading-relaxed">{description}</p>
                </div>

                {/* Image */}
                <div className="lg:w-1/2 w-full">
                    <img
                        src="/AboutAA.jpg" 
                        alt="Women in AINET Event"
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

            {/* Additional Info Section */}
            {howToTitle && (
                <div className="mb-10">
                    <h3 className="text-xl md:text-2xl font-semibold mb-2">{howToTitle}</h3>
                    <p className="whitespace-pre-line">{howToSteps}</p>
                </div>
            )}

            {!howToTitle && (
                <div className="mb-10">
                    <p className="whitespace-pre-line">{howToSteps}</p>
                </div>
            )}

            {/* Contact Section */}
            <div>
                <p className="font-bold text-xl md:text-2xl">
                    {contactText}{' '}
                    <a href={`mailto:${contactEmail}`} className="text-blue-600 underline">
                        {contactEmail}
                    </a>
                    . <span className="font-normal">[Mention ‘Women-in-AINET’ in the subject.]</span>
                </p>
            </div>
        </div>
    );
};

export default function Page() {
    return <AboutWomenInAINET data={affiliateData} />;
}

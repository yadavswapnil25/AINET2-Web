import React from 'react';
import Highlight from '../Components/shared/Highlight';
import Breadcrumbs from '../Components/shared/Breadcrumbs';

const affiliateData = {
    breadcrumb: ['Home', 'AINET Initiatives', 'Decentring ELT'],
    title: 'Decentring ELT',
    subtitle: '',
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
    howToTitle: '',
    howToSteps: `AINET will undertake an India-specific project to explore notions and practices around decentring ELT during 2025-26. More details will be announced soon.\n\n`,
    contactText: 'For more information, write to ',
    contactEmail: 'theainet@gmail.com',
};

const Decentring = ({ data }) => {
    const {
        title,
        description,
        benefitsTitle,
        benefits,
        howToTitle,
        howToSteps,
        contactText,
        contactEmail,
    } = data;

    return (
        <>
            <Highlight
                heading={"HIGHLIGHTS"}
                subheading={"9th AINET International Conference 2026 - To Be Announced SOON"}
            />
            <div className="px-4 py-10 md:px-8 lg:px-16 max-w-screen-xl mx-auto text-gray-700">
                <div className="pb-10">
                    <Breadcrumbs
                        links={[
                            { label: "Home", to: "/" },
                            { label: "AINET Initiatives", to: null },
                            { label: "Decentring ELT", to: null },
                        ]}
                    />
                </div>

                {/* Page Title and Image */}
                <div className="flex flex-col-reverse lg:flex-row items-center gap-10 mb-12">
                    {/* Text Section */}
                    <div className="lg:w-2/3">
                        <h1 className="text-3xl md:text-4xl font-bold mb-10">{title}</h1>
                        <p className="whitespace-pre-line leading-relaxed">{description}</p>
                    </div>

                    {/* Image */}
                    <div className="lg:w-1/2 w-full">
                        <img
                            src="/decentringImg.png"
                            alt="Decentring ELT Event"
                            className="w-full rounded-lg shadow-lg"
                        />
                    </div>
                </div>

                {/* Activities Section */}
                <div className="mb-10">
                    <h3 className="text-xl md:text-2xl font-semibold mb-4">{benefitsTitle}</h3>
                    <ul className="list-disc list-inside space-y-2">
                        {benefits.map((point, idx) => (
                            <li key={idx}>{point}</li>
                        ))}
                    </ul>
                </div>

                {/* Additional Info Section */}
                {howToTitle ? (
                    <div className="mb-10">
                        <h3 className="text-xl md:text-2xl font-semibold mb-2">{howToTitle}</h3>
                        <p className="whitespace-pre-line">{howToSteps}</p>
                    </div>
                ) : (
                    <div className="mb-10 text-lg">
                        <div
                            className="whitespace-pre-line"
                            dangerouslySetInnerHTML={{ __html: howToSteps }}
                        />
                    </div>
                )}

                {/* Contact Section (optional) */}
                {contactText && (
                    <div>
                        <p className="font-bold text-xl md:text-2xl">
                            {contactText}{' '}
                            <a href={`mailto:${contactEmail}`} className="text-blue-600 underline">
                                {contactEmail}
                            </a>
                            .
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default function Page() {
    return <Decentring data={affiliateData} />;
}

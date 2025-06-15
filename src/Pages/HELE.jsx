import React from 'react';
import Highlight from '../Components/shared/Highlight';
import Breadcrumbs from '../Components/shared/Breadcrumbs';

const affiliateData = {
    breadcrumb: ['Home', 'AINET Projects', 'HELE'],
    title: 'History of English Language Education (HELE)',
    subtitle: '',
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
    howToTitle: '',
    howToSteps: `If you are interested in joining our HELE activities or projects, or want to know more, please write to us at <a href="mailto:theainet@gmail.com" class="text-blue-600 underline">theainet@gmail.com</a>. [Mention ‘HELE India’ in the subject.]`,
    contactText: '',
    contactEmail: 'theainet@gmail.com',
};

const HELE = ({ data }) => {
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
                subheading={"Registration for 8th AINET International Conference 2025"}
            />
            <div className="px-4 py-10 md:px-8 lg:px-16 max-w-screen-xl mx-auto text-gray-700">
                <div className="pb-10">
                    <Breadcrumbs
                        links={[
                            { label: "Home", to: "/" },
                            { label: "AINET Projects", to: null },
                            { label: "HELE", to: null },
                        ]}
                    />
                </div>

                {/* Page Title */}
                <div className="flex flex-col-reverse lg:flex-row items-center gap-10 mb-12">
                    {/* Text */}
                    <div className="lg:w-2/3">
                        <h1 className="text-3xl md:text-4xl font-bold mb-10">{title}</h1>
                        <p className="whitespace-pre-line leading-relaxed">{description}</p>
                    </div>

                    {/* Image */}
                    <div className="lg:w-1/2 w-full">
                        <img
                            src="/archives8.png"
                            alt="HELE Event"
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
                {howToTitle && (
                    <div className="mb-10">
                        <h3 className="text-xl md:text-2xl font-semibold mb-2">{howToTitle}</h3>
                        <p className="whitespace-pre-line">{howToSteps}</p>
                    </div>
                )}
                {!howToTitle && (
                    <div className="mb-10 text-2xl font-bold">
                        <div
                            className="whitespace-pre-line"
                            dangerouslySetInnerHTML={{ __html: howToSteps }}
                        />
                    </div>
                )}

                {/* Contact Section (only shown if contactText exists) */}
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
    return <HELE data={affiliateData} />;
}

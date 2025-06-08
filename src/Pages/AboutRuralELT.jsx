import React from 'react';

const affiliateData = {
    breadcrumb: ['Home', 'AINET Projects', 'Rural ELT'],
    title: 'About Rural ELT',
    subtitle: '',
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
    howToTitle: '',
    howToSteps: `The exploration and experimentation continues under the aegis of AINET. This initiative is open to any teacher working in a rural setting, who wants to investigate and understand the ‘rural’ in their work and context. This is an ongoing initiative and teachers are welcome to join at any point of time.`,
    contactText: 'For joining or more information, write to',
    contactEmail: 'rural.elt@gmail.com' // Alternative contact also mentioned
};

const AboutRuralELT = ({ data }) => {
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
                        src="/AboutAA.jpg" // Image name remains unchanged
                        alt="Rural ELT Event"
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
                    . Or contact{' '}
                    <a href="mailto:theainet@gmail.com" className="text-blue-600 underline">
                        theainet@gmail.com
                    </a>{' '}
                    <span className="font-normal">[mention “Rural ELT” in the subject]</span>
                </p>
            </div>
        </div>
    );
};

export default function Page() {
    return <AboutRuralELT data={affiliateData} />;
}

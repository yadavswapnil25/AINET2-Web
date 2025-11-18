import React from 'react';
import Highlight from '../Components/shared/Highlight';
import Breadcrumbs from '../Components/shared/Breadcrumbs';

const affiliateData = {
    breadcrumb: ['Home', 'AINET Projects', 'PRELIMS'],
    title: 'PRELIMS',
    subtitle: '',
    description: `AINET organised the PRELIMS project from January to March 2021 with the support of British Council, and in collaboration with IATEFL and Norwich Institute of Language Education (NILE). The course was offered by International House (IH), London, under the supervision of NILE.

Out of 300 applicants, 73 teachers with proficiency training needs were shortlisted for the course. The training was run online by IH in two sessions of 90 minutes every week for ten weeks.`,
    courseOverview: `The course was innovative and interesting for the mode of teaching through activities, the novelty of material, interactive nature of sessions, collaborative working principles, and innovative use of technology. The course led to significant improvement in the vocabulary and grammar of the participating teachers. Though Internet connectivity was a major challenge for many, the teachers completed the course and actually wanted a longer duration of training. In view of their enthusiasm, the teachers were given a small financial assistance towards internet charges by British Council.`,
    
    conclusion: `Overall, the project was a great initiative considering AINET's motto to collaborate with agencies and create professional learning opportunities. The project focused on helping teachers in improving their language proficiency, which attracted great interest among participants. The project was led by Dr. Krishna K. Dixit and Swapna Yadav.`,
    howToSteps: `If you are interested in joining our HELE activities or projects, or want to know more, please write to us at <a href="mailto:theainet@gmail.com" class="text-blue-600 underline">theainet@gmail.com</a>. [Mention ‘HELE India’ in the subject.]`,
    contactText: '',
    contactEmail: 'theainet@gmail.com',
};

const Prelims = ({ data }) => {
    const {
        title,
       
        description,
        courseOverview,
       
        conclusion,
    } = data;

    return (
        <>
            <Highlight />

            <div className="px-4 py-10 md:px-8 lg:px-16 max-w-screen-xl mx-auto text-gray-700">
                {/* Breadcrumbs */}
                <div className="pb-10">
                    <Breadcrumbs
                        links={[
                            { label: "Home", to: "/" },
                            { label: "AINET Projects", to: null },
                            { label: "PRELIMS", to: null },
                        ]}
                    />
                </div>

                {/* Title and Image Section */}
                <div className="flex flex-col-reverse lg:flex-row items-center gap-10 mb-12">
                    {/* Text Section */}
                    <div className="lg:w-2/3">
                        <h1 className="text-3xl md:text-4xl font-bold mb-6">{title}</h1>
                        <p className="whitespace-pre-line leading-relaxed text-base md:text-lg">{description}</p>
                    </div>

                    {/* Image Section */}
                    <div className="lg:w-1/2 w-full">
                        <img
                            src="/prelimesimg.png"
                            alt="PRELIMS Event"
                            className="w-full rounded-lg shadow-lg"
                        />
                    </div>
                </div>

                {/* Course Overview Section */}
                <div className="w-full bg-white text-gray-800">
                    <div className="max-w-screen-xl mx-auto">
                        <p className="text-base md:text-lg leading-relaxed">{courseOverview}</p>
                    </div>
                </div>

              

                {/* Conclusion Section */}
                <div className="w-full bg-white py-5 text-gray-800">
                    <div className="max-w-screen-xl mx-auto">
                        <p className="text-base md:text-lg leading-relaxed">{conclusion}</p>
                    </div>
                </div>



            </div>
        </>
    );
};

export default function Page() {
    return <Prelims data={affiliateData} />;
}

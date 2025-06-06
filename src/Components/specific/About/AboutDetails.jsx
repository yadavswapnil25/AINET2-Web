import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutDetails() {
    return (
        <div className="max-w-full lg:max-w-[70%] mx-auto md:p-14 pt-[25px] h-auto">
            {/* Navigation Bar */}
            <div className="w-full mx-auto mb-8">
                <div className="flex items-center text-[20px] font-medium ">
                    <Link to="/" className="text-black hover:underline">Home</Link>
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-gray-400">About</span>
                </div>
            </div>

            {/* Main Content Section */}
            <section className="w-full mx-auto mt-14">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Text Content */}
                    <div className="lg:w-1/2">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 ">About AINET</h1>
                        <p className="text-base md:text-lg">
                            AINET Association of English Teachers (in short, AINET),
                            an affiliate of IATEFL – UK, is a registered English
                            language teacher association in India. It is an affiliate of
                            IATEFL, UK. The primary focus of the association is to
                            create opportunities of professional learning for teachers
                            and thereby strive towards quality English language
                            education for students. It is community of people of
                            interest in teaching and learning of English in India –
                            teachers (working in public and private sectors), teacher
                            trainers, teacher educators, publishers, policy makers,
                            educational administrators, researchers, students, and
                            freelancers. AINET welcomes anyone working to promote
                            the growth of teachers and learning of English
                        </p>
                    </div>

                    {/* Right Image */}
                    <div className="lg:w-1/2">
                        <img
                            src="/aboutBg1.png"
                            alt="AINET conference with audience"
                            className="w-full rounded-lg shadow-md object-cover h-full"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
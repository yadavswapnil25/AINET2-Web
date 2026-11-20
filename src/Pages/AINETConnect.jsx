import { User } from 'lucide-react';
import { IoLogoWhatsapp } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook, FaYoutube, FaTelegram, FaPinterest } from "react-icons/fa";
import Highlight from '../Components/shared/Highlight';
import PageHeader, { LogoTile } from '../Components/shared/PageHeader';
import { containerClass } from '../Components/shared/sectionStyles';

const projectData = {
    title: "About AINET Connect Project",
    subtitle: "AINET Connect: Stronger Networking for Stronger Association",
    description: `AINET Connect is an innovative initiative of AINET to promote our social media networks for ELT practitioners!

The AINET Connect project was launched with an aim to support professional development and to build stronger and more sustainably managed channels of communication, especially on social media platforms. AINET Connect is funded by Skills Development and Quality Assurance Authority (SDA) in Sri Lanka through The Hornby Trust, UK, under its TA Projects Grants Scheme.

The project led to building a team of volunteer teacher-trainers from its membership. The project was launched and now manages AINET accounts on Facebook, Twitter, Instagram, WhatsApp, Pinterest, and LinkedIn. The project is focused on professional interaction and development. During the COVID Pandemic times the AINET Connect Associates did a tremendous job in engaging its members and keeping AINET going.

AINET Connect brings you immense opportunities to network with ELT communities, participate in a wide range of activities and learn, grow and enjoy!`,
    contactEmail: "ainetsocial@gmail.com",
    clickHereText: "Click here."
};

const socialMediaIcons = [
    { icon: AiFillInstagram, name: "Instagram", url: "https://www.instagram.com/ainetindia/" },
    { icon: FaFacebook, name: "Facebook", url: "https://www.facebook.com/ainetindia/" },
    { icon: FaYoutube, name: "YouTube", url: "https://www.youtube.com/AINETIndia" },
    { icon: FaXTwitter, name: "Twitter", url: "https://x.com/ainetindia" },
    { icon: FaTelegram, name: "Telegram", url: "#" },
    { icon: FaPinterest, name: "Pinterest", url: "https://in.pinterest.com/theainet/" },
    { icon: IoLogoWhatsapp, name: "WhatsApp", url: "https://api.whatsapp.com/send?phone=919322890031&text=Hi,AINET" }
];

const leadTeamTop = [
    { name: "Dr. Vivek Joshi", role: "Project Lead", image: "/vivek.jpeg" },
    { name: "Dr. Millind Mane", role: "Project Lead", image: "/MM.jpg" },
    { name: "Nadeem Khan", role: "Project Lead", image: "/NK.jpg" }
];

const AINETConnect = () => {
    return (
        <>
            <Highlight />

            <main>
                <PageHeader
                    breadcrumbs={[
                        { label: "Home", to: "/" },
                        { label: "AINET Projects", to: null },
                        { label: "AINET Connect", to: null },
                    ]}
                    eyebrow="AINET Projects"
                    title={projectData.title}
                    intro={projectData.subtitle}
                    aside={<LogoTile src="/AINETConn.png" alt="AINET Connect logo" />}
                />

                {/* About */}
                <section className="py-12 sm:py-16 lg:py-20">
                    <div className={`${containerClass} grid items-start gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14`}>
                        <div className="ainet-prose">
                            {projectData.description.split('\n\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                        <img
                            src="/connect.jpg"
                            alt="AINET Connect"
                            className="w-full rounded-3xl object-cover shadow-xl shadow-ink/10 ring-1 ring-ink/5 lg:sticky lg:top-28"
                        />
                    </div>
                </section>

                {/* Social media */}
                <section className="pb-12 sm:pb-16">
                    <div className={containerClass}>
                        <div className="relative overflow-hidden rounded-[2rem] bg-mist-deep px-6 py-10 sm:px-10 lg:px-14">
                            <div aria-hidden="true" className="hero-dots pointer-events-none absolute inset-0" />
                            <div className="relative flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
                                <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                                    Join our Social Media accounts:
                                </h2>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {socialMediaIcons.map((social) => {
                                        const Icon = social.icon;
                                        return (
                                            <a
                                                key={social.name}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={social.name}
                                                title={social.name}
                                                className="grid size-12 place-items-center rounded-full bg-white/10 text-2xl text-white ring-1 ring-white/15 transition hover:-translate-y-0.5 hover:bg-sage hover:text-ink"
                                            >
                                                <Icon aria-hidden="true" />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Get involved */}
                <section className="pb-12 sm:pb-16">
                    <div className={containerClass}>
                        <div className="ainet-prose max-w-4xl">
                            <p>
                                Want to know more about AINET Connect? {projectData.clickHereText}
                            </p>
                            <p>
                                If you are an active social media user and want to contribute to AINET, we invite you to join the AINET Connect team. Write to us at{' '}
                                <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${projectData.contactEmail}`} target="_blank" rel="noopener noreferrer">
                                    {projectData.contactEmail}
                                </a>
                                . [Mention &apos;AINET Connect&apos; in the subject.]
                            </p>
                        </div>
                    </div>
                </section>

                {/* Team */}
                <section className="pb-20 sm:pb-24">
                    <div className={containerClass}>
                        <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">AINET Connect Associates</h2>
                        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {leadTeamTop.map((member) => (
                                <div key={member.name} className="rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-ink/10">
                                    <div className="mx-auto size-36 overflow-hidden rounded-full bg-sky-soft ring-4 ring-sage/60">
                                        {member.image ? (
                                            <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="grid h-full w-full place-items-center">
                                                <User className="size-8 text-ink/40" />
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="mt-5 text-lg font-bold text-ink">{member.name}</h3>
                                    {member.role && <p className="mt-1 text-sm font-medium text-sage-deep">{member.role}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default AINETConnect;

import { useState } from 'react';
import {
    FaEnvelope,
    FaBuilding,
    FaTwitter,
    FaFacebook,
    FaLinkedin,
    FaTelegram,
    FaPinterest,
    FaYoutube
} from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa6';
import { RiInstagramFill } from 'react-icons/ri';
import Highlight from '../Components/shared/Highlight';
import PageHeader from '../Components/shared/PageHeader';
import { buttonPrimary, containerClass, inputClass, labelClass } from '../Components/shared/sectionStyles';

const socials = [
    { Icon: RiInstagramFill, label: "ainetindia", href: "https://www.instagram.com/ainetindia/" },
    { Icon: FaLinkedin, label: "@theainet", href: "https://www.linkedin.com/in/theainet" },
    { Icon: FaTwitter, label: "AINET India", href: "https://x.com/ainetindia" },
    { Icon: FaYoutube, label: "@ainetindia", href: "https://www.youtube.com/AINETIndia" },
    { Icon: FaFacebook, label: "fb.com/ainetindia", href: "https://www.facebook.com/ainetindia/" },
    { Icon: FaTelegram, label: "@theainet", href: "https://t.me/theainet" },
    { Icon: FaPinterest, label: "AINET", href: "https://in.pinterest.com/theainet/" },
];

const contactIconClass = "grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-sage";

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <Highlight />

            <main>
                <PageHeader
                    breadcrumbs={[
                        { label: "Home", to: "/" },
                        { label: "Contact Us", to: null },
                    ]}
                    eyebrow="Contact"
                    title="Contact Us"
                    intro="Any questions or remarks? Just write us a message!"
                />

                <section className="py-12 sm:py-16">
                    <div className={`${containerClass} grid items-start gap-6 lg:grid-cols-[1.3fr_1fr]`}>
                        {/* Message form */}
                        <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-ink/10 sm:p-10">
                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className={labelClass}>Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        placeholder='Enter your name'
                                        onChange={handleChange}
                                        className={inputClass}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="mobile" className={labelClass}>Mobile No.</label>
                                    <input
                                        type="tel"
                                        id="mobile"
                                        name="mobile"
                                        value={formData.mobile}
                                        placeholder='Enter your mobile number'
                                        onChange={handleChange}
                                        className={inputClass}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mt-5">
                                <label htmlFor="email" className={labelClass}>Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    placeholder='Enter your email'
                                    onChange={handleChange}
                                    className={inputClass}
                                    required
                                />
                            </div>

                            <div className="mt-5">
                                <label htmlFor="message" className={labelClass}>Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    placeholder="Enter your message"
                                    className={inputClass}
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className={`${buttonPrimary} mt-8 w-full sm:w-auto sm:px-12`}>
                                SUBMIT
                            </button>
                        </form>

                        {/* Contact details + socials */}
                        <div className="space-y-6">
                            <div className="rounded-[2rem] bg-ink p-6 text-white sm:p-8">
                                <h2 className="text-2xl font-extrabold tracking-tight">Meet us</h2>
                                <ul className="mt-6 space-y-4">
                                    <li className="flex items-center gap-4">
                                        <span className={contactIconClass}><FaEnvelope aria-hidden="true" /></span>
                                        <a href="mailto:theainet@gmail.com" className="break-all text-white/85 transition-colors hover:text-white">theainet@gmail.com</a>
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <span className={contactIconClass}><FaPhone aria-hidden="true" /></span>
                                        <a href="tel:+919322890031" className="text-white/85 transition-colors hover:text-white">+91-9322890031</a>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <span className={contactIconClass}><FaBuilding aria-hidden="true" /></span>
                                        <a
                                            href="https://maps.app.goo.gl/m4qqcJDorjdB9Yss5"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="pt-2 leading-relaxed text-white/85 transition-colors hover:text-white"
                                        >
                                            7, Professor Colony, St. Kabir Ward, Bhandara (MS) 441904
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="rounded-[2rem] bg-sage-soft p-6 sm:p-8">
                                <h2 className="text-2xl font-extrabold tracking-tight text-ink">Follow us</h2>
                                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                                    {socials.map((social) => {
                                        const { Icon } = social;
                                        return (
                                            <li key={social.href}>
                                                <a
                                                    href={social.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-ink shadow-sm ring-1 ring-ink/5 transition hover:-translate-y-0.5 hover:shadow-md"
                                                >
                                                    <Icon className="shrink-0 text-lg text-sage-deep" aria-hidden="true" />
                                                    <span className="truncate">{social.label}</span>
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Map */}
                <section className="pb-20 sm:pb-24">
                    <div className={containerClass}>
                        <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Office Address</h2>
                        <div className="mt-6 h-[380px] overflow-hidden rounded-[2rem] shadow-sm ring-1 ring-ink/10">
                            <iframe
                                title="AINET office location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2147.3879109661984!2d79.65889746966941!3d21.15976870730028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2b3f57f4b70305%3A0xc3d87494bf0d0553!2sSant%20Kabir%20Ward%2C%20Santaji%20Nagar%2C%20Bhandara%2C%20Maharashtra%20441904!5e1!3m2!1sen!2sin!4v1745172345747!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

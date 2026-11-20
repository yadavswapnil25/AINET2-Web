import { Link } from "react-router-dom";
import {
    FaInstagram,
    FaFacebookF,
    FaYoutube,
    FaPinterestP,
    FaTwitter,
    FaWhatsapp,
    FaEnvelope,
    FaPhoneAlt,
    FaUniversity
} from 'react-icons/fa';
import { containerClass } from "./sectionStyles";

const socialLinks = [
    { href: "https://www.instagram.com/ainetindia/", label: "Instagram", Icon: FaInstagram },
    { href: "https://www.facebook.com/ainetindia/", label: "Facebook", Icon: FaFacebookF },
    { href: "https://www.youtube.com/AINETIndia", label: "YouTube", Icon: FaYoutube },
    { href: "https://in.pinterest.com/theainet/", label: "Pinterest", Icon: FaPinterestP },
    { href: "https://x.com/ainetindia", label: "Twitter", Icon: FaTwitter },
    { href: "https://api.whatsapp.com/send?phone=919322890031&text=Hi,AINET", label: "WhatsApp", Icon: FaWhatsapp },
];

const footerColumns = [
    {
        title: "AINET",
        links: [
            { label: "About Us", to: "/about" },
            { label: "Publications", to: "/publications" },
            { label: "AINET Adda", to: "/BlogsSection1" },
            { label: "Resources", to: "/resources" },
            { label: "Terms & Conditions", to: "/TermsAndConditions" },
        ],
    },
    {
        title: "Help",
        links: [
            { label: "Archives", to: "/archives" },
            { label: "Contact Us", to: "/ContactUs" },
            { label: "Privacy Policy", to: "/PrivacyPolicy" },
            { label: "Refund Policy", to: "/RefundPolicy" },
            { label: "Shipping Policy", to: "/ShippingPolicy" },
        ],
    },
];

const contactIconClass = "grid size-9 shrink-0 place-items-center rounded-full bg-white/10 text-sm text-sage";

const Footer = () => {
    return (
        <footer className="rounded-t-[2rem] bg-ink font-display text-white/70">
            <div className={`${containerClass} grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr] lg:gap-12 lg:py-16`}>
                {/* Logo + socials */}
                <div className="col-span-2 lg:col-span-1">
                    <Link to="/" className="inline-block" aria-label="AINET home">
                        <img src="/footlogo.png" alt="AINET - Develop. Together." className="h-auto w-40" />
                    </Link>
                    <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-white/50">Follow Us</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {socialLinks.map((social) => {
                            const { href, label, Icon } = social;
                            return (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="grid size-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-sage hover:text-ink"
                                >
                                    <Icon aria-hidden="true" />
                                </a>
                            );
                        })}
                    </div>
                </div>

                {footerColumns.map((column) => (
                    <nav key={column.title} aria-label={column.title}>
                        <h3 className="text-lg font-bold text-white">{column.title}</h3>
                        <ul className="mt-4 space-y-3">
                            {column.links.map((link) => (
                                <li key={link.to}>
                                    <Link to={link.to} className="transition-colors hover:text-white">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                ))}

                {/* Contact details */}
                <div className="col-span-2 lg:col-span-1">
                    <h3 className="text-lg font-bold text-white">Support &amp; Contact</h3>
                    <ul className="mt-4 space-y-4">
                        <li className="flex items-center gap-3">
                            <span className={contactIconClass}><FaEnvelope aria-hidden="true" /></span>
                            <a
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=theainet@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="break-all transition-colors hover:text-white"
                            >
                                theainet@gmail.com
                            </a>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className={contactIconClass}><FaPhoneAlt aria-hidden="true" /></span>
                            <a href="tel:+919322890031" className="transition-colors hover:text-white">+91 - 9322890031</a>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className={contactIconClass}><FaUniversity aria-hidden="true" /></span>
                            <span className="pt-1.5 text-sm leading-relaxed">
                                7, Professor Colony, St. Kabir Ward, Bhandara (MS)&nbsp;441904
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-white/10">
                <p className={`${containerClass} py-6 text-center text-sm text-white/50`}>
                    © {new Date().getFullYear()} copyright received by AINET.
                </p>
            </div>
        </footer>
    );
};

export default Footer;

import { useState, useEffect } from 'react';
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';
import { IoCalendarOutline, IoLocationOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import Highlight from '../Components/shared/Highlight';
import ImageCard from '../Components/shared/ImageCard';
import InfoTile from '../Components/shared/InfoTile';
import PageHeader from '../Components/shared/PageHeader';
import { buttonPrimary, buttonSecondary, containerClass, eyebrowClass } from '../Components/shared/sectionStyles';
import { baseUrl } from '../utils/constant';
import { sanitizeHtml } from '../utils/sanitizeHtml';

export default function ConferencePage() {
    const [conference, setConference] = useState(null);
    const [previousConferences, setPreviousConferences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [previousLoading, setPreviousLoading] = useState(true);

    // Fetch upcoming conference
    useEffect(() => {
        const fetchConference = async () => {
            try {
                const response = await fetch(`${baseUrl}/client/conference`);
                const data = await response.json();

                if (data.status && data.data && data.data.conference) {
                    setConference(data.data.conference);
                }
            } catch (error) {
                console.error("Error fetching conference:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchConference();
    }, []);

    // Fetch previous conferences (all conferences, we'll filter on frontend)
    useEffect(() => {
        const fetchPreviousConferences = async () => {
            try {
                const response = await fetch(`${baseUrl}/client/events?event_type=conference&exclude_conference=false`);
                const data = await response.json();

                if (data.status && data.data && data.data.events) {
                    const now = new Date();
                    // Filter out the current conference and get past conferences
                    const pastConferences = data.data.events
                        .filter(event => {
                            // Exclude current conference if it exists
                            if (conference && event.id === conference.id) return false;
                            // Get conferences with past dates
                            if (event.event_date) {
                                const eventDate = new Date(event.event_date);
                                return eventDate < now;
                            }
                            return false;
                        })
                        .sort((a, b) => {
                            // Sort by date descending (most recent first)
                            const dateA = a.event_date ? new Date(a.event_date) : new Date(0);
                            const dateB = b.event_date ? new Date(b.event_date) : new Date(0);
                            return dateB - dateA;
                        })
                        .slice(0, 10); // Limit to 10 most recent

                    setPreviousConferences(pastConferences);
                }
            } catch (error) {
                console.error("Error fetching previous conferences:", error);
            } finally {
                setPreviousLoading(false);
            }
        };

        fetchPreviousConferences();
    }, [conference]);

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return 'TBA';
        const date = new Date(dateString);
        const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
                       'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    // Format date range
    const formatDateRange = (startDate, endDate) => {
        if (!startDate) return 'TBA';
        if (!endDate || startDate === endDate) {
            return formatDate(startDate);
        }
        const start = new Date(startDate);
        const end = new Date(endDate);
        const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
                       'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
        if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
            return `${start.getDate()}-${end.getDate()} ${months[start.getMonth()]} ${start.getFullYear()}`;
        }
        return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    };

    // Fallback data
    const fallbackConference = {
        bannerImage: "/conference.png",
        details: {
            startDate: "9TH JANUARY 2027",
            startTime: "9:00 AM",
            endDate: "10TH JANUARY 2027",
            endTime: "6:00 PM",
            location: "ONLINE",
            registrationLink: "/ainet2027drf",
            conferenceSite: "https://conf.theainet.net/",
            theme: "ELE for Gen Z, Alpha and Beyond",
            fullTitle: "10th AINET International Conference 2027 (Online), 9 - 10 January 2027"
        },
        subThemes: [
            "Profiling Next Generation Learners",
            "Teaching For and To the Future",
            "Pedagogy, Andragogy, Heutagogy and Beyond",
            "Exploring the Future in History",
            "Multilingual Pedagogy – How Relevant for the Machine-Translating World?",
            "Teacher Technologies and Learner Technologies – How the Twain Shall Meet?",
            "AI as a Co-Teacher"
        ]
    };

    const fallbackPreviousConferences = [
        {
            id: 0,
            title: "9th AINET INTERNATIONAL CONFERENCE",
            location: "SONIPAT (Delhi-NCR)",
            dates: "JANUARY 15-17, 2026",
            image: "/9thconference.png"
        },
        {
            id: 1,
            title: "8th AINET INTERNATIONAL CONFERENCE",
            location: "ONLINE",
            dates: "April 10-12, 2025",
            image: "/8thconfrence.png"
        },
        {
            id: 2,
            title: "7th AINET INTERNATIONAL CONFERENCE",
            location: "GUWAHATI",
            dates: "FEBRUARY 3-4, 2024",
            image: "/archives1.png"
        },
        {
            id: 3,
            title: "6th AINET INTERNATIONAL CONFERENCE",
            location: "ONLINE",
            dates: "JANUARY 7-9, 2022",
            image: "/archives2.png"
        }
    ];

    // Use API data or fallback
    const conferenceData = conference ? {
        bannerImage: conference.image_url || "/conference.png",
        details: {
            startDate: conference.event_date ? formatDate(conference.event_date).toUpperCase() : "TBA",
            startTime: "9:00 AM",
            endDate: conference.event_date_end ? formatDate(conference.event_date_end).toUpperCase() : conference.event_date ? formatDate(conference.event_date).toUpperCase() : "TBA",
            endTime: "6:00 PM",
            location: conference.location || "TBA",
            registrationLink: conference.link_url || "#",
            theme: conference.description || "",
            fullTitle: conference.title || "AINET INTERNATIONAL CONFERENCE"
        },
        subThemes: [] // Sub themes would need to come from API if available
    } : fallbackConference;

    const displayPreviousConferences = previousConferences.length > 0
        ? previousConferences.map(conf => ({
            id: conf.id,
            title: conf.title,
            location: conf.location || "TBA",
            dates: formatDateRange(conf.event_date, conf.event_date_end).toUpperCase(),
            image: conf.image_url || "/archives1.png"
        }))
        : fallbackPreviousConferences;

    const { details } = conferenceData;
    const registrationLink = details.registrationLink && details.registrationLink !== "#" ? details.registrationLink : null;

    return (
        <>
            <Highlight />

            <main>
                <PageHeader
                    breadcrumbs={[
                        { label: "Home", to: "/" },
                        { label: "Event", to: null },
                        { label: "Conferences", to: null },
                    ]}
                    eyebrow="Events"
                    title="Conference"
                />

                {/* Upcoming conference */}
                <section className="py-12 sm:py-16">
                    <div className={containerClass}>
                        <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Upcoming Conference</h2>

                        {loading ? (
                            <div className="mt-6 h-96 animate-pulse rounded-[2rem] bg-sky-soft" />
                        ) : (
                            <article className="mt-6 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-ink/10">
                                <img
                                    src={conferenceData.bannerImage}
                                    alt={details.fullTitle || "AINET International Conference Banner"}
                                    className="w-full object-contain"
                                    onError={(e) => {
                                        e.target.src = "/conference.png";
                                    }}
                                />

                                <div className="p-6 sm:p-10">
                                    <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl">
                                        {details.fullTitle}
                                    </h3>

                                    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                        <InfoTile icon={IoCalendarOutline} label="From">
                                            {details.startDate}
                                            <span className="block text-sm font-medium text-ink/60">{details.startTime}</span>
                                        </InfoTile>
                                        <InfoTile icon={IoCalendarOutline} label="To">
                                            {details.endDate}
                                            <span className="block text-sm font-medium text-ink/60">{details.endTime}</span>
                                        </InfoTile>
                                        <InfoTile icon={IoLocationOutline} label="Location">
                                            {details.location}
                                        </InfoTile>
                                    </div>

                                    {details.theme && (
                                        <div className="mt-8">
                                            <p className={eyebrowClass}>Theme</p>
                                            <div
                                                className="ainet-prose mt-2 text-lg font-semibold text-ink"
                                                dangerouslySetInnerHTML={{ __html: sanitizeHtml(details.theme) }}
                                            />
                                        </div>
                                    )}

                                    {conferenceData.subThemes && conferenceData.subThemes.length > 0 && (
                                        <div className="mt-8">
                                            <p className={eyebrowClass}>Sub Themes</p>
                                            <ul className="mt-3 flex flex-wrap gap-2">
                                                {conferenceData.subThemes.map((theme) => (
                                                    <li key={theme} className="rounded-full bg-sage-soft px-4 py-2 text-sm font-semibold text-ink ring-1 ring-sage">
                                                        {theme}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {(registrationLink || details.conferenceSite) && (
                                        <div className="mt-8 flex flex-wrap gap-3">
                                            {registrationLink && (registrationLink.startsWith("/") ? (
                                                <Link to={registrationLink} className={buttonPrimary}>
                                                    Register now
                                                    <FaArrowRight className="text-sm" aria-hidden="true" />
                                                </Link>
                                            ) : (
                                                <a href={registrationLink} target="_blank" rel="noopener noreferrer" className={buttonPrimary}>
                                                    Register now
                                                    <FaArrowRight className="text-sm" aria-hidden="true" />
                                                </a>
                                            ))}
                                            {details.conferenceSite && (
                                                <a href={details.conferenceSite} target="_blank" rel="noopener noreferrer" className={buttonSecondary}>
                                                    Conference website
                                                    <FaExternalLinkAlt className="text-xs" aria-hidden="true" />
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </article>
                        )}
                    </div>
                </section>

                {/* Previous conferences */}
                <section className="pb-20 sm:pb-24">
                    <div className={containerClass}>
                        <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Previous Conferences</h2>

                        {previousLoading ? (
                            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {Array.from({ length: 3 }).map((_, index) => (
                                    <div key={index} className="h-72 animate-pulse rounded-3xl bg-sky-soft" />
                                ))}
                            </div>
                        ) : displayPreviousConferences.length > 0 ? (
                            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {displayPreviousConferences.map((item) => (
                                    <ImageCard
                                        key={item.id}
                                        image={item.image}
                                        title={item.title}
                                        meta={`${item.location} · ${item.dates}`}
                                        fallbackImage="/archives1.png"
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="mt-6 rounded-3xl bg-sky-soft px-6 py-10 text-center text-ink/60">
                                No previous conferences available.
                            </p>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}

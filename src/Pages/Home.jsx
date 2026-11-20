import { useEffect, useState } from "react";
import { FaArrowRight, FaRegCalendarAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Highlight from "../Components/shared/Highlight";
import MembershipPlans from "../Components/shared/MembershipPlans";
import SectionHeading from "../Components/shared/SectionHeading";
import { containerClass } from "../Components/shared/sectionStyles";
import Archives from "../Components/specific/Home/Archives";
import Gallery from "../Components/specific/Home/Gallery";
import MembersArea from "../Components/specific/Home/MembersArea";
import NewsletterSignup from "../Components/specific/Home/NewsletterSignup";
import Partners from "../Components/specific/Home/Partners";
import { baseUrl } from "../utils/constant";
import { sanitizeHtml } from "../utils/sanitizeHtml";
import newh1 from "/newh11.jpg";
import newh2 from "/newh22.jpg";

const HERO_STATS = [
  { value: "1 M +", label: "Our online reach across all online platform." },
  { value: "3400 +", label: "Our thriving community of educators." },
];

const EVENT_TYPE_STYLES = {
  conference: "bg-sky text-ink",
  webinar: "bg-sage text-sage-deep",
  workshop: "bg-cream text-ink ring-1 ring-ink/10",
  programme: "bg-mist/30 text-ink",
};

// One event gets a wide card; two sit side by side; three become a 2 + 1
// layout on tablets and a single row on laptops.
const eventGridClass = (count) => (count === 2 ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3");

const parseEventDate = (value) => {
  if (!value) return null;
  const date = new Date(`${String(value).slice(0, 10)}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  return {
    day: String(date.getDate()).padStart(2, "0"),
    month: date.toLocaleString("en-GB", { month: "short" }),
    year: date.getFullYear(),
  };
};

const DATE_TILE_SIZES = {
  sm: { box: "w-12", day: "text-xl", month: "text-[10px]" },
  md: { box: "w-16", day: "text-2xl", month: "text-[11px]" },
  lg: { box: "w-20", day: "text-3xl", month: "text-xs" },
};

// Calendar-style tile: month on top, big day, year below.
const DateTile = ({ value, size = "md" }) => {
  const parts = parseEventDate(value);
  const sizing = DATE_TILE_SIZES[size];

  if (!parts) {
    return (
      <div className={`${sizing.box} grid aspect-square shrink-0 place-items-center rounded-2xl bg-cream text-xl text-ink ring-1 ring-ink/5`}>
        <FaRegCalendarAlt aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className={`${sizing.box} shrink-0 overflow-hidden rounded-2xl bg-cream text-center ring-1 ring-ink/5`} aria-hidden="true">
      <p className={`bg-ink py-1 font-bold uppercase tracking-[0.14em] text-cream ${sizing.month}`}>{parts.month}</p>
      <p className={`pt-1.5 font-extrabold leading-none text-ink ${sizing.day}`}>{parts.day}</p>
      <p className="pb-2 pt-1 text-[11px] font-semibold text-ink/55">{parts.year}</p>
    </div>
  );
};

const EventTypeChip = ({ type }) => {
  if (!type) return null;
  const style = EVENT_TYPE_STYLES[type] || "bg-sky-soft text-ink";
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize tracking-wide ${style}`}>
      {type}
    </span>
  );
};

const EventCard = ({ event, onOpen, wide = false, className = "" }) => (
  <article
    className={`group flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-ink/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7 ${
      wide ? "md:flex-row md:items-center md:gap-8 md:p-8" : ""
    } ${className}`}
  >
    <div className={`flex items-start justify-between gap-4 ${wide ? "md:flex-col md:items-center md:justify-start md:gap-3" : ""}`}>
      <DateTile value={event.startDate} size={wide ? "lg" : "md"} />
      <EventTypeChip type={event.event_type} />
    </div>

    <div className="flex min-w-0 flex-1 flex-col">
      <h3 className={`mt-5 text-xl font-bold leading-snug text-ink sm:text-2xl ${wide ? "md:mt-0" : ""}`}>
        {event.title}
      </h3>

      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-medium text-ink/70">
        <li className="flex items-start gap-2">
          <MdLocationOn className="mt-0.5 shrink-0 text-lg text-sage-deep" aria-hidden="true" />
          <span>{event.location}</span>
        </li>
        <li className="flex items-start gap-2">
          <FaRegCalendarAlt className="mt-1 shrink-0 text-sage-deep" aria-hidden="true" />
          <span>{event.date}</span>
        </li>
      </ul>

      {event.description && (
        <div
          className="mt-4 text-[15px] leading-relaxed text-ink/75 [&_a]:font-semibold [&_a]:text-sage-deep [&_a]:underline [&_a:hover]:text-ink [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(event.description) }}
        />
      )}
    </div>

    <div className={`mt-auto pt-6 ${wide ? "md:mt-0 md:pt-0" : ""}`}>
      <button
        type="button"
        onClick={() => onOpen(event)}
        className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-ink/85 group-hover:gap-3"
      >
        View details
        <FaArrowRight className="text-xs" aria-hidden="true" />
      </button>
    </div>
  </article>
);

const BannerImage = ({ banner, fallbackSrc, fallbackAlt, loading, className }) => {
  if (loading) {
    return <div className={`${className} animate-pulse bg-white/15`} aria-hidden="true" />;
  }

  const image = (
    <img
      src={banner?.image_url || fallbackSrc}
      alt={banner?.title || fallbackAlt}
      className={`${className} object-cover`}
    />
  );

  if (!banner?.link_url) return image;

  return (
    <a href={banner.link_url} target="_blank" rel="noopener noreferrer" className="block transition-opacity hover:opacity-90">
      {image}
    </a>
  );
};

// Two photos from the banner manager, overlapping, plus the next event as a
// small card on top.
const HeroCollage = ({ banners, loading, upcoming, onOpenEvent }) => (
  <div className="relative mx-auto w-full max-w-xl pb-10 pt-6 lg:max-w-none lg:pb-12">
    <BannerImage
      banner={banners[0]}
      fallbackSrc={newh1}
      fallbackAlt="AINET members at a conference"
      loading={loading}
      className="aspect-[4/3] w-full rounded-3xl shadow-2xl shadow-black/25"
    />

    <div className="absolute bottom-0 left-0 w-[46%] -translate-x-2 sm:-translate-x-6 lg:-translate-x-10">
      <BannerImage
        banner={banners[1]}
        fallbackSrc={newh2}
        fallbackAlt="Speaker at an AINET conference"
        loading={loading}
        className="aspect-[4/3] w-full rounded-2xl shadow-xl ring-4 ring-mist-deep"
      />
    </div>

    {upcoming && (
      <button
        type="button"
        onClick={() => onOpenEvent(upcoming)}
        className="absolute right-2 top-0 flex max-w-[15rem] items-center gap-3 rounded-2xl bg-white p-3 pr-4 text-left shadow-xl transition hover:-translate-y-0.5 sm:-right-4 sm:max-w-[17rem]"
      >
        <DateTile value={upcoming.startDate} size="sm" />
        <span className="min-w-0">
          <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-sage-deep">Upcoming event</span>
          <span className="mt-0.5 line-clamp-2 block text-sm font-bold leading-snug text-ink">{upcoming.title}</span>
        </span>
      </button>
    )}
  </div>
);

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(true);

  // "Join us" links point at /#membershipplan. Scroll again once the sections
  // above have loaded, so the jump still lands on the plans.
  useEffect(() => {
    if (location.hash === "#membershipplan") {
      document.getElementById("membershipplan")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location, loading, eventsLoading]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(`${baseUrl}/client/banners?limit=3`);
        const data = await response.json();

        if (data.status && data.data && data.data.banners) {
          // Filter banners with sort_order 0, 1, and 2, then sort them
          const filteredBanners = data.data.banners
            .filter(banner => banner.sort_order === 0 || banner.sort_order === 1 || banner.sort_order === 2)
            .sort((a, b) => a.sort_order - b.sort_order);

          setBanners(filteredBanners);
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${baseUrl}/client/events?limit=3&exclude_conference=true`);
        const data = await response.json();

        if (data.status && data.data && data.data.events) {
          // Map API events to match the component structure (EventDetails reads these too)
          const mappedEvents = data.data.events.map(event => ({
            id: event.id,
            title: event.title,
            location: event.location || "Online",
            date: event.date_display || "TBA",
            time: event.time_display || "",
            startDate: event.event_date || "",
            link: event.link_url || "",
            description: event.description || "",
            topic_description: event.topic_description || "",
            banner_image: event.banner_image || "",
            event_type: event.event_type || "",
          }));

          setEvents(mappedEvents);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setEventsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (event) => {
    if (event.link) {
      window.location.href = event.link;
      return;
    }
    navigate(`/events/${event.id}`, { state: { event } });
  };

  return (
    <>
      <Highlight />

      <main className="font-display text-ink">
        {/* Hero */}
        <section aria-label="Welcome" className="px-3 pt-3 sm:px-4 sm:pt-4 lg:px-6 lg:pt-6">
          <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] bg-mist-deep">
            <div aria-hidden="true" className="hero-dots pointer-events-none absolute inset-0" />
            <div aria-hidden="true" className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-sage/25 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -right-24 size-[28rem] rounded-full bg-sky/25 blur-3xl" />

            <div className="relative grid items-center gap-12 px-5 py-12 sm:px-10 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:px-14 lg:py-20 xl:px-16">
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-sage ring-1 ring-white/15 sm:text-xs sm:tracking-[0.14em]">
                  <span className="size-1.5 rounded-full bg-sage" aria-hidden="true" />
                  AINET Association of English Teachers
                </p>

                {/* Original typography kept as requested: size, spacing, colour and font. */}
                <h1
                  className="mt-6 text-center text-xl font-bold leading-8 tracking-wider text-white md:text-left md:text-[2.5vw] md:leading-[3.5rem] lg:leading-[4.5rem]"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  A vibrant community of English Language Education professionals &amp; stakeholders which aims to
                  <br />
                  Develop. Together.
                </h1>

                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                  &quot;A national English teachers&apos; association, registered in India. An IATEFL, UK affiliate.&quot;
                </p>

                <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                  <Link
                    to="/login"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-cream px-7 py-3.5 font-bold text-ink shadow-lg shadow-black/10 transition hover:bg-white"
                  >
                    Join the community
                    <FaArrowRight className="text-sm transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                  <Link
                    to="/about"
                    className="inline-flex items-center justify-center rounded-full px-7 py-3.5 font-bold text-white ring-1 ring-white/40 transition hover:bg-white/10"
                  >
                    Read more
                  </Link>
                </div>

                <div className="mt-10 grid w-full max-w-md grid-cols-2 gap-3 sm:gap-4">
                  {HERO_STATS.map((stat) => (
                    <div key={stat.value} className="rounded-2xl bg-white/10 p-4 text-left ring-1 ring-white/10 sm:p-5">
                      <p className="text-2xl font-extrabold text-sage sm:text-3xl">{stat.value}</p>
                      <p className="mt-1 text-xs leading-snug text-white/75 sm:text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <HeroCollage
                banners={banners}
                loading={loading}
                upcoming={eventsLoading ? null : events[0]}
                onOpenEvent={handleEventClick}
              />
            </div>
          </div>
        </section>

        {/* Upcoming events */}
        <section aria-labelledby="events-title" className="mt-16 bg-sky-soft py-16 sm:mt-20 sm:py-20 lg:py-24">
          <div className={containerClass}>
            <SectionHeading id="events-title" eyebrow="Events" title="Upcoming Events" />

            {eventsLoading ? (
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-64 animate-pulse rounded-3xl bg-white/70 ${index === 2 ? "sm:col-span-2 lg:col-span-1" : ""}`}
                  />
                ))}
              </div>
            ) : events.length === 1 ? (
              <EventCard event={events[0]} onOpen={handleEventClick} wide className="mt-10" />
            ) : events.length > 1 ? (
              <div className={`mt-10 grid gap-6 ${eventGridClass(events.length)}`}>
                {events.map((event, index) => (
                  <EventCard
                    key={event.id ?? index}
                    event={event}
                    onOpen={handleEventClick}
                    className={events.length === 3 && index === 2 ? "sm:col-span-2 lg:col-span-1" : ""}
                  />
                ))}
              </div>
            ) : (
              <p className="mt-10 rounded-3xl bg-white px-6 py-12 text-center text-ink/60 ring-1 ring-ink/5">
                No upcoming events at the moment.
              </p>
            )}
          </div>
        </section>

        <MembersArea />

        <MembershipPlans />

        <Partners />

        <Gallery />

        <NewsletterSignup />

        <Archives />
      </main>
    </>
  );
};

export default Home;

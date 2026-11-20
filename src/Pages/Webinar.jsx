import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { IoCalendarOutline, IoLocationOutline, IoPersonOutline, IoTimeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Highlight from "../Components/shared/Highlight";
import ImageCard from "../Components/shared/ImageCard";
import InfoTile from "../Components/shared/InfoTile";
import PageHeader from "../Components/shared/PageHeader";
import { buttonPrimary, containerClass, eyebrowClass } from "../Components/shared/sectionStyles";
import LiveStream from "../Components/specific/LiveStream";
import { baseUrl } from "../utils/constant";
import { sanitizeHtml } from "../utils/sanitizeHtml";

// Format date for display
const formatDate = (dateString) => {
  if (!dateString) return 'TBA';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

// Format time for display
const formatTime = (dateTimeString) => {
  if (!dateTimeString) return '';
  const date = new Date(dateTimeString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

const Webinar = () => {
  const [webinar, setWebinar] = useState(null);
  const [previousWebinars, setPreviousWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previousLoading, setPreviousLoading] = useState(true);

  // Fetch upcoming webinar
  useEffect(() => {
    const fetchWebinar = async () => {
      try {
        const response = await fetch(`${baseUrl}/client/webinar`);
        const data = await response.json();

        if (data.status && data.data && data.data.webinar) {
          setWebinar(data.data.webinar);
        }
      } catch (error) {
        console.error("Error fetching webinar:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWebinar();
  }, []);

  // Fetch previous webinars
  useEffect(() => {
    const fetchPreviousWebinars = async () => {
      try {
        const response = await fetch(`${baseUrl}/client/events?event_type=webinar&exclude_conference=false`);
        const data = await response.json();

        if (data.status && data.data && data.data.events) {
          const now = new Date();
          // Filter out the current webinar and get past webinars
          const pastWebinars = data.data.events.filter(event => {
            if (!webinar || event.id !== webinar.id) {
              const eventDate = event.event_date ? new Date(event.event_date) : null;
              return eventDate && eventDate < now;
            }
            return false;
          });
          setPreviousWebinars(pastWebinars);
        }
      } catch (error) {
        console.error("Error fetching previous webinars:", error);
      } finally {
        setPreviousLoading(false);
      }
    };

    fetchPreviousWebinars();
  }, [webinar]);

  return (
    <>
      <Highlight />

      <main>
        <PageHeader
          breadcrumbs={[
            { label: "Home", to: "/" },
            { label: "Webinar", to: null },
          ]}
          eyebrow="Events"
          title="Webinar"
        />

        {/* Upcoming webinar */}
        <section className="py-12 sm:py-16">
          <div className={containerClass}>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Upcoming Webinar</h2>

            {loading ? (
              <div className="mt-6 h-96 animate-pulse rounded-[2rem] bg-sky-soft" />
            ) : webinar ? (
              <article className="mt-6 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-ink/10">
                <img
                  src={webinar.banner_image || "/webinarbanner.png"}
                  alt={webinar.banner_image ? webinar.title : "AINET International ELT Webinar"}
                  className="w-full"
                />

                <div className="p-6 sm:p-10">
                  <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl">{webinar.title}</h3>

                  {/* Live Stream Section */}
                  {webinar.is_live && (
                    <div className="mt-8 overflow-hidden rounded-3xl">
                      <LiveStream
                        streamType={webinar.stream_type}
                        streamUrl={webinar.stream_url}
                        embedCode={webinar.embed_code}
                        streamId={webinar.stream_id}
                        isLive={webinar.is_live}
                      />
                    </div>
                  )}

                  <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {webinar.starts_at && (
                      <InfoTile icon={IoCalendarOutline} label="Starts">
                        {formatDate(webinar.starts_at)}
                        <span className="block text-sm font-medium text-ink/60">{formatTime(webinar.starts_at)}</span>
                      </InfoTile>
                    )}
                    {webinar.ends_at && (
                      <InfoTile icon={IoTimeOutline} label="Ends">
                        {formatDate(webinar.ends_at)}
                        <span className="block text-sm font-medium text-ink/60">{formatTime(webinar.ends_at)}</span>
                      </InfoTile>
                    )}
                    {webinar.location && (
                      <InfoTile icon={IoLocationOutline} label="Location">
                        {webinar.location}
                      </InfoTile>
                    )}
                    {webinar.guest_speaker && (
                      <InfoTile icon={IoPersonOutline} label="Guest">
                        {webinar.guest_speaker}
                      </InfoTile>
                    )}
                  </div>

                  {webinar.topic_description && (
                    <div className="mt-8">
                      <p className={eyebrowClass}>Topic</p>
                      <p className="mt-2 text-lg font-semibold text-ink">{webinar.topic_description}</p>
                    </div>
                  )}

                  {webinar.description && (
                    <div className="mt-8">
                      <p className={eyebrowClass}>Description</p>
                      <div
                        className="ainet-prose mt-2"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(webinar.description) }}
                      />
                    </div>
                  )}

                  {webinar.link_url && (
                    <div className="mt-8">
                      <a href={webinar.link_url} target="_blank" rel="noopener noreferrer" className={buttonPrimary}>
                        Register now
                        <FaArrowRight className="text-sm" aria-hidden="true" />
                      </a>
                    </div>
                  )}
                </div>
              </article>
            ) : (
              <p className="mt-6 rounded-3xl bg-sky-soft px-6 py-10 text-center text-ink/60">
                No upcoming webinar scheduled at this time.
              </p>
            )}
          </div>
        </section>

        {/* Previous webinars */}
        <section className="pb-20 sm:pb-24">
          <div className={containerClass}>
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Previous Webinar</h2>
              <Link
                to="/archives-conference"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-sky-soft px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
              >
                View All
                <FaArrowRight className="text-xs transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>

            {previousLoading ? (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="h-72 animate-pulse rounded-3xl bg-sky-soft" />
                ))}
              </div>
            ) : previousWebinars.length > 0 ? (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {previousWebinars.map((prevWebinar) => (
                  <ImageCard
                    key={prevWebinar.id}
                    image={prevWebinar.banner_image}
                    title={prevWebinar.title}
                    meta={prevWebinar.date_display}
                  />
                ))}
              </div>
            ) : (
              <p className="mt-6 rounded-3xl bg-sky-soft px-6 py-10 text-center text-ink/60">
                No previous webinars available.
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Webinar;

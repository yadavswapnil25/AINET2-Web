import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoCalendarOutline, IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Highlight from "../Components/shared/Highlight";
import InfoTile from "../Components/shared/InfoTile";
import PageHeader from "../Components/shared/PageHeader";
import { buttonPrimary, buttonSecondary, containerClass } from "../Components/shared/sectionStyles";
import { baseUrl } from "../utils/constant";
import { sanitizeHtml } from "../utils/sanitizeHtml";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [event, setEvent] = useState(location.state?.event || null);
  const [loading, setLoading] = useState(!location.state?.event);

  useEffect(() => {
    if (event) return;

    const fetchEvent = async () => {
      try {
        const response = await fetch(`${baseUrl}/client/events?exclude_conference=false`);
        const data = await response.json();

        if (data?.status && Array.isArray(data?.data?.events)) {
          const found = data.data.events.find((item) => String(item.id) === String(id));
          setEvent(found || null);
        }
      } catch (err) {
        console.error("Error fetching event details:", err);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [event, id]);

  if (loading) {
    return (
      <main className={`${containerClass} py-16`}>
        <div className="h-10 w-2/3 animate-pulse rounded-xl bg-sky-soft" />
        <div className="mt-6 h-72 animate-pulse rounded-[2rem] bg-sky-soft" />
      </main>
    );
  }

  if (!event) {
    return (
      <main className={`${containerClass} flex min-h-[60vh] flex-col items-center justify-center gap-6 py-16 text-center`}>
        <h1 className="text-3xl font-extrabold tracking-tight text-ink">Event not found</h1>
        <p className="text-ink/60">This event may have finished or been removed.</p>
        <Link to="/" className={buttonPrimary}>Go to Home</Link>
      </main>
    );
  }

  const time = event.time_display || event.time;

  return (
    <>
      <Highlight />

      <main>
        <PageHeader
          breadcrumbs={[
            { label: "Home", to: "/" },
            { label: "Events", to: null },
            { label: event.title, to: null },
          ]}
          eyebrow="Event details"
          title={event.title}
        />

        <section className="py-12 pb-20 sm:py-16 sm:pb-24">
          <div className={`${containerClass} max-w-5xl`}>
            <button type="button" onClick={() => navigate(-1)} className={buttonSecondary}>
              <FaArrowLeft className="text-sm" aria-hidden="true" />
              Back
            </button>

            <article className="mt-6 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-ink/10">
              {event.banner_image && (
                <img src={event.banner_image} alt={event.title} className="max-h-[420px] w-full object-cover" />
              )}

              <div className="p-6 sm:p-10">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <InfoTile icon={IoLocationOutline} label="Location">{event.location || "Online"}</InfoTile>
                  <InfoTile icon={IoCalendarOutline} label="Date">{event.date_display || event.date || "TBA"}</InfoTile>
                  {time && <InfoTile icon={IoTimeOutline} label="Time">{time}</InfoTile>}
                </div>

                <div
                  className="ainet-prose mt-8"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(event.topic_description || event.description || "Details will be announced soon."),
                  }}
                />
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}

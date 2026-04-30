import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaCalendar } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { baseUrl } from "../utils/constant";

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
      <div className="min-h-screen flex items-center justify-center p-8">
        <p className="text-gray-500">Loading event details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 gap-4">
        <h2 className="text-2xl font-semibold">Event not found</h2>
        <button
          className="px-5 py-2 rounded-full bg-black text-white"
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7fc] p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-6 md:p-8">
        <button
          className="mb-5 text-sm font-semibold underline"
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        {event.banner_image && (
          <img
            src={event.banner_image}
            alt={event.title}
            className="w-full max-h-[360px] object-cover rounded-xl mb-6"
          />
        )}

        <h1 className="text-3xl font-bold mb-4">{event.title}</h1>

        <div className="flex flex-wrap gap-6 mb-6">
          <p className="flex items-center text-lg font-medium">
            <MdLocationOn className="mr-2" />
            {event.location || "Online"}
          </p>
          <p className="flex items-center text-lg font-medium">
            <FaCalendar className="mr-2" />
            {event.date_display || event.date || "TBA"}
          </p>
        </div>

        <div className="prose max-w-none text-gray-700">
          <p>{event.topic_description || event.description || "Details will be announced soon."}</p>
        </div>
      </div>
    </div>
  );
}

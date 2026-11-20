import { useState } from 'react';
import { toast } from 'react-toastify';
import { baseUrl } from '../../../utils/constant';
import Loader from '../../shared/Loader';
import { containerClass } from '../../shared/sectionStyles';

const labelClass = "block text-sm font-semibold text-ink";
const inputClass =
  "mt-1.5 h-12 w-full rounded-xl border border-ink/15 bg-white px-4 text-base text-ink placeholder:text-ink/40 transition focus:border-ink focus:outline-none focus:ring-4 focus:ring-sage/60";

export default function NewsletterSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp_no: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.name || !formData.email || !formData.whatsapp_no) {
      toast.error("Please fill all the fields")
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/client/newsletter/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          whatsapp_no: formData.whatsapp_no
        }),
      });
      if (res.ok) {
        const responseData = await res.json();
        toast.success(responseData.message || "Newsletter subscribed successfully")
        setFormData({
          name: '',
          email: '',
          whatsapp_no: ''
        })
      }
      else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to subscribe newsletter")
      }
    }
    catch (err) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <section aria-labelledby="newsletter-title" className="pb-16 sm:pb-20">
      <div className={containerClass}>
        <div className="relative overflow-hidden rounded-[2rem] bg-mist-deep px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
          <div aria-hidden="true" className="hero-dots pointer-events-none absolute inset-0" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-sage/25 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-16 size-80 rounded-full bg-sky/25 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="text-center lg:text-left">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-sage">
                <span className="h-0.5 w-6 rounded-full bg-current" aria-hidden="true" />
                Newsletter
              </p>
              <h2 id="newsletter-title" className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Stay Curious,
                <br />
                Stay Informed!
              </h2>
              <img
                src="/newsletterimg.png"
                alt=""
                className="mx-auto mt-8 w-full max-w-md lg:mx-0"
              />
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-5 rounded-3xl bg-white p-6 shadow-2xl shadow-black/20 sm:p-8">
              <label className="block">
                <span className={labelClass}>Name</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  autoComplete="name"
                  className={inputClass}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="block">
                <span className={labelClass}>Email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your Mail Id"
                  autoComplete="email"
                  className={inputClass}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="block">
                <span className={labelClass}>WhatsApp number</span>
                <input
                  type="tel"
                  name="whatsapp_no"
                  placeholder="Enter your WhatsApp No."
                  inputMode="numeric"
                  autoComplete="tel-national"
                  className={inputClass}
                  value={formData.whatsapp_no}
                  maxLength={10}
                  minLength={10}
                  required
                  onChange={handleChange}
                />
              </label>

              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-full bg-ink px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-ink/85 disabled:opacity-70"
                disabled={loading}
              >
                {loading ? <Loader /> : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

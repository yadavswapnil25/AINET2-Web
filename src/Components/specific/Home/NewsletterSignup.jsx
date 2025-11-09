import { useState } from 'react';
import { toast } from 'react-toastify';
import { baseUrl } from '../../../utils/constant';
import bg1 from "/bg1.png";
import Loader from '../../shared/Loader';

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
      const res = await fetch(`${baseUrl}client/newsletter/subscribe`, {
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
    <div className="w-full  mx-auto p-4 bg-cover rounded-[25px] font-inter"
      style={{
        backgroundImage: `url(${bg1})`
      }}
    >
      <div className="w-full h-full  md:h-[80vh]">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Word Cloud */}
          <div className="w-full md:w-3/5 p-8 relative min-h-[300px] md:min-h-[400px]">
            <h2 className="text-2xl md:text-[45px]  text-white mb-6 font-semibold font-inter">Newsletter</h2>

            {/* Word Cloud */}
            <div className="relative">
              <img src="./newsletterimg.png" alt="newsletterImg" className=' object-cover h-full w-full' />
            </div>
          </div>

          {/* Right side - Form */}
          <div className="w-full md:w-2/5  p-8 flex flex-col justify-center">
            <div className="mb-8 text-left md:text-4xl  font-medium text-[35px]">
              <h3 className="  text-white mb-2">Stay Curious,</h3>
              <h3 className="  text-white">Stay Informed!</h3>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    className="w-full h-[50px] px-4 py-3 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-[#0102038C] placeholder:text-[18px] placeholder:font-semibold placeholder:font-Poppins"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your Mail Id"
                    className="w-full h-[50px] px-4 py-3 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-[#0102038C] placeholder:text-[18px] placeholder:font-semibold placeholder:font-Poppins"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    name="whatsapp_no"
                    placeholder="Enter your WhatsApp No."
                    className="w-full h-[50px] px-4 py-3 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-[#0102038C] placeholder:text-[18px] placeholder:font-semibold placeholder:font-Poppins"
                    value={formData.whatsapp_no}
                    maxLength={10}
                    minLength={10}
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-[#FFF8DE] transition-colors duration-300 text-black font-semibold py-3 px-6 rounded-full flex items-center justify-center text-lg btnshadow"
                    disabled={loading}
                  >
                    {loading ? <Loader /> : "Submit"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
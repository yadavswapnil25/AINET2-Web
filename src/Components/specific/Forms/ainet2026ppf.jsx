import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../../../utils/constant';
import Loader from '../../../Components/shared/Loader';
import { toast } from 'react-toastify';

export default function AINET2026PresentationProposalForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [formData, setFormData] = useState({
    // Main/Single Presenter
    main_title: '',
    main_full_name: '',
    main_place_of_work: '',
    main_country_code: '',
    main_mobile: '',
    main_email: '',

    // Co-Presenter 1
    co1_title: '',
    co1_full_name: '',
    co1_place_of_work: '',
    co1_country_code: '',
    co1_mobile: '',
    co1_email: '',

    // Co-Presenter 2
    co2_title: '',
    co2_full_name: '',
    co2_place_of_work: '',
    co2_country_code: '',
    co2_mobile: '',
    co2_email: '',

    // Conference Details
    conference_sub_theme: '',
    other_sub_theme: '',
    presentation_nature: '',

    // Presentation Details
    presentation_title: '',
    abstract: '',
    main_presenter_bio: '',
    co1_presenter_bio: '',
    co2_presenter_bio: '',
    remaining_copresenters: '',

    agree: false,
  });

  const conferenceSubThemes = [
    'Re-imagining Curriculums and syllabuses',
    'Reforms in testing and evaluation',
    'Professional development for changing teachers',
    'Revisiting English for Professional/ Vocational Programmes',
    'Learner/ Teacher Motivation',
    'Addressing SDGs in ELE',
    'New ways of teaching literature',
    'The future of EMI',
    'ELE and social equity',
    'Next-gen materials/ coursebooks',
    'Towards hybrid teaching/ learning of English',
    'New challenges in methods and approaches',
    'Implications of NEP2020 for ELE',
    'Lessons from history of ELE in India',
    'Changing ELE policies in India and Asia',
    'ELE for inclusive world',
    'Any Other (Specify)'
  ];

  const presentationTypes = ['Paper', 'Video', 'Poster', 'Fast-15'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Word count helpers
  const getWordCount = (text) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  // Form validation
  const validateForm = () => {
    const requiredFields = [
      'main_title', 'main_full_name', 'main_place_of_work', 'main_mobile', 'main_email',
      'conference_sub_theme', 'presentation_nature', 'presentation_title', 'abstract', 'main_presenter_bio'
    ];

    for (let field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === '') {
        toast.error(`Please fill in the ${field.replace('_', ' ')} field.`);
        return false;
      }
    }

    // Validate title word count (max 10 words)
    if (getWordCount(formData.presentation_title) > 10) {
      toast.error("Presentation title must be maximum 10 words.");
      return false;
    }

    // Validate abstract word count (max 150 words)
    if (getWordCount(formData.abstract) > 150) {
      toast.error("Abstract must be maximum 150 words.");
      return false;
    }

    // Validate presenter bio word counts (max 30 words each)
    if (getWordCount(formData.main_presenter_bio) > 30) {
      toast.error("Main presenter bio must be maximum 30 words.");
      return false;
    }

    if (formData.co1_full_name && getWordCount(formData.co1_presenter_bio) > 30) {
      toast.error("Co-presenter 1 bio must be maximum 30 words.");
      return false;
    }

    if (formData.co2_full_name && getWordCount(formData.co2_presenter_bio) > 30) {
      toast.error("Co-presenter 2 bio must be maximum 30 words.");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.main_email)) {
      toast.error("Please enter a valid main presenter email address.");
      return false;
    }

    if (formData.co1_email && !emailRegex.test(formData.co1_email)) {
      toast.error("Please enter a valid co-presenter 1 email address.");
      return false;
    }

    if (formData.co2_email && !emailRegex.test(formData.co2_email)) {
      toast.error("Please enter a valid co-presenter 2 email address.");
      return false;
    }

    // Check if other theme is specified
    if (formData.conference_sub_theme === 'Any Other (Specify)' && !formData.other_sub_theme) {
      toast.error("Please specify the sub-theme.");
      return false;
    }

    if (!formData.agree) {
      toast.error("Please agree to the terms and conditions.");
      return false;
    }

    return true;
  };

  const checkEmailExists = async () => {
    const email = formData.main_email;
    if (!email) return;

    try {
      const res = await fetch(`${baseUrl}client/eventValidationHandle?email=${encodeURIComponent(email)}`);
      
      if (!res.ok) {
        console.error("Failed to check email");
        return false;
      }

      const data = await res.json();

      if (!data.status || data.status === false) {
        setIsEmailValid(false);
        toast.warning("❌ Email already exists. Please use a different email.");
        return false;
      } else {
        setIsEmailValid(true);
        return true;
      }
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const res = await checkEmailExists();
    if (!res) {
      return;
    }

    try {
      setLoading(true);
      setIsSubmitting(true);

      const submissionData = {
        ...formData,
        submission_date: new Date().toISOString(),
        conference_year: 2026
      };

      const response = await fetch(`${baseUrl}client/presentation-proposal-2026`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success("✅ Presentation proposal submitted successfully!");
        setShowSuccessModal(true);
        
        // Reset form
        setFormData({
          main_title: '',
          main_full_name: '',
          main_place_of_work: '',
          main_country_code: '',
          main_mobile: '',
          main_email: '',
          co1_title: '',
          co1_full_name: '',
          co1_place_of_work: '',
          co1_country_code: '',
          co1_mobile: '',
          co1_email: '',
          co2_title: '',
          co2_full_name: '',
          co2_place_of_work: '',
          co2_country_code: '',
          co2_mobile: '',
          co2_email: '',
          conference_sub_theme: '',
          other_sub_theme: '',
          presentation_nature: '',
          presentation_title: '',
          abstract: '',
          main_presenter_bio: '',
          co1_presenter_bio: '',
          co2_presenter_bio: '',
          remaining_copresenters: '',
          agree: false,
        });
      } else {
        const errorData = await response.json();
        toast.error(`${errorData.message || "Something went wrong. Please try again."}`);
      }

    } catch (error) {
      toast.error(`❌ Submission Failed: ${error}`);
      console.error("API Error:", error);
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const isFormValid = () => {
    const requiredFields = [
      'main_title', 'main_full_name', 'main_place_of_work', 'main_mobile', 'main_email',
      'conference_sub_theme', 'presentation_nature', 'presentation_title', 'abstract', 'main_presenter_bio'
    ];

    for (let field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === '') {
        return false;
      }
    }

    if (!formData.agree) return false;
    if (!isEmailValid) return false;
    if (formData.conference_sub_theme === 'Any Other (Specify)' && !formData.other_sub_theme) return false;

    // Check word limits
    if (getWordCount(formData.presentation_title) > 10) return false;
    if (getWordCount(formData.abstract) > 150) return false;
    if (getWordCount(formData.main_presenter_bio) > 30) return false;

    return true;
  };

  return (
    <>
      {loading && <Loader />}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md mx-4">
            <div className="text-center">
              <div className="text-green-600 text-6xl mb-4">✓</div>
              <h3 className="text-xl font-bold mb-4">Proposal Submitted Successfully!</h3>
              <p className="text-gray-600 mb-6">
                Your presentation proposal has been submitted. You will receive a confirmation email shortly.
              </p>
              <button
                onClick={() => { setShowSuccessModal(false); navigate("/") }}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl my-8 border border-blue-500 rounded-lg mx-auto p-6 relative bg-white">
        {/* Close button */}
        <button className="absolute top-2 right-2 bg-black rounded-full p-1">
          <Link to={{ pathname: '/', hash: '#conference' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </Link>
        </button>

        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">7th AINET INTERNATIONAL CONFERENCE</h1>
          <p className="text-lg text-gray-700 mb-1">January 2026</p>
          <p className="text-xl font-semibold text-blue-600 mb-2">"Empowering English Language Education in the Digital Era"</p>
          <p className="text-sm text-gray-600">Supported by British Council & RELO, American Embassy</p>
          <h2 className="text-2xl font-bold py-2 text-center text-gray-800">PRESENTATION PROPOSAL FORM</h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Single/Main Presenter Section */}
          <div className="mb-6">
            <div className="bg-[#A6AEBF] p-2 my-8">
              <h2 className="text-white text-xl">SINGLE/ MAIN PRESENTER</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-semibold mb-1">Title: <span className="text-red-500">*</span></label>
                <select
                  name="main_title"
                  value={formData.main_title}
                  onChange={handleChange}
                  className="w-full p-2 bg-white rounded border border-gray-300"
                  required
                >
                  <option value="">Select Title</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Dr.">Dr.</option>
                  <option value="Prof.">Prof.</option>
                </select>
              </div>
              <div>
                <label className="block text-base font-semibold mb-1">Full Name: <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="main_full_name"
                  value={formData.main_full_name}
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                  className="w-full p-2 bg-white rounded border border-gray-300"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-base font-semibold mb-1">Place Of Work: <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="main_place_of_work"
                  value={formData.main_place_of_work}
                  onChange={handleChange}
                  placeholder="Enter Your Place Of Work"
                  className="w-full p-2 bg-white rounded border border-gray-300"
                  required
                />
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded mt-4">
              <h4 className="text-base font-semibold mb-3">Contact Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Country Code:</label>
                  <input
                    type="text"
                    name="main_country_code"
                    value={formData.main_country_code}
                    onChange={handleChange}
                    placeholder="+91"
                    className="w-full p-2 bg-white rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Mobile: <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    name="main_mobile"
                    value={formData.main_mobile}
                    onChange={handleChange}
                    placeholder="Enter Your Mobile No."
                    className="w-full p-2 bg-white rounded border border-gray-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Email: <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    name="main_email"
                    value={formData.main_email}
                    onBlur={checkEmailExists}
                    onChange={handleChange}
                    placeholder="Enter Your Email"
                    className="w-full p-2 bg-white rounded border border-gray-300"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Co-Presenters Section */}
          <div className="mb-6">
            <div className="bg-[#A6AEBF] p-2 my-8">
              <h2 className="text-white text-xl">CO-PRESENTERS (if applicable)</h2>
            </div>

            {/* Co-Presenter 1 */}
            <div className="mb-6">
              <h4 className="text-base font-semibold mb-3 text-gray-700">Co-presenter 1:</h4>
              <div className="bg-gray-50 p-4 rounded">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Title:</label>
                    <select
                      name="co1_title"
                      value={formData.co1_title}
                      onChange={handleChange}
                      className="w-full p-2 bg-white rounded border border-gray-300"
                    >
                      <option value="">Select Title</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Dr.">Dr.</option>
                      <option value="Prof.">Prof.</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Full Name:</label>
                    <input
                      type="text"
                      name="co1_full_name"
                      value={formData.co1_full_name}
                      onChange={handleChange}
                      placeholder="Enter Full Name"
                      className="w-full p-2 bg-white rounded border border-gray-300"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-1">Place Of Work:</label>
                  <input
                    type="text"
                    name="co1_place_of_work"
                    value={formData.co1_place_of_work}
                    onChange={handleChange}
                    placeholder="Enter Place Of Work"
                    className="w-full p-2 bg-white rounded border border-gray-300"
                  />
                </div>

                <div>
                  <h5 className="text-sm font-semibold mb-2">Contact Details</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1">Country Code:</label>
                      <input
                        type="text"
                        name="co1_country_code"
                        value={formData.co1_country_code}
                        onChange={handleChange}
                        placeholder="Country Code"
                        className="w-full p-2 bg-white rounded border border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Mobile:</label>
                      <input
                        type="tel"
                        name="co1_mobile"
                        value={formData.co1_mobile}
                        onChange={handleChange}
                        placeholder="Enter Your Mobile Number"
                        className="w-full p-2 bg-white rounded border border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Email:</label>
                      <input
                        type="email"
                        name="co1_email"
                        value={formData.co1_email}
                        onChange={handleChange}
                        placeholder="Enter Your Email"
                        className="w-full p-2 bg-white rounded border border-gray-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Co-Presenter 2 */}
            <div className="mb-6">
              <h4 className="text-base font-semibold mb-3 text-gray-700">Co-presenter 2:</h4>
              <div className="bg-gray-50 p-4 rounded">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Title:</label>
                    <select
                      name="co2_title"
                      value={formData.co2_title}
                      onChange={handleChange}
                      className="w-full p-2 bg-white rounded border border-gray-300"
                    >
                      <option value="">Select Title</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Dr.">Dr.</option>
                      <option value="Prof.">Prof.</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Full Name:</label>
                    <input
                      type="text"
                      name="co2_full_name"
                      value={formData.co2_full_name}
                      onChange={handleChange}
                      placeholder="Enter Here"
                      className="w-full p-2 bg-white rounded border border-gray-300"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-1">Place Of Work:</label>
                  <input
                    type="text"
                    name="co2_place_of_work"
                    value={formData.co2_place_of_work}
                    onChange={handleChange}
                    placeholder="Enter Your Place Of Work"
                    className="w-full p-2 bg-white rounded border border-gray-300"
                  />
                </div>

                <div>
                  <h5 className="text-sm font-semibold mb-2">Contact Details</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1">Country Code:</label>
                      <input
                        type="text"
                        name="co2_country_code"
                        value={formData.co2_country_code}
                        onChange={handleChange}
                        placeholder="Country Code"
                        className="w-full p-2 bg-white rounded border border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Mobile:</label>
                      <input
                        type="tel"
                        name="co2_mobile"
                        value={formData.co2_mobile}
                        onChange={handleChange}
                        placeholder="Enter Your Mobile No."
                        className="w-full p-2 bg-white rounded border border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Email:</label>
                      <input
                        type="email"
                        name="co2_email"
                        value={formData.co2_email}
                        onChange={handleChange}
                        placeholder="Enter Your Email"
                        className="w-full p-2 bg-white rounded border border-gray-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Conference Theme Selection */}
          <div className="mb-6">
            <div className="bg-[#A6AEBF] p-2 my-8">
              <h2 className="text-white text-xl">CONFERENCE SUB-THEME</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-base font-semibold mb-1">Which conference sub-theme is your presentation related to? <span className="text-red-500">*</span></label>
                <div className="space-y-2">
                  {conferenceSubThemes.map((theme) => (
                    <label key={theme} className="flex items-center">
                      <input
                        type="radio"
                        name="conference_sub_theme"
                        value={theme}
                        checked={formData.conference_sub_theme === theme}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <span className="text-sm">{theme}</span>
                    </label>
                  ))}
                </div>
              </div>

              {formData.conference_sub_theme === 'Any Other (Specify)' && (
                <div>
                  <label className="block text-base font-semibold mb-1">Please specify: <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="other_sub_theme"
                    value={formData.other_sub_theme}
                    onChange={handleChange}
                    placeholder="Specify your sub-theme"
                    className="w-full p-2 bg-white rounded border border-gray-300"
                    required
                  />
                </div>
              )}
            </div>
          </div>

          {/* Presentation Nature */}
          <div className="mb-6">
            <div className="bg-[#A6AEBF] p-2 my-8">
              <h2 className="text-white text-xl">PRESENTATION TYPE</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-base font-semibold mb-1">What is the nature of your presentation? <span className="text-red-500">*</span></label>
                <div className="flex gap-4">
                  {presentationTypes.map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="radio"
                        name="presentation_nature"
                        value={type}
                        checked={formData.presentation_nature === type}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Presentation Details */}
          <div className="mb-6">
            <div className="bg-[#A6AEBF] p-2 my-8">
              <h2 className="text-white text-xl">PRESENTATION DETAILS</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-base font-semibold mb-1">
                  TITLE (Max. 10 words): <span className="text-red-500">*</span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({getWordCount(formData.presentation_title)}/10 words)
                  </span>
                </label>
                <input
                  type="text"
                  name="presentation_title"
                  value={formData.presentation_title}
                  onChange={handleChange}
                  placeholder="Enter Presentation Title"
                  className={`w-full p-2 bg-white rounded border ${
                    getWordCount(formData.presentation_title) > 10 ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {getWordCount(formData.presentation_title) > 10 && (
                  <p className="text-red-500 text-xs mt-1">Title exceeds 10 words limit</p>
                )}
              </div>

              <div>
                <label className="block text-base font-semibold mb-1">
                  ABSTRACT (Max. 150 words): <span className="text-red-500">*</span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({getWordCount(formData.abstract)}/150 words)
                  </span>
                </label>
                <textarea
                  name="abstract"
                  value={formData.abstract}
                  onChange={handleChange}
                  placeholder="Enter your abstract"
                  className={`w-full p-2 bg-white rounded border ${
                    getWordCount(formData.abstract) > 150 ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows="6"
                  required
                ></textarea>
                {getWordCount(formData.abstract) > 150 && (
                  <p className="text-red-500 text-xs mt-1">Abstract exceeds 150 words limit</p>
                )}
              </div>
            </div>
          </div>

          {/* Presenter Bio Section */}
          <div className="mb-6">
            <div className="bg-[#A6AEBF] p-2 my-8">
              <h2 className="text-white text-xl">PRESENTER BIO (Max. 30 words each)</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-base font-semibold mb-1">
                  Main / Single Presenter: <span className="text-red-500">*</span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({getWordCount(formData.main_presenter_bio)}/30 words)
                  </span>
                </label>
                <textarea
                  name="main_presenter_bio"
                  value={formData.main_presenter_bio}
                  onChange={handleChange}
                  placeholder="Enter main presenter bio (max 30 words)"
                  className={`w-full p-2 bg-white rounded border ${
                    getWordCount(formData.main_presenter_bio) > 30 ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows="3"
                  required
                ></textarea>
                {getWordCount(formData.main_presenter_bio) > 30 && (
                  <p className="text-red-500 text-xs mt-1">Bio exceeds 30 words limit</p>
                )}
              </div>

              {formData.co1_full_name && (
                <div>
                  <label className="block text-base font-semibold mb-1">
                    Co-Presenter 1:
                    <span className="text-sm text-gray-500 ml-2">
                      ({getWordCount(formData.co1_presenter_bio)}/30 words)
                    </span>
                  </label>
                  <textarea
                    name="co1_presenter_bio"
                    value={formData.co1_presenter_bio}
                    onChange={handleChange}
                    placeholder="Enter co-presenter 1 bio (max 30 words)"
                    className={`w-full p-2 bg-white rounded border ${
                      getWordCount(formData.co1_presenter_bio) > 30 ? 'border-red-500' : 'border-gray-300'
                    }`}
                    rows="3"
                  ></textarea>
                  {getWordCount(formData.co1_presenter_bio) > 30 && (
                    <p className="text-red-500 text-xs mt-1">Bio exceeds 30 words limit</p>
                  )}
                </div>
              )}

              {formData.co2_full_name && (
                <div>
                  <label className="block text-base font-semibold mb-1">
                    Co-Presenter 2:
                    <span className="text-sm text-gray-500 ml-2">
                      ({getWordCount(formData.co2_presenter_bio)}/30 words)
                    </span>
                  </label>
                  <textarea
                    name="co2_presenter_bio"
                    value={formData.co2_presenter_bio}
                    onChange={handleChange}
                    placeholder="Enter co-presenter 2 bio (max 30 words)"
                    className={`w-full p-2 bg-white rounded border ${
                      getWordCount(formData.co2_presenter_bio) > 30 ? 'border-red-500' : 'border-gray-300'
                    }`}
                    rows="3"
                  ></textarea>
                  {getWordCount(formData.co2_presenter_bio) > 30 && (
                    <p className="text-red-500 text-xs mt-1">Bio exceeds 30 words limit</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-base font-semibold mb-1">Co-presenters 1:</label>
                <textarea
                  name="remaining_copresenters"
                  value={formData.remaining_copresenters}
                  onChange={handleChange}
                  placeholder="Enter details of co-presenters 1"
                  className="w-full p-2 bg-white rounded border border-gray-300"
                  rows="3"
                ></textarea>
              </div>

              <div>
                <label className="block text-base font-semibold mb-1">Co-presenters 2:</label>
                <textarea
                  name="remaining_copresenters"
                  value={formData.remaining_copresenters}
                  onChange={handleChange}
                  placeholder="Enter details of co-presenters 2"
                  className="w-full p-2 bg-white rounded border border-gray-300"
                  rows="3"
                ></textarea>
              </div>

              <div>
                <label className="block text-base font-semibold mb-1">Remaining Co-presenters (if any):</label>
                <textarea
                  name="remaining_copresenters"
                  value={formData.remaining_copresenters}
                  onChange={handleChange}
                  placeholder="Enter details of additional co-presenters"
                  className="w-full p-2 bg-white rounded border border-gray-300"
                  rows="3"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="mb-6">
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <strong>NOTE:</strong> After receiving the acceptance of your proposal, you and all your co-presenters must register for the conference by completing the Delegate Registration Form by <strong>15 December 2025</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="mb-6">
            <div className="flex items-start">
              <input
                type="checkbox"
                name="agree"
                id="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="mr-2 mt-1 accent-blue-600 w-5 h-5"
                required
              />
              <label className="text-sm" htmlFor="agree">
                I agree to the terms and conditions of the presentation proposal submission and understand that all co-presenters must register for the conference upon acceptance. <span className="text-red-500">*</span>
              </label>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={isSubmitting || !isFormValid()}
              className={`px-8 py-3 rounded-full text-base font-bold transition-colors ${
                isSubmitting || !isFormValid()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-amber-200 hover:bg-amber-300 cursor-pointer'
              }`}
            >
              {isSubmitting ? 'SUBMITTING...' : 'SUBMIT PRESENTATION PROPOSAL'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../../../utils/constant';
import Loader from '../../../Components/shared/Loader';
import { toast } from 'react-toastify';
import { FaArrowRight } from 'react-icons/fa';

export default function AINET2026PresentationProposalForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);

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

  // Step validation functions
  const validateStep1 = () => {
    const requiredFields = ['main_title', 'main_full_name', 'main_place_of_work', 'main_mobile', 'main_email'];
    for (let field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === '') {
        toast.error(`Please fill in the ${field.replace('_', ' ')} field.`);
        return false;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.main_email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (!isEmailValid) {
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    // Step 2 validates Co-Presenter 1 - no required fields for this step
    // All fields in this step are optional, so validation always passes
    return true;
  };

   const validateStep3 = () => {
     // Step 3 validates Co-Presenter 2 & Additional Co-Presenters - no required fields for this step
     // All fields in this step are optional, so validation always passes
     return true;
   };

   const validateStep4 = () => {
     const requiredFields = ['conference_sub_theme', 'presentation_nature'];
     for (let field of requiredFields) {
       if (!formData[field] || formData[field].toString().trim() === '') {
         toast.error(`Please fill in the ${field.replace('_', ' ')} field.`);
         return false;
       }
     }

     if (formData.conference_sub_theme === 'Any Other (Specify)' && !formData.other_sub_theme) {
       toast.error("Please specify the sub-theme.");
       return false;
     }
     return true;
   };

   const validateStep5 = () => {
     const requiredFields = ['presentation_title', 'abstract', 'main_presenter_bio'];
     for (let field of requiredFields) {
       if (!formData[field] || formData[field].toString().trim() === '') {
         toast.error(`Please fill in the ${field.replace('_', ' ')} field.`);
         return false;
       }
     }

     if (getWordCount(formData.presentation_title) > 10) {
       toast.error("Presentation title must be maximum 10 words.");
       return false;
     }

     if (getWordCount(formData.abstract) > 150) {
       toast.error("Abstract must be maximum 150 words.");
       return false;
     }

     if (getWordCount(formData.main_presenter_bio) > 30) {
       toast.error("Main presenter bio must be maximum 30 words.");
       return false;
     }
     return true;
   };

   const validateStep6 = () => {
     if (!formData.agree) {
       toast.error("Please agree to the terms and conditions.");
       return false;
     }
     return true;
   };

  const handleNext = async () => {
    let isValid = false;

     switch (currentStep) {
       case 1:
         isValid = await validateStep1();
         if (isValid) {
           const emailCheck = await checkEmailExists();
           if (!emailCheck) {
             isValid = false;
           }
         }
         break;
       case 2:
         isValid = validateStep2();
         break;
       case 3:
         isValid = validateStep3();
         break;
       case 4:
         isValid = validateStep4();
         break;
       case 5:
         isValid = validateStep5();
         break;
       case 6:
         isValid = validateStep6();
         break;
       default:
         isValid = false;
     }

     if (isValid && currentStep < 6) {
       setCurrentStep(currentStep + 1);
     } else if (isValid && currentStep === 6) {
       handleSubmit();
     }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
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

      <div className=" w-full relative z-10 mx-auto h-full grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-[url('/formbg1.jpg')] bg-cover bg-center py-20">
          {/* Left Side - Event Information */}
          <div className="lg:sticky lg:top-8 h-full flex justify-center items-center">
            <div className="bg-[radial-gradient(circle,rgba(165,239,255,1)_0%,rgba(110,191,244,0.22)_40%,rgba(70,144,212,0)_70%,rgba(255,255,255,0.08)_100%)] rounded-3xl p-8 shadow-2xl h-[550px] w-[70%] flex flex-col justify-between backdrop-blur-md">
              <img
                src="/logo.svg"
                alt="AINET Logo"
                className="w-1/3 mx-auto rounded-full"
              />

              {/* Conference Details */}
              <div className="text-center flex-1 flex flex-col justify-center">
                <h1 className="text-3xl text-gray-800 mb-3 leading-tight font-serif italic">
                  9th AINET INTERNATIONAL CONFERENCE
                </h1>
                <p className="text-2xl text-gray-700 mb-2 leading-tight font-serif italic">
                  January 2026
                </p>
                <p className="text-xl mb-3">
                  Gateway Education, Sonipat, Delhi NCR
                </p>
                <p className="text-2xl font-bold text-gray-800 mb-4 font-serif ">
                  "Empowering English Language Education in the Digital Era"
                </p>
                <p className="text-xs text-gray-500 mb-6">
                  Supported by British Council & RELO, American Embassy
                </p>

                {/* Registration Button */}
                <button className="w-full bg-[rgba(217,217,217,1)] font-serif text-black py-6 px-6  font-semibold text-xl hover:bg-gray-700 hover:text-white transition-colors mb-6 shadow-lg">
                  PRESENTATION PROPOSAL FORM
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="py-10">
          {/* Right Side - Registration Form */}
          <div className=" p-10 h-[650px] flex flex-col overflow-y-auto">
             {/* Step Indicator */}
             <div className="flex items-center justify-center mb-6">
               {[1, 2, 3, 4, 5, 6].map((step) => (
                 <div key={step} className="flex items-center">
                   <div
                     className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                       step === currentStep
                         ? "bg-gray-800 text-white"
                         : step < currentStep
                         ? "bg-green-500 text-white"
                         : "bg-gray-200 text-gray-500"
                     }`}
                   >
                     {step}
                   </div>
                   {step < 6 && (
                     <div
                       className={`w-12 h-0.5 mx-1 transition-all duration-300 ${
                         step < currentStep ? "bg-green-500" : "bg-gray-200"
                       }`}
                     ></div>
                   )}
                 </div>
               ))}
             </div>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex-1 flex flex-col"
            >
              {/* Step 1: Main Presenter Information & Contact */}
              {currentStep === 1 && (
                <div className="flex-1 flex flex-col space-y-4 overflow-y-auto">
                  <div className="bg-gray-400 p-3 rounded">
                    <h2 className="text-white text-lg font-semibold">
                      Main Presenter Information
                    </h2>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                          Title: <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="main_title"
                          value={formData.main_title}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded text-sm"
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
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                          Full Name: <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="main_full_name"
                          value={formData.main_full_name}
                          onChange={handleChange}
                          placeholder="Enter Your Full Name"
                          className="w-full p-3 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Place Of Work: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="main_place_of_work"
                        value={formData.main_place_of_work}
                        onChange={handleChange}
                        placeholder="Enter Your Place Of Work"
                        className="w-full p-3 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>

                  <div className="bg-gray-400 p-2 rounded">
                    <h2 className="text-white text-lg font-semibold">
                      Contact Information
                    </h2>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                          Country Code:
                        </label>
                        <input
                          type="text"
                          name="main_country_code"
                          value={formData.main_country_code}
                          onChange={handleChange}
                          placeholder="+91"
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                          Mobile No: <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="main_mobile"
                          value={formData.main_mobile}
                          onChange={handleChange}
                          placeholder="Enter Your Mobile Number"
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Email: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="main_email"
                        value={formData.main_email}
                        onBlur={checkEmailExists}
                        onChange={handleChange}
                        placeholder="Enter Your Email"
                        className="w-full p-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Co-Presenter 1 */}
              {currentStep === 2 && (
                <div className="flex-1 flex flex-col space-y-4 overflow-y-auto">
                  <div className="bg-gray-400 p-2 rounded">
                    <h2 className="text-white text-lg font-semibold">
                      Co-Presenter 1 (Optional)
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <label className="block text-xs font-semibold mb-1">Title:</label>
                          <select
                            name="co1_title"
                            value={formData.co1_title}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded text-xs"
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
                          <label className="block text-xs font-semibold mb-1">Full Name:</label>
                          <input
                            type="text"
                            name="co1_full_name"
                            value={formData.co1_full_name}
                            onChange={handleChange}
                            placeholder="Enter Full Name"
                            className="w-full p-2 border border-gray-300 rounded text-xs"
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="block text-xs font-semibold mb-1">Place Of Work:</label>
                        <input
                          type="text"
                          name="co1_place_of_work"
                          value={formData.co1_place_of_work}
                          onChange={handleChange}
                          placeholder="Enter Place Of Work"
                          className="w-full p-2 border border-gray-300 rounded text-xs"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-xs font-semibold mb-1">Country Code:</label>
                          <input
                            type="text"
                            name="co1_country_code"
                            value={formData.co1_country_code}
                            onChange={handleChange}
                            placeholder="+91"
                            className="w-full p-2 border border-gray-300 rounded text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1">Mobile:</label>
                          <input
                            type="tel"
                            name="co1_mobile"
                            value={formData.co1_mobile}
                            onChange={handleChange}
                            placeholder="Mobile Number"
                            className="w-full p-2 border border-gray-300 rounded text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold mb-1">Email:</label>
                          <input
                            type="email"
                            name="co1_email"
                            value={formData.co1_email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            className="w-full p-2 border border-gray-300 rounded text-xs"
                          />
                        </div>
                      </div>
                      {formData.co1_full_name && (
                        <div className="mt-3">
                          <label className="block text-xs font-semibold mb-1">
                            Co-Presenter 1 Bio (Max. 30 words):
                            <span className="text-sm text-gray-500 ml-2">
                              ({getWordCount(formData.co1_presenter_bio)}/30 words)
                            </span>
                          </label>
                          <textarea
                            name="co1_presenter_bio"
                            value={formData.co1_presenter_bio}
                            onChange={handleChange}
                            placeholder="Enter co-presenter 1 bio (max 30 words)"
                            className={`w-full p-2 border rounded text-xs ${
                              getWordCount(formData.co1_presenter_bio) > 30 ? 'border-red-500' : 'border-gray-300'
                            }`}
                            rows="2"
                          ></textarea>
                          {getWordCount(formData.co1_presenter_bio) > 30 && (
                            <p className="text-red-500 text-xs mt-1">Bio exceeds 30 words limit</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

               {/* Step 3: Co-Presenter 2 & Additional Co-Presenters */}
               {currentStep === 3 && (
                 <div className="flex-1 flex flex-col space-y-4 overflow-y-auto">
                   <div className="bg-gray-400 p-2 rounded">
                     <h2 className="text-white text-lg font-semibold">
                       Co-Presenter 2 (Optional)
                     </h2>
                   </div>

                   <div className="space-y-4">
                     <div className="bg-gray-50 p-3 rounded">
                       <div className="grid grid-cols-2 gap-3 mb-3">
                         <div>
                           <label className="block text-xs font-semibold mb-1">Title:</label>
                           <select
                             name="co2_title"
                             value={formData.co2_title}
                             onChange={handleChange}
                             className="w-full p-2 border border-gray-300 rounded text-xs"
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
                           <label className="block text-xs font-semibold mb-1">Full Name:</label>
                           <input
                             type="text"
                             name="co2_full_name"
                             value={formData.co2_full_name}
                             onChange={handleChange}
                             placeholder="Enter Full Name"
                             className="w-full p-2 border border-gray-300 rounded text-xs"
                           />
                         </div>
                       </div>
                       <div className="mb-3">
                         <label className="block text-xs font-semibold mb-1">Place Of Work:</label>
                         <input
                           type="text"
                           name="co2_place_of_work"
                           value={formData.co2_place_of_work}
                           onChange={handleChange}
                           placeholder="Enter Place Of Work"
                           className="w-full p-2 border border-gray-300 rounded text-xs"
                         />
                       </div>
                       <div className="grid grid-cols-3 gap-2">
                         <div>
                           <label className="block text-xs font-semibold mb-1">Country Code:</label>
                           <input
                             type="text"
                             name="co2_country_code"
                             value={formData.co2_country_code}
                             onChange={handleChange}
                             placeholder="+91"
                             className="w-full p-2 border border-gray-300 rounded text-xs"
                           />
                         </div>
                         <div>
                           <label className="block text-xs font-semibold mb-1">Mobile:</label>
                           <input
                             type="tel"
                             name="co2_mobile"
                             value={formData.co2_mobile}
                             onChange={handleChange}
                             placeholder="Mobile Number"
                             className="w-full p-2 border border-gray-300 rounded text-xs"
                           />
                         </div>
                         <div>
                           <label className="block text-xs font-semibold mb-1">Email:</label>
                           <input
                             type="email"
                             name="co2_email"
                             value={formData.co2_email}
                             onChange={handleChange}
                             placeholder="Email Address"
                             className="w-full p-2 border border-gray-300 rounded text-xs"
                           />
                         </div>
                       </div>
                       {formData.co2_full_name && (
                         <div className="mt-3">
                           <label className="block text-xs font-semibold mb-1">
                             Co-Presenter 2 Bio (Max. 30 words):
                             <span className="text-sm text-gray-500 ml-2">
                               ({getWordCount(formData.co2_presenter_bio)}/30 words)
                             </span>
                           </label>
                           <textarea
                             name="co2_presenter_bio"
                             value={formData.co2_presenter_bio}
                             onChange={handleChange}
                             placeholder="Enter co-presenter 2 bio (max 30 words)"
                             className={`w-full p-2 border rounded text-xs ${
                               getWordCount(formData.co2_presenter_bio) > 30 ? 'border-red-500' : 'border-gray-300'
                             }`}
                             rows="2"
                           ></textarea>
                           {getWordCount(formData.co2_presenter_bio) > 30 && (
                             <p className="text-red-500 text-xs mt-1">Bio exceeds 30 words limit</p>
                           )}
                         </div>
                       )}
                     </div>
                   </div>

                   <div className="bg-gray-400 p-2 rounded">
                     <h2 className="text-white text-lg font-semibold">
                       Additional Co-Presenters (Optional)
                     </h2>
                   </div>

                   <div className="space-y-4">
                     <div>
                       <label className="block text-sm font-semibold mb-2 text-gray-700">
                         Remaining Co-Presenters (if any):
                       </label>
                       <textarea
                         name="remaining_copresenters"
                         value={formData.remaining_copresenters}
                         onChange={handleChange}
                         placeholder="Enter details of additional co-presenters"
                         className="w-full p-2 border border-gray-300 rounded text-sm"
                         rows="6"
                       ></textarea>
                     </div>
                   </div>
                 </div>
               )}

               {/* Step 4: Conference Theme & Presentation Type */}
               {currentStep === 4 && (
                <div className="flex-1 flex flex-col space-y-4 overflow-y-auto">
                  <div className="bg-gray-400 p-2 rounded">
                    <h2 className="text-white text-lg font-semibold">
                      Conference Theme & Presentation Type
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Conference Sub-theme: <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {conferenceSubThemes.map((theme) => (
                          <label key={theme} className="flex items-center p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
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
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                          Please specify: <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="other_sub_theme"
                          value={formData.other_sub_theme}
                          onChange={handleChange}
                          placeholder="Specify your sub-theme"
                          className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Presentation Type: <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {presentationTypes.map((type) => (
                          <label key={type} className="flex items-center p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50">
                            <input
                              type="radio"
                              name="presentation_nature"
                              value={type}
                              checked={formData.presentation_nature === type}
                              onChange={handleChange}
                              className="mr-2"
                            />
                            <span className="text-sm">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

               {/* Step 5: Presentation Details */}
               {currentStep === 5 && (
                <div className="flex-1 flex flex-col space-y-4 overflow-y-auto">
                  <div className="bg-gray-400 p-2 rounded">
                    <h2 className="text-white text-lg font-semibold">
                      Presentation Details
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Presentation Title (Max. 10 words): <span className="text-red-500">*</span>
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
                        className={`w-full p-2 border rounded text-sm ${
                          getWordCount(formData.presentation_title) > 10 ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {getWordCount(formData.presentation_title) > 10 && (
                        <p className="text-red-500 text-xs mt-1">Title exceeds 10 words limit</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Abstract (Max. 150 words): <span className="text-red-500">*</span>
                        <span className="text-sm text-gray-500 ml-2">
                          ({getWordCount(formData.abstract)}/150 words)
                        </span>
                      </label>
                      <textarea
                        name="abstract"
                        value={formData.abstract}
                        onChange={handleChange}
                        placeholder="Enter your abstract"
                        className={`w-full p-2 border rounded text-sm ${
                          getWordCount(formData.abstract) > 150 ? 'border-red-500' : 'border-gray-300'
                        }`}
                        rows="6"
                      ></textarea>
                      {getWordCount(formData.abstract) > 150 && (
                        <p className="text-red-500 text-xs mt-1">Abstract exceeds 150 words limit</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Main Presenter Bio (Max. 30 words): <span className="text-red-500">*</span>
                        <span className="text-sm text-gray-500 ml-2">
                          ({getWordCount(formData.main_presenter_bio)}/30 words)
                        </span>
                      </label>
                      <textarea
                        name="main_presenter_bio"
                        value={formData.main_presenter_bio}
                        onChange={handleChange}
                        placeholder="Enter main presenter bio (max 30 words)"
                        className={`w-full p-2 border rounded text-sm ${
                          getWordCount(formData.main_presenter_bio) > 30 ? 'border-red-500' : 'border-gray-300'
                        }`}
                        rows="3"
                      ></textarea>
                      {getWordCount(formData.main_presenter_bio) > 30 && (
                        <p className="text-red-500 text-xs mt-1">Bio exceeds 30 words limit</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

               {/* Step 6: Agreement & Terms */}
               {currentStep === 6 && (
                <div className="flex-1 flex flex-col space-y-4 overflow-y-auto">
                  <div className="bg-gray-400 p-2 rounded">
                    <h2 className="text-white text-lg font-semibold">
                      Agreement & Terms
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {/* Important Note */}
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
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

                    {/* Terms Agreement */}
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        name="agree"
                        id="agree"
                        checked={formData.agree}
                        onChange={handleChange}
                        className="mr-2 mt-1 accent-blue-600 w-4 h-4"
                        required
                      />
                      <label className="text-sm" htmlFor="agree">
                        I agree to the terms and conditions of the presentation proposal submission and understand that all co-presenters must register for the conference upon acceptance. <span className="text-red-500">*</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Button - Inside Form */}
              <div className="flex justify-center items-center mt-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-15 py-4 bg-yellow-200 hover:bg-yellow-300 text-black font-bold rounded-full transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                   <span className="text-lg">
                     {currentStep === 6 ? "Submit" : "Continue"}
                   </span>
                   {currentStep < 6 && (
                     <FaArrowRight className="ml-2" />
                   )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

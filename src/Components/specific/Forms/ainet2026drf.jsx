import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl, razorpayKey } from "../../../utils/constant";
import Loader from "../../../Components/shared/Loader";
import { toast } from "react-toastify";
import { FaArrowRight } from "react-icons/fa";
import CountryCodeSelector from "../../shared/CountryCodeSelector";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (document.getElementById('razorpay-sdk')) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.id = 'razorpay-sdk';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const initialDrfFormData = {
  is_ainet_member: "",
  membership_id: "",
  delegate_type: "",
  supporting_document: null,
  title: "",
  full_name: "",
  gender: "",
  age_group: "",
  institution_address: "",
  correspondence_address: "",
  city: "",
  pincode: "",
  state: "",
  country_code: "",
  mobile_no: "",
  email: "",
  areas_of_interest: "",
  area_of_work: [],
  other_work_area: "",
  teaching_experience: "",
  is_presenting: "",
  presentation_type: [],
};

export default function AINET2026DelegateRegistrationForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isWorkAreaDropdownOpen, setIsWorkAreaDropdownOpen] = useState(false);
  const [isFetchingExisting, setIsFetchingExisting] = useState(false);
  const [hasPrefilledFromExisting, setHasPrefilledFromExisting] = useState(false);
  const workAreaDropdownRef = useRef(null);

  const [formData, setFormData] = useState(() => ({ ...initialDrfFormData }));

  const workAreas = [
    'Not Applicable',
    'Primary',
    'Secondary',
    'Junior College (+2)',
    'Senior College/ University',
    'Teacher Education',
    'Other'
  ];

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "email") {
      const trimmedValue = value.trim();
      if (trimmedValue && trimmedValue !== formData.email) {
        setHasPrefilledFromExisting(false);
      }
    }

    if (
      type === "checkbox" &&
      (name === "area_of_work" || name === "presentation_type")
    ) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...(prevData[name] || []), value]
          : (prevData[name] || []).filter((item) => item !== value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFormData((prevData) => ({
      ...prevData,
      supporting_document: file,
    }));
  };

  const toggleWorkAreaDropdown = () => {
    setIsWorkAreaDropdownOpen(!isWorkAreaDropdownOpen);
  };

  const getSelectedWorkAreasText = () => {
    if (formData.area_of_work.length === 0) {
      return "Select Area(s) of your work";
    }
    if (formData.area_of_work.length === 1) {
      return formData.area_of_work[0];
    }
    return `${formData.area_of_work.length} areas selected`;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (workAreaDropdownRef.current && !workAreaDropdownRef.current.contains(event.target)) {
        setIsWorkAreaDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const prefillFormWithRecord = (record) => {
    if (!record) return;

    const areaArray = Array.isArray(record.area_of_work)
      ? record.area_of_work
      : record.area_of_work
      ? record.area_of_work.split(',')
      : [];
    const sanitizedAreas = areaArray
      .map((item) => (typeof item === "string" ? item.trim() : ""))
      .filter(Boolean);

    let otherWorkArea = record.other_work_area || "";
    const areaSet = new Set(sanitizedAreas);
    if (otherWorkArea && !areaSet.has("Other")) {
      areaSet.add("Other");
    }

    if (!sanitizedAreas.includes("Other") && (otherWorkArea || areaSet.has("Other"))) {
      areaSet.add("Other");
    }

    const presentationArray = Array.isArray(record.presentation_type)
      ? record.presentation_type
      : record.presentation_type
      ? record.presentation_type.split(',')
      : [];

    const normalizedCountryCode = record.country_code !== undefined && record.country_code !== null
      ? String(record.country_code).replace(/^\+/, "")
      : "";

    const updatedData = {
      ...initialDrfFormData,
      is_ainet_member: (() => {
        const rawMember = typeof record.member === "string" ? record.member.trim().toLowerCase() : String(record.member ?? "").trim().toLowerCase();
        if (["yes", "1", "true"].includes(rawMember)) {
          return "Yes";
        }
        if (["no", "0", "false"].includes(rawMember)) {
          return "No";
        }
        return formData.is_ainet_member || "";
      })(),
      delegate_type: record.delegate_type || "",
      title: record.title || "",
      full_name: record.full_name || "",
      gender: record.gender || "",
      age_group: record.age ? String(record.age) : "",
      institution_address: record.institution_address || "",
      correspondence_address: record.correspondence_address || "",
      city: record.city || "",
      pincode: record.pincode || "",
      state: record.state || "",
      country_code: normalizedCountryCode,
      mobile_no: record.mobile_no || "",
      email: record.email || formData.email,
      areas_of_interest: record.areas_of_interest || "",
      area_of_work: Array.from(areaSet),
      other_work_area: otherWorkArea || "",
      teaching_experience: record.teaching_experience || "",
      is_presenting: record.is_presenting || "",
      presentation_type: presentationArray.map((item) => item.trim()).filter(Boolean),
    };

    setFormData(updatedData);
    setCurrentStep(1);
    if (!hasPrefilledFromExisting) {
      toast.info("Existing registration details have been populated.");
      setHasPrefilledFromExisting(true);
    }
  };

  const handleEmailBlur = async () => {
    const email = formData.email?.trim();
    if (!email || !emailRegex.test(email)) {
      return;
    }

    try {
      setIsFetchingExisting(true);
      const response = await fetch(`${baseUrl}/client/ainet2020drf/check?email=${encodeURIComponent(email)}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      const result = await response.json();

      if (!response.ok || result?.status === false) {
        return;
      }

      if (result?.data?.exists && result.data.drf) {
        prefillFormWithRecord(result.data.drf);
      }
    } catch (error) {
      console.error("Failed to fetch existing DRF record:", error);
    } finally {
      setIsFetchingExisting(false);
    }
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
 
    if (!isFormValid()) return;

    const payload = {
      member: formData.is_ainet_member,
      you_are_register_as: formData.delegate_type,
      pre_title: formData.title,
      name: formData.full_name,
      gender: formData.gender,
      age: Number(formData.age_group) || 0,
      institution: formData.institution_address,
      address: formData.correspondence_address,
      city: formData.city,
      pincode: formData.pincode,
      state: formData.state,
      country_code: formData.country_code ? `+${formData.country_code.replace(/^\+/, "")}` : "",
      phone_no: formData.mobile_no.replace(/\s+/g, ""),
      email: formData.email,
      areas: formData.area_of_work,
      areas_of_interest: formData.areas_of_interest,
      other: formData.other_work_area,
      experience: formData.teaching_experience,
      conference: formData.is_presenting === "YES" ? "Yes" : "No",
      types: formData.is_presenting === "YES" ? formData.presentation_type : [],
    };

    try {
      setLoading(true);
      setIsSubmitting(true);

      const response = await fetch(`${baseUrl}/client/ainet2020drf`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      let result = null;
      try {
        result = await response.json();
      } catch (parseError) {
        result = null;
      }
 
      if (!response.ok || (result && result.status === false)) {
        const errorMessage =
          result?.errors && typeof result.errors === "object"
            ? Object.values(result.errors)[0]?.[0] || result.message
            : result?.message;
        throw new Error(errorMessage || "Failed to submit registration.");
      }
 
      const drfId = result?.data?.id;

      if (!drfId) {
        throw new Error("Missing registration reference.");
      }

      await startDrfPaymentFlow(drfId);
 
       toast.success("✅ Delegate registration and payment completed successfully!");
       setFormData({ ...initialDrfFormData });
       setSelectedFile(null);
       setCurrentStep(1);
       setHasPrefilledFromExisting(false);
       navigate("/form-submission-confirmation");
     } catch (error) {
       console.error("Submission Error:", error);
       toast.error(`❌ ${error?.message || 'Registration or payment failed. Please try again.'}`);
     } finally {
       setIsSubmitting(false);
       setLoading(false);
     }
   };

  const startDrfPaymentFlow = async (drfId) => {
    const orderResponse = await fetch(`${baseUrl}/client/ainet2020drf/payment/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ drf_id: drfId }),
    });

    const orderResult = await orderResponse.json();

    if (!orderResponse.ok || orderResult?.status === false) {
      const message = orderResult?.message || "Unable to initiate payment.";
      throw new Error(message);
    }

    const orderData = orderResult?.data?.order;
    const orderAmount = orderResult?.data?.amount;
    const orderCurrency = orderResult?.data?.currency || (orderData?.currency ?? "INR");
    const orderId = orderData?.id;
    const key = orderResult?.data?.key || razorpayKey;

    if (!orderId || !orderAmount) {
      throw new Error("Invalid payment order details.");
    }

    const sdkLoaded = await loadRazorpayScript();
    if (!sdkLoaded) {
      throw new Error("Unable to load Razorpay SDK. Please check your connection.");
    }

    const contactNumber = formData.mobile_no ? `${formData.country_code ? `+${formData.country_code}` : ""}${formData.mobile_no}` : undefined;

    await new Promise((resolve, reject) => {
      const options = {
        key,
        amount: orderAmount,
        currency: orderCurrency,
        name: "AINET",
        description: "AINET 2026 Delegate Registration",
        order_id: orderId,
        prefill: {
          name: formData.full_name || "",
          email: formData.email || "",
          contact: contactNumber || "",
        },
        notes: {
          drf_id: String(drfId),
          delegate_type: formData.delegate_type || "",
        },
        theme: { color: "#0f172a" },
        handler: async (response) => {
          try {
            const confirmResponse = await fetch(`${baseUrl}/client/ainet2020drf/payment/confirm`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                drf_id: drfId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const confirmResult = await confirmResponse.json();

            if (!confirmResponse.ok || confirmResult?.status === false) {
              reject(new Error(confirmResult?.message || "Payment confirmation failed."));
              return;
            }

            resolve(true);
          } catch (confirmationError) {
            reject(confirmationError);
          }
        },
        modal: {
          ondismiss: () => {
            reject(new Error("Payment popup closed before completion."));
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on("payment.failed", (response) => {
        reject(new Error(response?.error?.description || "Payment failed."));
      });

      razorpayInstance.open();
    });
  };


  const isFormValid = () => {
    const requiredFields = [
      "is_ainet_member",
      "delegate_type",
      "title",
      "full_name",
      "gender",
      "age_group",
      "institution_address",
      "correspondence_address",
      "city",
      "pincode",
      "state",
      "country_code",
      "mobile_no",
      "email",
    ];

    for (let field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === "") {
        return false;
      }
    }

    // Validate AINET membership ID if member is selected
    if (formData.is_ainet_member === "Yes" && !formData.membership_id.trim()) {
      return false;
    }

    // Validate age is a valid number
    const age = parseInt(formData.age_group);
    if (isNaN(age) || age < 1 || age > 120) {
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return false;
    }

    // Validate mobile number format
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.mobile_no.replace(/\D/g, ""))) {
      return false;
    }

    if (!isEmailValid) return false;

    // Validate conditional fields
    if (formData.area_of_work.length === 0) {
      return false;
    }

    if (formData.area_of_work.includes("Other") && !formData.other_work_area.trim()) {
      return false;
    }

    if (!formData.teaching_experience || formData.teaching_experience.toString().trim() === "") {
      return false;
    }

    if (!formData.is_presenting) {
      return false;
    }

    if (formData.is_presenting === "YES" && formData.presentation_type.length === 0) {
      return false;
    }

    return true;
  };

  // Step validation functions
  const validateStep1 = () => {
    // Validate AINET membership selection
    if (!formData.is_ainet_member) {
      toast.error("Please select if you are an AINET member.");
      return false;
    }

    // Validate membership ID if member is selected
    if (formData.is_ainet_member === "Yes" && !formData.membership_id.trim()) {
      toast.error("Please enter your AINET membership ID.");
      return false;
    }

    if (!formData.email || formData.email.toString().trim() === "") {
      toast.error("Please enter your email address.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    // Validate delegate type selection
    if (!formData.delegate_type) {
      toast.error("Please select your registration type.");
      return false;
    }

    return true;
  };

  const validateStep2 = () => {
    // Validate required fields
    const requiredFields = ["title", "full_name", "gender", "age_group"];
    for (let field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === "") {
        toast.error(`Please fill in the ${field.replace("_", " ")} field.`);
        return false;
      }
    }

    // Validate age is a valid number
    const age = parseInt(formData.age_group);
    if (isNaN(age) || age < 1 || age > 120) {
      toast.error("Please enter a valid age between 1 and 120.");
      return false;
    }

    return true;
  };

  const validateStep3 = () => {
    // Validate required fields
    const requiredFields = [
      "institution_address",
      "correspondence_address",
      "city",
      "pincode",
      "state",
      "country_code",
      "mobile_no",
    ];
    for (let field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === "") {
        toast.error(`Please fill in the ${field.replace("_", " ")} field.`);
        return false;
      }
    }

    // Validate mobile number format
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.mobile_no.replace(/\D/g, ""))) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return false;
    }
    
    return true;
  };

  const validateStep4 = () => {
    // Step 4 validates Professional Information - user must select at least one work area
    
    if (formData.area_of_work.length === 0) {
      toast.error("Please select at least one area of your work.");
      return false;
    }
    
    // If "Other" is selected in area of work, validate the specification
    if (formData.area_of_work.includes("Other") && !formData.other_work_area.trim()) {
      toast.error("Please specify your work area when 'Other' is selected.");
      return false;
    }
    
    if (!formData.teaching_experience || formData.teaching_experience.toString().trim() === "") {
      toast.error("Please select your teaching experience.");
      return false;
    }

    return true;
  };

  const validateStep5 = () => {
    // Step 5 validates Conference Participation - user must select if presenting or not
    
    if (!formData.is_presenting) {
      toast.error("Please select whether you are presenting at the conference or not.");
      return false;
    }
    
    // If user is presenting, validate presentation types
    if (formData.is_presenting === "YES" && formData.presentation_type.length === 0) {
      toast.error("Please select at least one presentation type if you are presenting.");
      return false;
    }
    
    return true;
  };

  const handleNext = async () => {
    let canProceed = false;

    switch (currentStep) {
      case 1:
        // Validate Step 1 with proper validation
        canProceed = validateStep1();
        break;
      case 2:
        // Validate Step 2 with proper validation
        canProceed = validateStep2();
        break;
      case 3:
        canProceed = validateStep3();
        if (canProceed) {
        //   const emailCheck = await checkEmailExists();
        //   if (!emailCheck) {
        //     canProceed = false;
        //   }
        }
        break;
      case 4:
        // Validate Step 4 with proper validation
        canProceed = validateStep4();
        break;
      case 5:
        // Validate Step 5 with proper validation
        canProceed = validateStep5();
        break;
      default:
        canProceed = false;
    }

    if (canProceed && currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else if (canProceed && currentStep === 5) {
      handleSubmit();
    }
    // Note: Error messages are handled within individual validation functions
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      {loading && <Loader />}

      <div className=" w-full relative z-10 mx-auto h-full grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-[url('/formbg.jpg')] bg-cover bg-center py-8 md:py-20">
          {/* Left Side - Event Information */}
          <div className="lg:sticky lg:top-8 h-full flex justify-center items-center px-4">
            <div className="rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl h-[400px] md:h-[500px] lg:h-[550px] w-full max-w-sm sm:max-w-md md:max-w-lg lg:w-[70%] flex flex-col justify-between backdrop-blur-md border border-white/20" style={{
              background: 'radial-gradient(90.16% 143.01% at 15.32% 21.04%, rgba(165, 239, 255, 0.2) 0%, rgba(110, 191, 244, 0.0447917) 77.08%, rgba(70, 144, 213, 0) 100%)',
              backgroundBlendMode: 'overlay',
              backgroundColor: 'rgba(255, 255, 255, 0.08)'
            }}>
              <img
                src="/logo.svg"
                alt="AINET Logo"
                className="w-1/5 sm:w-1/4 md:w-1/3 lg:w-1/3 mx-auto rounded-full"
              />

              {/* Conference Details */}
              <div className="text-center flex-1 flex flex-col justify-center">
                <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-800 mb-2 md:mb-3 lg:mb-4 leading-tight font-serif italic">
                  9th AINET INTERNATIONAL CONFERENCE
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 mb-1 md:mb-2 leading-tight font-serif italic">
                  January 2026
                </p>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mb-2 md:mb-3">
                  Gateway Education, Sonipat, Delhi NCR
                </p>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-800 mb-3 md:mb-4 lg:mb-5 font-serif">
                  "Empowering English Language Education in the Digital Era"
                </p>
                <p className="text-xs sm:text-xs md:text-sm lg:text-sm text-gray-500 mb-4 md:mb-5 lg:mb-6">
                  <span className="px-3 py-1 bg-yellow-200 text-gray-800 font-semibold rounded-full inline-block">
                    Supported by British Council &amp; RELO, American Embassy
                  </span>
                </p>

                {/* Registration Button */}
                <button className="w-full bg-[rgba(217,217,217,1)] font-serif text-black py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 px-3 sm:px-4 md:px-5 lg:px-6 font-semibold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl hover:bg-gray-700 hover:text-white transition-colors mb-3 md:mb-4 lg:mb-5 xl:mb-6 shadow-lg">
                  DELEGATE REGISTRATION FORM
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="py-10">
          {/* Right Side - Registration Form */}
          <div className=" p-4 md:p-10 h-[650px] flex flex-col overflow-y-auto">
            {/* Step Indicator */}
            <div className="flex items-center justify-center mb-6">
              {[1, 2, 3, 4, 5].map((step) => (
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
                  {step < 5 && (
                    <div
                      className={` md:w-12 w-6 h-0.5 mx-1 transition-all duration-300 ${
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
              {/* Step 1: AINET Membership Information */}
              {currentStep === 1 && (
                <div className="flex-1 flex flex-col space-y-4 overflow-y-auto">
                  <div className="bg-gray-400 p-3 rounded">
                    <h2 className="text-white text-lg font-semibold">
                      AINET Membership Information
                    </h2>
                  </div>

                  <div>
                    <label className="block text-base font-semibold mb-1 text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      onBlur={handleEmailBlur}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full p-3 border border-gray-300 rounded text-sm"
                    />
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-base font-semibold mb-1 text-gray-700">
                        Are you an AINET member?{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="is_ainet_member"
                            value="Yes"
                            checked={formData.is_ainet_member === "Yes"}
                            onChange={handleChange}
                            className="mr-1"
                          />
                          <span className="text-base">Yes</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name="is_ainet_member"
                            value="No"
                            checked={formData.is_ainet_member === "No"}
                            onChange={handleChange}
                            className="mr-1"
                          />
                          <span className="text-base">No</span>
                        </label>
                      </div>
                    </div>

                    {formData.is_ainet_member === "Yes" && (
                      <div>
                        <label className="block text-xs font-semibold mb-1 text-gray-700">
                          Membership ID:
                        </label>
                        <input
                          type="text"
                          name="membership_id"
                          value={formData.membership_id}
                          onChange={handleChange}
                          placeholder="Enter Your Membership Number"
                          className="w-full p-3 border border-gray-300 rounded text-sm"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Not sure of your ID?{" "}
                          <Link to="/login" className="text-blue-600">
                            Login here
                          </Link>
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-400 p-3 rounded">
                    <h2 className="text-white text-lg font-semibold">
                      AINET Membership Information
                    </h2>
                  </div>

                  <div className="flex-1">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        You are registering as:{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          "Research & PG Students (Indian)",
                          "Others, Including Teachers (Indian)",
                          "Overseas Participants",
                        ].map((type) => (
                          <label
                            key={type}
                            className="flex items-center p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50"
                          >
                            <input
                              type="radio"
                              name="delegate_type"
                              value={type}
                              checked={formData.delegate_type === type}
                              onChange={handleChange}
                              className="mr-2"
                            />
                            <div>
                              <span className="text-sm font-medium">
                                {type}
                              </span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* Step 2: Personal Information */}
              {currentStep === 2 && (
                <div className="flex-1 flex flex-col space-y-6 overflow-y-auto">
                  <div className="bg-gray-400 p-2 rounded">
                    <h2 className="text-white text-sm font-semibold">
                      Personal Information
                    </h2>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-3 sm:grid-cols-2 gap-4">
                      {/* Title */}
                      <div className="col-span-1 sm:col-span-1">
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                          Title: <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="title"
                          value={formData.title}
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

                      {/* Full Name */}
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                          Full Name: <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleChange}
                          placeholder="Enter Your Name"
                          className="w-full p-3 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-2 gap-4">
                      {/* Gender */}
                      <div className="col-span-1 sm:col-span-1">
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                          Gender: <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded text-sm"
                        >
                          <option value="">Select Your Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      {/* Age */}
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                          Age (Years): <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="age_group"
                          value={formData.age_group}
                          onChange={handleChange}
                          placeholder="Enter your age"
                          min="1"
                          max="120"
                          className="w-full p-3 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Address & Contact Information */}
              {currentStep === 3 && (
                <div className="flex-1 flex flex-col space-y-4 overflow-y-auto">
                  <div className="bg-gray-400 py-1 px-2 rounded">
                    <h2 className="text-white text-lg font-semibold">
                      Address Information
                    </h2>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Institution Address:{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="institution_address"
                        value={formData.institution_address}
                        onChange={handleChange}
                        placeholder="Enter Your Institution Address"
                        className="w-full p-3 border border-gray-300 rounded text-sm"
                        rows="3"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Address for Correspondence:{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="correspondence_address"
                        value={formData.correspondence_address}
                        onChange={handleChange}
                        placeholder="Enter Your Correspondence Address"
                        className="w-full p-3 border border-gray-300 rounded text-sm"
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        City: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter Your City"
                        className="w-full p-3 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Pincode: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="Enter Pincode"
                        className="w-full p-3 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        State: <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded text-sm"
                      >
                        <option value="">Select State / Union Territory</option>
                        {indianStates.map((stateName) => (
                          <option key={stateName} value={stateName}>
                            {stateName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="bg-gray-400 p-2 rounded">
                    <h2 className="text-white text-lg font-semibold">
                      Contact Information
                    </h2>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 items-end">
                      <div className="col-span-1 sm:col-span-1 flex flex-col">
                        <label className="block text-sm font-semibold mb-2 text-gray-700 leading-tight">
                          Country Code: <span className="text-red-500">*</span>
                        </label>
                        <CountryCodeSelector
                          name="country_code"
                          value={formData.country_code}
                          onChange={handleChange}
                          placeholder="Select Country Code"
                          preferredDirection="up"
                          className="w-full"
                        />
                      </div>
                      <div className="col-span-1 sm:col-span-2 flex flex-col">
                        <label className="block text-sm font-semibold mb-2 text-gray-700 leading-tight">
                          Mobile No: <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="mobile_no"
                          maxLength={10}
                          value={formData.mobile_no}
                          onChange={handleChange}
                          placeholder="Enter Your Mobile Number"
                          className="w-full p-3 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Professional Information */}
              {currentStep === 4 && (
                <div className="flex-1 flex flex-col space-y-4 overflow-y-auto">
                  <div className="bg-gray-400 p-2 rounded">
                    <h2 className="text-white text-lg font-semibold">
                      Professional Information
                    </h2>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Areas of your special interest: 
                      </label>
                      <textarea
                        name="areas_of_interest"
                        value={formData.areas_of_interest}
                        onChange={handleChange}
                        placeholder="Enter your areas of interest"
                        className="w-full p-3 border border-gray-300 rounded text-sm"
                        rows="3"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Area(s) of your work: <span className="text-red-500">*</span>
                      </label>
                      <div className="relative" ref={workAreaDropdownRef}>
                        <button
                          type="button"
                          onClick={toggleWorkAreaDropdown}
                          className="w-full p-3 border border-gray-300 rounded text-sm bg-white text-left flex items-center justify-between"
                        >
                          <span className={formData.area_of_work.length === 0 ? "text-gray-500" : "text-gray-900"}>
                            {getSelectedWorkAreasText()}
                          </span>
                          <svg
                            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                              isWorkAreaDropdownOpen ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        {isWorkAreaDropdownOpen && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                            <div className="p-2">
                              {workAreas.map((area) => (
                                <label key={area} className="flex items-center p-2 hover:bg-gray-50 cursor-pointer rounded">
                                  <input
                                    type="checkbox"
                                    name="area_of_work"
                                    value={area}
                                    checked={formData.area_of_work.includes(area)}
                                    onChange={handleChange}
                                    className="mr-3 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                  />
                                  <span className="text-sm text-gray-900">{area}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {formData.area_of_work.includes("Other") && (
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                          Other - Please Specify: <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="other_work_area"
                          value={formData.other_work_area}
                          onChange={handleChange}
                          placeholder="Please specify your work area"
                          className="w-full p-3 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Teaching Experience (Years): <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="teaching_experience"
                        value={formData.teaching_experience}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded text-sm"
                      >
                        <option value="">Select Experience</option>
                        <option value="Less than 2 years">Less than 2 years</option>
                        <option value="2-5 years">2-5 years</option>
                        <option value="5-10 years">5-10 years</option>
                        <option value="10-15 years">10-15 years</option>
                        <option value="15-20 years">15-20 years</option>
                        <option value="Over 20 years">Over 20 years</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Conference Participation & Account Setup */}
              {currentStep === 5 && (
                <div className="flex-1 flex flex-col space-y-4 overflow-y-auto">
                  <div className="bg-gray-400 py-1 px-2 rounded">
                    <h2 className="text-white text-lg font-semibold">
                      Conference Participation
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Are you presenting anything at the conference? <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-6">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="is_presenting"
                            value="YES"
                            checked={formData.is_presenting === "YES"}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          <span className="text-sm">YES</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="is_presenting"
                            value="NO"
                            checked={formData.is_presenting === "NO"}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          <span className="text-sm">NO</span>
                        </label>
                      </div>
                    </div>

                    {formData.is_presenting === "YES" && (
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                          If yes, what are you presenting?
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {["Paper", "Poster", "Virtual Presentation", "Workshop"].map((type) => (
                            <label
                              key={type}
                              className="flex items-center  cursor-pointer hover:bg-gray-50"
                            >
                              <input
                                type="checkbox"
                                name="presentation_type"
                                value={type}
                                checked={formData.presentation_type.includes(
                                  type
                                )}
                                onChange={handleChange}
                                className="mr-3"
                              />
                              <span className="text-sm">{type}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Delegate Fee Information */}
                  {formData.delegate_type && (
                    <div className="bg-blue-50 p-4 rounded border border-blue-200">
                      <h4 className="font-semibold mb-3 text-blue-800 text-sm">
                        Delegate Fee:
                      </h4>

                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div>
                          <h5 className="font-semibold mb-3 text-blue-800 text-sm">
                            Up to 25 December 2025
                          </h5>
                          <div className="space-y-2 text-sm">
                            <p>• Teachers and PG students: INR 1200</p>
                            <p>• Other Including teachers: INR 2500</p>
                            <p>• All Overseas participants: INR 5000</p>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-blue-800 text-sm">
                            {" "}
                            After 25 December 2025
                          </h5>
                          <div className="space-y-2 text-sm">
                            <p>• Teachers and PG students: INR 2000</p>
                            <p>• Other Including teachers: INR 3500</p>
                            <p>• All Overseas participants: INR 5000</p>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-red-500 mt-3 font-semibold">
                        *AINET members are entitled to 20% discount in the
                        delegate fee applicable at the time of payment
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons - Inside Form */}
              <div className="flex relative justify-between items-center mt-4 pt-4 border-t border-gray-200">
                {/* Back Button */}
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="px-6 py-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-full transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-lg">Back</span>
                  </button>
                )}
                
                {/* Spacer for single button centering */}
                {currentStep === 1 && <div></div>}
                
                {/* Continue/Submit Button */}
                <button
                  type="button"
                  onClick={handleNext}
                  className= {`px-15 py-4 bg-yellow-200 hover:bg-yellow-300 text-black font-bold rounded-full transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105 ${currentStep === 1 ? "absolute left-1/2 -translate-x-1/2" : "relative"}`}
                >
                  <span className="text-lg">
                    {currentStep === 5 ? "Submit" : "Continue"}
                  </span>
                  {currentStep < 5 && (
                    <FaArrowRight className="ml-2" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Removed formSubmissionConfirmation and related ref */}
    </>
  );
}

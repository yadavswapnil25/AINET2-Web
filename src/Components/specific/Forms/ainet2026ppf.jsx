import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../../utils/constant";
import Loader from "../../../Components/shared/Loader";
import { toast } from "react-toastify";
import { FaArrowRight } from "react-icons/fa";
import CountryCodeSelector from "../../shared/CountryCodeSelector";
import FormSubmissionConfirmation from "../../../Pages/FormSubmissionConfirmation";

export default function AINET2026PresentationProposalForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem("ainet2026ppf_currentStep");
    return savedStep ? parseInt(savedStep, 10) : 1;
  });
  const [formSubmissionConfirmation, setFormSubmissionConfirmation] = useState(false);

  // Helper function to format field names for error messages
  const formatFieldName = (fieldName) => {
    const formattedName = fieldName
      .replace(/^main_/i, "") // Remove "main_" prefix (case insensitive)
      .replace(/^co1_/i, "") // Remove "co1_" prefix (case insensitive)
      .replace(/^co2_/i, "") // Remove "co2_" prefix (case insensitive)
      .replace(/_/g, " ") // Replace all underscores with spaces
      .split(" ") // Split into words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(" "); // Join back with spaces
    if (fieldName === "main_presenter_bio") {
      return "Presenter's Bio";
    }
    return formattedName;
  };

  // Initialize formData with saved data from localStorage if available
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("ainet2026ppf_formData");
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error("Error parsing saved form data:", error);
      }
    }
    // Default empty form data
    return {
      // Main/Single Presenter
      main_title: "",
      main_full_name: "",
      main_place_of_work: "",
      main_country_code: "",
      main_mobile: "",
      main_email: "",

      // Co-Presenter 1
      co1_title: "",
      co1_full_name: "",
      co1_place_of_work: "",
      co1_country_code: "",
      co1_mobile: "",
      co1_email: "",

      // Co-Presenter 2
      co2_title: "",
      co2_full_name: "",
      co2_place_of_work: "",
      co2_country_code: "",
      co2_mobile: "",
      co2_email: "",

      // Conference Details
      conference_sub_theme: "",
      other_sub_theme: "",
      presentation_nature: "",

      // Presentation Details
      presentation_title: "",
      abstract: "",
      main_presenter_bio: "",
      co1_presenter_bio: "",
      co2_presenter_bio: "",
      remaining_copresenters: "",

      agree: false,
    };
  });

  // Auto-save functionality: Save form data and current step to localStorage
  useEffect(() => {
    localStorage.setItem("ainet2026ppf_formData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("ainet2026ppf_currentStep", currentStep.toString());
  }, [currentStep]);

  const conferenceSubThemes = [
    "ELE for an Inclusive World",
    "National and State Education Policies and ELE",
    "Emerging Trends in the Teaching/Learning of English",
    "English for Technical, Vocational and Professional Purposes",
    "ELE in Multilingual Contexts",
    "Technological Frontiers in ELE",
    "English for Employability and Entrepreneurship",
    "Trends and Innovations in ELE – Materials, Methods, Assessment",
    "Teacher Education and Professional Development ",
    "Alternative and non-formal ELE",
    "History of ELE in the Global South",
    "Teaching English Literature in the Global South",
    "Researching ELE in the Global South",
    "Any Other (Specify)"
  ];

  const presentationTypes = ["Paper (15 mins)", "Workshop (30 mins)", "Poster", "Virtual (15 mins)"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };



  // Word count helpers
  const getWordCount = (text) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  // Form validation
  const validateForm = () => {
    const requiredFields = [
      "main_title",
      "main_full_name",
      "main_place_of_work",
      "main_mobile",
      "main_email",
      "conference_sub_theme",
      "presentation_nature",
      "presentation_title",
      "abstract",
      "main_presenter_bio",
    ];

    for (let field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === "") {
        toast.error(`Please fill in the ${formatFieldName(field)} field.`);
        return false;
      }
    }

    // Validate conference sub-theme selection
    if (formData.conference_sub_theme.length === 0) {
      toast.error("Please select at any one conference sub-theme.");
      return false;
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

    if (
      formData.co1_full_name &&
      getWordCount(formData.co1_presenter_bio) > 30
    ) {
      toast.error("Co-presenter 1 bio must be maximum 30 words.");
      return false;
    }

    // Validate co-presenter 2 bio if co-presenter 2 information is provided
    if (
      formData.co2_full_name ||
      formData.co2_place_of_work
    ) {
      if (!formData.co2_presenter_bio || !formData.co2_presenter_bio.trim()) {
        toast.error("Please fill in the Co-presenter 2 Bio field.");
        return false;
      }
      if (getWordCount(formData.co2_presenter_bio) > 30) {
        toast.error("Co-presenter 2 bio must be maximum 30 words.");
        return false;
      }
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

    // Mobile number validation (basic format check)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.main_mobile.replace(/\D/g, ""))) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return false;
    }

    if (
      formData.co1_mobile &&
      !mobileRegex.test(formData.co1_mobile.replace(/\D/g, ""))
    ) {
      toast.error(
        "Please enter a valid 10-digit mobile number for co-presenter 1."
      );
      return false;
    }

    if (
      formData.co2_mobile &&
      !mobileRegex.test(formData.co2_mobile.replace(/\D/g, ""))
    ) {
      toast.error(
        "Please enter a valid 10-digit mobile number for co-presenter 2."
      );
      return false;
    }

    // Check if other theme is specified
    if (
      formData.conference_sub_theme === "Any Other (Specify)" &&
      !formData.other_sub_theme.trim()
    ) {
      toast.error("Please specify the sub-theme.");
      return false;
    }

    if (!formData.agree) {
      toast.error("Please agree to the terms and conditions.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    if (!validateForm()) return;

    try {
      setLoading(true);
      setIsSubmitting(true);

      // Map form data to API body structure
      const apiBody = {
        main_title: formData.main_title,
        main_name: formData.main_full_name,
        main_work: formData.main_place_of_work,
        presenter_main_country_code: formData.main_country_code || "91", // Default to India if not selected
        main_phone: formData.main_mobile,
        presenter_main_email: formData.main_email,
        pr_area: formData.conference_sub_theme, // Single theme selection
        pr_area_specify: formData.other_sub_theme || "",
        pr_nature: formData.presentation_nature,
        pr_abstract: formData.abstract,
        presenter_bio: formData.main_presenter_bio,
        pr_title: formData.presentation_title,
        co1_title: formData.co1_title || "",
        co1_name: formData.co1_full_name || "",
        co1_work: formData.co1_place_of_work || "",
        co1_country_code: formData.co1_country_code || "",
        co1_phone: formData.co1_mobile || "",
        co1_email: formData.co1_email || "",
        co_presenter_1_bio: formData.co1_presenter_bio || "",
        co2_title: formData.co2_title || "",
        co2_name: formData.co2_full_name || "",
        co2_work: formData.co2_place_of_work || "",
        co2_country_code: formData.co2_country_code || "",
        co2_phone: formData.co2_mobile || "",
        co2_email: formData.co2_email || "",
        co_presenter_2_bio: formData.co2_presenter_bio || "",
        pr3_bio: formData.remaining_copresenters || "",
      };

      console.log("Submitting API request with body:", apiBody);

      const response = await fetch(`${baseUrl}/client/ainet2025ppf`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiBody),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle different HTTP error statuses
        if (response.status === 400) {
          throw new Error(
            result.message || "Invalid form data. Please check your inputs."
          );
        } else if (response.status === 401) {
          throw new Error("Unauthorized access. Please try again.");
        } else if (response.status === 403) {
          throw new Error("Access forbidden. Please contact support.");
        } else if (response.status === 404) {
          throw new Error("Service not found. Please try again later.");
        } else if (response.status === 422) {
          throw new Error(
            result.message || "Validation failed. Please check your form data."
          );
        } else if (response.status >= 500) {
          throw new Error("Server error. Please try again later.");
        } else {
          throw new Error(
            result.message || `HTTP error! status: ${response.status}`
          );
        }
      }

      if (result.status === false) {
        throw new Error(result.message || "Submission failed");
      }

      // Additional validation for successful response
      if (!result.data && !result.message) {
        console.warn("API response missing expected data structure");
      }

      toast.success("Presentation proposal submitted successfully!");
      setFormSubmissionConfirmation(true);

      // Clear auto-saved data from localStorage after successful submission
      localStorage.removeItem("ainet2026ppf_formData");
      localStorage.removeItem("ainet2026ppf_currentStep");

      // Reset form
      setFormData({
        main_title: "",
        main_full_name: "",
        main_place_of_work: "",
        main_country_code: "",
        main_mobile: "",
        main_email: "",
        co1_title: "",
        co1_full_name: "",
        co1_place_of_work: "",
        co1_country_code: "",
        co1_mobile: "",
        co1_email: "",
        co2_title: "",
        co2_full_name: "",
        co2_place_of_work: "",
        co2_country_code: "",
        co2_mobile: "",
        co2_email: "",
        conference_sub_theme: "",
        other_sub_theme: "",
        presentation_nature: "",
        presentation_title: "",
        abstract: "",
        main_presenter_bio: "",
        co1_presenter_bio: "",
        co2_presenter_bio: "",
        remaining_copresenters: "",
        agree: false,
      });
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error(`❌ Submission Failed: ${error.message || error}`);
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const isFormValid = () => {
    const requiredFields = [
      "main_title",
      "main_full_name",
      "main_place_of_work",
      "main_mobile",
      "main_email",
      "conference_sub_theme",
      "presentation_nature",
      "presentation_title",
      "abstract",
      "main_presenter_bio",
    ];

    for (let field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === "") {
        return false;
      }
    }

    // Check conference sub-theme selection
    if (!formData.conference_sub_theme || formData.conference_sub_theme.trim() === "") return false;

    if (!formData.agree) return false;
    if (
      formData.conference_sub_theme === "Any Other (Specify)" &&
      !formData.other_sub_theme.trim()
    )
      return false;

    // Check word limits
    if (getWordCount(formData.presentation_title) > 10) return false;
    if (getWordCount(formData.abstract) > 150) return false;
    if (getWordCount(formData.main_presenter_bio) > 30) return false;

    // Check mobile number format
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.main_mobile.replace(/\D/g, "")))
      return false;

    return true;
  };

  // Step validation functions
  const validateStep1 = () => {
    // Validate required fields
    const requiredFields = [
      "main_title",
      "main_country_code",
      "main_full_name",
      "main_place_of_work",
      "main_mobile",
      "main_email",
      "main_presenter_bio",
    ];
    for (let field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === "") {
        toast.error(`Please fill in the ${formatFieldName(field)} field.`);
        return false;
      }
    }

    // Validate bio word count
    if (getWordCount(formData.main_presenter_bio) > 30) {
      toast.error("Main presenter bio must be maximum 30 words.");
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.main_email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    // Validate mobile number format
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.main_mobile.replace(/\D/g, ""))) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return false;
    }

    return true;
  };

  const validateStep2 = () => {
    // Step 2 validates Co-Presenter 1 - all fields are optional
    // But if any field is filled, validate the complete set

    const hasAnyField =
      formData.co1_title ||
      formData.co1_full_name ||
      formData.co1_place_of_work ||
      formData.co1_country_code ||
      formData.co1_mobile ||
      formData.co1_email ||
      formData.co1_presenter_bio;

    if (!hasAnyField) {
      return true; // No fields filled, step is valid
    }

    // If Full Name or Place of Work is filled, contact fields become compulsory
    const hasNameOrWork = (formData.co1_full_name && formData.co1_full_name.trim()) ||
      (formData.co1_place_of_work && formData.co1_place_of_work.trim());

    if (hasNameOrWork) {
      // Validate required fields for co-presenter 1
      if (!formData.co1_title || !formData.co1_title.trim()) {
        toast.error("Please fill in title for co-presenter 1.");
        return false;
      }
      if (!formData.co1_full_name || !formData.co1_full_name.trim()) {
        toast.error("Please fill in full name for co-presenter 1.");
        return false;
      }
      if (!formData.co1_place_of_work || !formData.co1_place_of_work.trim()) {
        toast.error("Please fill in place of work for co-presenter 1.");
        return false;
      }

      // Contact fields are now compulsory
      if (!formData.co1_country_code || (typeof formData.co1_country_code === 'string' && !formData.co1_country_code.trim())) {
        toast.error("Please fill in country code for co-presenter 1.");
        return false;
      }

      if (!formData.co1_mobile || !formData.co1_mobile.toString().trim()) {
        toast.error("Please fill in mobile number for co-presenter 1.");
        return false;
      }

      if (!formData.co1_email || !formData.co1_email.trim()) {
        toast.error("Please fill in email for co-presenter 1.");
        return false;
      }

      if (!formData.co1_presenter_bio || !formData.co1_presenter_bio.trim()) {
        toast.error("Please fill in the Co-presenter Bio field.");
        return false;
      }
    }

    // Validate email format if provided
    if (formData.co1_email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.co1_email)) {
        toast.error("Please enter a valid email address for co-presenter 1.");
        return false;
      }
    }

    // Validate mobile number format if provided
    if (formData.co1_mobile) {
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(formData.co1_mobile.replace(/\D/g, ""))) {
        toast.error(
          "Please enter a valid 10-digit mobile number for co-presenter 1."
        );
        return false;
      }
    }

    // Validate bio word count if provided
    if (
      formData.co1_presenter_bio &&
      getWordCount(formData.co1_presenter_bio) > 30
    ) {
      toast.error("Co-presenter 1 bio must be maximum 30 words.");
      return false;
    }

    return true;
  };

  const validateStep3 = () => {
    // Step 3 validates Co-Presenter 2 & Additional Co-Presenters - all fields are optional
    // But if any field is filled, validate the complete set

    const hasAnyField =
      formData.co2_title ||
      formData.co2_full_name ||
      formData.co2_place_of_work ||
      formData.co2_country_code ||
      formData.co2_mobile ||
      formData.co2_email ||
      formData.co2_presenter_bio ||
      formData.remaining_copresenters;

    if (!hasAnyField) {
      return true; // No fields filled, step is valid
    }

    // If Full Name or Place of Work is filled, contact fields become compulsory
    const hasNameOrWork = (formData.co2_full_name && formData.co2_full_name.trim()) ||
      (formData.co2_place_of_work && formData.co2_place_of_work.trim());

    if (hasNameOrWork) {
      // Validate required fields for co-presenter 2
      if (!formData.co2_title || !formData.co2_title.trim()) {
        toast.error("Please fill in title for co-presenter 2.");
        return false;
      }
      if (!formData.co2_full_name || !formData.co2_full_name.trim()) {
        toast.error("Please fill in full name for co-presenter 2.");
        return false;
      }
      if (!formData.co2_place_of_work || !formData.co2_place_of_work.trim()) {
        toast.error("Please fill in place of work for co-presenter 2.");
        return false;
      }

      // Contact fields are now compulsory
      if (!formData.co2_country_code || (typeof formData.co2_country_code === 'string' && !formData.co2_country_code.trim())) {
        toast.error("Please fill in country code for co-presenter 2.");
        return false;
      }

      if (!formData.co2_mobile || !formData.co2_mobile.toString().trim()) {
        toast.error("Please fill in mobile number for co-presenter 2.");
        return false;
      }

      if (!formData.co2_email || !formData.co2_email.trim()) {
        toast.error("Please fill in email for co-presenter 2.");
        return false;
      }

      if (!formData.co2_presenter_bio || !formData.co2_presenter_bio.trim()) {
        toast.error("Please fill in the Co-presenter 2 Bio field.");
        return false;
      }
    }

    // Validate email format if provided
    if (formData.co2_email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.co2_email)) {
        toast.error("Please enter a valid email address for co-presenter 2.");
        return false;
      }
    }

    // Validate mobile number format if provided
    if (formData.co2_mobile) {
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(formData.co2_mobile.replace(/\D/g, ""))) {
        toast.error(
          "Please enter a valid 10-digit mobile number for co-presenter 2."
        );
        return false;
      }
    }

    // Validate bio word count if provided
    if (
      formData.co2_presenter_bio &&
      getWordCount(formData.co2_presenter_bio) > 30
    ) {
      toast.error("Co-presenter 2 bio must be maximum 30 words.");
      return false;
    }

    return true;
  };

  const validateStep4 = () => {
    // Validate conference sub-theme selection
    if (!formData.conference_sub_theme || formData.conference_sub_theme.trim() === "") {
      toast.error("Please select a conference sub-theme.");
      return false;
    }

    // Validate presentation nature
    if (!formData.presentation_nature) {
      toast.error("Please select a presentation type.");
      return false;
    }

    // Check if other theme is specified when "Any Other (Specify)" is selected
    if (
      formData.conference_sub_theme === "Any Other (Specify)" &&
      !formData.other_sub_theme.trim()
    ) {
      toast.error("Please specify the sub-theme.");
      return false;
    }

    return true;
  };

  const validateStep5 = () => {
    // Validate required fields
    const requiredFields = [
      "presentation_title",
      "abstract",
      "main_presenter_bio",
    ];
    for (let field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === "") {
        toast.error(`Please fill in the ${formatFieldName(field)} field.`);
        return false;
      }
    }

    // Validate word count limits
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
    let canProceed = false;

    switch (currentStep) {
      case 1:
        // Validate Step 1 with proper validation
        canProceed = validateStep1();
        break;
      case 2:
        // Step 2 is optional co-presenter, but validate if fields are filled
        canProceed = validateStep2();
        break;
      case 3:
        // Step 3 is optional co-presenter, but validate if fields are filled
        canProceed = validateStep3();
        break;
      case 4:
        // Validate Step 4 with proper validation
        canProceed = validateStep4();
        break;
      case 5:
        // Validate Step 5 with proper validation
        canProceed = validateStep5();
        break;
      case 6:
        // Validate Step 6 with proper validation
        canProceed = validateStep6();
        break;
      default:
        canProceed = false;
    }

    if (canProceed && currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else if (canProceed && currentStep === 6) {
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
      {!formSubmissionConfirmation &&
        <div className=" w-full relative z-10 mx-auto h-full grid grid-cols-1 lg:grid-cols-2">
          <div className="bg-[url('/formbg1.jpg')] bg-cover bg-center py-8 md:py-20">
            {/* Left Side - Event Information */}
            <div className="lg:sticky lg:top-8 h-full flex justify-center items-center px-4">
              <div
                className="rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl h-[400px] md:h-[500px] lg:h-[550px] w-full max-w-sm sm:max-w-md md:max-w-lg lg:w-[70%] flex flex-col justify-between backdrop-blur-md border border-white/20"
                style={{
                  background:
                    "radial-gradient(90.16% 143.01% at 15.32% 21.04%, rgba(165, 239, 255, 0.2) 0%, rgba(110, 191, 244, 0.0447917) 77.08%, rgba(70, 144, 213, 0) 100%)",
                  backgroundBlendMode: "overlay",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                }}
              >
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
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white mb-3 md:mb-4 lg:mb-5 font-serif drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
                    Gateway Education, Sonipat, Delhi NCR
                  </p>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white mb-3 md:mb-4 lg:mb-5 font-serif drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
                    "Empowering English Language Education in the Digital Era"
                  </p>
                  <p className="text-xs sm:text-xs md:text-sm lg:text-sm text-gray-500 mb-4 md:mb-5 lg:mb-6">
                  <span className="px-3 py-1 bg-yellow-200 text-gray-800 font-semibold rounded-full inline-block">
                    Supported by British Council &amp; RELO, American Embassy
                  </span>
                </p>

                  {/* Registration Button */}
                  <button className="w-full bg-[rgba(217,217,217,1)] font-serif text-black py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 px-3 sm:px-4 md:px-5 lg:px-6 font-semibold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl hover:bg-gray-700 hover:text-white transition-colors mb-3 md:mb-4 lg:mb-5 xl:mb-6 shadow-lg">
                    PRESENTATION PROPOSAL FORM
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="py-10">
            {/* Right Side - Registration Form */}
            <div className=" p-4 md:p-10 flex flex-col">
              {/* Step Indicator */}
              <div className="flex items-center justify-center mb-6">
                {[1, 2, 3, 4, 5, 6].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step === currentStep
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
                        className={` md:w-12 w-6 h-0.5 mx-1 transition-all duration-300 ${step < currentStep ? "bg-green-500" : "bg-gray-200"
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
                  <div className="flex-1 flex flex-col space-y-4">
                    <div className="bg-gray-400 p-3 rounded">
                      <h2 className="text-white text-lg font-semibold">
                        Main Presenter Information
                      </h2>
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {/* Title */}
                        <div className="col-span-1 sm:col-span-1">
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

                        {/* Full Name */}
                        <div className="col-span-1 sm:col-span-2">
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

                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                          Main Presenter's BIO (Max. 30 words):{" "}
                          <span className="text-red-500">*</span>
                          <span className="text-sm text-gray-500 ml-2">
                            ({getWordCount(formData.main_presenter_bio)}/30 words)
                          </span>
                        </label>
                        <textarea
                          name="main_presenter_bio"
                          value={formData.main_presenter_bio}
                          onChange={handleChange}
                          placeholder="Enter main presenter bio (max 30 words)"
                          className={`w-full pt-3 pb-4 px-3 border-2 rounded text-sm leading-relaxed ${getWordCount(formData.main_presenter_bio) > 30
                              ? "border-red-500 bg-red-50"
                              : "border-gray-300"
                            }`}
                          rows="3"
                          style={{ lineHeight: '1.5' }}
                        ></textarea>
                        {getWordCount(formData.main_presenter_bio) > 30 && (
                          <p className="text-red-600 text-sm font-semibold mt-1 bg-red-50 p-2 rounded">
                            Bio exceeds 30 words limit
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="bg-gray-400 p-2 rounded">
                      <h2 className="text-white text-lg font-semibold">
                        Contact Information
                      </h2>
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1 sm:col-span-1">
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Country Code: <span className="text-red-500">*</span>
                          </label>
                          <CountryCodeSelector
                            name="main_country_code"
                            value={formData.main_country_code}
                            onChange={handleChange}
                            placeholder="Select Country Code"
                            className="w-full"
                          />
                        </div>
                        <div className="col-span-1 sm:col-span-2">
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Mobile No: <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            maxLength={10}
                            name="main_mobile"
                            value={formData.main_mobile}
                            onChange={handleChange}
                            placeholder="Enter Your Mobile Number"
                            className="w-full p-3 border border-gray-300 rounded text-sm"
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
                          onChange={handleChange}
                          placeholder="Enter Your Email"
                          className="w-full p-3 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Co-Presenter 1 */}
                {currentStep === 2 && (
                  <div className="flex-1 flex flex-col space-y-4">
                    <div className="bg-gray-400 p-3 rounded">
                      <h2 className="text-white text-lg font-semibold">
                        Co-Presenter 1 (Optional)
                      </h2>
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {/* Title */}
                        <div className="col-span-1 sm:col-span-1">
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Title:
                          </label>
                          <select
                            name="co1_title"
                            value={formData.co1_title}
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
                        <div className="col-span-1 sm:col-span-2  ">
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Full Name:
                          </label>
                          <input
                            type="text"
                            name="co1_full_name"
                            value={formData.co1_full_name}
                            onChange={handleChange}
                            placeholder="Enter Full Name"
                            className="w-full p-3 border border-gray-300 rounded text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                          Place Of Work:
                        </label>
                        <input
                          type="text"
                          name="co1_place_of_work"
                          value={formData.co1_place_of_work}
                          onChange={handleChange}
                          placeholder="Enter Place Of Work"
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
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {/* Country Code */}
                        <div className="col-span-1 sm:col-span-1">
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Country Code:
                            {(formData.co1_full_name || formData.co1_place_of_work) && (
                              <span className="text-red-500">*</span>
                            )}
                          </label>
                          <CountryCodeSelector
                            name="co1_country_code"
                            value={formData.co1_country_code}
                            onChange={handleChange}
                            placeholder="Select Country"
                            className="w-full"
                          />
                        </div>
                        {/* Mobile No */}
                        <div className="col-span-1 sm:col-span-2">
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Mobile No:
                            {(formData.co1_full_name || formData.co1_place_of_work) && (
                              <span className="text-red-500">*</span>
                            )}
                          </label>
                          <input
                            type="tel"
                            name="co1_mobile"
                            value={formData.co1_mobile}
                            onChange={handleChange}
                            placeholder="Enter Mobile Number"
                            className="w-full p-3 border border-gray-300 rounded text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                          Email:
                          {(formData.co1_full_name || formData.co1_place_of_work) && (
                            <span className="text-red-500">*</span>
                          )}
                        </label>
                        <input
                          type="email"
                          name="co1_email"
                          value={formData.co1_email}
                          onChange={handleChange}
                          placeholder="Enter Email Address"
                          className="w-full p-3 border border-gray-300 rounded text-sm"
                        />
                      </div>

                      {formData.co1_full_name && (
                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Co-Presenter 1 Bio (Max. 30 words):<span className="text-red-500">*</span>
                            <span className="text-sm text-gray-500 ml-2">
                              ({getWordCount(formData.co1_presenter_bio)}/30
                              words)
                            </span>
                          </label>
                          <textarea
                            name="co1_presenter_bio"
                            value={formData.co1_presenter_bio}
                            onChange={handleChange}
                            placeholder="Enter co-presenter 1 bio (max 30 words)"
                            className={`w-full p-2 border-2 rounded text-sm ${getWordCount(formData.co1_presenter_bio) > 30
                                ? "border-red-500 bg-red-50"
                                : "border-gray-300"
                              }`}
                            rows="3"
                          ></textarea>
                          {getWordCount(formData.co1_presenter_bio) > 30 && (
                            <p className="text-red-600 text-sm font-semibold mt-1 bg-red-50 p-2 rounded">
                              Bio exceeds 30 words limit
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3: Co-Presenter 2 & Additional Co-Presenters */}
                {currentStep === 3 && (
                  <div className="flex-1 flex flex-col space-y-4">
                    <div className="bg-gray-400 p-3 rounded">
                      <h2 className="text-white text-lg font-semibold">
                        Co-Presenter 2 (Optional)
                      </h2>
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {/* Title */}
                        <div className="col-span-1 sm:col-span-1">
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Title:
                          </label>
                          <select
                            name="co2_title"
                            value={formData.co2_title}
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
                        <div className="col-span-1 sm:col-span-2">
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Full Name:
                          </label>
                          <input
                            type="text"
                            name="co2_full_name"
                            value={formData.co2_full_name}
                            onChange={handleChange}
                            placeholder="Enter Full Name"
                            className="w-full p-3 border border-gray-300 rounded text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                          Place Of Work:
                        </label>
                        <input
                          type="text"
                          name="co2_place_of_work"
                          value={formData.co2_place_of_work}
                          onChange={handleChange}
                          placeholder="Enter Place Of Work"
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
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {/* Country Code */}
                        <div className="col-span-1 sm:col-span-1">
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Country Code:
                            {(formData.co2_full_name || formData.co2_place_of_work) && (
                              <span className="text-red-500">*</span>
                            )}
                          </label>
                          <CountryCodeSelector
                            name="co2_country_code"
                            value={formData.co2_country_code}
                            onChange={handleChange}
                            placeholder="Select Country"
                            className="w-full"
                          />
                        </div>
                        {/* Mobile No */}
                        <div className="col-span-1 sm:col-span-2">
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Mobile No:
                            {(formData.co2_full_name || formData.co2_place_of_work) && (
                              <span className="text-red-500">*</span>
                            )}
                          </label>
                          <input
                            type="tel"
                            name="co2_mobile"
                            value={formData.co2_mobile}
                            onChange={handleChange}
                            placeholder="Enter Mobile Number"
                            className="w-full p-3 border border-gray-300 rounded text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                          Email:
                          {(formData.co2_full_name || formData.co2_place_of_work) && (
                            <span className="text-red-500">*</span>
                          )}
                        </label>
                        <input
                          type="email"
                          name="co2_email"
                          value={formData.co2_email}
                          onChange={handleChange}
                          placeholder="Enter Email Address"
                          className="w-full p-3 border border-gray-300 rounded text-sm"
                        />
                      </div>

                      {(formData.co2_full_name || formData.co2_place_of_work) && (
                        <div>
                          <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Co-Presenter 2 Bio (Max. 30 words):
                            <span className="text-red-500">*</span>
                            <span className="text-sm text-gray-500 ml-2">
                              ({getWordCount(formData.co2_presenter_bio)}/30
                              words)
                            </span>
                          </label>
                          <textarea
                            name="co2_presenter_bio"
                            value={formData.co2_presenter_bio}
                            onChange={handleChange}
                            placeholder="Enter co-presenter 2 bio (max 30 words)"
                            className={`w-full p-2 border-2 rounded text-sm ${getWordCount(formData.co2_presenter_bio) > 30
                                ? "border-red-500 bg-red-50"
                                : "border-gray-300"
                              }`}
                            rows="3"
                          ></textarea>
                          {getWordCount(formData.co2_presenter_bio) > 30 && (
                            <p className="text-red-600 text-sm font-semibold mt-1 bg-red-50 p-2 rounded">
                              Bio exceeds 30 words limit
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="bg-gray-400 p-2 rounded">
                      <h2 className="text-white text-lg font-semibold">
                        Additional Co-Presenters (Optional)
                      </h2>
                    </div>

                    <div className="space-y-3">
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
                  <div className="flex-1 flex flex-col space-y-4">
                    <div className="bg-gray-400 p-2 rounded">
                      <h2 className="text-white text-lg font-semibold">
                        Conference Theme & Presentation Type
                      </h2>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                          Conference Sub-theme:{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="conference_sub_theme"
                          value={formData.conference_sub_theme}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded text-sm bg-white"
                        >
                          <option value="">Select Conference Sub-theme</option>
                          {conferenceSubThemes.map((theme) => (
                            <option key={theme} value={theme}>
                              {theme}
                            </option>
                          ))}
                        </select>
                      </div>

                      {formData.conference_sub_theme ===
                        "Any Other (Specify)" && (
                          <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700">
                              Please specify:{" "}
                              <span className="text-red-500">*</span>
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
                          Presentation Type:{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {presentationTypes.map((type) => (
                            <label
                              key={type}
                              className="flex items-center p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50"
                            >
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
                  <div className="flex-1 flex flex-col space-y-4">
                    <div className="bg-gray-400 p-3 rounded">
                      <h2 className="text-white text-lg font-semibold">
                        Presentation Details
                      </h2>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                          Presentation Title (Max. 10 words):{" "}
                          <span className="text-red-500">*</span>
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
                          className={`w-full p-3 border-2 rounded text-sm ${getWordCount(formData.presentation_title) > 10
                              ? "border-red-500 bg-red-50"
                              : "border-gray-300"
                            }`}
                        />
                        {getWordCount(formData.presentation_title) > 10 && (
                          <p className="text-red-600 text-sm font-semibold mt-1 bg-red-50 p-2 rounded">
                            Title exceeds 10 words limit
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                          Abstract (Max. 150 words):{" "}
                          <span className="text-red-500">*</span>
                          <span className="text-sm text-gray-500 ml-2">
                            ({getWordCount(formData.abstract)}/150 words)
                          </span>
                        </label>
                        <textarea
                          name="abstract"
                          value={formData.abstract}
                          onChange={handleChange}
                          placeholder="Enter your abstract"
                          className={`w-full p-3 border-2 rounded text-sm ${getWordCount(formData.abstract) > 150
                              ? "border-red-500 bg-red-50"
                              : "border-gray-300"
                            }`}
                          rows="6"
                        ></textarea>
                        {getWordCount(formData.abstract) > 150 && (
                          <p className="text-red-600 text-sm font-semibold mt-1 bg-red-50 p-2 rounded">
                            Abstract exceeds 150 words limit
                          </p>
                        )}
                      </div>

                    </div>
                  </div>
                )}

                {/* Step 6: Agreement & Terms */}
                {currentStep === 6 && (
                  <div className="flex-1 flex flex-col space-y-4">
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
                            <svg
                              className="h-6 w-6 text-yellow-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                              <strong>NOTE:</strong> After receiving the
                              acceptance of your proposal, you and all your
                              co-presenters must register for the conference by
                              completing the Delegate Registration Form by{" "}
                              <strong>25 December 2025</strong>
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
                          I agree to the terms and conditions of the presentation
                          proposal submission and understand that all
                          co-presenters must register for the conference upon
                          acceptance. <span className="text-red-500">*</span>
                        </label>
                      </div>
                    </div>
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
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
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
                    className={`px-15 py-4 bg-yellow-200 hover:bg-yellow-300 text-black font-bold rounded-full transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105 ${currentStep === 1 ? "absolute left-1/2 -translate-x-1/2" : "relative"}`}
                  >
                    <span className="text-lg">
                      {currentStep === 6 ? "Submit" : "Continue"}
                    </span>
                    {currentStep < 6 && <FaArrowRight className="ml-2" />}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      }
      {formSubmissionConfirmation && (
        <FormSubmissionConfirmation
          line1="Your proposal will be reviewed by our committee"
          line2="You will receive an email confirmation shortly"
          line3="We will notify you of the decision by 25th December 2025"
          line4="Keep checking your email for further instructions"
        />
      )}
    </>
  );
}

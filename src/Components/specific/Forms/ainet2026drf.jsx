import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl, razorpayKey } from "../../../utils/constant";
import Loader from "../../../Components/shared/Loader";
import { toast } from "react-toastify";
import { FaArrowRight } from "react-icons/fa";
import CountryCodeSelector from "../../shared/CountryCodeSelector";
import FeedbackPopup from "../../shared/FeedbackPopup";

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
  const [isValidatingMembership, setIsValidatingMembership] = useState(false);
  const [membershipDiscount, setMembershipDiscount] = useState(null);
  const [showDiscountPopup, setShowDiscountPopup] = useState(false);
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const [completedDrfId, setCompletedDrfId] = useState(null);
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

    // Reset membership discount if user changes AINET member selection
    if (name === "is_ainet_member" && value === "No") {
      setMembershipDiscount(null);
      setShowDiscountPopup(false);
    }

    // Reset discount if membership ID is cleared
    if (name === "membership_id" && !value.trim()) {
      setMembershipDiscount(null);
      setShowDiscountPopup(false);
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

  const handleMembershipIdBlur = async () => {
    const membershipId = formData.membership_id?.trim();
    
    // Reset discount state if membership ID is cleared
    if (!membershipId) {
      setMembershipDiscount(null);
      setShowDiscountPopup(false);
      return;
    }

    // Only validate if user selected "Yes" for AINET member
    if (formData.is_ainet_member !== "Yes") {
      return;
    }

    try {
      setIsValidatingMembership(true);
      const response = await fetch(`${baseUrl}/client/validate-membership-discount`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          membership_id: membershipId,
        }),
      });

      const result = await response.json();

      if (result?.status === true && result?.data) {
        const discountData = result.data;
        setMembershipDiscount(discountData);

        // Show popup if discount is applicable
        if (discountData.discount_applicable && discountData.valid) {
          setShowDiscountPopup(true);
        }
      } else {
        setMembershipDiscount({
          valid: false,
          discount_applicable: false,
          message: result?.message || "Invalid membership ID",
        });
      }
    } catch (error) {
      console.error("Failed to validate membership:", error);
      setMembershipDiscount({
        valid: false,
        discount_applicable: false,
        message: "Failed to validate membership. Please try again.",
      });
    } finally {
      setIsValidatingMembership(false);
    }
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
 
    if (!isFormValid()) return;

    const payload = {
      member: formData.is_ainet_member,
      membership_id: formData.is_ainet_member === "Yes" ? formData.membership_id : null,
      you_are_register_as: formData.delegate_type,
      pre_title: formData.title,
      name: formData.full_name,
      gender: formData.gender,
      age: formData.age_group || "",
      institution: formData.institution_address,
      address: formData.correspondence_address,
      city: formData.city,
      pincode: formData.pincode,
      state: formData.state,
      country_code: formData.country_code ? `+${formData.country_code.replace(/^\+/, "")}` : "",
      phone_no: formData.mobile_no.replace(/\s+/g, ""),
      email: formData.email,
      areas: Array.isArray(formData.area_of_work) ? formData.area_of_work : [],
      areas_of_interest: formData.areas_of_interest || "",
      other: formData.other_work_area || "",
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
       
       // Show feedback popup after successful registration
       setCompletedDrfId(drfId);
       setShowFeedbackPopup(true);
       
       // Note: Don't navigate immediately - let user submit feedback first
       // Navigation will happen after feedback popup is closed
     } catch (error) {
       console.error("Submission Error:", error);
       toast.error(`❌ ${error?.message || 'Registration or payment failed. Please try again.'}`);
     } finally {
       setIsSubmitting(false);
       setLoading(false);
     }
   };

  const startDrfPaymentFlow = async (drfId) => {
    // Include membership_id if available and valid
    const orderPayload = { drf_id: drfId };
    if (formData.is_ainet_member === "Yes" && formData.membership_id && membershipDiscount?.valid) {
      orderPayload.membership_id = formData.membership_id.trim();
      console.log("✅ Sending membership_id for discount:", orderPayload.membership_id);
    } else {
      console.log("❌ Membership discount not applied:", {
        is_ainet_member: formData.is_ainet_member,
        membership_id: formData.membership_id,
        membershipDiscount_valid: membershipDiscount?.valid
      });
    }

    const orderResponse = await fetch(`${baseUrl}/client/ainet2020drf/payment/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(orderPayload),
    });

    const orderResult = await orderResponse.json();

    if (!orderResponse.ok || orderResult?.status === false) {
      const message = orderResult?.message || "Unable to initiate payment.";
      throw new Error(message);
    }

    // Check if user is sponsored (payment not required)
    if (orderResult?.data?.sponsored === true || orderResult?.data?.payment_required === false) {
      toast.success("✅ Registration confirmed! Payment not required for sponsored participants.", {
        duration: 5000,
      });
      // Show feedback popup for sponsored users too
      setCompletedDrfId(drfId);
      setShowFeedbackPopup(true);
      return; // Skip payment flow
    }

    const orderData = orderResult?.data?.order;
    const orderAmount = orderResult?.data?.amount; // This is already in paise and includes discount
    const orderCurrency = orderResult?.data?.currency || (orderData?.currency ?? "INR");
    const orderId = orderData?.id;
    const key = orderResult?.data?.key || razorpayKey;
    const discountApplied = orderResult?.data?.discount_applied || false;
    const originalAmount = orderResult?.data?.original_amount;
    const discountedAmount = orderResult?.data?.discounted_amount;

    // Debug logging
    console.log("💰 Payment Order Details:", {
      orderAmount_paise: orderAmount,
      orderAmount_rupees: orderAmount / 100,
      discountApplied,
      originalAmount,
      discountedAmount,
      orderId
    });

    // Show discount info if applicable
    if (discountApplied && originalAmount && discountedAmount) {
      const discountAmount = originalAmount - discountedAmount;
      const finalAmount = discountedAmount;
      toast.success(`🎉 AINET Member Discount Applied! Original: ₹${originalAmount.toFixed(2)}, Discount: ₹${discountAmount.toFixed(2)}, Pay: ₹${finalAmount.toFixed(2)}`, {
        duration: 6000,
      });
    }

    if (!orderId || !orderAmount) {
      throw new Error("Invalid payment order details.");
    }

    const sdkLoaded = await loadRazorpayScript();
    if (!sdkLoaded) {
      throw new Error("Unable to load Razorpay SDK. Please check your connection.");
    }

    const contactNumber = formData.mobile_no ? `${formData.country_code ? `+${formData.country_code}` : ""}${formData.mobile_no}` : undefined;

    // Build description with discount info
    let description = "AINET 2026 Delegate Registration";
    if (discountApplied && originalAmount && discountedAmount) {
      description = `AINET 2026 Delegate Registration (Member Discount: ₹${(originalAmount - discountedAmount).toFixed(2)} off)`;
    }

    // Ensure we use the amount from Razorpay order (which should be discounted)
    // When using order_id, Razorpay uses the order amount, but we still need to pass matching amount
    const finalAmount = orderData?.amount || orderAmount; // Use order amount from Razorpay response
    
    console.log("🔍 Razorpay Checkout Amount:", {
      orderData_amount: orderData?.amount,
      orderAmount_from_response: orderAmount,
      finalAmount_to_use: finalAmount,
      finalAmount_rupees: finalAmount / 100
    });

    await new Promise((resolve, reject) => {
      const options = {
        key,
        amount: finalAmount, // Use the amount from Razorpay order (discounted)
        currency: orderCurrency,
        name: "AINET",
        description: description,
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

            // After successful payment confirmation, show feedback popup
            setCompletedDrfId(drfId);
            setShowFeedbackPopup(true);
            
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

    // Validate age group is selected
    const validAgeGroups = ["up to 25", "26-30", "31-35", "36-40", "41-45", "46-50", "over 50"];
    if (!formData.age_group || !validAgeGroups.includes(formData.age_group)) {
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

    // Validate age group is selected
    const validAgeGroups = ["up to 25", "26-30", "31-35", "36-40", "41-45", "46-50", "over 50"];
    if (!formData.age_group || !validAgeGroups.includes(formData.age_group)) {
      toast.error("Please select an age group.");
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
    // Prevent proceeding if membership validation is in progress
    if (isValidatingMembership) {
      toast.info("Please wait for membership validation to complete.");
      return;
    }

    // If on step 1 and user entered membership ID, ensure validation has completed
    if (currentStep === 1 && 
        formData.is_ainet_member === "Yes" && 
        formData.membership_id?.trim() && 
        membershipDiscount === null) {
      toast.warning("Please enter your membership ID and wait for validation to complete.");
      return;
    }

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
                "English Language Education Today: Educate, Empower, Employ, Innovate"
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
                          onBlur={handleMembershipIdBlur}
                          placeholder="Enter Your Membership Number"
                          className="w-full p-3 border border-gray-300 rounded text-sm"
                          disabled={isValidatingMembership}
                        />
                        {isValidatingMembership && (
                          <p className="text-xs text-blue-600 mt-1">Validating membership...</p>
                        )}
                        {membershipDiscount && membershipDiscount.valid && (
                          <p className="text-xs text-green-600 mt-1 font-semibold">
                            ✓ Valid membership - 10% discount will be applied
                          </p>
                        )}
                        {membershipDiscount && !membershipDiscount.valid && (
                          <p className="text-xs text-red-600 mt-1">
                            {membershipDiscount.message}
                          </p>
                        )}
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

                      {/* Age Group */}
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                          Age Group (years): <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="age_group"
                              value="up to 25"
                              checked={formData.age_group === "up to 25"}
                              onChange={handleChange}
                              className="mr-1"
                            />
                            <span className="text-sm">up to 25</span>
                          </label>
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="age_group"
                              value="26-30"
                              checked={formData.age_group === "26-30"}
                              onChange={handleChange}
                              className="mr-1"
                            />
                            <span className="text-sm">26-30</span>
                          </label>
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="age_group"
                              value="31-35"
                              checked={formData.age_group === "31-35"}
                              onChange={handleChange}
                              className="mr-1"
                            />
                            <span className="text-sm">31-35</span>
                          </label>
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="age_group"
                              value="36-40"
                              checked={formData.age_group === "36-40"}
                              onChange={handleChange}
                              className="mr-1"
                            />
                            <span className="text-sm">36-40</span>
                          </label>
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="age_group"
                              value="41-45"
                              checked={formData.age_group === "41-45"}
                              onChange={handleChange}
                              className="mr-1"
                            />
                            <span className="text-sm">41-45</span>
                          </label>
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="age_group"
                              value="46-50"
                              checked={formData.age_group === "46-50"}
                              onChange={handleChange}
                              className="mr-1"
                            />
                            <span className="text-sm">46-50</span>
                          </label>
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="age_group"
                              value="over 50"
                              checked={formData.age_group === "over 50"}
                              onChange={handleChange}
                              className="mr-1"
                            />
                            <span className="text-sm">over 50</span>
                          </label>
                        </div>
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
                            <p>• Research and PG students: INR 1200</p>
                            <p>• Other Including teachers: INR 2500</p>
                            <p>• All Overseas participants: INR 5000</p>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-blue-800 text-sm">
                            {" "}
                            After 29 December 2025
                          </h5>
                          <div className="space-y-2 text-sm">
                            <p>• Research and PG students: INR 2000</p>
                            <p>• Other Including teachers: INR 3500</p>
                            <p>• All Overseas participants: INR 5000</p>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-red-500 mt-3 font-semibold">
                        *AINET members are entitled to 10% discount in the
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
                  disabled={isValidatingMembership}
                  className={`px-15 py-4 font-bold rounded-full transition-all duration-300 flex items-center shadow-lg ${
                    isValidatingMembership
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-yellow-200 hover:bg-yellow-300 text-black hover:shadow-xl transform hover:scale-105"
                  } ${currentStep === 1 ? "absolute left-1/2 -translate-x-1/2" : "relative"}`}
                >
                  <span className="text-lg">
                    {isValidatingMembership 
                      ? "Validating..." 
                      : currentStep === 5 
                        ? "Submit" 
                        : "Continue"}
                  </span>
                  {currentStep < 5 && !isValidatingMembership && (
                    <FaArrowRight className="ml-2" />
                  )}
                  {isValidatingMembership && (
                    <svg className="animate-spin ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Discount Popup Modal */}
      {showDiscountPopup && membershipDiscount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="mb-4">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                  <svg
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                🎉 AINET Member Discount!
              </h3>
              <p className="text-gray-700 mb-4">
                Your membership is valid and active. A <strong className="text-green-600">10% discount</strong> will be applied to your delegate registration fee.
              </p>
              {membershipDiscount.member_name && (
                <p className="text-sm text-gray-600 mb-4">
                  Member: <strong>{membershipDiscount.member_name}</strong>
                </p>
              )}
              {membershipDiscount.expiry_date && (
                <p className="text-xs text-gray-500 mb-4">
                  Membership valid until: {new Date(membershipDiscount.expiry_date).toLocaleDateString()}
                </p>
              )}
              <button
                onClick={() => setShowDiscountPopup(false)}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Great! Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Popup */}
      <FeedbackPopup
        isOpen={showFeedbackPopup}
        onClose={() => {
          setShowFeedbackPopup(false);
          // Navigate after feedback is submitted or skipped
          setFormData({ ...initialDrfFormData });
          setSelectedFile(null);
          setCurrentStep(1);
          setHasPrefilledFromExisting(false);
          navigate("/form-submission-confirmation?type=drf");
        }}
        drfId={completedDrfId}
        userEmail={formData.email}
        userName={formData.full_name}
      />
    </>
  );
}

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../../utils/constant";
import { initiatePayment } from "../../../utils/utility";
import PaymentSuccessModal from "../../PaymentIntegration/Popup";
import PaymentConfirmationModal from "../../PaymentIntegration/PaymentConfirmationModal";
import Loader from "../../../Components/shared/Loader";
import { toast } from "react-toastify";
import { FaArrowRight } from "react-icons/fa";

export default function AINET2026DelegateRegistrationForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    // Basic Information
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

    // Professional Information
    areas_of_interest: "",
    area_of_work: [],
    other_work_area: "",
    teaching_experience: "",

    // Conference Participation
    is_presenting: "",
    presentation_type: [],

  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

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

  // Form validation
  const validateForm = () => {
    const requiredFields = [
      "delegate_type",
      "title",
      "full_name",
      "gender",
      "age_group",
      "correspondence_address",
      "city",
      "mobile_no",
      "email",
    ];

    for (let field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === "") {
        toast.error(`Please fill in the ${field.replace("_", " ")} field.`);
        return false;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (
      formData.delegate_type === "Student or Trainee Teacher" &&
      !selectedFile
    ) {
      toast.error(
        "Please upload supporting document for student/trainee registration."
      );
      return false;
    }

    if (!isEmailValid) {
      return false;
    }

    return true;
  };

  const checkEmailExists = async () => {
    const email = formData.email;
    if (!email) return;

    try {
      const res = await fetch(
        `${baseUrl}client/eventValidationHandle?email=${encodeURIComponent(
          email
        )}`
      );

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

  const calculateDelegateFee = () => {
    const { delegate_type, is_ainet_member } = formData;
    let baseFee = 0;

    // Updated fees for 2026
    switch (delegate_type) {
      case "Indian Delegate":
        baseFee = 1500;
        break;
      case "SAARC Country Delegate":
        baseFee = 1500;
        break;
      case "Overseas Delegate":
        baseFee = 3000; // USD 60 equivalent
        break;
      case "Student or Trainee Teacher":
        baseFee = 750;
        break;
      default:
        baseFee = 1500;
    }

    // AINET member discount
    if (is_ainet_member === "Yes" && formData.membership_id) {
      baseFee = baseFee * 0.8; // 20% discount
    }

    return baseFee;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const res = await checkEmailExists();
    if (!res) {
      return;
    }

    setShowPaymentConfirmation(true);
  };

  const handlePaymentProceed = async () => {
    setShowPaymentConfirmation(false);

    try {
      const delegateFee = calculateDelegateFee();

      const paymentResponse = await initiatePayment({
        amount: delegateFee,
        name: formData.full_name,
        email: formData.email,
        contact: formData.mobile_no,
        currency: "INR",
      });

      toast.success("✅ Payment Successful");
      setLoading(true);
      setIsSubmitting(true);

      const submissionData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (Array.isArray(formData[key])) {
          submissionData.append(key, JSON.stringify(formData[key]));
        } else {
          submissionData.append(key, formData[key]);
        }
      });

      if (selectedFile) {
        submissionData.append("supporting_document", selectedFile);
      }

      const res = await fetch(`${baseUrl}client/delegate-registration-2026`, {
        method: "POST",
        body: submissionData,
      });

      if (res.ok) {
        const responseData = await res.json();
        setIsPaymentDone(true);
        setShowSuccessModal(true);
        // Reset form data
        setFormData({
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
        });
        setSelectedFile(null);
      } else {
        const errorData = await res.json();
        toast.error(
          `${errorData.message || "Something went wrong. Please try again."}`
        );
      }
    } catch (error) {
      toast.error(`❌ Registration Failed: ${error}`);
      console.error("Payment or API Error:", error);
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const isFormValid = () => {
    const requiredFields = [
      "delegate_type",
      "title",
      "full_name",
      "gender",
      "age_group",
      "correspondence_address",
      "city",
      "mobile_no",
      "email",
    ];

    for (let field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === "") {
        return false;
      }
    }

    if (!isEmailValid) return false;
    if (
      formData.delegate_type === "Student or Trainee Teacher" &&
      !selectedFile
    )
      return false;

    return true;
  };

  // Step validation functions
  const validateStep1 = () => {
    if (!formData.delegate_type) {
      toast.error("Please select your registration type.");
      return false;
    }
    if (
      formData.delegate_type === "Student or Trainee Teacher" &&
      !selectedFile
    ) {
      toast.error(
        "Please upload supporting document for student/trainee registration."
      );
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const requiredFields = ["title", "full_name", "gender", "age_group"];
    for (let field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === "") {
        toast.error(`Please fill in the ${field.replace("_", " ")} field.`);
        return false;
      }
    }
    return true;
  };

  const validateStep3 = () => {
    const requiredFields = [
      "correspondence_address",
      "city",
      "mobile_no",
      "email",
    ];
    for (let field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === "") {
        toast.error(`Please fill in the ${field.replace("_", " ")} field.`);
        return false;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (!isEmailValid) {
      return false;
    }
    return true;
  };

  const validateStep4 = () => {
    // Step 4 validates Professional Information - no required fields for this step
    // All fields in this step are optional, so validation always passes
    return true;
  };

  const validateStep5 = () => {
    return true;
  };

  const handleNext = async () => {
    let isValid = false;

    switch (currentStep) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = await validateStep3();
        if (isValid) {
          const emailCheck = await checkEmailExists();
          if (!emailCheck) {
            isValid = false;
          }
        }
        break;
      case 4:
        isValid = validateStep4();
        break;
      case 5:
        isValid = validateStep5();
        break;
      default:
        isValid = false;
    }

    if (isValid && currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else if (isValid && currentStep === 5) {
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
      {/* Payment Confirmation Modal */}
      <PaymentConfirmationModal
        show={showPaymentConfirmation}
        onClose={() => setShowPaymentConfirmation(false)}
        onProceed={handlePaymentProceed}
        amount={calculateDelegateFee()}
        currency={"INR"}
      />

      {showSuccessModal && (
        <PaymentSuccessModal
          show={true}
          onClose={() => {
            setShowSuccessModal(false);
            navigate("/");
          }}
        />
      )}

      {loading && <Loader />}

      <div className=" w-full relative z-10 mx-auto h-full grid grid-cols-1 lg:grid-cols-2">
         <div className="bg-[url('/formbg.jpg')] bg-cover bg-center py-20">
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
                  DELEGATE REGISTRATION FORM
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
              {/* Step 1: AINET Membership Information */}
              {currentStep === 1 && (
                <div className="flex-1 flex flex-col space-y-4 overflow-y-auto">
                  <div className="bg-gray-400 p-3 rounded">
                    <h2 className="text-white text-lg font-semibold">
                      AINET Membership Information
                    </h2>
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
                          className="w-full p-2 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Not sure of your ID?{" "}
                          <a href="#" className="text-blue-600">
                            Login here
                          </a>
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
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "Indian Delegate",
                          "SAARC Country Delegate",
                          "Overseas Delegate",
                          "Student or Trainee Teacher",
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
                              {type === "Student or Trainee Teacher" && (
                                <p className="text-xs text-gray-500">
                                  (Upload document required)
                                </p>
                              )}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {formData.delegate_type ===
                      "Student or Trainee Teacher" && (
                      <div className="mt-3">
                        <label className="block text-xs font-semibold mb-1 text-gray-700">
                          Supporting Document:{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded p-2 bg-gray-50">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                            onChange={handleFileChange}
                            className="w-full p-1 border border-gray-300 rounded bg-white text-xs"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            (Upload any document like your student ID, fees
                            receipt, admission slip etc of current year)
                          </p>
                          {selectedFile && (
                            <p className="text-xs text-green-600 mt-1">
                              Selected: {selectedFile.name}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
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

                  <div className="flex-1 space-y-6">
                    <div className="grid  gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                          Title: <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded text-sm "
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
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleChange}
                          placeholder="Enter Your Name"
                          className="w-full p-3 border border-gray-300 rounded text-sm "
                        />
                      </div>
                    </div>

                    <div className="grid gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                          Gender: <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded text-sm "
                        >
                          <option value="">Select Your Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Transgender">Transgender</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                          Age (Years): <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="age_group"
                          value={formData.age_group}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded text-sm"
                        >
                          <option value="">Select Age Range</option>
                          <option value="Below 20">Below 20</option>
                          <option value="20-30">20-30</option>
                          <option value="31-40">31-40</option>
                          <option value="41-50">41-50</option>
                          <option value="51-55">51-55</option>
                          <option value="Over 55">Over 55</option>
                        </select>
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

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Institution Address:
                      </label>
                      <input
                        name="institution_address"
                        value={formData.institution_address}
                        onChange={handleChange}
                        placeholder="Enter Your Institution Address"
                        className="w-full p-2 border border-gray-300 rounded text-sm "
                        rows="3"
                      ></input>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Address for Correspondence:{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="correspondence_address"
                        value={formData.correspondence_address}
                        onChange={handleChange}
                        placeholder="Enter Your Correspondence Address"
                        className="w-full p-2 border border-gray-300 rounded text-sm "
                        rows="3"
                      ></input>
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
                        className="w-full p-2 border border-gray-300 rounded text-sm "
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Pincode:
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="Enter Pincode"
                        className="w-full p-2 border border-gray-300 rounded text-sm "
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        State:
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Enter Your State"
                        className="w-full p-2 border border-gray-300 rounded text-sm "
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
                          name="country_code"
                          value={formData.country_code}
                          onChange={handleChange}
                          placeholder="+91"
                          className="w-full p-2 border border-gray-300 rounded text-sm "
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                          Mobile No: <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="mobile_no"
                          value={formData.mobile_no}
                          onChange={handleChange}
                          placeholder="Enter Your Mobile Number"
                          className="w-full p-2 border border-gray-300 rounded text-sm "
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Email: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onBlur={checkEmailExists}
                        onChange={handleChange}
                        placeholder="Enter Your Email"
                        className="w-full p-2 border border-gray-300 rounded text-sm "
                      />
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

                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Areas of your special interest:
                      </label>
                      <input
                        name="areas_of_interest"
                        value={formData.areas_of_interest}
                        onChange={handleChange}
                        placeholder="Enter your areas of interest"
                        className="w-full p-2 border border-gray-300 rounded text-sm "
                        rows="3"
                      ></input>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Area(s) of your work:
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "Not Applicable",
                          "Primary",
                          "Secondary",
                          "Junior College (+2)",
                          "Senior College/ University",
                          "Teacher Education",
                          "Other",
                        ].map((area) => (
                          <label
                            key={area}
                            className="flex items-center p-1 rounded cursor-pointer hover:bg-gray-50"
                          >
                            <input
                              type="checkbox"
                              name="area_of_work"
                              value={area}
                              checked={formData.area_of_work.includes(area)}
                              onChange={handleChange}
                              className="mr-3"
                            />
                            <span className="text-sm">{area}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {formData.area_of_work.includes("Other") && (
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                          Other - Please Specify:
                        </label>
                        <input
                          type="text"
                          name="other_work_area"
                          value={formData.other_work_area}
                          onChange={handleChange}
                          placeholder="Please specify your work area"
                          className="w-full p-2 border border-gray-300 rounded text-sm "
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Teaching Experience (Years):
                      </label>
                      <select
                        name="teaching_experience"
                        value={formData.teaching_experience}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded text-sm "
                      >
                        <option value="">Select Experience</option>
                        <option value="Not Applicable">Not Applicable</option>
                        <option value="0-5">0-5</option>
                        <option value="6-10">6-10</option>
                        <option value="11-15">11-15</option>
                        <option value="16-20">16-20</option>
                        <option value="21-25">21-25</option>
                        <option value="Over 25">Over 25</option>
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
                        Are you presenting anything at the conference?
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
                          {["Paper", "Poster"].map((type) => (
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
                            Up to 31 December 2021
                          </h5>
                          <div className="space-y-2 text-sm">
                            <p>• India & SAARC countries: INR 1,500</p>
                            <p>• Other countries (USD 25)</p>
                            <p>• Students & trainee teachers (INR 500)</p>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-3 text-blue-800 text-sm">
                            {" "}
                            From 1 Jan 2022
                          </h5>
                          <div className="space-y-2 text-sm">
                            <p>• India & SAARC countries: INR 2,000</p>
                            <p>• Other countries (USD 50)</p>
                            <p>• Students & trainee teachers (INR 1000)</p>
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

              {/* Navigation Button - Inside Form */}
              <div className="flex justify-center items-center mt-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-15 py-4 bg-yellow-200 hover:bg-yellow-300 text-black font-bold rounded-full transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
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
    </>
  );
}

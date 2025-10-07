import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../../../utils/constant';
import { initiatePayment } from '../../../utils/utility';
import PaymentSuccessModal from '../../PaymentIntegration/Popup';
import PaymentConfirmationModal from '../../PaymentIntegration/PaymentConfirmationModal';
import Loader from '../../../Components/shared/Loader';
import { toast } from 'react-toastify';

export default function AINET2026DelegateRegistrationForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    // Basic Information
    is_ainet_member: '',
    membership_id: '',
    delegate_type: '',
    supporting_document: null,
    title: '',
    full_name: '',
    gender: '',
    age_group: '',
    institution_address: '',
    correspondence_address: '',
    city: '',
    pincode: '',
    state: '',
    country_code: '',
    mobile_no: '',
    email: '',
    
    // Professional Information
    areas_of_interest: '',
    area_of_work: [],
    other_work_area: '',
    teaching_experience: '',
    
    // Conference Participation
    is_presenting: '',
    presentation_type: [],
    
    // Authentication
    password: '',
    password_confirmation: '',
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox' && (name === 'area_of_work' || name === 'presentation_type')) {
      setFormData(prevData => ({
        ...prevData,
        [name]: checked 
          ? [...(prevData[name] || []), value]
          : (prevData[name] || []).filter(item => item !== value)
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFormData(prevData => ({
      ...prevData,
      supporting_document: file
    }));
  };

  // Form validation
  const validateForm = () => {
    const requiredFields = [
      'delegate_type', 'title', 'full_name', 'gender', 'age_group',
      'correspondence_address', 'city', 'mobile_no', 'email', 'password'
    ];

    for (let field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === '') {
        toast.error(`Please fill in the ${field.replace('_', ' ')} field.`);
        return false;
      }
    }

    if (formData.password !== formData.password_confirmation) {
      toast.error("Passwords do not match!");
      return false;
    }

    if (formData.password.length < 6) {
      toast.warning("Password should be at least 6 characters long.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (!formData.agree) {
      toast.error("Please agree to the terms and conditions.");
      return false;
    }

    if (formData.delegate_type === 'Student or Trainee Teacher' && !selectedFile) {
      toast.error("Please upload supporting document for student/trainee registration.");
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

  const calculateDelegateFee = () => {
    const { delegate_type, is_ainet_member } = formData;
    let baseFee = 0;

    // Updated fees for 2026
    switch (delegate_type) {
      case 'Indian Delegate':
        baseFee = 1500;
        break;
      case 'SAARC Country Delegate':
        baseFee = 1500;
        break;
      case 'Overseas Delegate':
        baseFee = 3000; // USD 60 equivalent
        break;
      case 'Student or Trainee Teacher':
        baseFee = 750;
        break;
      default:
        baseFee = 1500;
    }

    // AINET member discount
    if (is_ainet_member === 'Yes' && formData.membership_id) {
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
        currency: "INR"
      });

      toast.success("✅ Payment Successful");
      setLoading(true);
      setIsSubmitting(true);

      const submissionData = new FormData();
      Object.keys(formData).forEach(key => {
        if (Array.isArray(formData[key])) {
          submissionData.append(key, JSON.stringify(formData[key]));
        } else {
          submissionData.append(key, formData[key]);
        }
      });

      if (selectedFile) {
        submissionData.append('supporting_document', selectedFile);
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
          is_ainet_member: '',
          membership_id: '',
          delegate_type: '',
          supporting_document: null,
          title: '',
          full_name: '',
          gender: '',
          age_group: '',
          institution_address: '',
          correspondence_address: '',
          city: '',
          pincode: '',
          state: '',
          country_code: '',
          mobile_no: '',
          email: '',
          areas_of_interest: '',
          area_of_work: [],
          other_work_area: '',
          teaching_experience: '',
          is_presenting: '',
          presentation_type: [],
          password: '',
          password_confirmation: '',
          agree: false,
        });
        setSelectedFile(null);
      } else {
        const errorData = await res.json();
        toast.error(`${errorData.message || "Something went wrong. Please try again."}`);
      }

    } catch (error) {
      toast.error(`❌ Registration Failed: ${error}`);
      console.error("Payment or API Error:", error);
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  function getPasswordStrength(password) {
    return {
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };
  }

  const passwordStrength = getPasswordStrength(formData.password);
  const allStrong = Object.values(passwordStrength).every(Boolean);

  const isFormValid = () => {
    const requiredFields = [
      'delegate_type', 'title', 'full_name', 'gender', 'age_group',
      'correspondence_address', 'city', 'mobile_no', 'email', 'password', 'password_confirmation'
    ];

    for (let field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === '') {
        return false;
      }
    }

    if (!formData.agree) return false;
    if (!isEmailValid) return false;
    if (formData.delegate_type === 'Student or Trainee Teacher' && !selectedFile) return false;

    return true;
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
          onClose={() => { setShowSuccessModal(false); navigate("/") }}
        />
      )}

      {loading && <Loader />}

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
          <h2 className="text-2xl font-bold py-2 text-center text-gray-800">DELEGATE REGISTRATION FORM</h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* AINET Membership Section */}
          <div className="mb-6">
            <div className="bg-[#A6AEBF] p-2 my-8">
              <h2 className="text-white text-xl">AINET Membership Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-semibold mb-1">Are you an AINET member? <span className="text-red-500">*</span></label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="is_ainet_member"
                      value="Yes"
                      checked={formData.is_ainet_member === 'Yes'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="is_ainet_member"
                      value="No"
                      checked={formData.is_ainet_member === 'No'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>

              {formData.is_ainet_member === 'Yes' && (
                <div>
                  <label className="block text-base font-semibold mb-1">Membership ID:</label>
                  <input
                    type="text"
                    name="membership_id"
                    value={formData.membership_id}
                    onChange={handleChange}
                    placeholder="Enter Your Membership Number"
                    className="w-full p-2 bg-white rounded border border-gray-300"
                  />
                  <p className="text-xs text-gray-500 mt-1">Not sure of your ID? <a href="#" className="text-blue-600">Login here</a></p>
                </div>
              )}
            </div>
          </div>

          {/* Registration Type Section */}
          <div className="mb-6">
            <div className="bg-[#A6AEBF] p-2 my-8">
              <h2 className="text-white text-xl">Registration Type</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-base font-semibold mb-1">You are registering as: <span className="text-red-500">*</span></label>
                <div className="space-y-2">
                  {['Indian Delegate', 'SAARC Country Delegate', 'Overseas Delegate', 'Student or Trainee Teacher'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="radio"
                        name="delegate_type"
                        value={type}
                        checked={formData.delegate_type === type}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      {type}
                      {type === 'Student or Trainee Teacher' && (
                        <span className="text-xs text-gray-500 ml-2">(Upload document required)</span>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {formData.delegate_type === 'Student or Trainee Teacher' && (
                <div>
                  <label className="block text-base font-semibold mb-1">Supporting Document: <span className="text-red-500">*</span></label>
                  <div className="border border-gray-300 rounded p-2 bg-gray-50">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded bg-white"
                    />
                    <p className="text-xs text-gray-500 mt-1">(Upload any document like your student ID, fees receipt, admission slip etc of current year)</p>
                    {selectedFile && (
                      <p className="text-sm text-green-600 mt-1">Selected: {selectedFile.name}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="mb-6">
            <div className="bg-[#A6AEBF] p-2 my-8">
              <h2 className="text-white text-xl">Personal Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-semibold mb-1">Title: <span className="text-red-500">*</span></label>
                <select
                  name="title"
                  value={formData.title}
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
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="This name will appear on your conference certificate"
                  className="w-full p-2 bg-white rounded border border-gray-300"
                  required
                />
              </div>
              <div>
                <label className="block text-base font-semibold mb-1">Gender: <span className="text-red-500">*</span></label>
                <div className="flex gap-4">
                  {['Male', 'Female', 'Transgender'].map((gender) => (
                    <label key={gender} className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      {gender}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-base font-semibold mb-1">Age (Years): <span className="text-red-500">*</span></label>
                <select
                  name="age_group"
                  value={formData.age_group}
                  onChange={handleChange}
                  className="w-full p-2 bg-white rounded border border-gray-300"
                  required
                >
                  <option value="">Select Age Group</option>
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

          {/* Address Information Section */}
          <div className="mb-6">
            <div className="bg-[#A6AEBF] p-2 my-8">
              <h2 className="text-white text-xl">Address Information</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-base font-semibold mb-1">Institution Address:</label>
                <textarea
                  name="institution_address"
                  value={formData.institution_address}
                  onChange={handleChange}
                  placeholder="Enter Your Institution Address"
                  className="w-full p-2 bg-white rounded border border-gray-300"
                  rows="2"
                ></textarea>
              </div>

              <div>
                <label className="block text-base font-semibold mb-1">Address for Correspondence: <span className="text-red-500">*</span></label>
                <textarea
                  name="correspondence_address"
                  value={formData.correspondence_address}
                  onChange={handleChange}
                  placeholder="Enter Your Correspondence Address"
                  className="w-full p-2 bg-white rounded border border-gray-300"
                  rows="2"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-base font-semibold mb-1">City: <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter Your City"
                    className="w-full p-2 bg-white rounded border border-gray-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-base font-semibold mb-1">Pincode:</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Enter Pincode"
                    className="w-full p-2 bg-white rounded border border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-base font-semibold mb-1">State:</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter Your State"
                    className="w-full p-2 bg-white rounded border border-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="mb-6">
            <div className="bg-[#A6AEBF] p-2 my-8">
              <h2 className="text-white text-xl">Contact Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-semibold mb-1">Country Code:</label>
                <input
                  type="text"
                  name="country_code"
                  value={formData.country_code}
                  onChange={handleChange}
                  placeholder="+91"
                  className="w-full p-2 bg-white rounded border border-gray-300"
                />
              </div>
              <div>
                <label className="block text-base font-semibold mb-1">Mobile No: <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  name="mobile_no"
                  value={formData.mobile_no}
                  onChange={handleChange}
                  placeholder="Enter Your Mobile Number"
                  className="w-full p-2 bg-white rounded border border-gray-300"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-base font-semibold mb-1">Email: <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onBlur={checkEmailExists}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                  className="w-full p-2 bg-white rounded border border-gray-300"
                  required
                />
              </div>
            </div>
          </div>

          {/* Professional Information Section */}
          <div className="mb-6">
            <div className="bg-[#A6AEBF] p-2 my-8">
              <h2 className="text-white text-xl">Professional Information</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-base font-semibold mb-1">Areas of your special interest:</label>
                <textarea
                  name="areas_of_interest"
                  value={formData.areas_of_interest}
                  onChange={handleChange}
                  placeholder="Enter your areas of interest"
                  className="w-full p-2 bg-white rounded border border-gray-300"
                  rows="2"
                ></textarea>
              </div>

              <div>
                <label className="block text-base font-semibold mb-1">Area(s) of your work:</label>
                <div className="space-y-2">
                  {[
                    'Not Applicable', 'Primary', 'Secondary', 'Junior College (+2)', 
                    'Senior College/ University', 'Teacher Education', 'Other'
                  ].map((area) => (
                    <label key={area} className="flex items-center">
                      <input
                        type="checkbox"
                        name="area_of_work"
                        value={area}
                        checked={formData.area_of_work.includes(area)}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      {area}
                    </label>
                  ))}
                </div>
              </div>

              {formData.area_of_work.includes('Other') && (
                <div>
                  <label className="block text-base font-semibold mb-1">Other - Please Specify:</label>
                  <input
                    type="text"
                    name="other_work_area"
                    value={formData.other_work_area}
                    onChange={handleChange}
                    placeholder="Please specify your work area"
                    className="w-full p-2 bg-white rounded border border-gray-300"
                  />
                </div>
              )}

              <div>
                <label className="block text-base font-semibold mb-1">Teaching Experience (Years):</label>
                <select
                  name="teaching_experience"
                  value={formData.teaching_experience}
                  onChange={handleChange}
                  className="w-full p-2 bg-white rounded border border-gray-300"
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

          {/* Conference Participation Section */}
          <div className="mb-6">
            <div className="bg-[#A6AEBF] p-2 my-8">
              <h2 className="text-white text-xl">Conference Participation</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-base font-semibold mb-1">Are you presenting anything at the conference?</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="is_presenting"
                      value="YES"
                      checked={formData.is_presenting === 'YES'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    YES
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="is_presenting"
                      value="NO"
                      checked={formData.is_presenting === 'NO'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    NO
                  </label>
                </div>
              </div>

              {formData.is_presenting === 'YES' && (
                <div>
                  <label className="block text-base font-semibold mb-1">If yes, what are you presenting?</label>
                  <div className="space-y-2">
                    {['Paper', 'Video', 'Poster', 'Fast-15'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          name="presentation_type"
                          value={type}
                          checked={formData.presentation_type.includes(type)}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Delegate Fee Information */}
          <div className="mb-6">
            <div className="bg-[#A6AEBF] p-2 my-8">
              <h2 className="text-white text-xl">Delegate Fee (2026)</h2>
            </div>

            <div className="bg-gray-50 p-4 rounded border">
              <h4 className="font-semibold mb-3">Registration Fees:</h4>
              <ul className="space-y-2 text-sm">
                <li>• Indian & SAARC countries: INR 1,500</li>
                <li>• Overseas Delegates: INR 3,000 (USD 60)</li>
                <li>• Students & Trainee Teachers: INR 750</li>
              </ul>
              <p className="text-xs text-green-700 mt-3 font-semibold">
                *AINET members are entitled to 20% discount in the delegate fee
              </p>
              
              {formData.delegate_type && (
                <div className="mt-4 p-3 bg-blue-50 rounded">
                  <p className="font-semibold">Your Registration Fee: 
                    <span className="text-blue-600 text-lg ml-2">
                      INR {calculateDelegateFee()}
                    </span>
                  </p>
                  {formData.is_ainet_member === 'Yes' && formData.membership_id && (
                    <p className="text-xs text-green-600 mt-1">
                      ✓ AINET Member Discount Applied (20% off)
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className='mb-6'>

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
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

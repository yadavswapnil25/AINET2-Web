import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../../../utils/constant';
import { initiatePayment } from '../../../utils/utility';
import PaymentSuccessModal from '../../PaymentIntegration/Popup';
import PaymentConfirmationModal from '../../PaymentIntegration/PaymentConfirmationModal';
import Loader from '../../../Components/shared/Loader';
import { toast } from 'react-toastify';

export default function MembershipFormforInstitutionalLongTerm() {
  const location = useLocation();
  const navigate = useNavigate();
  const plan = location?.state;
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [formData, setFormData] = useState({
    institution_name: '',
    institution_type: '',
    other_type: '',
    contact_no: '',
    whatsapp_no: '',
    email: '',
    website: '',
    address: '',
    state: '',
    district: '',
    contact_person_name: '',
    contact_person_no: '',
    contact_person_email: '',
    host_event: 'YES',
    expectations: '',
    newsletter: 'YES',
    password: '',
    password_confirmation: '',
    agree: false,
    membership_type: plan?.type,
    membership_plan: plan?.title,
  });

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState({
    states: false,
    districts: false
  });
  const [error, setError] = useState({
    states: null,
    districts: null
  });

  // Fetch Indian states on component mount
  useEffect(() => {
    const fetchStates = async () => {
      setLoading(prev => ({ ...prev, states: true }));
      try {
        // For India, the geonameId is 1269750
        const response = await fetch(
          'https://secure.geonames.org/childrenJSON?geonameId=1269750&featureCode=ADM1&username=paresh09'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch states');
        }
        
        const data = await response.json();
        const sortedStates = data.geonames.sort((a, b) => a.name.localeCompare(b.name));
        setStates(sortedStates);
        setError(prev => ({ ...prev, states: null }));
      } catch (err) {
        console.error('Error fetching states:', err);
        setError(prev => ({ ...prev, states: err.message }));
      } finally {
        setLoading(prev => ({ ...prev, states: false }));
      }
    };

    fetchStates();
  }, []);

  // Fetch districts when state changes
  useEffect(() => {
    const fetchDistricts = async () => {
      if (!formData.state) {
        setDistricts([]);
        return;
      }
      
      setLoading(prev => ({ ...prev, districts: true }));
      try {
        const selectedState = states.find(state => state.geonameId === parseInt(formData.state));
        if (!selectedState) return;
        
        const response = await fetch(
          `https://secure.geonames.org/childrenJSON?geonameId=${selectedState.geonameId}&featureCode=ADM2&username=paresh09`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch districts');
        }
        
        const data = await response.json();
        const sortedDistricts = data.geonames.sort((a, b) => a.name.localeCompare(b.name));
        setDistricts(sortedDistricts);
        setError(prev => ({ ...prev, districts: null }));
      } catch (err) {
        console.error('Error fetching districts:', err);
        setError(prev => ({ ...prev, districts: err.message }));
      } finally {
        setLoading(prev => ({ ...prev, districts: false }));
      }
    };

    fetchDistricts();
  }, [formData.state, states]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Reset district when state changes
    if (name === 'state') {
      setFormData(prevData => ({
        ...prevData,
        district: ''
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const requiredFields = [
      'institution_name', 'institution_type', 'contact_no', 'email', 'address', 
      'state', 'district', 'contact_person_name', 'contact_person_no', 
      'contact_person_email', 'password'
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
    if (!emailRegex.test(formData.email) || !emailRegex.test(formData.contact_person_email)) {
      toast.error("Please enter valid email addresses.");
      return false;
    }

    if (!formData.agree) {
      toast.error("Please agree to the terms and conditions.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Show payment confirmation modal
    setShowPaymentConfirmation(true);
  };

  const handlePaymentProceed = async () => {
    setShowPaymentConfirmation(false);
    
    try {
      const paymentResponse = await initiatePayment({
        amount: plan?.price,
        name: formData.institution_name,
        email: formData.email,
        contact: formData.contact_no,
        currency: plan?.currency || "INR"
      });

      toast.success("✅ Payment Successful");
      setLoading(true);
      setIsSubmitting(true);

      const res = await fetch(`${baseUrl}client/membership-signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const responseData = await res.json();
        setIsPaymentDone(true);
        setShowSuccessModal(true);
        setFormData({
          institution_name: '',
          institution_type: '',
          other_type: '',
          contact_no: '',
          whatsapp_no: '',
          email: '',
          website: '',
          address: '',
          state: '',
          district: '',
          contact_person_name: '',
          contact_person_no: '',
          contact_person_email: '',
          host_event: 'YES',
          expectations: '',
          newsletter: 'YES',
          password: '',
          password_confirmation: '',
          agree: false,
          membership_type: "",
          membership_plan: "",
        });
      } else {
        const errorData = await res.json();
        toast.error(`${errorData.message || "Something went wrong. Please try again."}`);
      }

    } catch (error) {
      toast.error(`❌ Payment Failed: ${error}`);
      console.error("Payment or API Error:", error);
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!location.state) navigate("/")
  }, [])

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

  // Check if form is valid for submit button
  const isFormValid = () => {
    const requiredFields = [
      'institution_name', 'institution_type', 'contact_no', 'email', 'address', 
      'state', 'district', 'contact_person_name', 'contact_person_no', 
      'contact_person_email', 'password', 'password_confirmation'
    ];

    for (let field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === '') {
        return false;
      }
    }

    if (!formData.agree) return false;

    return true;
  };

  return (
    <>
      {/* Payment Confirmation Modal */}
      <PaymentConfirmationModal 
        show={showPaymentConfirmation}
        onClose={() => setShowPaymentConfirmation(false)}
        onProceed={handlePaymentProceed}
        amount={plan?.price}
        currency={plan?.currency || "INR"}
      />

      {showSuccessModal && (
        <PaymentSuccessModal
          show={true}
          onClose={() => { setShowSuccessModal(false); navigate("/") }}
        />
      )}

      {loading.states && <Loader />}

    <div className="max-w-5xl mx-auto my-10 p-4 border border-blue-500 rounded-lg bg-white shadow-md">
      <div className="relative mb-4 pb-2">
        <h1 className="text-4xl font-bold py-4 text-center">Membership Form for {plan?.type} {plan?.title}</h1>
        <button className="absolute top-0 right-0 bg-black rounded-full p-2">
          <Link to={{ pathname: '/', hash: '#membershipplan' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </Link>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Institution Information Section */}
        <div className="mb-4">
          <div className="bg-gray-400 text-white p-2 mb-2">
            <h2 className="text-xl ml-2">Institution Information</h2>
          </div>

          <div className="space-y-2 px-1">
            <div>
              <label className="block text-base mb-2 mt-1">Name of the Institution : <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="institution_name"
                value={formData.institution_name}
                onChange={handleChange}
                placeholder="Enter Your Institute Name"
                className="w-full p-2 bg-white rounded border border-gray-300"
                required
              />
            </div>

            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block text-base mb-2 mt-1">Type of institution : <span className="text-red-500">*</span></label>
                <select
                  name="institution_type"
                  value={formData.institution_type}
                  onChange={handleChange}
                  className="w-full p-2 bg-blue-100 rounded text-base"
                  required
                >
                  <option value="">Select Type of Institution</option>
                  <option value="school">School</option>
                  <option value="college">College</option>
                  <option value="university">University</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="w-1/2">
                <label className="block text-base mb-2 mt-1">Other :</label>
                <input
                  type="text"
                  name="other_type"
                  value={formData.other_type}
                  onChange={handleChange}
                  placeholder="Enter your info"
                  className="w-full p-2 bg-blue-100 rounded text-base"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block text-base mb-2 mt-1">Contact No. : <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="contact_no"
                  value={formData.contact_no}
                  onChange={handleChange}
                  placeholder="Enter Your No."
                  className="w-full p-2 bg-white rounded border border-gray-300"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-base mb-2 mt-1">WhatsApp No. :</label>
                <input
                  type="text"
                  name="whatsapp_no"
                  value={formData.whatsapp_no}
                  onChange={handleChange}
                  placeholder="Enter Your No."
                  className="w-full p-2 bg-white rounded border border-gray-300"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block text-base mb-2 mt-1">Email : <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                  className="w-full p-2 bg-white rounded border border-gray-300"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-base mb-2 mt-1">Website :</label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="Enter Your Website address"
                  className="w-full p-2 bg-white rounded border border-gray-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-base mb-2 mt-1">Address (Institutional) : <span className="text-red-500">*</span></label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter Your Address"
                className="w-full p-2 bg-white rounded border border-gray-300"
                rows="2"
                required
              ></textarea>
            </div>

            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block text-base mb-2 mt-1">State : <span className="text-red-500">*</span></label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full p-2 bg-white rounded border border-gray-300"
                  disabled={loading.states}
                  required
                >
                  <option value="">
                    {loading.states 
                      ? "Loading states..." 
                      : error.states 
                        ? "Error loading states" 
                        : "Select Your State"}
                  </option>
                  {states.map(state => (
                    <option key={state.geonameId} value={state.geonameId}>
                      {state.name}
                    </option>
                  ))}
                </select>
                {error.states && <p className="text-red-500 text-xs mt-1">{error.states}</p>}
              </div>
              <div className="w-1/2">
                <label className="block text-base mb-2 mt-1">District : <span className="text-red-500">*</span></label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full p-2 bg-white rounded border border-gray-300"
                  disabled={loading.districts || !formData.state}
                  required
                >
                  <option value="">
                    {!formData.state 
                      ? "Select state first" 
                      : loading.districts 
                        ? "Loading districts..." 
                        : error.districts 
                          ? "Error loading districts" 
                          : "Select Your District"}
                  </option>
                  {districts.map(district => (
                    <option key={district.geonameId} value={district.geonameId}>
                      {district.name}
                    </option>
                  ))}
                </select>
                {error.districts && <p className="text-red-500 text-xs mt-1">{error.districts}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Other Information Section */}
        <div className="mb-4">
          <div className="bg-gray-400 text-white p-2 mb-2">
            <h2 className="text-base ml-2">Other Information</h2>
          </div>

          <div className="space-y-2 px-1">
            <div>
              <label className="block text-base mb-2 mt-1">Name of the contact person : <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="contact_person_name"
                value={formData.contact_person_name}
                onChange={handleChange}
                placeholder="Enter Your Name"
                className="w-full p-2 bg-white rounded border border-gray-300"
                required
              />
            </div>

            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block text-base mb-2 mt-1">Contact No. : <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="contact_person_no"
                  value={formData.contact_person_no}
                  onChange={handleChange}
                  placeholder="Enter Your No."
                  className="w-full p-2 bg-white rounded border border-gray-300"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-base mb-2 mt-1">Email : <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  name="contact_person_email"
                  value={formData.contact_person_email}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                  className="w-full p-2 bg-white rounded border border-gray-300"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-base mb-2 mt-1">Would you like to host an event/collaborate with AINET?</label>
              <select
                name="host_event"
                value={formData.host_event}
                onChange={handleChange}
                className="w-full p-2 bg-white rounded border border-gray-300"
              >
                <option value="YES">YES</option>
                <option value="NO">NO</option>
              </select>
            </div>

            <div>
              <label className="block text-base mb-2 mt-1">Your expectations from AINET :</label>
              <textarea
                name="expectations"
                value={formData.expectations}
                onChange={handleChange}
                placeholder="Enter your expectations"
                className="w-full p-2 bg-white rounded border border-gray-300"
                rows="2"
              ></textarea>
            </div>

            <div>
              <label className="block text-base mb-2 mt-1">Like to receive newsletter ?</label>
              <select
                name="newsletter"
                value={formData.newsletter}
                onChange={handleChange}
                className="w-full p-2 bg-white rounded border border-gray-300"
              >
                <option value="YES">YES</option>
                <option value="NO">NO</option>
              </select>
            </div>

            {/* Enhanced Password Fields */}
            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block text-base mb-2 mt-1">Password : <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={e => { handleChange(e); setPasswordTouched(true); }}
                    placeholder="Enter Your Password"
                    className="w-full p-2 bg-white rounded border border-gray-300 pr-10"
                    required
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                    onClick={() => setShowPassword(v => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12C3.5 7.5 7.5 4.5 12 4.5c4.5 0 8.5 3 9.75 7.5-1.25 4.5-5.25 7.5-9.75 7.5-4.5 0-8.5-3-9.75-7.5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.5 12c1.25 4.5 5.25 7.5 10.5 7.5 2.042 0 3.97-.488 5.625-1.352M6.228 6.228A9.956 9.956 0 0112 4.5c4.5 0 8.5 3 9.75 7.5-.386 1.386-1.09 2.693-2.06 3.823M6.228 6.228l11.544 11.544M6.228 6.228L4.5 4.5m15 15l-1.728-1.728" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.88 9.88a3 3 0 014.24 4.24" />
                      </svg>
                    )}
                  </button>
                </div>
                {/* Password strength instructions */}
                <div className="mt-2 text-xs">
                  <div className="font-semibold mb-1">Password must contain:</div>
                  <ul className="space-y-1">
                    <li className={passwordTouched ? (passwordStrength.length ? 'text-green-600' : 'text-red-500') : 'text-gray-500'}>
                      • At least 8 characters
                    </li>
                    <li className={passwordTouched ? (passwordStrength.upper ? 'text-green-600' : 'text-red-500') : 'text-gray-500'}>
                      • An uppercase letter (A-Z)
                    </li>
                    <li className={passwordTouched ? (passwordStrength.lower ? 'text-green-600' : 'text-red-500') : 'text-gray-500'}>
                      • A lowercase letter (a-z)
                    </li>
                    <li className={passwordTouched ? (passwordStrength.number ? 'text-green-600' : 'text-red-500') : 'text-gray-500'}>
                      • A number (0-9)
                    </li>
                    <li className={passwordTouched ? (passwordStrength.special ? 'text-green-600' : 'text-red-500') : 'text-gray-500'}>
                      • A special character (!@#$%^&*)
                    </li>
                  </ul>
                  {passwordTouched && !allStrong && (
                    <div className="text-red-500 mt-1">Password is not strong enough.</div>
                  )}
                </div>
              </div>
              <div className="w-1/2">
                <label className="block text-base mb-2 mt-1">Re-Enter Password : <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input
                    type={showPasswordConfirm ? "text" : "password"}
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    placeholder="Re-Enter Your Password"
                    className="w-full p-2 bg-white rounded border border-gray-300 pr-10"
                    required
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                    onClick={() => setShowPasswordConfirm(v => !v)}
                    aria-label={showPasswordConfirm ? 'Hide password' : 'Show password'}
                  >
                    {showPasswordConfirm ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12C3.5 7.5 7.5 4.5 12 4.5c4.5 0 8.5 3 9.75 7.5-1.25 4.5-5.25 7.5-9.75 7.5-4.5 0-8.5-3-9.75-7.5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.5 12c1.25 4.5 5.25 7.5 10.5 7.5 2.042 0 3.97-.488 5.625-1.352M6.228 6.228A9.956 9.956 0 0112 4.5c4.5 0 8.5 3 9.75 7.5-.386 1.386-1.09 2.693-2.06 3.823M6.228 6.228l11.544 11.544M6.228 6.228L4.5 4.5m15 15l-1.728-1.728" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.88 9.88a3 3 0 014.24 4.24" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start mt-1">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="mt-1 mr-1 accent-green-600 w-5 h-5"
                required
              />
              <label className="text-xs">I agree to the terms and conditions of the membership. <span className="text-red-500">*</span></label>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button 
            type="submit" 
            disabled={isSubmitting || !isFormValid()}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-colors ${isSubmitting || !isFormValid()
              ? 'bg-amber-100 cursor-not-allowed disabled:cursor-not-allowed'
              : 'bg-amber-200 hover:bg-amber-300 cursor-pointer'
              }`}
            style={{
              cursor: isSubmitting || !isFormValid() ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? 'SUBMITTING...' : 'SUBMIT APPLICATION FORM'}
          </button>
        </div>
      </form>
    </div>
    </>
  );
} 
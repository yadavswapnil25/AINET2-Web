import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../../../utils/constant';
import { initiatePayment } from '../../../utils/utility';
import PaymentSuccessModal from '../../PaymentIntegration/Popup';
import PaymentConfirmationModal from '../../PaymentIntegration/PaymentConfirmationModal';
import Loader from '../../../Components/shared/Loader';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { IoIosArrowDown } from "react-icons/io";

// Multi-select dropdown component
const MultiSelectDropdown = ({ options, selected, onChange, placeholder, name }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleToggle = (value) => {
        const newSelected = selected.includes(value)
            ? selected.filter(item => item !== value)
            : [...selected, value];
        onChange(newSelected);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                className="w-full p-2 bg-white rounded cursor-pointer border border-gray-300 min-h-[40px] flex items-center justify-between"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex flex-wrap gap-1">
                    {selected.length > 0 ? (
                        selected.map((item, index) => (
                            <span
                                key={index}
                                className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                            >
                                {item}
                            </span>
                        ))
                    ) : (
                        <span className="text-gray-500">{placeholder}</span>
                    )}
                </div>
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={`p-2 cursor-pointer hover:bg-gray-100 ${selected.includes(option) ? 'bg-blue-50 text-blue-600' : ''
                                }`}
                            onClick={() => handleToggle(option)}
                        >
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selected.includes(option)}
                                    readOnly
                                    className="mr-2"
                                />
                                {option}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default function MembershipFormForIndividualOverseas() {
    const location = useLocation();
    const navigate = useNavigate();
    const plan = location?.state;
    const [isPaymentDone, setIsPaymentDone] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);

    // Options for multi-select dropdown
    const areaOfWorkOptions = [
        "Primary School",
        "Secondary School",
        "Junior College (+2)",
        "Senior College/University",
        "Teacher Education",
        "Other"
    ];

    const [formData, setFormData] = useState({
        // Individual fields (empty for institutional)
        first_name: '',
        last_name: '',
        gender: '',
        dob: '',
        mobile: '',
        whatsapp_no: '',
        email: '',
        address: '',
        state: '',
        district: '',
        teaching_exp: '',

        area_of_work: [],
        password: '',
        agree: false,
        membership_type: "Individual",
        membership_plan: "Overseas",
        pin: '',
        password_confirmation: '',
        has_member_any: false,
        name_association: '',
        expectation: '',
        has_newsletter: false,
        title: '',
        address_institution: '',
        name_institution: '',
        type_institution: '',
        other_institution: '',



    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            if (name === 'agree') {
                setFormData(prev => ({
                    ...prev,
                    [name]: checked
                }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleMultiSelectChange = (name, selectedValues) => {
        setFormData(prev => ({
            ...prev,
            [name]: selectedValues
        }));
    };

    // Form validation function
    const validateForm = () => {
        const requiredFields = [
            'first_name', 'last_name', 'gender', 'dob', 'mobile',
            'whatsapp_no', 'email', 'address', 'teaching_exp', 'password'
        ];

        for (let field of requiredFields) {
            if (!formData[field] || formData[field].toString().trim() === '') {
                toast.error(`Please fill in the ${field.replace('_', ' ')} field.`);
                return false;
            }
        }

        if (formData.area_of_work.length === 0) {
            toast.error("Please select at least one area of work.");
            return false;
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

        const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(formData.mobile)) {
            toast.error("Please enter a valid 10-digit mobile number.");
            return false;
        }

        if (!formData.agree) {
            toast.error("Please agree to the terms and conditions.");
            return false;
        }

        return true;
    };


    const checkEmailExists = async () => {
        const email = formData.email;

        if (!email) return; // skip if empty

        try {
            const res = await fetch(`${baseUrl}client/eventValidationHandle?email=${encodeURIComponent(email)}`);

            if (!res.ok) {
                console.error("Failed to check email");
                return;
            }

            const data = await res.json();

            if (!data.status || data.status === false) {
                setIsEmailValid(false); // ❌ email not valid
                toast.warning("❌ Email already exists. Please use a different email.");
            } else {
                setIsEmailValid(true); // ✅ email valid
                // Optional success message
            }
        } catch (error) {
            console.error("Error checking email:", error);
        }
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
                name: `${formData.first_name} ${formData.last_name}`,
                email: formData.email,
                contact: formData.mobile,
                currency: plan?.currency || "INR"
            });

            toast.success("✅ Payment Successful");
            setLoading(true);
            setIsSubmitting(true);

            // Prepare form data with proper mapping for individual overseas
            const submissionData = {
                ...formData,
                // Map overseas specific fields properly
                has_member_any: formData.member_of_association === 'YES',
                name_association: formData.association_name || "",
                expectation: formData.expectations || "",
                has_newsletter: formData.receive_newsletter === 'YES',
            };

            const res = await fetch(`${baseUrl}client/membership-signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(submissionData),
            });

            if (res.ok) {
                const responseData = await res.json();
                setIsPaymentDone(true);
                setShowSuccessModal(true);
                setFormData({
                    first_name: '',
                    last_name: '',
                    gender: '',
                    dob: '',
                    mobile: '',
                    whatsapp_no: '',
                    email: '',
                    address: '',
                    state: "",
                    district: "",
                    teaching_exp: '',

                    area_of_work: [],
                    password: '',
                    agree: false,
                    membership_type: "",
                    membership_plan: "",
                    pin: "",
                    password_confirmation: '',
                    has_member_any: false,
                    name_association: '',
                    expectation: '',
                    has_newsletter: false,
                    title: '',
                    address_institution: '',
                    name_institution: '',
                    type_institution: '',
                    other_institution: '',

                });
            } else {
                const errorData = await res.json();
                toast.error(`${errorData.message || "Something went wrong. Please try again."}`);
            }

        } catch (error) {
            console.log("Error>>", error);
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
            'first_name', 'last_name', 'gender', 'dob', 'mobile',
            'whatsapp_no', 'email', 'address', 'teaching_exp', 'password', 'password_confirmation'
        ];

        for (let field of requiredFields) {
            if (!formData[field] || formData[field].toString().trim() === '') {
                return false;
            }
        }

        if (formData.area_of_work.length === 0) return false;
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

            {loading && <Loader />}

            <div className="max-w-5xl my-8 border border-blue-500 rounded-lg mx-auto p-6 relative bg-white">
                {/* Close button */}
                <button className="absolute top-2 right-2 bg-black rounded-full p-1">
                    <Link to={{ pathname: '/', hash: '#membershipplan' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                    </Link>
                </button>

                <h1 className="text-4xl font-bold mb-4 text-center">Membership Form for {plan?.type} {plan?.title}</h1>

                <form onSubmit={handleSubmit}>
                    {/* Personal Information Section */}
                    <div className="mb-6">
                        <div className="bg-[#A6AEBF] p-2 my-8">
                            <h2 className="text-white text-xl">Personal Information</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-base font-semibold mb-1">
                                    Title : <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-white rounded border border-gray-300 appearance-none"
                                    required
                                >
                                    <option value="">Select Title</option>
                                    <option value="mr">Mr</option>
                                    <option value="mrs">Mrs</option>
                                    <option value="ms">Ms</option>
                                    <option value="dr">Dr</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-base font-semibold mb-1">
                                    First Name : <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="first_name"
                                    placeholder="Enter Your First Name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-white rounded border border-gray-300"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-base font-semibold mb-1">
                                    Last Name : <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="last_name"
                                    placeholder="Enter Your Last Name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-white rounded border border-gray-300"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-base font-semibold mb-1">
                                    Gender : <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-white rounded border border-gray-300 appearance-none"
                                    required
                                >
                                    <option value="">Select Your Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-base font-semibold mb-1">
                                    Date of Birth : <span className="text-red-500">*</span>
                                </label>
                                <DatePicker
                                    selected={formData.dob ? new Date(formData.dob) : null}
                                    onChange={(date) => {
                                        setFormData(prev => ({
                                            ...prev,
                                            dob: date ? date.toISOString().split('T')[0] : ""
                                        }));
                                    }}
                                    maxDate={new Date(Date.now() - 24 * 60 * 60 * 1000)}
                                    showMonthDropdown
                                    showYearDropdown
                                    yearDropdownItemNumber={100}
                                    scrollableYearDropdown
                                    dropdownMode="select"
                                    placeholderText="Select your date of birth"
                                    dateFormat="yyyy-MM-dd"
                                    className="w-full p-2 bg-white rounded border border-gray-300"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-base font-semibold mb-1">
                                    Contact No. : <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="mobile"
                                    placeholder="Enter Your Number"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-white rounded border border-gray-300"
                                    maxLength={10}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-base font-semibold mb-1">
                                    WhatsApp No. : <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="whatsapp_no"
                                    placeholder="Enter Your Number"
                                    value={formData.whatsapp_no}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-white rounded border border-gray-300"
                                    maxLength={10}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-base font-semibold mb-1">
                                    Email : <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-white rounded border border-gray-300"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-base font-semibold mb-1">
                                Address (Residential) : <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="address"
                                placeholder="Enter Your Address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full p-2 bg-white rounded border border-gray-300"
                                rows="3"
                                required
                            ></textarea>
                        </div>
                    </div>

                    {/* Other Information Section */}
                    <div>
                        <div className="bg-[#A6AEBF] p-2 my-8">
                            <h2 className="text-white text-xl">Other Information</h2>
                        </div>


                        <div>
                            <label className="block text-base font-semibold mb-1">
                                Teaching Experience (In Years) : <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="teaching_exp"
                                placeholder="Enter Your Experience"
                                value={formData.teaching_exp}
                                onChange={handleChange}
                                className="w-full p-2 bg-white rounded border border-gray-300"
                                required
                            />
                        </div>

                        <div className="mt-4 relative">
                            <label className="block text-base font-semibold mb-1">
                                Are you member of any other English Teacher Association(s) : <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="member_of_association"
                                value={formData.member_of_association}
                                onChange={handleChange}
                                className="w-full p-2 bg-white rounded border cursor-pointer border-gray-300 appearance-none pr-10"
                                required
                            >
                                <option value="">Select Option</option>
                                <option value="YES">YES</option>
                                <option value="NO">NO</option>
                            </select>

                            {/* Arrow Icon */}
                            <div className="pointer-events-none absolute top-10 right-3 text-black">
                                <IoIosArrowDown />
                            </div>
                        </div>



                        {formData.member_of_association === 'YES' && (
                            <div className="mt-4">
                                <label className="block text-base font-semibold mb-1">
                                    Name of the Association(s) : <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="association_name"
                                    placeholder="Enter Association Name(s)"
                                    value={formData.association_name}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-white rounded border border-gray-300"
                                    rows="2"
                                    required={formData.member_of_association === 'YES'}
                                />
                            </div>
                        )}

                        <div className="mt-4">
                            <label className="block text-base font-semibold mb-1">
                                Area's of your work : <span className="text-red-500">*</span>
                            </label>
                            <MultiSelectDropdown
                                options={areaOfWorkOptions}
                                selected={formData.area_of_work}
                                onChange={(selected) => handleMultiSelectChange('area_of_work', selected)}
                                placeholder="Select areas of work"
                                name="area_of_work"
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-base font-semibold mb-1">
                                Your expectations from AINET :
                            </label>
                            <textarea
                                name="expectations"
                                placeholder="Enter your expectations"
                                value={formData.expectations}
                                onChange={handleChange}
                                className="w-full p-2 bg-white rounded border border-gray-300"
                                rows="3"
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-base font-semibold mb-1">Like to receive newsletter ?</label>
                            <select
                                name="receive_newsletter"
                                value={formData.receive_newsletter}
                                onChange={handleChange}
                                className="w-full p-2 bg-white rounded border border-gray-300 appearance-none"
                            >
                                <option value="YES">YES</option>
                                <option value="NO">NO</option>
                            </select>
                        </div>

                        {/* Enhanced Password Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-base font-semibold mb-1">
                                    Password : <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Enter Your Password"
                                        value={formData.password}
                                        onChange={e => { handleChange(e); setPasswordTouched(true); }}
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

                            <div>
                                <label className="block text-base font-semibold mb-1">
                                    Re-Enter Password : <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPasswordConfirm ? "text" : "password"}
                                        name="password_confirmation"
                                        placeholder="Re-Enter Your Password"
                                        value={formData.password_confirmation}
                                        onChange={handleChange}
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

                        <div className="mt-4 flex items-center">
                            <label htmlFor="agreeToTerms" className="flex items-center cursor-pointer select-none gap-2">
                                <input
                                    type="checkbox"
                                    id="agreeToTerms"
                                    name="agree"
                                    checked={formData.agree}
                                    onChange={handleChange}
                                    required
                                    className="accent-green-600 w-5 h-5 rounded border-2 border-gray-400 checked:border-green-600 focus:ring-2 focus:ring-green-300 transition-all duration-200 shadow-sm hover:shadow-md bg-white"
                                />
                                <span className="text-sm">
                                    I agree to the terms and conditions of the membership. <span className="text-red-500">*</span>
                                </span>
                            </label>
                        </div>

                        <div className="flex justify-center mt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting || !isFormValid()}
                                className={`px-6 py-2 rounded-full text-sm font-bold ${isSubmitting || !isFormValid()
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
                    </div>
                </form>
            </div>
        </>
    );
}
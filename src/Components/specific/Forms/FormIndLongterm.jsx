import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../../../utils/constant';
import { processMembershipPayment, confirmMembershipPayment } from '../../../utils/utility';
import PaymentConfirmationModal from '../../PaymentIntegration/PaymentConfirmationModal';
import PaymentSuccessModal from '../../PaymentIntegration/Popup';
import Loader from '../../shared/Loader';



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
                    {selected?.length > 0 ? (
                        selected?.map((item, index) => (
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
                            className={`p-2 cursor-pointer hover:bg-gray-100 ${selected?.includes(option) ? 'bg-blue-50 text-blue-600' : ''
                                }`}
                            onClick={() => handleToggle(option)}
                        >
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selected?.includes(option)}
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



export default function FormIndLongterm() {

    const navigate = useNavigate();
    const [isPaymentDone, setIsPaymentDone] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
    const [pendingMembership, setPendingMembership] = useState(null);



    const [formData, setFormData] = useState({
        name: '',
        title: '',
        first_name: '',
        last_name: '',
        gender: '',
        age_group: '',
        mobile: '',
        whatsapp_no: '',
        area_of_work: [],
        other_area_of_work: '',
        qualification: [],
        email: '',
        address: '',
        state: '',
        district: '',
        teaching_exp: '',
        pin: '',
        password: '',
        agree: false,
        membership_type: "Individual",
        membership_plan: "LongTerm",
        password_confirmation: '',
        has_member_any: '',
        name_association: '',
        expectation: '',
        has_newsletter: false,
        address_institution: '',
        name_institution: '',
        type_institution: '',
        other_institution: '',
        contact_person: '',
    });

    // Added state for states and districts data
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingDistricts, setLoadingDistricts] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    // Options for multi-select dropdowns
    const qualificationOptions = [
        "B.Ed",
        "D.Ed",
        "M.Ed",
        "CELTA/DELTA/TTS",
        "PGCTE",
        "PGDTE"
    ];

    const areaOfWorkOptions = [
        "Primary School",
        "Secondary School",
        "Junior College (+2)",
        "Senior College/University",
        "Teacher Education",
        "Other"
    ];

    // Fetch states data when component mounts
    useEffect(() => {
        setLoading(true);


        fetch('https://secure.geonames.org/searchJSON?country=IN&featureCode=ADM1&username=paresh09')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.geonames && Array.isArray(data.geonames)) {
                    const sortedStates = data.geonames.sort((a, b) =>
                        a.name.localeCompare(b.name)
                    );
                    setStates(sortedStates);
                    setLoading(false);
                } else {
                    throw new Error('Invalid data format');
                }
            })
            .catch(error => {
                console.error('Error fetching states data:', error);
                setLoading(false);

            });
    }, []);

    // Fetch districts when state changes
    const fetchDistricts = (stateId) => {
        if (!stateId) return;

        setLoadingDistricts(true);
        setDistricts([]);

        fetch(`https://secure.geonames.org/childrenJSON?geonameId=${stateId}&featureCode=ADM2&username=paresh09`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.geonames && Array.isArray(data.geonames)) {
                    const sortedDistricts = data.geonames.sort((a, b) =>
                        a.name.localeCompare(b.name)
                    );
                    setDistricts(sortedDistricts);
                    setLoadingDistricts(false);
                } else {
                    throw new Error('Invalid data format');
                }
            })
            .catch(error => {
                console.error('Error fetching districts data:', error);
                setLoadingDistricts(false);
                toast.error("Failed to load districts for the selected state.");

            });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            if (name === 'agree') {
                setFormData(prev => ({
                    ...prev,
                    [name]: checked
                }));
            }
        } else if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            // Normalize boolean-like selects but keep empty as-is for default option
            let finalValue = value;
            if (name === 'has_member_any' || name === 'has_newsletter') {
                finalValue = value === '' ? '' : value === 'true';
            }

            setFormData(prev => ({
                ...prev,
                [name]: finalValue
            }));
        }
    };

    // Handle multi-select changes
    const handleMultiSelectChange = (name, selectedValues) => {
        setFormData(prev => ({
            ...prev,
            [name]: selectedValues
        }));
    };

    // Handle state change to update districts
    const handleStateChange = (e) => {
        const selectedStateIndex = e.target.selectedIndex;
        if (selectedStateIndex > 0) {
            const selectedState = states[selectedStateIndex - 1];
            setFormData(prev => ({
                ...prev,
                state: selectedState.name,
                district: ''
            }));
            fetchDistricts(selectedState.geonameId);
        } else {
            setFormData(prev => ({
                ...prev,
                state: '',
                district: ''
            }));
            setDistricts([]);
        }
    };

    // Handle district change
    const handleDistrictChange = (e) => {
        const selectedDistrictIndex = e.target.selectedIndex;
        if (selectedDistrictIndex > 0) {
            const selectedDistrict = districts[selectedDistrictIndex - 1];
            setFormData(prev => ({
                ...prev,
                district: selectedDistrict.name
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                district: ''
            }));
        }
    };

    // Check if form is valid for submit button
    const isFormValid = () => {
        const requiredFields = [
            'title', 'first_name', 'last_name', 'gender', 'age_group', 'mobile',
            'whatsapp_no', 'email', 'address', 'state', 'district',
            'teaching_exp', 'password', 'password_confirmation', 'pin'
        ];

        for (let field of requiredFields) {
            if (!formData[field] || formData[field].toString().trim() === '') {
                return false;
            }
        }

        if (formData.area_of_work.length === 0) return false;
        if (formData.area_of_work.includes('Other') && !formData.other_area_of_work.trim()) return false;
        if (!formData.agree) return false;

        if (!isEmailValid) return false;

        return true;
    };

    // Form validation function
    const validateForm = () => {
        const requiredFields = [
            'title', 'first_name', 'last_name', 'gender', 'age_group', 'mobile',
            'whatsapp_no', 'email', 'address', 'state', 'district',
            'teaching_exp', 'password', 'pin'
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
        if (formData.area_of_work.includes('Other') && !formData.other_area_of_work.trim()) {
            toast.error("Please specify the 'Other' area of work.");
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

        const pinRegex = /^[0-9]{6}$/;
        if (!pinRegex.test(formData.pin)) {
            toast.error("Please enter a valid 6-digit PIN code.");
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
            const res = await fetch(`${baseUrl}/client/eventValidationHandle?email=${encodeURIComponent(email)}`);

            if (!res.ok) {
                console.error("Failed to check email");
                return false;
            }

            const data = await res.json();

            if (!data.status || data.status === false) {
                setIsEmailValid(false); // ❌ email not valid
                toast.warning("❌ Email already exists. Please use a different email.");
                return false;
            } else {
                setIsEmailValid(true); // ✅ email valid
                return true;
                // Optional success message
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

        if (pendingMembership && pendingMembership.email === formData.email && pendingMembership.payment_status === 'pending') {
            setShowPaymentConfirmation(true);
            return;
        }

        setIsSubmitting(true);
        setLoading(true);

        try {
            const response = await fetch(`${baseUrl}/client/membership-signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok || !data?.status) {
                toast.error(data?.message || "Failed to save membership details.");
                return;
            }

            const savedUser = data?.data?.user;
            if (!savedUser?.id) {
                toast.error("Signup response incomplete. Please try again.");
                return;
            }

            setPendingMembership(savedUser);
            toast.success("Membership details saved. Please proceed with the payment.");
            setShowPaymentConfirmation(true);
        } catch (error) {
            toast.error(error?.message || "Failed to save membership details.");
        } finally {
            setIsSubmitting(false);
            setLoading(false);
        }
    };

    const handlePaymentProceed = async () => {
        setShowPaymentConfirmation(false);

        if (!pendingMembership?.id) {
            toast.error("Membership details missing. Please submit the form again.");
            return;
        }

        setIsSubmitting(true);
        setLoading(true);

        try {
            const customerDetails = {
                name: `${formData.first_name} ${formData.last_name}`.trim(),
                email: formData.email,
                contact: formData.mobile,
            };

            const notes = {
                membership_type: formData.membership_type,
                membership_plan: formData.membership_plan,
                email: formData.email,
            };

            const { order, payment } = await processMembershipPayment({
                amount: 1200,
                currency: "INR",
                customer: customerDetails,
                notes,
            });

            await confirmMembershipPayment({
                userId: pendingMembership.id,
                razorpayOrderId: payment.razorpay_order_id || order.id,
                razorpayPaymentId: payment.razorpay_payment_id,
                razorpaySignature: payment.razorpay_signature,
            });

            toast.success("✅ Payment Successful");

            setIsPaymentDone(true);
            setShowSuccessModal(true);
            setPendingMembership(null);

            setFormData({
                name: "",
                first_name: "",
                last_name: "",
                gender: "",
                age_group: "",
                mobile: "",
                whatsapp_no: "",
                email: "",
                address: "",
                state: "",
                district: "",
                teaching_exp: "",
                qualification: [],
                area_of_work: [],
                password: "",
                agree: false,
                membership_type: "Individual",
                membership_plan: "LongTerm",
                pin: "",
                password_confirmation: "",
                has_member_any: false,
                name_association: '',
                expectation: '',
                has_newsletter: false,
                title: '',
                address_institution: '',
                name_institution: '',
                type_institution: '',
                other_institution: '',
                contact_person: '',
            });
        } catch (error) {
            const refunded = error?.extra?.refunded;
            if (refunded) {
                toast.error(`${error.message || "Payment failed."} Amount has been refunded automatically.`);
            } else {
                toast.error(`❌ Payment Failed: ${error?.message || error}`);
            }
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

    return (
        <>
            {/* Payment Confirmation Modal */}
            <PaymentConfirmationModal
                show={showPaymentConfirmation}
                onClose={() => setShowPaymentConfirmation(false)}
                onProceed={handlePaymentProceed}
                amount={1200}
                currency={"INR"}
            />



            {showSuccessModal && (
                <PaymentSuccessModal
                    show={true}
                    onClose={() => { setShowSuccessModal(false); navigate("/") }}
                />
            )}

            {
                loading && <Loader />
            }

            <div className="max-w-5xl my-8 border border-blue-500 rounded-lg mx-auto p-6 relative bg-white">
                {/* Close button */}
                <button className="absolute top-2 right-2 bg-black rounded-full p-1">
                    <Link to={{ pathname: '/', hash: '#membershipplan' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                    </Link>
                </button>

                <h1 className="text-4xl font-bold mb-4 text-center">Membership Form for Individual LongTerm</h1>

                <form onSubmit={handleSubmit}>
                    {/* Personal Information Section */}
                    <div className="mb-6">
                        <div className="bg-[#A6AEBF] p-2 my-8">
                            <h2 className="text-white text-xl">Personal Information</h2>
                        </div>

                        {/* Row 1: Title | Email */}
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
                                    <option value="" disabled>Select Title</option>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Ms.">Ms.</option>
                                    <option value="Mrs.">Mrs.</option>
                                    <option value="Dr.">Dr.</option>
                                    <option value="Prof.">Prof.</option>
                                </select>
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
                                    onBlur={checkEmailExists}
                                    className="w-full p-2 bg-white rounded border border-gray-300"
                                    required
                                />
                            </div>
                        </div>

                        {/* Row 2: First Name | Last Name */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
                        </div>

                        {/* Row 3: Gender | Age Group */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
                                    Age Group : <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="age_group"
                                    value={formData.age_group}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-white rounded border border-gray-300 appearance-none"
                                    required
                                >
                                    <option value="" disabled>Select Your Age Group</option>
                                    <option value="up to 25">up to 25</option>
                                    <option value="26-30">26-30</option>
                                    <option value="31-35">31-35</option>
                                    <option value="36-40">36-40</option>
                                    <option value="41-45">41-45</option>
                                    <option value="46-50">46-50</option>
                                    <option value="Over 50">Over 50</option>
                                </select>
                            </div>
                        </div>

                        {/* Row 4: Contact No. | WhatsApp No. */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
                        </div>

                        {/* Row 5: State | District */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-base font-semibold mb-1">
                                    State : <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="state"
                                    value={formData.state}
                                    onChange={handleStateChange}
                                    className="w-full p-2 bg-white rounded border border-gray-300 appearance-none"
                                    required
                                    disabled={loading}
                                >
                                    <option value="">
                                        {loading ? "Loading states..." : "Select Your State"}
                                    </option>
                                    {states.map(state => (
                                        <option key={state.geonameId} value={state.name}>
                                            {state.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-base font-semibold mb-1">
                                    District : <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="district"
                                    value={formData.district}
                                    onChange={handleDistrictChange}
                                    className="w-full p-2 bg-white rounded border border-gray-300 appearance-none"
                                    required
                                    disabled={!formData.state || loadingDistricts}
                                >
                                    <option value="">
                                        {!formData.state ? "Select State First" :
                                            loadingDistricts ? "Loading districts..." : "Select Your District"}
                                    </option>
                                    {districts.map(district => (
                                        <option key={district.geonameId} value={district.name}>
                                            {district.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Row 6: Address (Correspondence) */}
                        <div className="mt-4">
                            <label className="block text-base font-semibold mb-1">
                                Address (Correspondence) : <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="address"
                                placeholder="Enter Your Correspondence Address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full p-2 bg-white rounded border border-gray-300"
                                rows="3"
                                required
                            ></textarea>
                        </div>

                        {/* Row 7: Address (Institutional) | Pincode */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-base font-semibold mb-1">
                                    Address (Institutional) :
                                </label>
                                <textarea
                                    name="address_institution"
                                    placeholder="Enter Institutional Address"
                                    value={formData.address_institution}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-white rounded border border-gray-300"
                                    rows="3"
                                ></textarea>
                            </div>

                            <div className="flex flex-col">
                                <label className="block text-base font-semibold mb-1">
                                    Pincode : <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="pin"
                                    placeholder="Enter Your PIN Code"
                                    value={formData.pin}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-white rounded border border-gray-300"
                                    maxLength={6}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Other Information Section */}
                    <div>
                        <div className="bg-[#A6AEBF] p-2 my-8">
                            <h2 className="text-white text-xl">Other Information</h2>
                        </div>

                        <div>
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
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div>
                                <label className="block text-base font-semibold mb-1">
                                    Area(s) of your work : <span className="text-red-500">*</span>
                                </label>
                                <MultiSelectDropdown
                                    options={areaOfWorkOptions}
                                    selected={formData.area_of_work}
                                    onChange={(selected) => handleMultiSelectChange('area_of_work', selected)}
                                    placeholder="Select Areas of Your Work"
                                    name="area_of_work"
                                />
                                {formData.area_of_work.includes('Other') && (
                                    <div className="mt-2">
                                        <label className="block text-sm font-semibold mb-1">
                                            Please specify other area of work <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="other_area_of_work"
                                            placeholder="Enter other area of work"
                                            value={formData.other_area_of_work}
                                            onChange={handleChange}
                                            className="w-full p-2 bg-white rounded border border-gray-300"
                                            required
                                        />
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-base font-semibold mb-1">
                                    Added Qualification : 
                                </label>
                                <MultiSelectDropdown
                                    options={qualificationOptions}
                                    selected={formData.qualification}
                                    onChange={(selected) => handleMultiSelectChange('qualification', selected)}
                                    placeholder="Select Added Qualification"
                                    name="qualification"
                                />
                            </div>
                        </div>


                        <div className='mt-4'>
                            <label className="block text-base font-semibold mb-1">
                                Are you member of any other English Teacher Association(s) : <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="has_member_any"
                                value={formData.has_member_any === '' ? '' : formData.has_member_any === true ? 'true' : 'false'}
                                onChange={handleChange}
                                className="w-full p-2 bg-white rounded border border-gray-300 appearance-none"
                                required
                            >
                                <option value="">Select Option</option>
                                <option value="true">YES</option>
                                <option value="false">NO</option>
                            </select>
                        </div>


                        {formData.has_member_any === true && (
                            <div className="mt-4">
                                <label className="block text-base font-semibold mb-1">
                                    Name of the Association(s) : <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="name_association"
                                    placeholder="Enter Association Name(s)"
                                    value={formData.name_association}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-white rounded border border-gray-300"
                                    rows="2"
                                    required={formData.has_member_any === true}
                                />
                            </div>
                        )}



                        <div className="mt-4">
                            <label className="block text-base font-semibold mb-1">
                                Your expectations from AINET :
                            </label>
                            <textarea
                                name="expectation"
                                placeholder="Enter your expectations"
                                value={formData.expectation}
                                onChange={handleChange}
                                className="w-full p-2 bg-white rounded border border-gray-300"
                                rows="3"
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-base font-semibold mb-1">Like to receive our newsletter ?</label>
                            <select
                                name="has_newsletter"
                                value={formData.has_newsletter}
                                onChange={handleChange}
                                className="w-full p-2 bg-white rounded border border-gray-300 appearance-none"
                            >
                                <option value={true}>YES</option>
                                <option value={false}>NO</option>
                            </select>
                        </div>

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
                                        placeholder="Enter Your Password"
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
                </form >
            </div >
        </>
    );
}
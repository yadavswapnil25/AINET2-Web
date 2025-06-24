import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from '../../../utils/constant';
import { initiatePayment } from '../../../utils/utility';
import PaymentSuccessModal from '../../PaymentIntegration/Popup';
import Loader from '../../../Components/shared/Loader';

// Simulated toast functions for demo purposes with ID support
const toast = {
    success: (message) => {
        const toastDiv = document.createElement('div');
        toastDiv.className = 'toast toast-success';
        toastDiv.textContent = message;
        document.body.appendChild(toastDiv);
        setTimeout(() => {
            if (document.body.contains(toastDiv)) {
                document.body.removeChild(toastDiv);
            }
        }, 3000);
    },
    error: (message) => {
        const toastDiv = document.createElement('div');
        toastDiv.className = 'toast toast-error';
        toastDiv.textContent = message;
        document.body.appendChild(toastDiv);
        setTimeout(() => {
            if (document.body.contains(toastDiv)) {
                document.body.removeChild(toastDiv);
            }
        }, 4000);
    },
    warning: (message) => {
        const toastDiv = document.createElement('div');
        toastDiv.className = 'toast toast-warning';
        toastDiv.textContent = message;
        document.body.appendChild(toastDiv);
        setTimeout(() => {
            if (document.body.contains(toastDiv)) {
                document.body.removeChild(toastDiv);
            }
        }, 3000);
    },
    info: (message) => {
        const toastDiv = document.createElement('div');
        toastDiv.className = 'toast toast-info';
        toastDiv.textContent = message;
        document.body.appendChild(toastDiv);
        setTimeout(() => {
            if (document.body.contains(toastDiv)) {
                document.body.removeChild(toastDiv);
            }
        }, 3000);
    },
    loading: (message) => {
        const toastId = 'loading-toast-' + Date.now();
        const toastDiv = document.createElement('div');
        toastDiv.className = 'toast toast-loading';
        toastDiv.id = toastId;
        toastDiv.innerHTML = `
            <div class="flex items-center">
                <div class="loading-spinner"></div>
                <span class="ml-2">${message}</span>
            </div>
        `;
        document.body.appendChild(toastDiv);
        return toastId;
    },
    dismiss: (toastId) => {
        const toastDiv = document.getElementById(toastId);
        if (toastDiv && document.body.contains(toastDiv)) {
            document.body.removeChild(toastDiv);
        }
    }
};

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
                className="w-full p-2 bg-[#C5D3E8] rounded cursor-pointer border border-gray-300 min-h-[40px] flex items-center justify-between"
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



export default function MembershipFormforIndividualAnnual() {
    const location = useLocation();
    const navigate = useNavigate();
    const plan = location?.state;
    const [isPaymentDone, setIsPaymentDone] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    console.log("plan", plan)


    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        gender: "",
        dob: "",
        mobile: "",
        whatsapp_no: "",
        email: "",
        address: "",
        state: "",
        district: "",
        teaching_exp: 0,
        qualification: [],
        area_of_work: [],
        password: "",
        agree: false,
        membership_type: plan?.type,
        membership_plan: plan?.title,
        pin: "",
        password_confirmation: "",
    });

    // Added state for states and districts data
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingDistricts, setLoadingDistricts] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);

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
            setFormData(prev => ({
                ...prev,
                [name]: value
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
            'first_name', 'last_name', 'gender', 'dob', 'mobile',
            'whatsapp_no', 'email', 'address', 'state', 'district',
            'teaching_exp', 'password', 'password_confirmation', 'pin'
        ];

        for (let field of requiredFields) {
            if (!formData[field] || formData[field].toString().trim() === '') {
                return false;
            }
        }

        if (formData.qualification.length === 0) return false;
        if (formData.area_of_work.length === 0) return false;
        if (!formData.agree) return false;
        if (formData.password !== formData.password_confirmation) return false;

        if (!isEmailValid) return false;

        return true;
    };

    // Form validation function
    const validateForm = () => {
        const requiredFields = [
            'first_name', 'last_name', 'gender', 'dob', 'mobile',
            'whatsapp_no', 'email', 'address', 'state', 'district',
            'teaching_exp', 'password', 'pin'
        ];

        for (let field of requiredFields) {
            if (!formData[field] || formData[field].toString().trim() === '') {
                toast.error(`Please fill in the ${field.replace('_', ' ')} field.`);
                return false;
            }
        }

        if (formData.qualification.length === 0) {
            toast.error("Please select at least one qualification.");
            return false;
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

    console.log("location", location.state)

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


        const loadingToastId = toast.loading("Initializing payment...");

        try {
            // 1. 🔁 Payment via Razorpay
            const paymentResponse = await initiatePayment({
                amount: plan?.price, // in INR
                name: `${formData.first_name} ${formData.last_name}`,
                email: formData.email,
                contact: formData.mobile,
                currency: plan?.currency || "INR"
            });

            // ✅ Payment succeeded
            toast.dismiss(loadingToastId);
            toast.success("✅ Payment Successful");

            // 2. 🔁 Now hit the registration API
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
                    first_name: "",
                    last_name: "",
                    gender: "",
                    dob: "",
                    mobile: "",
                    whatsapp_no: "",
                    email: "",
                    address: "",
                    state: "",
                    district: "",
                    teaching_exp: 0,
                    qualification: [],
                    area_of_work: [],
                    password: "",
                    agree: false,
                    membership_type: "",
                    membership_plan: "",
                    pin: "",
                    password_confirmation: "",
                });
            } else {
                const errorData = await res.json();
                toast.error(`${errorData.message || "Something went wrong. Please try again."}`);
            }

        } catch (error) {
            // ❌ Razorpay payment failed or cancelled
            toast.dismiss(loadingToastId);
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

    return (
        <>
            <style jsx>{`
                .toast {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 12px 20px;
                    border-radius: 8px;
                    color: white;
                    font-weight: 500;
                    z-index: 9999;
                    min-width: 300px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    animation: slideIn 0.3s ease-out;
                }
                
                .toast-success {
                    background-color: #10b981;
                }
                
                .toast-error {
                    background-color: #ef4444;
                }
                
                .toast-warning {
                    background-color: #f59e0b;
                }
                
                .toast-info {
                    background-color: #3b82f6;
                }
                
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `}</style>

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
                    <Link to="/"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                    </Link>
                </button>

                <h1 className="text-4xl font-bold mb-4 text-center">Membership Form for Individual Annual</h1>

                <form onSubmit={handleSubmit}>
                    {/* Personal Information Section */}
                    <div className="mb-6">
                        <div className="bg-[#A6AEBF] p-2 my-8">
                            <h2 className="text-white text-xl">Personal Information</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-base font-semibold mb-1">
                                    First Name : <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="first_name"
                                    placeholder="Enter Your Name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-[#C5D3E8] rounded"
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
                                    placeholder="Enter Your Name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-[#C5D3E8] rounded"
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
                                    className="w-full p-2 bg-[#C5D3E8] rounded appearance-none"
                                    required
                                >
                                    <option value="" disabled>Select Your Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-base font-semibold mb-1">
                                    Date of Birth : <span className="text-red-500">*</span>
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type='date'
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                        className="w-full p-2 bg-[#C5D3E8] rounded"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-base font-semibold mb-1">
                                    Contact No. : <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="mobile"
                                    placeholder="Enter Your No."
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-[#C5D3E8] rounded"
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
                                    placeholder="Enter Your No."
                                    value={formData.whatsapp_no}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-[#C5D3E8] rounded"
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
                                    onBlur={checkEmailExists}
                                    className="w-full p-2 bg-[#C5D3E8] rounded"
                                    required
                                />

                            </div>

                            <div>
                                <label className="block text-base font-semibold mb-1">
                                    PIN Code : <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="pin"
                                    placeholder="Enter Your PIN"
                                    value={formData.pin}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-[#C5D3E8] rounded"
                                    maxLength={6}
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
                                className="w-full p-2 bg-[#C5D3E8] rounded"
                                rows="3"
                                required
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-base font-semibold mb-1">
                                    State : <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="state"
                                    value={formData.state}
                                    onChange={handleStateChange}
                                    className="w-full p-2 bg-[#C5D3E8] rounded appearance-none"
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
                                    className="w-full p-2 bg-[#C5D3E8] rounded appearance-none"
                                    required
                                    disabled={!formData.state || loadingDistricts}
                                >
                                    <option value="">
                                        {!formData.state ? "Select state first" :
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
                                    placeholder="Enter Your Exp."
                                    value={formData.teaching_exp}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-[#C5D3E8] rounded"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div>
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

                            <div>
                                <label className="block text-base font-semibold mb-1">
                                    Added Qualification : <span className="text-red-500">*</span>
                                </label>
                                <MultiSelectDropdown
                                    options={qualificationOptions}
                                    selected={formData.qualification}
                                    onChange={(selected) => handleMultiSelectChange('qualification', selected)}
                                    placeholder="Select qualifications"
                                    name="qualification"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-base font-semibold mb-1">
                                    Password : <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter Your Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-[#C5D3E8] rounded"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-base font-semibold mb-1">
                                    Re-Enter Password : <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    placeholder="Enter Your Password"
                                    value={formData.password_confirmation}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-[#C5D3E8] rounded"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mt-4 flex items-center">
                            <input
                                type="checkbox"
                                id="agreeToTerms"
                                name="agree"
                                checked={formData.agree}
                                onChange={handleChange}
                                className="mr-2"
                                required
                            />
                            <label htmlFor="agreeToTerms" className="text-sm">
                                I agree to the terms and conditions of the membership. <span className="text-red-500">*</span>
                            </label>
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting || !isFormValid()}
                                className={`px-6 py-2 rounded-full text-sm font-bold ${isSubmitting || !isFormValid()
                                    ? 'bg-gray-400 cursor-not-allowed disabled:cursor-not-allowed'
                                    : 'bg-amber-100 hover:bg-amber-200 cursor-pointer'
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
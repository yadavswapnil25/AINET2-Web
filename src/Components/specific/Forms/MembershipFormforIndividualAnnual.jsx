import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';

// Simulated toast functions for demo purposes
const toast = {
    success: (message) => {
        const toastDiv = document.createElement('div');
        toastDiv.className = 'toast toast-success';
        toastDiv.textContent = message;
        document.body.appendChild(toastDiv);
        setTimeout(() => document.body.removeChild(toastDiv), 3000);
    },
    error: (message) => {
        const toastDiv = document.createElement('div');
        toastDiv.className = 'toast toast-error';
        toastDiv.textContent = message;
        document.body.appendChild(toastDiv);
        setTimeout(() => document.body.removeChild(toastDiv), 4000);
    },
    warning: (message) => {
        const toastDiv = document.createElement('div');
        toastDiv.className = 'toast toast-warning';
        toastDiv.textContent = message;
        document.body.appendChild(toastDiv);
        setTimeout(() => document.body.removeChild(toastDiv), 3000);
    },
    info: (message) => {
        const toastDiv = document.createElement('div');
        toastDiv.className = 'toast toast-info';
        toastDiv.textContent = message;
        document.body.appendChild(toastDiv);
        setTimeout(() => document.body.removeChild(toastDiv), 3000);
    }
};

export default function MembershipFormforIndividualAnnual() {
    const location = useLocation();
    const navigate = useNavigate();
    console.log("Location state:", location?.state);
    const plan = location?.state;
    console.log("plan",plan)


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
        agree: true,
        membership_type: plan?.type,
        membership_plan: "Annual",
        pin: "",
        password_confirmation: "",


    });

    // Added state for states and districts data
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingDistricts, setLoadingDistricts] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch states data when component mounts
    useEffect(() => {
        setLoading(true);
        toast.info("Loading states data...");

        fetch('https://secure.geonames.org/searchJSON?country=IN&featureCode=ADM1&username=paresh09')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.geonames && Array.isArray(data.geonames)) {
                    // Sort states alphabetically
                    const sortedStates = data.geonames.sort((a, b) =>
                        a.name.localeCompare(b.name)
                    );
                    setStates(sortedStates);
                    setLoading(false);
                    toast.success("States loaded successfully!");
                } else {
                    throw new Error('Invalid data format');
                }
            })
            .catch(error => {
                console.error('Error fetching states data:', error);
                setLoading(false);
                toast.error("Failed to load states. Using fallback data.");
                // Fallback states
                setStates([
                    { geonameId: '1', name: 'Maharashtra' },
                    { geonameId: '2', name: 'Karnataka' },
                    { geonameId: '3', name: 'Tamil Nadu' },
                ]);
            });
    }, []);

    // Fetch districts when state changes
    const fetchDistricts = (stateId) => {
        if (!stateId) return;

        setLoadingDistricts(true);
        setDistricts([]);
        toast.info("Loading districts...");

        fetch(`https://secure.geonames.org/childrenJSON?geonameId=${stateId}&featureCode=ADM2&username=paresh09`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.geonames && Array.isArray(data.geonames)) {
                    // Sort districts alphabetically
                    const sortedDistricts = data.geonames.sort((a, b) =>
                        a.name.localeCompare(b.name)
                    );
                    setDistricts(sortedDistricts);
                    setLoadingDistricts(false);
                    toast.success("Districts loaded successfully!");
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
            } else {
                const fieldName = name.split('-')[0];

                if (checked) {
                    setFormData(prev => ({
                        ...prev,
                        [fieldName]: [...prev[fieldName], value]
                    }));
                } else {
                    setFormData(prev => ({
                        ...prev,
                        [fieldName]: prev[fieldName].filter(item => item !== value)
                    }));
                }
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

    // Handle state change to update districts
    const handleStateChange = (e) => {
        const selectedStateIndex = e.target.selectedIndex;
        if (selectedStateIndex > 0) { // Skip the placeholder option
            const selectedState = states[selectedStateIndex - 1];
            setFormData(prev => ({
                ...prev,
                state: selectedState.name,
                district: '' // Reset district when state changes
            }));

            // Fetch districts for the selected state
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
        if (selectedDistrictIndex > 0) { // Skip the placeholder option
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

    // Form validation function
    const validateForm = () => {
        // Check required fields
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

        // Check if at least one qualification is selected
        if (formData.qualification.length === 0) {
            toast.error("Please select at least one qualification.");
            return false;
        }

        // Check if at least one area of work is selected
        if (formData.area_of_work.length === 0) {
            toast.error("Please select at least one area of work.");
            return false;
        }

        // Password validation
        if (formData.password !== formData.password_confirmation) {
            toast.error("Passwords do not match!");
            return false;
        }

        if (formData.password.length < 6) {
            toast.warning("Password should be at least 6 characters long.");
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error("Please enter a valid email address.");
            return false;
        }

        // Mobile number validation (assuming 10 digits)
        const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(formData.mobile)) {
            toast.error("Please enter a valid 10-digit mobile number.");
            return false;
        }

        // PIN code validation (assuming 6 digits)
        const pinRegex = /^[0-9]{6}$/;
        if (!pinRegex.test(formData.pin)) {
            toast.error("Please enter a valid 6-digit PIN code.");
            return false;
        }

        // Terms and conditions
        if (!formData.agree) {
            toast.error("Please agree to the terms and conditions.");
            return false;
        }

        return true;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();



        // Validate form before submission
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        toast.info("Submitting your application...");



        try {
            const res = await fetch("https://api.theainet.net/api/v1/client/membership-signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            console.log("res???", res)

            if (res.ok) {
                const responseData = await res.json();
                toast.success("🎉 Application submitted successfully! Welcome to AINET!");
                console.log("Success response:", responseData);
            } else {
                const errorData = await res.json();
                toast.error(`Submission failed: ${errorData.message || 'Please try again.'}`);
                console.error("Error response:", errorData);
            }
        } catch (error) {
            console.error("Network error:", error);
            toast.error("Network error. Please check your connection and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };


    
    useEffect(()=>{
        if (!location.state) navigate("/")
    },[])


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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                <label className="block text-sm mb-2">Area's of your work : <span className="text-red-500">*</span></label>
                                <div className="space-y-1">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="primary"
                                            name="area_of_work"
                                            value="Primary School"
                                            checked={formData.area_of_work.includes('Primary School')}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="primary" className="text-sm">Primary School</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="secondary"
                                            name="area_of_work"
                                            value="Secondary School"
                                            checked={formData.area_of_work.includes('Secondary School')}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="secondary" className="text-sm">Secondary School</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="juniorCollege"
                                            name="area_of_work"
                                            value="Junior College (+2)"
                                            checked={formData.area_of_work.includes('Junior College (+2)')}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="juniorCollege" className="text-sm">Junior College (+2)</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="seniorCollege"
                                            name="area_of_work"
                                            value="Senior College/University"
                                            checked={formData.area_of_work.includes('Senior College/University')}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="seniorCollege" className="text-sm">Senior College/University</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="teacherEd"
                                            name="area_of_work"
                                            value="Teacher Education"
                                            checked={formData.area_of_work.includes('Teacher Education')}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="teacherEd" className="text-sm">Teacher Education</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="other"
                                            name="area_of_work"
                                            value="Other"
                                            checked={formData.area_of_work.includes('Other')}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="other" className="text-sm">Other</label>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm mb-2">Added Qualification : <span className="text-red-500">*</span></label>
                                <div className="space-y-1">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="bed"
                                            name="qualification"
                                            value="B.Ed"
                                            checked={formData.qualification.includes('B.Ed')}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="bed" className="text-sm">B.Ed</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="ded"
                                            name="qualification"
                                            value="D.Ed"
                                            checked={formData.qualification.includes('D.Ed')}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="ded" className="text-sm">D.Ed</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="med"
                                            name="qualification"
                                            value="M.Ed"
                                            checked={formData.qualification.includes('M.Ed')}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="med" className="text-sm">M.Ed</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="celt"
                                            name="qualification"
                                            value="CELTA/DELTA/TTS"
                                            checked={formData.qualification.includes('CELTA/DELTA/TTS')}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="celt" className="text-sm">CELTA/DELTA/TTS</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="pgcte"
                                            name="qualification"
                                            value="PGCTE"
                                            checked={formData.qualification.includes('PGCTE')}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="pgcte" className="text-sm">PGCTE</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="pgdte"
                                            name="qualification"
                                            value="PGDTE"
                                            checked={formData.qualification.includes('PGDTE')}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="pgdte" className="text-sm">PGDTE</label>
                                    </div>
                                </div>
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
                                disabled={isSubmitting}
                                className={`px-6 py-2 rounded-full text-sm font-bold ${isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-amber-100 hover:bg-amber-200'
                                    }`}
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
import { useState, useEffect } from 'react';

export default function MembershipFormforIndividualAnnual() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: {
            day: '',
            month: '',
            year: ''
        },
        contactNo: '',
        whatsAppNo: '',
        email: '',
        pinCode: '',
        address: '',
        state: '',
        district: '',
        teachingExperience: '',
        highestQualification: '',
        areasOfWork: [],
        addedQualification: [],
        memberOfAssociation: '',
        associationName: '',
        expectations: '',
        receiveNewsletter: 'YES',
        password: '',
        reEnterPassword: '',
        agreeToTerms: false
    });

    // Added state for states and districts data
    const [statesData, setStatesData] = useState([]);
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch states and districts data when component mounts
    useEffect(() => {
        setLoading(true);
        // Replace with your actual API endpoint
        fetch('https://api.example.com/states-districts')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setStatesData(data);
                setStates(data.map(item => item.state));
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching states data:', error);
                setLoading(false);
                // You could add fallback states here if API fails
            });
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
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
        const selectedState = e.target.value;
        setFormData({ ...formData, state: selectedState, district: '' });
        const stateInfo = statesData.find(item => item.state === selectedState);
        setDistricts(stateInfo ? stateInfo.districts : []);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Handle form submission logic here
    };

    return (
        <div className="max-w-5xl mx-auto p-6 relative bg-white">
            {/* Close button */}
            <button className="absolute top-2 right-2 bg-black rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
            </button>

            <h1 className="text-4xl font-bold mb-4 text-center">Membership Form for Individual Annual</h1>

            <form onSubmit={handleSubmit}>
                {/* Personal Information Section */}
                <div className="mb-6 ">
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
                                name="firstName"
                                placeholder="Enter Your Name"
                                value={formData.firstName}
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
                                name="lastName"
                                placeholder="Enter Your Name"
                                value={formData.lastName}
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
                                <select
                                    name="dateOfBirth.day"
                                    value={formData.dateOfBirth.day}
                                    onChange={handleChange}
                                    className="w-1/3 p-2 bg-[#C5D3E8] rounded"
                                    required
                                >
                                    <option value="" disabled>DD</option>
                                    {[...Array(31)].map((_, i) => (
                                        <option key={i} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                                <select
                                    name="dateOfBirth.month"
                                    value={formData.dateOfBirth.month}
                                    onChange={handleChange}
                                    className="w-1/3 p-2 bg-[#C5D3E8] rounded"
                                    required
                                >
                                    <option value="" disabled>MM</option>
                                    {[...Array(12)].map((_, i) => (
                                        <option key={i} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                                <select
                                    name="dateOfBirth.year"
                                    value={formData.dateOfBirth.year}
                                    onChange={handleChange}
                                    className="w-1/3 p-2 bg-[#C5D3E8] rounded"
                                    required
                                >
                                    <option value="" disabled>YYYY</option>
                                    {[...Array(100)].map((_, i) => {
                                        const year = new Date().getFullYear() - i;
                                        return <option key={i} value={year}>{year}</option>;
                                    })}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-base font-semibold mb-1">
                                Contact No. : <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="contactNo"
                                placeholder="Enter Your No."
                                value={formData.contactNo}
                                onChange={handleChange}
                                className="w-full p-2 bg-[#C5D3E8] rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-base font-semibold mb-1">
                                WhatsApp No. : <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="whatsAppNo"
                                placeholder="Enter Your No."
                                value={formData.whatsAppNo}
                                onChange={handleChange}
                                className="w-full p-2 bg-[#C5D3E8] rounded"
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
                                name="pinCode"
                                placeholder="Enter Your PIN"
                                value={formData.pinCode}
                                onChange={handleChange}
                                className="w-full p-2 bg-[#C5D3E8] rounded"
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
                                <option value="" disabled>
                                    {loading ? "Loading states..." : "Select Your State"}
                                </option>
                                {states.map(state => (
                                    <option key={state} value={state}>{state}</option>
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
                                onChange={handleChange}
                                className="w-full p-2 bg-[#C5D3E8] rounded appearance-none"
                                required
                                disabled={!formData.state || loading}
                            >
                                <option value="" disabled>
                                    {!formData.state ? "Select state first" : "Select Your District"}
                                </option>
                                {districts.map(district => (
                                    <option key={district} value={district}>{district}</option>
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
                                name="teachingExperience"
                                placeholder="Enter Your Exp."
                                value={formData.teachingExperience}
                                onChange={handleChange}
                                className="w-full p-2 bg-[#C5D3E8] rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-base font-semibold mb-1">
                                Highest Qualification : <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="highestQualification"
                                placeholder="Enter Your Quali."
                                value={formData.highestQualification}
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
                                        name="areasOfWork-checkbox"
                                        value="Primary School"
                                        checked={formData.areasOfWork.includes('Primary School')}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor="primary" className="text-sm">Primary School</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="secondary"
                                        name="areasOfWork-checkbox"
                                        value="Secondary School"
                                        checked={formData.areasOfWork.includes('Secondary School')}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor="secondary" className="text-sm">Secondary School</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="juniorCollege"
                                        name="areasOfWork-checkbox"
                                        value="Junior College (+2)"
                                        checked={formData.areasOfWork.includes('Junior College (+2)')}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor="juniorCollege" className="text-sm">Junior College (+2)</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="seniorCollege"
                                        name="areasOfWork-checkbox"
                                        value="Senior College/University"
                                        checked={formData.areasOfWork.includes('Senior College/University')}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor="seniorCollege" className="text-sm">Senior College/University</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="teacherEd"
                                        name="areasOfWork-checkbox"
                                        value="Teacher Education"
                                        checked={formData.areasOfWork.includes('Teacher Education')}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor="teacherEd" className="text-sm">Teacher Education</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="other"
                                        name="areasOfWork-checkbox"
                                        value="Other"
                                        checked={formData.areasOfWork.includes('Other')}
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
                                        name="addedQualification-checkbox"
                                        value="B.Ed"
                                        checked={formData.addedQualification.includes('B.Ed')}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor="bed" className="text-sm">B.Ed</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="ded"
                                        name="addedQualification-checkbox"
                                        value="D.Ed"
                                        checked={formData.addedQualification.includes('D.Ed')}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor="ded" className="text-sm">D.Ed</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="med"
                                        name="addedQualification-checkbox"
                                        value="M.Ed"
                                        checked={formData.addedQualification.includes('M.Ed')}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor="med" className="text-sm">M.Ed</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="celt"
                                        name="addedQualification-checkbox"
                                        value="CELTA/DELTA/TTS"
                                        checked={formData.addedQualification.includes('CELTA/DELTA/TTS')}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor="celt" className="text-sm">CELTA/DELTA/TTS</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="pgcte"
                                        name="addedQualification-checkbox"
                                        value="PGCTE"
                                        checked={formData.addedQualification.includes('PGCTE')}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor="pgcte" className="text-sm">PGCTE</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="pgdte"
                                        name="addedQualification-checkbox"
                                        value="PGDTE"
                                        checked={formData.addedQualification.includes('PGDTE')}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor="pgdte" className="text-sm">PGDTE</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block text-base font-semibold mb-1">
                            Are you member of any other English Teacher Association(s) : <span className="text-red-500">*</span>
                        </label>
                        <div className="inline-block bg-[#C5D3E8] rounded">
                            <select
                                name="memberOfAssociation"
                                value={formData.memberOfAssociation}
                                onChange={handleChange}
                                className="py-2 px-4 bg-[#C5D3E8] rounded"
                                required
                            >
                                <option value="YES">YES</option>
                                <option value="NO">NO</option>
                            </select>
                        </div>
                    </div>

                    {formData.memberOfAssociation === 'YES' && (
                        <div className="mt-4">
                            <label className="block text-base font-semibold mb-1">
                                If yes the name of the Association(s) : <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="associationName"
                                placeholder="Enter Asso."
                                value={formData.associationName}
                                onChange={handleChange}
                                className="w-full p-2 bg-[#C5D3E8] rounded"
                                required={formData.memberOfAssociation === 'YES'}
                            />
                        </div>
                    )}

                    <div className="mt-4">
                        <label className="block text-base font-semibold mb-1">Your expectations from AINET :</label>
                        <textarea
                            name="expectations"
                            placeholder="Enter Asso."
                            value={formData.expectations}
                            onChange={handleChange}
                            className="w-full p-2 bg-[#C5D3E8] rounded"
                            rows="2"
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block text-base font-semibold mb-1">Like to receive newsletter ?</label>
                            <div className="inline-block bg-[#C5D3E8] rounded">
                                <select
                                    name="receiveNewsletter"
                                    value={formData.receiveNewsletter}
                                    onChange={handleChange}
                                    className="py-2 px-4 bg-[#C5D3E8] rounded"
                                >
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </select>
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
                                name="reEnterPassword"
                                placeholder="Enter Your Password"
                                value={formData.reEnterPassword}
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
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
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
                            className="px-6 py-2 bg-amber-100 rounded-full text-sm font-medium"
                        >
                            SUBMIT APPLICATION FORM
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
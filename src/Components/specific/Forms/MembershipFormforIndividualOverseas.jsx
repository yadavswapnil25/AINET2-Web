import { useState } from 'react';

export default function MembershipFormForIndividualOverseas() {
    const [formData, setFormData] = useState({
        title: '',
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
        addressResidential: '',
        teachingExperience: '',
        memberOfAssociation: '',
        associationName: '',
        areasOfWork: [],
        addressInstitutional: '',
        expectations: '',
        receiveNewsletter: 'YES',
        password: '',
        reEnterPassword: '',
        agreeToTerms: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            if (name === 'agreeToTerms') {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Handle form submission logic here
    };

    return (
        <div className="max-w-5xl my-8 border border-blue-500 rounded-lg mx-auto p-6 relative bg-white">
            {/* Close button */}
            <button className="absolute top-2 right-2 bg-black rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
            </button>

            <h1 className="text-4xl font-bold my-8 text-center">Membership Form for Individual Overseas</h1>

            <form onSubmit={handleSubmit}>
                {/* Personal Information Section */}
                <div className="mb-6">
                    <div className="bg-[#A6AEBF] p-2 mb-6">
                        <h2 className="text-white text-xl">Personal Information</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-lg font-semibold mb-1">
                                Title : <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-[#C5D3E8] rounded appearance-none text-base"
                                    required
                                >
                                    <option value="">Mr</option>
                                    <option value="mrs">Mrs</option>
                                    <option value="ms">Ms</option>
                                    <option value="dr">Dr</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-lg font-semibold mb-1">
                                First Name : <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Enter Your Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full p-2 bg-[#C5D3E8] rounded text-base"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-semibold mb-1">
                                Last Name : <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Enter Your Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full p-2 bg-[#C5D3E8] rounded text-base"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-semibold mb-1">
                                Gender : <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-[#C5D3E8] rounded appearance-none text-base"
                                    required
                                >
                                    <option value="">Select Your Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-lg font-semibold mb-1">
                                Date of Birth : <span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-1">
                                <div className="relative w-1/3">
                                    <select
                                        name="dateOfBirth.day"
                                        value={formData.dateOfBirth.day}
                                        onChange={handleChange}
                                        className="w-full p-2 bg-[#C5D3E8] rounded text-base appearance-none"
                                        required
                                    >
                                        <option value="">DD</option>
                                        {[...Array(31)].map((_, i) => (
                                            <option key={i} value={i + 1}>{i + 1}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="relative w-1/3">
                                    <select
                                        name="dateOfBirth.month"
                                        value={formData.dateOfBirth.month}
                                        onChange={handleChange}
                                        className="w-full p-2 bg-[#C5D3E8] rounded text-base appearance-none"
                                        required
                                    >
                                        <option value="">MM</option>
                                        <option value="1">Jan</option>
                                        <option value="2">Feb</option>
                                        <option value="3">Mar</option>
                                        <option value="4">Apr</option>
                                        <option value="5">May</option>
                                        <option value="6">Jun</option>
                                        <option value="7">Jul</option>
                                        <option value="8">Aug</option>
                                        <option value="9">Sep</option>
                                        <option value="10">Oct</option>
                                        <option value="11">Nov</option>
                                        <option value="12">Dec</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="relative w-1/3">
                                    <select
                                        name="dateOfBirth.year"
                                        value={formData.dateOfBirth.year}
                                        onChange={handleChange}
                                        className="w-full p-2 bg-[#C5D3E8] rounded text-base appearance-none"
                                        required
                                    >
                                        <option value="">YYYY</option>
                                        {[...Array(100)].map((_, i) => {
                                            const year = new Date().getFullYear() - i;
                                            return <option key={i} value={year}>{year}</option>;
                                        })}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-lg font-semibold mb-1">
                                Contact No. : <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="contactNo"
                                placeholder="Enter Your No."
                                value={formData.contactNo}
                                onChange={handleChange}
                                className="w-full p-2 bg-[#C5D3E8] rounded text-base"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-semibold mb-1">
                                WhatsApp No. : <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="whatsAppNo"
                                placeholder="Enter Your No."
                                value={formData.whatsAppNo}
                                onChange={handleChange}
                                className="w-full p-2 bg-[#C5D3E8] rounded text-base"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-semibold mb-1">
                                Email : <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 bg-[#C5D3E8] rounded text-base"
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block text-lg font-semibold mb-1">
                            Address (Residential) : <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="addressResidential"
                            placeholder="Enter Your Address"
                            value={formData.addressResidential}
                            onChange={handleChange}
                            className="w-full p-2 bg-[#C5D3E8] rounded text-base"
                            rows="3"
                            required
                        ></textarea>
                    </div>
                </div>

                {/* Other Information Section */}
                <div>
                    <div className="bg-[#A6AEBF] p-2 mb-4">
                        <h2 className="text-white text-xl">Other Information</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Side */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-lg font-semibold mb-4">
                                    Teaching Experience (In Years) : <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="teachingExperience"
                                    placeholder="Enter Your Exp."
                                    value={formData.teachingExperience}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-[#C5D3E8] rounded text-base"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-semibold mb-4">
                                    If yes the name of the Association(s) : <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="associationName"
                                    placeholder="Enter Asso."
                                    value={formData.associationName}
                                    onChange={handleChange}
                                    className="w-full p-2 bg-[#C5D3E8] rounded text-base"
                                    required={formData.memberOfAssociation === 'YES'}
                                />
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className='ml-8'>
                            <label className="block text-lg font-semibold mb-1 ">
                                Area's of your work : <span className="text-red-500">*</span>
                            </label>
                            <div className="space-y-2">
                                {[
                                    'Primary School',
                                    'Secondary School',
                                    'Junior College (+2)',
                                    'Senior College/University',
                                    'Teacher Education',
                                    'Other'
                                ].map((area) => (
                                    <div key={area} className="flex items-center ml-5">
                                        <input
                                            type="checkbox"
                                            id={area}
                                            name="areasOfWork-checkbox"
                                            value={area}
                                            checked={formData.areasOfWork.includes(area)}
                                            onChange={handleChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor={area} className="text-base">{area}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                    <div className="mt-4">
                        <label className="block text-lg font-semibold mb-1">
                            Are you member of any other English Teacher Association(s) : <span className="text-red-500">*</span>
                        </label>
                        <div className="relative inline-block w-full">
                            <select
                                name="memberOfAssociation"
                                value={formData.memberOfAssociation}
                                onChange={handleChange}
                                className="w-full p-2 bg-[#C5D3E8] rounded appearance-none text-base"
                                required
                            >
                                <option value="">YES</option>
                                <option value="YES">YES</option>
                                <option value="NO">NO</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block text-lg font-semibold mb-1">
                            Address (Institutional) : <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="addressInstitutional"
                            placeholder="Enter Your Address"
                            value={formData.addressInstitutional}
                            onChange={handleChange}
                            className="w-full p-2 bg-[#C5D3E8] rounded text-base"
                            rows="3"
                            required
                        ></textarea>
                    </div>

                    <div className="mt-4">
                        <label className="block text-lg font-semibold mb-1">
                            Your expectations from AINET :
                        </label>
                        <textarea
                            name="expectations"
                            placeholder="Enter Asso."
                            value={formData.expectations}
                            onChange={handleChange}
                            className="w-full p-2 bg-[#C5D3E8] rounded text-base"
                            rows="3"
                        ></textarea>
                    </div>

                    <div className="mt-4">
                        <label className="block text-lg font-semibold mb-1">Like to receive newsletter ?</label>
                        <div className="relative inline-block w-full base:w-auto">
                            <select
                                name="receiveNewsletter"
                                value={formData.receiveNewsletter}
                                onChange={handleChange}
                                className="w-full base:w-36 p-2 bg-[#C5D3E8] rounded appearance-none text-base"
                            >
                                <option value="YES">YES</option>
                                <option value="NO">NO</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div>
                            <label className="block text-lg font-semibold mb-1">
                                Password : <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter Your Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-2 bg-[#C5D3E8] rounded text-base"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-lg font-semibold mb-1">
                                Re-Enter Password : <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                name="reEnterPassword"
                                placeholder="Enter Your Password"
                                value={formData.reEnterPassword}
                                onChange={handleChange}
                                className="w-full p-2 bg-[#C5D3E8] rounded text-base"
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
                        <label htmlFor="agreeToTerms" className="text-base">
                            I agree to the terms and conditions of the membership. <span className="text-red-500">*</span>
                        </label>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="px-12 py-3 bg-amber-100 rounded-full text-base font-semibold"
                        >
                            SUBMIT APPLICATION FORM
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
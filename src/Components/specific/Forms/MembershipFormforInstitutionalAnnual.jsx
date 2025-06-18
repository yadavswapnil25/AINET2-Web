import { useState, useEffect } from 'react';

export default function MembershipFormforInstitutionalAnnual() {
  const [formData, setFormData] = useState({
    institutionName: '',
    institutionType: '',
    otherType: '',
    contactNo: '',
    whatsappNo: '',
    email: '',
    website: '',
    address: '',
    state: '',
    district: '',
    contactPersonName: '',
    contactPersonNo: '',
    contactPersonEmail: '',
    hostEvent: 'YES',
    expectations: '',
    newsletter: 'YES',
    password: '',
    rePassword: '',
    agreeTerms: false
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="max-w-5xl mx-auto my-10 p-4 border border-blue-500 rounded-lg bg-white shadow-md">
      <div className="relative mb-4 pb-2">
        <h1 className="text-4xl font-bold py-4 text-center">Membership Form for Institutional Annual</h1>
        <button className="absolute top-0 right-0 bg-black rounded-full p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
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
                name="institutionName"
                value={formData.institutionName}
                onChange={handleChange}
                placeholder="Enter Your Institutional Name"
                className="w-full p-2 bg-blue-100 rounded text-base"
                required
              />
            </div>

            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block text-base mb-2 mt-1">Type of institution : <span className="text-red-500">*</span></label>
                <select
                  name="institutionType"
                  value={formData.institutionType}
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
                  name="otherType"
                  value={formData.otherType}
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
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleChange}
                  placeholder="Enter Your No."
                  className="w-full p-2 bg-blue-100 rounded text-base"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-base mb-2 mt-1">WhatsApp No. :</label>
                <input
                  type="text"
                  name="whatsappNo"
                  value={formData.whatsappNo}
                  onChange={handleChange}
                  placeholder="Enter Your No."
                  className="w-full p-2 bg-blue-100 rounded text-base"
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
                  className="w-full p-2 bg-blue-100 rounded text-base"
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
                  className="w-full p-2 bg-blue-100 rounded text-base"
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
                className="w-full p-2 bg-blue-100 rounded text-base"
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
                  className="w-full p-2 bg-blue-100 rounded text-base"
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
                  className="w-full p-2 bg-blue-100 rounded text-base"
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
                name="contactPersonName"
                value={formData.contactPersonName}
                onChange={handleChange}
                placeholder="Enter Your Name"
                className="w-full p-2 bg-blue-100 rounded text-base"
                required
              />
            </div>

            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block text-base mb-2 mt-1">Contact No. : <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="contactPersonNo"
                  value={formData.contactPersonNo}
                  onChange={handleChange}
                  placeholder="Enter Your No."
                  className="w-full p-2 bg-blue-100 rounded text-base"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-base mb-2 mt-1">Email : <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  name="contactPersonEmail"
                  value={formData.contactPersonEmail}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                  className="w-full p-2 bg-blue-100 rounded text-base"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-base mb-2 mt-1">Would you like to host an event/collaborate with AINET?</label>
              <select
                name="hostEvent"
                value={formData.hostEvent}
                onChange={handleChange}
                className="w-full p-2 bg-blue-100 rounded text-base"
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
                placeholder="Enter Asso."
                className="w-full p-2 bg-blue-100 rounded text-base"
                rows="2"
              ></textarea>
            </div>

            <div>
              <label className="block text-base mb-2 mt-1">Like to receive newsletter ?</label>
              <select
                name="newsletter"
                value={formData.newsletter}
                onChange={handleChange}
                className="w-full p-2 bg-blue-100 rounded text-base"
              >
                <option value="YES">YES</option>
                <option value="NO">NO</option>
              </select>
            </div>

            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block text-base mb-2 mt-1">Password : <span className="text-red-500">*</span></label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Your Password"
                  className="w-full p-2 bg-blue-100 rounded text-base"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-base mb-2 mt-1">Re-Enter Password : <span className="text-red-500">*</span></label>
                <input
                  type="password"
                  name="rePassword"
                  value={formData.rePassword}
                  onChange={handleChange}
                  placeholder="Enter Your Password"
                  className="w-full p-2 bg-blue-100 rounded text-base"
                  required
                />
              </div>
            </div>

            <div className="flex items-start mt-1">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mt-1 mr-1"
                required
              />
              <label className="text-xs">I agree to the terms and conditions of the membership. <span className="text-red-500">*</span></label>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button 
            type="submit" 
            className="bg-[#FFF8DE] px-8 py-2 rounded-full transition-colors text-base font-semibold"
          >
            SUBMIT APPLICATION FORM
          </button>
        </div>
      </form>
    </div>
  );
}
import { useState, useRef, useEffect } from 'react';

const CountryCodeSelector = ({ 
  value, 
  onChange, 
  name, 
  placeholder = "Select Country", 
  className = "",
  required = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);

  // Fetch countries data from free API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Using REST Countries API (free, no API key required)
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,idd,flag');
        
        if (!response.ok) {
          throw new Error('Failed to fetch countries data');
        }
        
        const data = await response.json();
        
        // Transform API data to our format
        const transformedCountries = data
          .filter(country => country.idd && country.idd.root && country.idd.suffixes)
          .map(country => {
            const dialCode = country.idd.root + (country.idd.suffixes[0] || '');
            return {
              name: country.name.common,
              code: dialCode,
              flag: country.flag,
              dialCode: dialCode.replace('+', '') // Remove + for storage
            };
          })
          .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically
        
        setCountries(transformedCountries);
      } catch (err) {
        console.error('Error fetching countries:', err);
        setError(err.message);
        
        // Fallback to essential countries if API fails
        const fallbackCountries = [
          { name: 'India', code: '+91', flag: '🇮🇳', dialCode: '91' },
          { name: 'United States', code: '+1', flag: '🇺🇸', dialCode: '1' },
          { name: 'United Kingdom', code: '+44', flag: '🇬🇧', dialCode: '44' },
          { name: 'Canada', code: '+1', flag: '🇨🇦', dialCode: '1' },
          { name: 'Australia', code: '+61', flag: '🇦🇺', dialCode: '61' },
          { name: 'Germany', code: '+49', flag: '🇩🇪', dialCode: '49' },
          { name: 'France', code: '+33', flag: '🇫🇷', dialCode: '33' },
          { name: 'Japan', code: '+81', flag: '🇯🇵', dialCode: '81' },
          { name: 'China', code: '+86', flag: '🇨🇳', dialCode: '86' },
          { name: 'Brazil', code: '+55', flag: '🇧🇷', dialCode: '55' }
        ];
        setCountries(fallbackCountries);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Filter countries based on search term
  const filteredCountries = countries.filter(country => {
    const searchLower = searchTerm.toLowerCase();
    return (
      country.name.toLowerCase().includes(searchLower) ||
      country.code.toLowerCase().includes(searchLower) ||
      country.dialCode.includes(searchTerm)
    );
  });

  // Get selected country - handle cases where multiple countries share the same dial code
  const selectedCountry = countries.find(country => country.dialCode === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (country) => {
    onChange({
      target: {
        name: name,
        value: country.dialCode // Store dial code as number
      }
    });
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm('');
    }
  };

  // Clear search when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={handleToggle}
        disabled={loading}
        className={`w-full p-3 border border-gray-300 rounded text-sm bg-white text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          !selectedCountry ? 'text-gray-500' : 'text-gray-900'
        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <div className="flex items-center">
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading countries...
            </span>
          ) : error ? (
            <span className="text-red-500">Error loading countries</span>
          ) : selectedCountry ? (
            <>
              <span className="text-lg mr-2">{selectedCountry.flag}</span>
              <span className="font-medium">{selectedCountry.code}</span>
              {/* <span className="ml-2 text-gray-600">({selectedCountry.name})</span> */}
            </>
          ) : (
            <span>{placeholder}</span>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && !loading && !error && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-hidden">
          {/* Search Input */}
          <div className="p-2 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-8 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
              <svg className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Country List */}
          <div className="max-h-48 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country, index) => (
                <button
                  key={`${country.dialCode}-${country.name}-${index}`}
                  type="button"
                  onClick={() => handleSelect(country)}
                  className={`w-full p-3 text-left hover:bg-gray-50 flex items-center ${
                    selectedCountry?.dialCode === country.dialCode && selectedCountry?.name === country.name ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
                  }`}
                >
                  <span className="text-lg mr-3">{country.flag}</span>
                  <div className="flex-1">
                    {/* <div className="font-medium">{country.name}</div> */}
                    <div className="text-sm text-gray-500">{country.code}</div>
                  </div>
                  {selectedCountry?.dialCode === country.dialCode && selectedCountry?.name === country.name && (
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))
            ) : (
              <div className="p-3 text-center text-gray-500 text-sm">
                {searchTerm ? `No countries found for "${searchTerm}"` : 'No countries available'}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-red-300 rounded-md shadow-lg p-3">
          <div className="text-red-600 text-sm">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Failed to load countries. Using limited list.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryCodeSelector;

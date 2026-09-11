import { useState, useRef, useEffect } from 'react';
import COUNTRY_DIAL_CODES from '../../utils/countryDialCodes';

const CountryCodeSelector = ({ 
  value, 
  onChange, 
  name, 
  placeholder = "Select Country", 
  className = "",
  required = false,
  dropdownHeight = 320,
  preferredDirection = 'auto'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const countries = COUNTRY_DIAL_CODES;
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const initialDirection = preferredDirection === 'up' ? 'up' : 'down';
  const [dropDirection, setDropDirection] = useState(initialDirection);

  const topCountryDialCode = '91';
  const topCountry = countries.find(country => country.dialCode === topCountryDialCode);

  // Filter countries based on search term
  const filteredCountries = (() => {
    const searchLower = searchTerm.toLowerCase();

    if (searchLower.length === 0) {
      const remaining = countries.filter(country => country.dialCode !== topCountryDialCode);
      return topCountry ? [topCountry, ...remaining] : countries;
    }

    return countries.filter(country =>
      country.name.toLowerCase().includes(searchLower) ||
      country.code.toLowerCase().includes(searchLower) ||
      country.dialCode.includes(searchTerm)
    );
  })();

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
    setDropDirection('down');
  };

  const handleToggle = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const estimatedHeight = dropdownHeight;

      if (preferredDirection === 'up') {
        setDropDirection('up');
        const offsetTop = rect.top - estimatedHeight - 20;
        if (offsetTop < window.scrollY) {
          window.scrollTo({ top: Math.max(offsetTop, 0), behavior: 'smooth' });
        }
      } else if (preferredDirection === 'down') {
        setDropDirection('down');
        const offsetBottom = rect.bottom + estimatedHeight;
        if (offsetBottom > window.scrollY + window.innerHeight) {
          const newTop = offsetBottom - window.innerHeight + 20;
          window.scrollTo({ top: newTop, behavior: 'smooth' });
        }
      } else {
        const availableBelow = window.innerHeight - rect.bottom;
        const availableAbove = rect.top;

        if (availableBelow < estimatedHeight && availableAbove > availableBelow) {
          setDropDirection('up');
          const offsetTop = rect.top - estimatedHeight - 20;
          if (offsetTop < window.scrollY) {
            window.scrollTo({ top: Math.max(offsetTop, 0), behavior: 'smooth' });
          }
        } else {
          setDropDirection('down');
          const offsetBottom = rect.bottom + estimatedHeight;
          if (offsetBottom > window.scrollY + window.innerHeight) {
            const newTop = offsetBottom - window.innerHeight + 20;
            window.scrollTo({ top: newTop, behavior: 'smooth' });
          }
        }
      }

      setSearchTerm('');
    }

    if (isOpen) {
      setDropDirection(preferredDirection === 'up' ? 'up' : (preferredDirection === 'down' ? 'down' : initialDirection));
    }

    setIsOpen(!isOpen);
    if (isOpen) {
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
        ref={buttonRef}
        className={`w-full p-3 border border-gray-300 rounded text-sm bg-white text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          !selectedCountry ? 'text-gray-500' : 'text-gray-900'
        }`}
      >
        <div className="flex items-center">
          {selectedCountry ? (
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

      {isOpen && (
        <div
          className={`absolute z-50 w-full ${
            dropDirection === 'up' ? 'bottom-full mb-1' : 'mt-1'
          } bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-hidden`}
        >
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

    </div>
  );
};

export default CountryCodeSelector;

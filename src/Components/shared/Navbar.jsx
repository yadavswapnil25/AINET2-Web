import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown, MdMail } from "react-icons/md";
import { RiInstagramFill, RiTwitterXLine, RiTelegramFill, RiWhatsappFill } from "react-icons/ri";
import { IoLogoFacebook } from "react-icons/io5";
import { AiFillYoutube } from "react-icons/ai";
import { FaPinterest } from "react-icons/fa6";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const searchRef = useRef(null);
  const navRef = useRef(null);

  const toggleDropdown = (menu) => {
    setDropdownOpen(dropdownOpen === menu ? null : menu);
  };

  const toggleMobileDropdown = (menu) => {
    setMobileDropdown(mobileDropdown === menu ? null : menu);
  };

  const socials = [
    { name: "Instagram", icon: <RiInstagramFill />, link: "#" },
    { name: "Facebook", icon: <IoLogoFacebook />, link: "#" },
    { name: "Youtube", icon: <AiFillYoutube />, link: "#" },
    { name: "X", icon: <RiTwitterXLine />, link: "#" },
    { name: "telegram", icon: <RiTelegramFill />, link: "#" },
    { name: "pinterest", icon: <FaPinterest />, link: "#" },
    { name: "whatsapp", icon: <RiWhatsappFill />, link: "#" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchExpanded(false);
      }
      
      // Close mobile menu when clicking outside
      if (isOpen && navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    // Prevent scrolling when mobile menu is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="bg-white text-black   shadow-md sticky top-0 z-50 py-1.5" ref={navRef}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold z-10">
          <img src="/logo.svg" alt="logo ainet" className="h-[80px] md:h-[120px]" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:flex-col space-y-2 lg:space-y-4 w-full">
          <div className="flex flex-wrap lg:flex-nowrap justify-end items-center gap-2 lg:gap-4">
            {/* mail */}
            <a className="flex items-center text-sm lg:text-base" href="mailto:theainet@gmail.com">
              <MdMail className="size-4 lg:size-5 mr-1" />
              <span className="hidden sm:inline">theainet@gmail.com</span>
            </a>
            
            {/* socials */}
            <div className="flex items-center gap-2 lg:gap-3">
              {socials.map((social) => (
                <a 
                  key={social.name} 
                  href={social.link} 
                  className="text-xl lg:text-2xl hover:text-gray-500 transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            {/* AUTH BTNS */}
            <div className="flex items-center gap-2 lg:gap-4">
              <button className="px-3 py-1 lg:px-6 lg:py-2 text-sm lg:text-base font-semibold bg-[#A6AEBF] rounded-full text-[#F5F5F5] cursor-pointer hover:bg-[#8a91a3] transition-all duration-300">
                JOIN US
              </button>
              <button className="px-3 py-1 lg:px-6 lg:py-2 text-sm lg:text-base font-semibold bg-[#FFFFFF] border border-[#A6AEBF] rounded-full text-[#A6AEBF] cursor-pointer hover:bg-gray-100 transition-all duration-300">
                <Link to="/MembershipArea">LOG IN</Link>
              </button>
            </div>
            
          {/* Search */}
<div
  ref={searchRef}
  className={`relative flex items-center transition-all duration-300 ${
    searchExpanded ? "flex-row" : "flex-row-reverse"
  }`}
>
  {searchExpanded && (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="border border-gray-300 rounded-4xl pl-10 pr-2 py-2 outline-none w-36 lg:w-48 text-sm"
        autoFocus
      />
      <div className="absolute left-1.5 top-1/2 transform -translate-y-1/2">
        <img
          src="/searchIcon.svg"
          alt="Search"
          className="w-6 h-6 "
        />
      </div>
    </div>
  )}

  {!searchExpanded && (
    <button
      onClick={() => setSearchExpanded((prev) => !prev)}
      className="p-1"
      aria-label="Search"
    >
      <img
        src="/searchIcon.svg"
        alt="Search"
        className="w-8 h-8 "
      />
    </button>
  )}
</div>

          </div>
          
          {/* Desktop Navigation Links */}
          <div className="flex flex-wrap justify-end text-sm lg:text-base space-x-2 lg:space-x-6">
            <Link to="/" className="hover:text-[#A6AEBF] transition-colors">Home</Link>
            <Link to="/about" className="hover:text-[#A6AEBF] transition-colors">About us</Link>
            
            {/* Desktop Dropdowns */}
            <div className="relative group" 
                onMouseEnter={() => toggleDropdown('Projects')} 
                onMouseLeave={() => toggleDropdown(null)}>
              <button className="hover:text-[#A6AEBF] flex items-center transition-colors">
                AINET Projects
                <MdOutlineKeyboardArrowDown className={`ml-1 transition-transform ${dropdownOpen === 'Projects' ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen === 'Projects' && (
                <div className="absolute bg-white mt-2 py-4 w-40 rounded shadow-lg z-10 top-3.5">
                  <Link to="/teacherResearch" className="block px-2 py-2 hover:bg-gray-100 transition-colors">Teacher Research</Link>
                  <Link to="/initiatives/item2" className="block px-4 py-2 hover:bg-gray-100 transition-colors">AINET Connect</Link>
                  <Link to="/initiatives/item2" className="block px-4 py-2 hover:bg-gray-100 transition-colors">Affiliates Projects</Link>
                  <Link to="/initiatives/item2" className="block px-4 py-2 hover:bg-gray-100 transition-colors">Women in AINET</Link>
                </div>
              )}
            </div>
            
            <Link to="/publications" className="hover:text-[#A6AEBF] transition-colors">Publications</Link>
            <Link to="/BlogsSection1" className="hover:text-[#A6AEBF] transition-colors">AINET Adda</Link>
            <Link to="/BlogsSection2" className="hover:text-[#A6AEBF] transition-colors">Affiliates</Link>
            
            <div className="relative group" 
                onMouseEnter={() => toggleDropdown('resources')} 
                onMouseLeave={() => toggleDropdown(null)}>
              <button className="hover:text-[#A6AEBF] flex items-center transition-colors">
                Resources
                <MdOutlineKeyboardArrowDown className={`ml-1 transition-transform ${dropdownOpen === 'resources' ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen === 'resources' && (
                <div className="absolute bg-white mt-2 py-2 w-40 rounded shadow-lg z-10 top-3.5">
                  <Link to="/MembershipFormforIndividualOverseas" className="block px-4 py-2 hover:bg-gray-100 transition-colors">Item 1</Link>
                  <Link to="/MembershipFormforInstitutionalAnnual" className="block px-4 py-2 hover:bg-gray-100 transition-colors">Item 2</Link>
                </div>
              )}
            </div>
            
            <div className="relative group" 
                onMouseEnter={() => toggleDropdown('event')} 
                onMouseLeave={() => toggleDropdown(null)}>
              <button className="hover:text-[#A6AEBF] flex items-center transition-colors">
                Event
                <MdOutlineKeyboardArrowDown className={`ml-1 transition-transform ${dropdownOpen === 'event' ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen === 'event' && (
                <div className="absolute bg-white mt-2 py-2 w-40 rounded shadow-lg z-10 top-3.5">
                  <Link to="/Conference" className="block px-4 py-2 hover:bg-gray-100 transition-colors">Conferences</Link>
                  <Link to="webinar" className="block px-4 py-2 hover:bg-gray-100 transition-colors">Webinars</Link>
                  <Link to="/event/item2" className="block px-4 py-2 hover:bg-gray-100 transition-colors">FD Lectures</Link>
                </div>
              )}
            </div>
            
            <div className="relative group" 
                onMouseEnter={() => toggleDropdown('more')} 
                onMouseLeave={() => toggleDropdown(null)}>
              <button className="hover:text-[#A6AEBF] flex items-center transition-colors">
                More
                <MdOutlineKeyboardArrowDown className={`ml-1 transition-transform ${dropdownOpen === 'more' ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen === 'more' && (
                <div className="absolute right-0 bg-white mt-2 py-2 w-40 rounded shadow-lg z-10 top-3.5">
                  <Link to="/ContactUs" className="block px-4 py-2 hover:bg-gray-100 transition-colors">Contact Us</Link>
                  <Link to="/MembershipFormforIndividualAnnual" className="block px-4 py-2 hover:bg-gray-100 transition-colors">Annual form</Link>
                  <Link to="/gallery" className="block px-4 py-2 hover:bg-gray-100 transition-colors">Gallery</Link>
                  <Link to="/archives" className="block px-4 py-2 hover:bg-gray-100 transition-colors">Archives</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden z-50 mr-5" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-white z-40 flex flex-col p-5 pt-16 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}>
          <div className="flex flex-col space-y-4 mb-6">
            {/* Mobile Search */}
            <div className="relative flex border-b border-gray-200 pb-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full border border-gray-300 rounded-full px-4 py-2 outline-none"
              />
              <button className="absolute right-3 top-2.5">
                <img
                  src="./searchIcon.svg"
                  alt="Search"
                  className="w-5 h-5"
                />
              </button>
            </div>
            
            {/* Mobile Navigation Links */}
            <Link to="/" className="py-3 border-b border-gray-200" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/about" className="py-3 border-b border-gray-200" onClick={() => setIsOpen(false)}>About us</Link>
            
            {/* Mobile Dropdowns */}
            <div className="py-3 border-b border-gray-200">
              <button 
                className="flex justify-between items-center w-full" 
                onClick={() => toggleMobileDropdown('initiatives')}
              >
                AINET Projects
                <MdOutlineKeyboardArrowDown className={`transition-transform ${mobileDropdown === 'initiatives' ? "rotate-180" : ""}`} />
              </button>
              
              {mobileDropdown === 'initiatives' && (
                <div className="mt-2 pl-4 space-y-2">
                   <Link to="/teacherResearch" className="block px-2 py-2 hover:bg-gray-100 transition-colors">Teacher Research</Link>
                  <Link to="/initiatives/item2" className="block px-4 py-2 hover:bg-gray-100 transition-colors">AINET Connect</Link>
                  <Link to="/initiatives/item2" className="block px-4 py-2 hover:bg-gray-100 transition-colors">Affiliates Projects</Link>
                  <Link to="/initiatives/item2" className="block px-4 py-2 hover:bg-gray-100 transition-colors">Women in AINET</Link>
                </div>
              )}
            </div>
            
            <Link to="/publications" className="py-3 border-b border-gray-200" onClick={() => setIsOpen(false)}>Publications</Link>
            <Link to="/BlogsSection1" className="py-3 border-b border-gray-200" onClick={() => setIsOpen(false)}>AINET Adda</Link>
            <Link to="/BlogsSection2" className="py-3 border-b border-gray-200" onClick={() => setIsOpen(false)}>Affiliates</Link>
            
            <div className="py-3 border-b border-gray-200">
              <button 
                className="flex justify-between items-center w-full" 
                onClick={() => toggleMobileDropdown('resources')}
              >
                Resources
                <MdOutlineKeyboardArrowDown className={`transition-transform ${mobileDropdown === 'resources' ? "rotate-180" : ""}`} />
              </button>
              
              {mobileDropdown === 'resources' && (
                <div className="mt-2 pl-4 space-y-2">
                  <Link to="/resources/item1" className="block py-2" onClick={() => setIsOpen(false)}>Item 1</Link>
                  <Link to="/resources/item2" className="block py-2" onClick={() => setIsOpen(false)}>Item 2</Link>
                </div>
              )}
            </div>
            
            <div className="py-3 border-b border-gray-200">
              <button 
                className="flex justify-between items-center w-full" 
                onClick={() => toggleMobileDropdown('event')}
              >
                Event
                <MdOutlineKeyboardArrowDown className={`transition-transform ${mobileDropdown === 'event' ? "rotate-180" : ""}`} />
              </button>
              
              {mobileDropdown === 'event' && (
                <div className="mt-2 pl-4 space-y-2">
                  <Link to="/Conference" className="block px-4 py-2 hover:bg-gray-100 transition-colors">Conferences</Link>
                  <Link to="webinar" className="block px-4 py-2 hover:bg-gray-100 transition-colors">Webinars</Link>
                  <Link to="/event/item2" className="block px-4 py-2 hover:bg-gray-100 transition-colors">FD Lectures</Link>
                </div>
              )}
            </div>
            
            <div className="py-3 border-b border-gray-200">
              <button 
                className="flex justify-between items-center w-full" 
                onClick={() => toggleMobileDropdown('more')}
              >
                More
                <MdOutlineKeyboardArrowDown className={`transition-transform ${mobileDropdown === 'more' ? "rotate-180" : ""}`} />
              </button>
              
              {mobileDropdown === 'more' && (
                <div className="mt-2 pl-4 space-y-2">
                   <Link to="/ContactUs" className="block px-4 py-2 hover:bg-gray-100 transition-colors">Contact Us</Link>
                  <Link to="/MembershipFormforIndividualAnnual" className="block px-4 py-2 hover:bg-gray-100 transition-colors">Annual form</Link>
                  <Link to="/gallery" className="block px-4 py-2 hover:bg-gray-100 transition-colors">Gallery</Link>
                  <Link to="/archives" className="block px-4 py-2 hover:bg-gray-100 transition-colors">Archives</Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile Contact */}
          <div className="mt-auto">
            {/* Mobile Auth Buttons */}
            <div className="flex flex-col space-y-3 mb-6">
              <button className="py-2 text-base font-semibold bg-[#A6AEBF] rounded-full text-white">
                JOIN US
              </button>
              <button className="py-2 text-base font-semibold bg-white border border-[#A6AEBF] rounded-full text-[#A6AEBF]">
                <Link to="/Login" onClick={() => setIsOpen(false)}>LOG IN</Link>
              </button>
            </div>
            
            {/* Mobile Email */}
            <a className="flex items-center justify-center gap-2 py-3" href="mailto:theainet@gmail.com">
              <MdMail className="size-5" />
              theainet@gmail.com
            </a>
            
            {/* Mobile Social Icons */}
            <div className="flex justify-center gap-4 py-4">
              {socials.map((social) => (
                <a 
                  key={social.name} 
                  href={social.link} 
                  className="text-2xl hover:text-gray-500 transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
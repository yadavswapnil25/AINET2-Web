import { useState } from "react";
import { useEffect, useRef } from "react";

import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown,MdMail } from "react-icons/md";
import { RiInstagramFill, RiTwitterXLine,RiTelegramFill,RiWhatsappFill} from "react-icons/ri";
import { IoLogoFacebook } from "react-icons/io5";
import { AiFillYoutube } from "react-icons/ai";
import { FaPinterest } from "react-icons/fa6";







const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [searchExpanded, setSearchExpanded] = useState(false);
const searchRef = useRef(null);


  const toggleDropdown = (menu) => {
    setDropdownOpen(dropdownOpen === menu ? null : menu);
  };

  const socials = [
   
    { name: "Instagram", icon:<RiInstagramFill/>, link: "#" },
    { name: "Facebook", icon: <IoLogoFacebook/>, link: "#" },
    { name: "Youtube", icon: <AiFillYoutube/>, link: "#" },
    { name: "X", icon:<RiTwitterXLine/>, link: "#" },
    {name:"telegram",icon:<RiTelegramFill/>,link:""},
    {name:"pinterest",icon:<FaPinterest/>,link:""},
    {name:"whatsapp",icon:<RiWhatsappFill/>,link:""},
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchExpanded(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  

  return (
    <nav className="bg-white text-black p-4">
      <div className="mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          <img src="./logo.svg" alt="logo ainet" />
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex md:flex-col space-y-4">
          <div className="flex p-1 gap-6">
            {/* mail */}
            <a className="flex gap-2.5 items-center justify-center text-lg font-medium" href="">
            <MdMail className=" size-6"/>
            theainet@gmail.com
            </a>
            {/* socials */}
            <div className="flex items-center justify-center gap-3.5">
              {socials.map((social) => (
                <a key={social.name} href={social.link} className=" text-3xl">
                  {social.icon}
                </a>
              ))}
            </div>
            {/* AUTH BTNS */}
            <div className="flex items-center justify-center gap-6">
            <button className=" px-9 py-2 text-lg font-semibold bg-[#A6AEBF] rounded-4xl text-[#F5F5F5] cursor-pointer btnshadow hover:scale-[1.03]">
              JOIN US
            </button>

            <button className=" px-9 py-2 text-lg font-semibold bg-[#FFFFFF] border-[2px] border-[#A6AEBF] rounded-4xl text-[#A6AEBF] cursor-pointer btnshadow hover:scale-[1.03]">
            LOG IN
            </button>
            </div>
            <div
  ref={searchRef}
  className={`relative flex items-center transition-all duration-300 ${
    searchExpanded ? "flex-row" : "flex-row-reverse"
  }`}
>
  <button
    onClick={() => setSearchExpanded((prev) => !prev)}
    className="p-1"
  >
    <img
      src="./searchIcon.svg"
      alt="searchIcon"
      className="w-5 h-5"
    />
  </button>

  {searchExpanded && (
    <input
      type="text"
      placeholder="Search..."
      className="ml-2 border border-gray-300 rounded px-2 py-1 outline-none transition-all duration-300 w-48"
      autoFocus
    />
  )}
</div>


          </div>
          <div className="md:flex space-x-6 text-[20px] cursor-pointer">
          <Link to="/" className="hover:text-[#A6AEBF] hover:underline transition-all duration-500 ease-in">Home</Link>
          <Link to="/about" className="hover:text-gray-300">About us</Link>
          <div className="relative" onMouseEnter={() => toggleDropdown('initiatives')} onMouseLeave={() => toggleDropdown(null)}>
            <button className="hover:text-gray-300 flex gap-1 justify-center items-center transition-all duration-500 ease-in-out">AINET Initiatives {dropdownOpen === 'initiatives' ? (<MdOutlineKeyboardArrowDown className="rotate-180" />) : (<MdOutlineKeyboardArrowDown />)}</button>
            {dropdownOpen === 'initiatives' && (
              <div className="absolute bg-white text-black mt-2 py-2 w-40 rounded shadow-lg">
                <Link to="/initiatives/item1" className="block px-4 py-2 hover:bg-gray-200">Item 1</Link>
                <Link to="/initiatives/item2" className="block px-4 py-2 hover:bg-gray-200">Item 2</Link>
              </div>
            )}
          </div>
          <Link to="/publications" className="hover:text-gray-300">Publications</Link>
          <Link to="/ainet-adda" className="hover:text-gray-300">AINET Adda</Link>
          <Link to="/affiliates" className="hover:text-gray-300">Affiliates</Link>
          <div className="relative" onMouseEnter={() => toggleDropdown('resources')} onMouseLeave={() => toggleDropdown(null)}>
            <button className="hover:text-gray-300 flex gap-1 justify-center items-center transition-all duration-500 ease-in-out">Resources {dropdownOpen === 'resources' ? (<MdOutlineKeyboardArrowDown className="rotate-180" />) : (<MdOutlineKeyboardArrowDown />)}</button>
            {dropdownOpen === 'resources' && (
              <div className="absolute bg-white text-black mt-2 py-2 w-40 rounded shadow-lg">
                <Link to="/resources/item1" className="block px-4 py-2 hover:bg-gray-200">Item 1</Link>
                <Link to="/resources/item2" className="block px-4 py-2 hover:bg-gray-200">Item 2</Link>
              </div>
            )}
          </div>
          <div className="relative" onMouseEnter={() => toggleDropdown('event')} onMouseLeave={() => toggleDropdown(null)}>
            <button className="hover:text-gray-300 flex gap-1 justify-center items-center transition-all duration-500 ease-in-out">Event {dropdownOpen === 'event' ? (<MdOutlineKeyboardArrowDown className="rotate-180" />) : (<MdOutlineKeyboardArrowDown />)}</button>
            {dropdownOpen === 'event' && (
              <div className="absolute bg-white text-black mt-2 py-2 w-40 rounded shadow-lg">
                <Link to="/event/item1" className="block px-4 py-2 hover:bg-gray-200">Item 1</Link>
                <Link to="/event/item2" className="block px-4 py-2 hover:bg-gray-200">Item 2</Link>
              </div>
            )}
          </div>
          <div className="relative" onMouseEnter={() => toggleDropdown('more')} onMouseLeave={() => toggleDropdown(null)}>
            <button className="hover:text-gray-300 flex gap-1 justify-center items-center transition-all duration-500 ease-in-out">More {dropdownOpen === 'more' ? (<MdOutlineKeyboardArrowDown className="rotate-180" />) : (<MdOutlineKeyboardArrowDown />)}</button>
            {dropdownOpen === 'more' && (
              <div className="absolute bg-white text-black mt-2 py-2 w-40 rounded shadow-lg">
                <Link to="/more/item1" className="block px-4 py-2 hover:bg-gray-200">Item 1</Link>
                <Link to="/more/item2" className="block px-4 py-2 hover:bg-gray-200">Item 2</Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

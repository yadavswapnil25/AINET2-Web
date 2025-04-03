import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Brand</Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/about" className="hover:text-gray-300">About</Link>
          <Link to="/services" className="hover:text-gray-300">Services</Link>
          <div className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
            <button className="hover:text-gray-300">Products</button>
            {dropdownOpen && (
              <div className="absolute bg-white text-black mt-2 py-2 w-40 rounded shadow-lg">
                <Link to="/products/item1" className="block px-4 py-2 hover:bg-gray-200">Item 1</Link>
                <Link to="/products/item2" className="block px-4 py-2 hover:bg-gray-200">Item 2</Link>
              </div>
            )}
          </div>
          <Link to="/contact" className="hover:text-gray-300">Contact</Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 p-4">
          <Link to="/about" className="block py-2">About</Link>
          <Link to="/services" className="block py-2">Services</Link>
          <button className="w-full text-left py-2" onClick={() => setDropdownOpen(!dropdownOpen)}>
            Products
          </button>
          {dropdownOpen && (
            <div className="bg-white text-black rounded shadow-lg">
              <Link to="/products/item1" className="block px-4 py-2 hover:bg-gray-200">Item 1</Link>
              <Link to="/products/item2" className="block px-4 py-2 hover:bg-gray-200">Item 2</Link>
            </div>
          )}
          <Link to="/contact" className="block py-2">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

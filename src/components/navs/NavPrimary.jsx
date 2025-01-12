import React, { useState, useEffect } from "react";
import { BtnPrimary, LogoFull } from "..";
import { CiMenuFries } from "react-icons/ci";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router";
import { useLocation } from "react-router-dom";

function NavPrimary() {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Store Locator",
      link: "/store",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];
  const location = useLocation();

  const [showMenu, setShowMenu] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [active, setActive] = useState("Home");
  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    navItems.forEach((item) => {
      if (location.pathname === item.link) {
        setActive(item.name);
      }
    });
  } , [location]);
  return (
<nav className={`md:px-20  px-5  items-center bg-transparent justify-between transition-all duration-500 ease-in-out ${isSticky ? 'fixed top-0 w-full py-2 bg-white shadow-lg z-50' : 'py-5 relative'}`}>
      <div className="flex gap-4 justify-between items-center">
        <img src={LogoFull} alt="Logo" className="w-16 rounded-full" />
        
        <div className="hidden md:flex gap-4 items-center justify-center">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={`${item.link}`}
              className={`${isSticky? '':'text-white'} ${active == item.name ? 'border-b border-red-900':''}font-bold text-center relative group px-3 `}
            >
              {item.name}
              <span className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-red-900 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
          ))}
        </div>

        <div className="flex gap-4 items-center">
          <div className="md:hidden">
            {!showMenu && (
              <CiMenuFries
                className = {`${isSticky ? '' : 'text-white'} text-3xl cursor-pointer`}
                onClick={toggleMenu}
              />
            )}
          </div>
          <FaSearch className="text-2xl text-red-600 hover:text-red-700 hover:scale-105 cursor-pointer" />
          <BtnPrimary>
            <FaShoppingCart className="inline me-3" />
            Shop Now
          </BtnPrimary>
        </div>
      </div>

      <div
        className={`p-10 flex items-center justify-center absolute top-0 right-0 py-32 left-0 bg-black/90 transition-all duration-500 ease-in-out transform ${
          showMenu ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <IoClose
          className="text-3xl text-white rounded bg-slate-800 cursor-pointer absolute top-5 right-5 hover:scale-110 transition-transform ease-in-out duration-200 hover:text-red-700"
          onClick={toggleMenu}
        />

        <div className="flex flex-col gap-y-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={`${item.link}`}
              className="text-white font-bold text-center relative group px-3"
              
            >
              {item.name}
              <span className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-red-900 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default NavPrimary;

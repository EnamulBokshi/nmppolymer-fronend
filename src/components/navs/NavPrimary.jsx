import React, { useState, useEffect } from "react";
import { BtnPrimary, LogoFull, SearchModal } from "..";
import { CiMenuFries } from "react-icons/ci";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Navigation items moved to constants
const NAV_ITEMS = [
  { name: "Home", link: "/" },
  { name: "Store", link: "/store" },
  { name: "About", link: "/about" },
  { name: "Contact", link: "/contact" },
  { name: "Products", link: "/products" },
  { name: "News", link: "/news" },
];

function NavPrimary({ className = "", searchOnClick }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [active, setActive] = useState("Home");
  const [showSearch, setShowSearch] = useState(false);

  // Navigation Link Component
  const NavLink = ({ item }) => (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        to={item.link}
        className={`${isSticky ? "" : "text-white"} 
          ${active === item.name ? "border-b border-red-900" : ""}
          font-bold text-center relative group px-3`}
      >
        {item.name}
        <motion.span
          className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-900"
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.2 }}
        />
      </Link>
    </motion.div>
  );

  // Desktop Navigation
  const DesktopNav = () => (
    <div className="hidden md:flex gap-4 items-center justify-center">
      {NAV_ITEMS.map((item, index) => (
        <NavLink key={index} item={item} />
      ))}
    </div>
  );

  // Mobile Navigation
  const MobileNav = () => (
    <AnimatePresence>
      {showMenu && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className="p-10 flex items-center justify-center absolute top-0 right-0 py-32 left-0 bg-black/90"
        >
          <motion.button
            whileHover={{ scale: 1.1, color: "#ef4444" }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMenu}
            className="text-3xl text-white rounded bg-slate-800 cursor-pointer absolute top-5 right-5"
          >
            <IoClose />
          </motion.button>

          <div className="flex flex-col gap-y-4">
            {NAV_ITEMS.map((item, index) => (
              <NavLink key={index} item={item} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const handleSearch = () => {
    setShowSearch((prev) => !prev);
    console.log("search clicked");
  };
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
    NAV_ITEMS.forEach((item) => {
      if (location.pathname === item.link) {
        setActive(item.name);
      }
    });
  }, [location]);

  const handleSearchClick = (id) => {
    navigate(`/product-details/${id}`);
    setShowSearch(false);
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`${className} md:px-20 px-5 items-center bg-transparent justify-between transition-all duration-500 ease-in-out ${
        isSticky
          ? "fixed top-0 w-full py-2 bg-white/40 backdrop-blur shadow-lg z-50"
          : "py-5 relative"
      }`}
    >
      <div className="flex gap-4 justify-between items-center">
        <img src={LogoFull} alt="Logo" className="w-16 rounded-full cursor-pointer" onClick={()=>navigate('/')}/>

        <DesktopNav />

        <div className="flex gap-4 items-center">
          <div className="md:hidden">
            {!showMenu && (
              <CiMenuFries
                className={`${
                  isSticky ? "" : "text-white"
                } text-3xl cursor-pointer`}
                onClick={toggleMenu}
              />
            )}
          </div>
          <FaSearch
            onClick={handleSearch}
            className="text-2xl text-red-600 hover:text-red-700 hover:scale-105 cursor-pointer"
          />
          <BtnPrimary>
            <FaShoppingCart className="inline me-3" />
            Shop Now
          </BtnPrimary>
        </div>
      </div>

      <MobileNav />

      <div></div>

      {showSearch && (
        <div className="absolute top-0 left-0 w-full h-screen bg-black/90 z-50 flex justify-center items-center">
          <div
            className="absolute text-3xl font-bold hover:text-red-600 top-10 right-10 text-white cursor-pointer"
            onClick={() => setShowSearch(false)}
          >
            X
          </div>
          <SearchModal callBack={handleSearchClick}/>
        </div>
      )}
    </motion.nav>
  );
}

export default NavPrimary;

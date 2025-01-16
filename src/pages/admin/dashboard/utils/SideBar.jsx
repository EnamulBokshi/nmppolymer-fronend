import React,{useEffect, useState}from 'react'
import { FaBars } from "react-icons/fa";
import { AiFillHome,AiFillProduct} from "react-icons/ai";
import { CiSettings } from 'react-icons/ci';
function SideBar({activeTab, setActiveTab}) {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };  
  return (
     <aside
          className={`bg-sky-700 p-2 text-white ${
            isSidebarOpen ? "w-52" : "w-16"
          } transition-width duration-300`}
        >
          <div className="flex justify-end p-2">
            <FaBars
              size={20}
              onClick={toggleSidebar}
              className="cursor-pointer"
            />
          </div>
          <nav className="mt-4">
            <ul className="duration-200 transition-transform">
              <li
                className={`flex items-center duration-200 transition-transform ease-in ${
                  !isSidebarOpen && "justify-center"
                } p-2 ${
                  activeTab == "home"
                    ? "bg-gray-200 text-sky-700"
                    : " text-white"
                } hover:text-sky-700 rounded-lg hover:bg-gray-200 font-bold cursor-pointer`}
                onClick={() => setActiveTab("home")}
              >
                <AiFillHome className="inline" size={20} />
                {isSidebarOpen && <span className="ms-2">Home</span>}
              </li>
              <li
                className={`flex items-center duration-200 transition-transform ease-in ${
                  !isSidebarOpen && "justify-center"
                } hover:text-sky-700 p-2 ${
                  activeTab == "post"
                    ? "bg-gray-200 text-sky-700"
                    : " text-white"
                } rounded-lg hover:bg-gray-200 font-bold cursor-pointer`}
                onClick={() => setActiveTab("post")}
              >
                <AiFillProduct className="inline" size={20} />
                {isSidebarOpen && <span className="ms-2">Posts</span>}
              </li>
              <li
                className={`flex items-center duration-200 transition-transform ease-in ${
                  !isSidebarOpen && "justify-center"
                } p-2 ${
                  activeTab == "settings"
                    ? "bg-gray-200 text-sky-700"
                    : " text-white"
                } rounded-lg hover:bg-gray-200 hover:text-sky-700 font-bold cursor-pointer`}
                onClick={() => setActiveTab("settings")}
              >
                <CiSettings className="inline" size={20} />
                {isSidebarOpen && <span className="ms-2">Settings</span>}
              </li>
            </ul>
          </nav>
        </aside>
  )
}

export default SideBar
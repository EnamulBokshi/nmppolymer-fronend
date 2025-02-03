import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle} from "react-icons/fa";
import Welcome from "./utils/Welcome";
import SideBar from "./utils/SideBar";
import Home from "./utils/Home";
import Posts from "./utils/Posts";
import Settings from "./utils/Settings";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addNotification, removeNotification, markAsRead, clearNotifications  } from "../../../components/store/notificationSlicer";
import DashboardHeader from "./utils/DashboardHeader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notification.notifications);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef(null);
  const [activeTab, setActiveTab] = useState("home");
  console.log(activeTab);
  console.log("Dashboard");
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setIsPopoverOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function LogOut(){
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div className="flex flex-col h-screen">
      {/* <header className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-md text-white relative">
        <div className="text-lg font-bold">MyLogo</div>
        <div className="flex items-center relative">
          <FaUserCircle
            size={30}
            onClick={togglePopover}
            className="cursor-pointer"
          />
          {isPopoverOpen && (
            <div
              ref={popoverRef}
              className="absolute right-0 top-10 w-48 bg-black/80 rounded-md shadow-lg z-10 transition-transform transform origin-top-right duration-300 ease-out"
              style={{
                animation: isPopoverOpen ? "fadeIn 0.3s" : "fadeOut 0.3s",
              }}
            >
              <ul className="py-1">
                <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">
                  Profile
                </li>
                <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer">
                  Settings
                </li>
                <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer" onClick={LogOut}>
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
        <div>Notification center</div>
      </header> */}
      <DashboardHeader />
      <div className="flex flex-1">
       
          <SideBar setActiveTab={setActiveTab} activeTab={activeTab}/>
        {/* Main Content Section */}
        <section className="flex-1 p-5 bg-gray-200">
          <Welcome />

          {/* Contents */}
          <div className="rounded-lg py-5 my-10  ">
            {
              activeTab == "home" && <Home />

            }
            {
              activeTab == "post" && <Posts />
              
            }
            {
              activeTab == "settings" && <Settings />
            }
          </div>
        </section>
      </div>

    </div>
  );
};

export default Dashboard;

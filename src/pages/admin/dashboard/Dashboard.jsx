import React, { useState, useEffect, useRef } from "react";
import Welcome from "./utils/Welcome";
import SideBar from "./utils/SideBar";
import Home from "./utils/Home";
import Posts from "./utils/Posts";
import Settings from "./utils/Settings";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addNotification, removeNotification, markAsRead, clearNotifications  } from "../../../components/store/notificationSlicer";
import DashboardHeader from "./utils/DashboardHeader";
import News from "./utils/News";
import Contacts from "./utils/Contacts";
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
              activeTab == "posts" && <Posts />
              
            }
            {
              activeTab == "settings" && <Settings />
            }
            {
              activeTab == "news" && <News />
            }
            {
              activeTab == "contact" && <Contacts />
            }
          </div>
        </section>
      </div>

    </div>
  );
};

export default Dashboard;

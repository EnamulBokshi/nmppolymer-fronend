import React,{useEffect, useState}from 'react'
import { FaBars } from "react-icons/fa";
import { AiFillHome,AiFillProduct} from "react-icons/ai";
import { CiSettings } from 'react-icons/ci';
import { TiNews } from "react-icons/ti";
import { RiContactsFill } from "react-icons/ri";
function SideBar({activeTab, setActiveTab}) {

  const sideBarItems = [
    {
      title: "Home",
      icon: <AiFillHome  className="inline" size={20} />,
      onClick: () => setActiveTab("home"),
    },
    {
      title: "Posts",
      icon: <AiFillProduct  className="inline" size={20} />,
      onClick: () => setActiveTab("posts"),
    },
    {
      title: "Contact",
      icon: <RiContactsFill  className="inline" size={20} />,
      onClick: () => setActiveTab("contact"),
    },
    {
      title:"News",
      icon: <TiNews  className="inline" size={20} />,
      onClick: () => setActiveTab("news"),
    },
    {
      title: "Settings",
      icon: <CiSettings  className="inline" size={20} />,
      onClick: () => setActiveTab("settings"),
    },

  ]

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
              {
                sideBarItems.map((item,index)=>
                  <li className={`flex items-center duration-200 transition-transform ease-in ${!isSidebarOpen && "justify-center"} p-2 ${activeTab == item.title.toLowerCase() ? "bg-gray-200 text-sky-700" : " text-white"} hover:text-sky-700 rounded-lg hover:bg-gray-200 font-bold cursor-pointer`} onClick={item.onClick} key={index}>
                    {item.icon}
                    {isSidebarOpen && <span className="ms-2">{item.title}</span>}
                  </li>

                )
              }
            </ul>
          </nav>
        </aside>
  )
}

export default SideBar

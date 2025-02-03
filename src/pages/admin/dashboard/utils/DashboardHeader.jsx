import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaBell } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addNotification,
  removeNotification,
  markAsRead,
  markAsReadAll,
  clearNotifications,
} from "../../../../components/store/notificationSlicer";

function Header({ LogOut }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
    // const [notifications, setNotifications] = useState([
    //   { id: 1, text: "New message from Admin", read: false },
    //   { id: 2, text: "Your order has been shipped", read: false },
    // ]);


  const notifications = useSelector(
    (state) => state.notification.notifications
  );
  const dispatch = useDispatch();
  const userMenuRef = useRef(null);
  const notifRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const toggleNotifications = () => setIsNotifOpen(!isNotifOpen);

  // Mark all notifications as read
  const markAllRead = () => {
    dispatch(markAsReadAll());
    // setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };
  const markAsRead = (id) => {
    dispatch(markAsRead(id));
    // setNotifications(
    //   notifications.map((notif) =>
    //     notif.id === id ? { ...notif, read: true } : notif
    //   )
    // );
  }
  const clearALl = ()=>{
    dispatch(clearNotifications());
  }

  return (
    <header className="flex items-center justify-between p-4 bg-black/80 backdrop-blur-md text-white shadow-md relative">
      {/* Logo */}
      <div className="text-lg font-bold tracking-wide">MyLogo</div>

      {/* Icons Section */}
      <div className="flex items-center gap-6 relative">
        {/* Notification Center */}
        <div className="relative cursor-pointer" ref={notifRef}>
          <FaBell size={24} onClick={toggleNotifications} />
          {/* Notification Badge */}
          {notifications.some((n) => !n.read) && (
            <span className="absolute -top-1 -right-2 bg-red-600 text-xs px-2 py-0.5 rounded-full animate-pulse">
              {notifications.filter((n) => !n.read).length}
            </span>
          )}

          {/* Notification Dropdown */}
          {isNotifOpen && (
            <div className="absolute right-0 top-10 w-64 bg-black/90 rounded-md shadow-lg z-10 transition-all transform origin-top-right duration-300 ease-out p-2">
              <div className="flex justify-between items-center px-3 py-2 border-b border-gray-700">
                <span className="font-semibold">Notifications</span>
                <button
                  className="text-xs text-gray-400 hover:text-white"
                  onClick={markAllRead}
                >
                  Mark all as read
                </button>
              </div>
              <ul className="max-h-60 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <li
                      key={notif.id}
                      className={`px-4 py-2 text-sm ${
                        notif.read ? "text-gray-400 bg-gray-200" : "text-white"
                      } hover:bg-gray-700 cursor-pointer`}
                    onClick={()=>markAsRead(notif.id)}
                    >
                      {notif.message}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-400 text-sm">
                    No new notifications
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative cursor-pointer" ref={userMenuRef}>
          <FaUserCircle size={30} onClick={toggleUserMenu} />

          {isUserMenuOpen && (
            <div className="absolute right-0 top-10 w-48 bg-black/90 rounded-md shadow-lg z-10 transition-all transform origin-top-right duration-300 ease-out">
              <ul className="py-1">
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                  Profile
                </li>
                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                  Settings
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-red-400"
                  onClick={LogOut}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

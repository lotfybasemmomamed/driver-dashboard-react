import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTh,
  faBell,
  faCog,
  faSignOutAlt,
  faChevronDown,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useWindowWidth } from "../../../context/WindowContext.jsx";
import { useState, useEffect, useRef } from "react";
import { useMenuBar } from "../../../context/MenuBarContext.jsx";
import { useNavigate } from "react-router";

function TopBar() {
  const { menuBar, setMenuBar } = useMenuBar();
  const navigate = useNavigate();

  const { windowWidth } = useWindowWidth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  // close dropp down when click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full bg-[#0e0ebe] z-[9999] fixed top-0 left-0 shadow-sm px-4 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div
          className={`flex justify-between items-center ${
            menuBar ? "w-[230px]" : "w-[50px]"
          } `}
        >
          {menuBar && windowWidth > 768 && (
            <div
              onClick={() => (window.location.pathname = "dashboard")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold shadow-md">
                B
              </span>
              <span className="text-lg font-bold text-white">Dashboard</span>
            </div>
          )}
          <button className="p-2 hover:bg-gray-100 rounded">
            <FontAwesomeIcon
              icon={faBars}
              className="text-gray-600"
              onClick={() => setMenuBar((prev) => !prev)}
            />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 relative">
        <button className="hover:text-blue-500">
          <FontAwesomeIcon icon={faTh} />
        </button>
        <button className="hover:text-blue-500 hidden md:block">
          <FontAwesomeIcon icon={faBell} />
        </button>
        <button className="hover:text-blue-500 hidden md:block">
          <FontAwesomeIcon icon={faCog} />
        </button>

        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          >
            <div className="w-9 h-9 rounded-full flex items-center justify-center bg-blue-100">
              <FontAwesomeIcon className=" text-2xl" icon={faUser} />
            </div>

            <div className="hidden sm:block leading-tight">
              <p className="text-sm text-white font-medium">lotfy basem</p>
              <p className="text-xs text-white">admin</p>
            </div>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`text-gray-500 transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>

          {open && (
            <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg py-1 z-20">
              <button
                disabled
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:enabled:bg-gray-100 disabled:text-gray-300"
              >
                Profile
              </button>
              <button
                disabled
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:enabled:bg-gray-100 disabled:text-gray-300"
              >
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
              >
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default TopBar;

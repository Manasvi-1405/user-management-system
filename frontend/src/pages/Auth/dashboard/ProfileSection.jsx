import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const ProfileSection = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const isSignoutPage = location.pathname === "/signout";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signout");
    setOpen(false);
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const user=JSON.parse(localStorage.getItem("currentUserData"))
  console.log("user",user)

  // 🔥 If Signout Page → Show Success UI
  if (isSignoutPage) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-2xl shadow-xl text-center w-96">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-4 rounded-full">
              <LogOut className="text-red-600" size={28} />
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-2">
            You have been signed out
          </h2>

          <p className="text-gray-500 mb-6">
            Thank you for using Lead Manager.
          </p>

          <button
            onClick={handleLoginRedirect}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  // 🔥 Normal Profile Dropdown
  return (
    <div className="relative" ref={menuRef}>
      {/* Top Profile Button */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 cursor-pointer"
      >
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-blue-600 font-semibold">s</span>
        </div>

        <div>
          <p className="font-semibold text-gray-800">{user.displayName}</p>
          <p className="text-sm text-gray-500">{user.role}</p>
        </div>

        <ChevronDown size={16} className="text-gray-500" />
      </div>

      {open && (
        <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
          <div className="px-5 py-4 border-b">
            <h3 className="font-semibold text-gray-900 text-lg">{user.displayName}</h3>
            <p className="text-gray-500 text-sm">{user.email}</p>
            <p className="text-gray-400 text-sm mt-1">{user.role}</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-5 py-4 text-red-600 hover:bg-red-50 transition"
          >
            <LogOut size={18} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;

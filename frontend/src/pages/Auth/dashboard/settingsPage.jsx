import { useState } from "react";
import { Eye, EyeOff, User } from "lucide-react";

const Settings = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10">
      
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">
          Manage your account preferences
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">

        {/* Profile Header */}
        <div className="flex items-center gap-2 px-6 py-4 border-b">
          <User size={20} className="text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-800">
            Profile Information
          </h2>
        </div>

        {/* Profile Form */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
             email="email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="text"
             
              className="w-full md:w-1/2 rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>

        {/* Divider */}
        <div className="border-t mx-6"></div>

        {/* Change Password Section */}
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Change Password
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Current Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <input
                type={showCurrent ? "text" : "password"}
                placeholder="Enter current password"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-[42px] text-gray-500"
              >
                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* New Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type={showNew ? "text" : "password"}
                placeholder="Enter new password"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-[42px] text-gray-500"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm new password"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-[42px] text-gray-500"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;

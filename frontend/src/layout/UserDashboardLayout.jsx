import {
  Codesandbox,
  House,
  CheckLine,
  CheckCheck,
  Settings,
  Twitch,
  PencilLine,
  FileChartColumn,
  Users,
  Target,
} from "lucide-react";
import React from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import Members from "../pages/Auth/dashboard/Members";
import Home from "../pages/Auth/dashboard/Home";
import ProfileSection from "../pages/Auth/dashboard/ProfileSection";


const UserDashboardLayout = () => {

  const navigate=useNavigate()

if (!localStorage.getItem("token")) {
  return <Navigate to="/login" replace />;
}

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white opacity-90 text-gray-900 flex flex-col">
        <div className="px-6 flex items-center gap-3 py-2 text-2xl font-bold border-b border-slate-200">
          <div className="h-10 w-10 bg-gray-500 rounded-full"></div>
          <p className="text-m mt-2 py-2">
            Manasvi <br />
            <span className="text-xs">Admin Panel</span>
          </p>
        </div>

        <nav className="flex-1 p-4">
          <ul className="flex flex-col">
            <Link
              to={"/"}
              className="cursor-pointer flex items-center gap-1 rounded-md w-full px-4 py-2 hover:bg-slate-100"
            >
              <House size={15} />
              Dashboard
            </Link>
            <Link
              to={"/all-leads"}
              className="cursor-pointer flex items-center gap-1 rounded-md px-4 py-2 hover:bg-slate-100"
            >
              <Target size={15} />
              Leads Details
            </Link>
            <Link
              to={"/attendance"}
              className="cursor-pointer flex items-center gap-1 rounded-md px-4 py-2 hover:bg-slate-100"
            >
              <FileChartColumn size={15} />
              Attendance
            </Link>
            <Link
              to={"/performance"}
              className="cursor-pointer flex items-center gap-1  rounded-md px-4 py-2 hover:bg-slate-100"
            >
              <CheckLine size={15} />
              Performance
            </Link>
            <Link
              to={"/members"}
              className="cursor-pointer flex items-center gap-1  rounded-md px-4 py-2 hover:bg-slate-100"
            >
              <Users size={15} />
              Members
            </Link>

            <Link
              to={"/design"}
              className="cursor-pointer flex items-center gap-1  rounded-md px-4 py-2 hover:bg-slate-100"
            >
              <Codesandbox size={15} />
              Design
            </Link>
          </ul>

          {/* //setting */}

          <div className="px-6 flex items-center gap-3 py-2 text-2xl font-semibold border-b border-slate-200">
            <div className="h-10 w-10 bg-gray-500 rounded-full"></div>
            <p className="text-xs mt-2 py-2">
              Manasvi <br />
              <span className="text-xs">Admin Panel</span>
            </p>
          </div>
        </nav>
      </aside>

      {/* Main Section */}
      <div className="flex flex-1 bg-gray-100 flex-col">
        {/* Navbar */}
        

        <header className="flex h-16 items-center justify-end px-6 shadow-sm bg-white">
          <ProfileSection />
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserDashboardLayout;

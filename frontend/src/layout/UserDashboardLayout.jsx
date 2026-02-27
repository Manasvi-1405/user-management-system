import {
  Codesandbox,
  House,
  CheckLine,
  Settings,
  FileChartColumn,
  Users,
  Target,
} from "lucide-react";

import { Link, Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import ProfileSection from "../pages/Auth/dashboard/ProfileSection";

// ================= MENU CONFIG =================
const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: House,
  },
  {
    name: "Leads Details",
    path: "/all-leads",
    icon: Target,
  },
  {
    name: "Attendance",
    path: "/attendance",
    icon: FileChartColumn,
  },
  {
    name: "Performance",
    path: "/performance",
    icon: CheckLine,
  },
  {
    name: "Members",
    path: "/members",
    icon: Users,
  },
  {
    name: "Design",
    path: "/design",
    icon: Codesandbox,
  },
  {
    name: "Attendance Management",
    icon: Codesandbox,
     adminOnly: true,
      sublinks: [
      { name: "Report", path: "/attendance-report" },
      { name: "Analytcs", path: "/atttendance-anlytics" },
    ],
  },
  {
    name: "HR Page",
    icon: Settings,
    adminOnly: true, // 🔐 Only Admin Can See
    sublinks: [
      { name: "Pending leaves", path: "/pending-leaves" },
      { name: "Manage Holidays", path: "/manage-holidays" },
      { name: "Generate Salary Slip", path: "/generate-salary-slip" },
      { name: "Payroll Summary", path: "/payroll-summary" },
      { name: "Salary Management", path: "/salary-management" },
    ],
  },
];
// =================================================

const UserDashboardLayout = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("currentUser");
const isAdmin = role === "admin";

  // If not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      
      {/* ================= Sidebar ================= */}
      <aside className="w-64 shrink-0 bg-white opacity-90 text-gray-900 flex flex-col">
        
        {/* Logo Section */}
        <div className="px-6 flex items-center gap-3 py-2 text-2xl font-bold border-b border-slate-200">
          <div className="h-10 w-10 bg-yellow-500 rounded-full"></div>
          <p className="text-m mt-2 py-2">
            CRM
            <br />
            <span className="text-xs"></span>
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="flex flex-col gap-1">

            {menuItems.map((item, index) => {

              // 🔐 Hide admin-only items for non-admin
              if (item.adminOnly && !isAdmin) {
                return null;
              }

              const Icon = item.icon;

              // ================== If Item Has Sublinks ==================
              if (item.sublinks) {
                return (
                  <li key={index}>
                    <div
                      onClick={() =>
                        setOpenMenu(openMenu === item.name ? null : item.name)
                      }
                      className="cursor-pointer flex items-center gap-2 rounded-md px-4 py-2 hover:bg-slate-100"
                    >
                      {Icon && <Icon size={15} />}
                      {item.name}
                    </div>

                    {openMenu === item.name && (
                      <ul className="ml-6 mt-1 flex flex-col gap-1">
                        {item.sublinks.map((sub, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              to={sub.path}
                              className="block text-sm px-4 py-2 rounded-md hover:bg-slate-100"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

              // ================== Normal Link ==================
              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="flex items-center gap-2 rounded-md px-4 py-2 hover:bg-slate-100"
                  >
                    {Icon && <Icon size={15} />}
                    {item.name}
                  </Link>
                </li>
              );
            })}

          </ul>
        </nav>
      </aside>

      {/* ================= Main Section ================= */}
      <div className="flex flex-1 min-w-0 bg-gray-100 flex-col">

        {/* Navbar */}
        <header className="flex h-16 items-center justify-end px-6 shadow-sm bg-white shrink-0">
          <ProfileSection />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default UserDashboardLayout;
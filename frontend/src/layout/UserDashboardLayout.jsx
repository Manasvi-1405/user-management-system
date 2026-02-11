import { Codesandbox, House, CheckLine , CheckCheck , Settings , PencilLine, FileChartColumn , Users } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import Members from "../pages/Auth/dashboard/Members"
import Home from "../pages/Auth/dashboard/Home";

const UserDashboardLayout = () => {
  return (
    <div className="flex h-screen bg-slate-100">

      {/* Sidebar */}
      <aside className="w-64 bg-black opacity-90 text-white flex flex-col">
        <div className="px-6 flex items-center gap-2 py-2 text-2xl font-bold border-b border-slate-700">
          <div className="h-10 w-10 bg-gray-500 rounded-full"></div>
          <p className="text-xs">Manasvi</p>
        </div>

        <nav className="flex-1 p-4">
          <ul className="flex flex-col">
            <Link to={"/"} className="cursor-pointer flex items-center gap-1 rounded-md w-full px-4 py-2 hover:bg-slate-800">
              <House size={15} />
              Dashboard
            </Link>
            <Link to={"/all-leads"} className="cursor-pointer flex items-center gap-1 rounded-md px-4 py-2 hover:bg-slate-800">
              <CheckCheck  size={15} />
              All Leads
            </Link>
            <Link to={"/attendance"} className="cursor-pointer flex items-center gap-1 rounded-md px-4 py-2 hover:bg-slate-800">
              <FileChartColumn  size={15} />
              Attendance
            </Link>
            <Link to={"/assign-leads"} className="cursor-pointer flex items-center gap-1  rounded-md px-4 py-2 hover:bg-slate-800">
              <CheckLine  size={15} />
              Assign Leads
            </Link>
            <Link to={"/members"} className="cursor-pointer flex items-center gap-1  rounded-md px-4 py-2 hover:bg-slate-800">
              <Users size={15} />
             Members
            </Link>

            <Link to={"/design"} className="cursor-pointer flex items-center gap-1  rounded-md px-4 py-2 hover:bg-slate-800">
              <Codesandbox size={15} />
              Design
            </Link>
          </ul>
          <div className="my-6 border-t py-2 border-b  border-gray-700 pl-4">
             manasvi
           
          </div>

          <ul className="pl-4 border-b border-gray-700  ">
            <Link to={"/settings"} className="cursor-pointer rounded-md flex gap-1 items-center  py-2 hover:bg-slate-800"><Settings />Settings</Link>
          </ul>
        </nav>
      </aside>

      {/* Main Section */}
      <div className="flex flex-1 bg-black flex-col">

        {/* Navbar */}
        <header className="flex h-16 items-center justify-between  px-6 shadow-sm">
          <span className=" font-bold text-2xl text-white">your Dashboard</span>
          <div className="flex gap-2">
            <input className="border-gray-700 border px-3 py-1 rounded-md outline-none placeholder-gray-400" placeholder="search"></input>

          </div>

        </header>

        
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
        



      </div>
    </div>
  );
};

export default UserDashboardLayout;











// import { Codesandbox, House, CheckLine , CheckCheck , Settings , PencilLine, FileChartColumn , Users } from "lucide-react";
// import React from "react";
// import { Link, Outlet } from "react-router-dom";
// import Members from "../pages/Auth/dashboard/Members"
// import Home from "../pages/Auth/dashboard/Home";

// const UserDashboardLayout = () => {
//   return (
//     <div className="flex h-screen bg-slate-100 overflow-hidden">

//       {/* Sidebar */}
//       <aside className="
//         w-64 
//         bg-black opacity-90 text-white 
//         flex flex-col
//         fixed md:static
//         h-full
//         z-40
//         -translate-x-full md:translate-x-0
//         transition-transform duration-300
//       ">

//         <div className="px-6 flex items-center gap-2 py-4 text-xl md:text-2xl font-bold border-b border-slate-700">
//           <div className="h-8 w-8 md:h-10 md:w-10 bg-gray-500 rounded-full"></div>
//           <p className="text-xs md:text-sm">Manasvi</p>
//         </div>

//         <nav className="flex-1 p-4 text-sm md:text-base">
//           <ul className="flex flex-col gap-2">

//             <Link to={"/"} className="flex items-center gap-2 rounded-md w-full px-4 py-2 hover:bg-slate-800">
//               <House size={16} />
//               Dashboard
//             </Link>

//             <Link to={"/all-leads"} className="flex items-center gap-2 rounded-md px-4 py-2 hover:bg-slate-800">
//               <CheckCheck size={16} />
//               All Leads
//             </Link>

//             <Link to={"/attendance"} className="flex items-center gap-2 rounded-md px-4 py-2 hover:bg-slate-800">
//               <FileChartColumn size={16} />
//               Attendance
//             </Link>

//             <Link to={"/assign-leads"} className="flex items-center gap-2 rounded-md px-4 py-2 hover:bg-slate-800">
//               <CheckLine size={16} />
//               Assign Leads
//             </Link>

//             <Link to={"/members"} className="flex items-center gap-2 rounded-md px-4 py-2 hover:bg-slate-800">
//               <Users size={16} />
//               Members
//             </Link>

//             <Link to={"/design"} className="flex items-center gap-2 rounded-md px-4 py-2 hover:bg-slate-800">
//               <Codesandbox size={16} />
//               Design
//             </Link>
//           </ul>

//           <div className="my-6 border-t py-2 border-b border-gray-700 pl-4 text-xs md:text-sm">
//             manasvi
//           </div>

//           <ul className="pl-4 border-b border-gray-700">
//             <Link to={"/settings"} className="rounded-md flex gap-2 items-center py-2 hover:bg-slate-800">
//               <Settings size={16} />
//               Settings
//             </Link>
//           </ul>
//         </nav>
//       </aside>

//       {/* Main Section */}
//       <div className="flex flex-1 bg-black flex-col md:ml-0">

//         {/* Navbar */}
//         <header className="flex h-16 items-center justify-between px-4 md:px-6 shadow-sm">
//           <span className="font-bold text-lg md:text-2xl text-white">
//             your Dashboard
//           </span>

//           <div className="hidden sm:flex gap-2">
//             <input 
//               className="border-gray-700 border px-3 py-1 rounded-md outline-none placeholder-gray-400 text-sm md:text-base"
//               placeholder="search"
//             />
//           </div>
//         </header>

//         <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-100">
//           <Outlet />
//         </main>

//       </div>
//     </div>
//   );
// };

// export default UserDashboardLayout;

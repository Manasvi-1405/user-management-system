import React, { useEffect } from "react";
import Members from "./Members";
import Design from "./Design";
import { Plus ,CircleX } from "lucide-react";
import {
  ChartNoAxesColumn,
  UserRoundSearch,
  Target,
  DollarSign,
  ChartLine,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux-store/user-reducers/userSlice";
import { Search } from "lucide-react";

import { getMyLeadsStats } from "../../../redux-store/leads/leadsSlice";
import { getUserAnalytics } from "../../../redux-store/performance/performanceSlice";

// import { getLeads } from "../../../redux-store/leads/leadsSlice";

const Home = () => {
  const dispatch = useDispatch();

  const { overAllLeads } = useSelector((state) => state.leads);
  console.log("overAllLeads");
  console.log(overAllLeads);
  const { users } = useSelector((state) => state.users);

  console.log("users");
  console.log(users);

  const { userAnalytic } = useSelector((state) => state.performance);
  console.log(" userAnalytic", userAnalytic);



  useEffect(() => {
    dispatch(getUserAnalytics())
      .unwrap()
      .then((res) => {
        console.log("getUserAnalytics", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUsers())
      .unwrap()
      .then((res) => {
        console.log("res");
        console.log(res);
      })
      .catch((er) => {
        console.log("er");
        console.log(er);
      });
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dispatch(getMyLeadsStats()).unwrap();
        console.log("SUCCESS:", res);
      } catch (err) {
        console.log("FAILED:", err); // 👈 ab ye print hoga
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="flex flex-col bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 gap-6 p-6">

  {/* Welcome Card */}
  <div className="flex justify-between items-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl shadow-lg px-6 py-8">
    <div>
      <h1 className="font-bold text-3xl">
        Welcome back, {userAnalytic.userDetails?.name} 👋
      </h1>
      <p className="text-sm opacity-90">
        Manage your lead pipeline and team performance
      </p>
    </div>

    <div className="text-right">
      <p className="flex items-center justify-end text-sm">
        Last updated
        <span className="h-2 w-2 ml-2 bg-green-400 rounded-full animate-pulse"></span>
      </p>
      <p className="text-xs opacity-80">2/11/2026, 11:47:07 PM</p>
    </div>
  </div>

  {/* Stats Cards */}
  <div className="flex justify-between items-center gap-6">

    {/* Total Leads */}
    <div className="flex flex-col gap-3 w-64 bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-5 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
      <p className="text-lg font-medium opacity-90">Total Leads</p>
      <p className="text-3xl font-bold">{overAllLeads.total}</p>
      <Plus size={30} className="opacity-80 bg-blue-900 rounded-md" />
    </div>

    {/* In Progress */}
    <div className="flex flex-col gap-3 w-64 bg-gradient-to-br from-orange-400 to-pink-500 text-white p-5 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
      <p className="text-lg font-medium opacity-90">In Progress</p>
      <p className="text-3xl font-bold">{overAllLeads.inProgress}</p>
      <Target size={30} className="opacity-80 bg-orange-900 rounded-md" />
    </div>

    {/* Closed Leads */}
    <div className="flex flex-col gap-3 w-64 bg-gradient-to-br from-green-400 to-emerald-600 text-white p-5 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
      <p className="text-lg font-medium opacity-90">Closed Leads</p>
      <p className="text-3xl font-bold">{overAllLeads.closed}</p>
      <CircleX size={30} className="opacity-80 bg-emerald-900 rounded-md" />
    </div>

    {/* New Leads */}
    <div className="flex flex-col gap-3 w-64 bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-5 rounded-2xl shadow-lg hover:scale-105 transition duration-300">
      <p className="text-lg font-medium opacity-90">New Leads</p>
      <p className="text-3xl font-bold">{overAllLeads.newLeads}</p>
      <Plus size={30} className="opacity-80 bg-indigo-900  rounded-md" />
    </div>

  </div>

  {/* Team Section */}
  <div className="rounded-2xl shadow-xl bg-white p-6">

    <h2 className="text-2xl font-bold text-gray-800 mb-1">
      All Team Members
    </h2>
    <p className="text-gray-500 text-sm mb-6">
      Team Members Details
    </p>

    {/* Search */}
    <div className="flex items-center bg-gray-100 px-4 py-2 rounded-xl mb-6 focus-within:ring-2 ring-indigo-400 transition">
      <Search className="w-4 h-4 mr-2 text-gray-500" />
      <input
        type="text"
        placeholder="Search members"
        className="bg-transparent outline-none text-sm w-full placeholder-gray-500"
      />
    </div>

    {/* Table Header */}
    <div className="grid grid-cols-6 text-sm font-semibold text-indigo-600 border-b pb-3">
      <p>Member</p>
      <p>Status</p>
      <p>Enrolled</p>
      <p>Role</p>
      <p>Mode</p>
      <p>Last Login</p>
    </div>

    {/* Members List */}
    <div className="mt-4 space-y-3">
      {users &&
        users.map((user) => (
          <div
            key={user._id}
            className="grid grid-cols-6 items-center bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl hover:shadow-md hover:scale-[1.01] transition duration-300"
          >
            <div>
              <p className="font-semibold text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>

            <div>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  user.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {user.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="text-sm text-gray-600">
              {new Date(user.createdAt).toLocaleDateString()}
            </div>

            <div className="text-sm text-gray-600">
              {user.role === "admin" ? "Admin Access" : "Standard User"}
            </div>

            <div className="text-sm text-gray-600">
              {user.canWorkFromHome ? "WFH" : "Office"}
            </div>

            <div className="text-sm text-gray-600">
              {user.lastLogin
                ? new Date(user.lastLogin).toLocaleDateString()
                : "—"}
            </div>
          </div>
        ))}
    </div>
  </div>
</div>
  );
};

export default Home;

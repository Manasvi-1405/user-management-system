import React, { useEffect } from "react";
import { getAdminStates, getMyLeadsStats } from "../../../redux-store/leads/leadsSlice";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  CalendarDays,
  CalendarRange,
  Calendar,
  TrendingUp,
} from "lucide-react";

const AllLeads = () => {
  const dispatch = useDispatch();

  const { myLeads,adminStates } = useSelector((state) => state.leads); // logged in user



console.log("adminStates")
console.log(adminStates)

useEffect(() => {
  const role = localStorage.getItem("currentUser");
  if (!role) return;

  if (role === "admin") {
   dispatch(getAdminStates())
  .unwrap()
  .then((res) => {
    console.log("res", res);
  })
  .catch((er) => {
    console.log("er", er);
  });

  } else {
    dispatch(getMyLeadsStats());
  }
}, [dispatch]);




if(Array.isArray(myLeads)){
 return (
  <div className="p-">
    <h1 className="text-xl font-bold mb-3">Your Leads</h1>

    <div className="overflow-x-auto bg-white shadow-md rounded-xl">
      <table className="min-w-full text-sm text-left">
        <thead className=" text-gray-700 uppercase text-xs">
          <tr>
            <th className="px-6 py-3">Lead</th>
            <th className="px-6 py-3">Phone</th>
            <th className="px-6 py-3">Position</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Priority</th>
            <th className="px-6 py-3">Score</th>
            <th className="px-6 py-3">Assigned By</th>
            <th className="px-6 py-3">Created</th>
          </tr>
        </thead>

        <tbody>
          {myLeads?.map((lead) => (
            <tr
              key={lead._id}
              className="border-b hover:bg-gray-50 transition"
            >
              {/* Name + Email */}
              <td className="px-6 py-4">
                <p className="font-semibold text-gray-800">
                  {lead.name}
                </p>
                <p className="text-xs text-gray-500">
                  {lead.email}
                </p>
              </td>

              {/* Phone */}
              <td className="px-6 py-4">{lead.phone}</td>

              {/* Position */}
              <td className="px-6 py-4">
                {lead.position || "—"}
              </td>

              {/* Status */}
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    lead.status === "New"
                      ? "bg-blue-100 text-blue-700"
                      : lead.status === "DNP"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {lead.status}
                </span>
              </td>

              {/* Priority */}
              <td className="px-6 py-4">
                <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                  {lead.priority}
                </span>
              </td>

              {/* Score */}
              <td className="px-6 py-4 font-semibold">
                {lead.leadScore}
              </td>

              {/* Assigned By */}
              <td className="px-6 py-4 text-sm text-gray-600">
                {lead.assignedByUser?.name}
              </td>

              {/* Created */}
              <td className="px-6 py-4 text-xs text-gray-500">
                {new Date(lead.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}

if (adminStates) {
  const { summary, trend } = adminStates;

  return (
    <div className=" bg-gray-100 min-h-screen space-y-8">

      {/* 🔥 Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
         Lead performance overview
        </h1>
      </div>

      {/* 🔥 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Today */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Today</p>
              <h2 className="text-3xl font-bold text-gray-800">
                {summary.today}
              </h2>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <CalendarDays className="text-blue-600" />
            </div>
          </div>
        </div>

        {/* This Week */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">This Week</p>
              <h2 className="text-3xl font-bold text-gray-800">
                {summary.thisWeek}
              </h2>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CalendarRange className="text-green-600" />
            </div>
          </div>
        </div>

        {/* This Month */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">This Month</p>
              <h2 className="text-3xl font-bold text-gray-800">
                {summary.thisMonth}
              </h2>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Calendar className="text-purple-600" />
            </div>
          </div>
        </div>

        {/* This Year */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">This Year</p>
              <h2 className="text-3xl font-bold text-gray-800">
                {summary.thisYear}
              </h2>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <TrendingUp className="text-orange-600" />
            </div>
          </div>
        </div>

      </div>

      {/* 🔥 Trend Section */}
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Lead Trend (Last Days)
        </h2>

        <div className="space-y-4">
          {trend.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
                <p className="text-gray-700 font-medium">
                  {item.formattedDate}
                </p>
              </div>

              <div className="text-lg font-bold text-gray-800">
                {item.count} Leads
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}




};

export default AllLeads;

import React, { useEffect, useState } from "react";
import { getAdminStates, getMyLeadsStats } from "../../../redux-store/leads/leadsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  CalendarDays,
  CalendarRange,
  Calendar,
  TrendingUp,
} from "lucide-react";

const AllLeads = () => {
  const dispatch = useDispatch();
  const [role, setRole] = useState(null);

  const { myLeads, adminStates, loading } = useSelector(
    (state) => state.leads
  );

  useEffect(() => {
    const storedRole = localStorage.getItem("currentUser");
    if (!storedRole) return;

    setRole(storedRole);

    if (storedRole === "admin") {
      dispatch(getAdminStates());
    } else {
      dispatch(getMyLeadsStats());
    }
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100">
        <p className="text-indigo-600 text-xl font-semibold animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  if (role !== "admin") {
    if (!Array.isArray(myLeads) || myLeads.length === 0) {
      return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100">
          <p className="text-gray-600 text-lg font-medium">
            No Data Found
          </p>
        </div>
      );
    }

    return (
      <div className="p-8 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Your Leads
        </h1>

        <div className="overflow-x-auto bg-white/70 backdrop-blur-lg shadow-2xl rounded-3xl border border-indigo-100">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4">Lead</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Position</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Score</th>
                <th className="px-6 py-4">Assigned By</th>
                <th className="px-6 py-4">Created</th>
              </tr>
            </thead>

            <tbody>
              {myLeads.map((lead) => (
                <tr
                  key={lead._id}
                  className="border-b hover:bg-indigo-50 transition-all duration-300 hover:scale-[1.01]"
                >
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-800">
                      {lead.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {lead.email}
                    </p>
                  </td>
                  <td className="px-6 py-4">{lead.phone}</td>
                  <td className="px-6 py-4">{lead.position || "—"}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs rounded-full bg-pink-100 text-pink-700">
                      {lead.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-indigo-600">
                    {lead.leadScore}
                  </td>
                  <td className="px-6 py-4">
                    {lead.assignedByUser?.name || "-"}
                  </td>
                  <td className="px-6 py-4">
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

  const summary = adminStates?.summary || {};
  const trend = adminStates?.trend || [];

  if (!adminStates?.summary) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100">
        <p className="text-indigo-600 text-lg animate-pulse">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8 space-y-10">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Lead Performance Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <DashboardCard title="Today" value={summary.today || 0} icon={<CalendarDays />} />
        <DashboardCard title="This Week" value={summary.thisWeek || 0} icon={<CalendarRange />} />
        <DashboardCard title="This Month" value={summary.thisMonth || 0} icon={<Calendar />} />
        <DashboardCard title="This Year" value={summary.thisYear || 0} icon={<TrendingUp />} />
      </div>

      <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-indigo-100">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-600">
          Lead Trend (Last Days)
        </h2>

        {trend.length === 0 ? (
          <p className="text-gray-500">No trend data</p>
        ) : (
          trend.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl mb-3 hover:shadow-md hover:scale-[1.02] transition-all duration-300"
            >
              <p className="text-gray-700 font-medium">
                {item.formattedDate}
              </p>
              <p className="font-bold text-indigo-600">
                {item.count} Leads
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl p-6 flex justify-between items-center border border-indigo-100 hover:scale-105 hover:shadow-2xl transition-all duration-300">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-3xl font-bold text-indigo-600">
          {value}
        </h2>
      </div>
      <div className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white p-4 rounded-full shadow-lg">
        {icon}
      </div>
    </div>
  );
};

export default AllLeads;
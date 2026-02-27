import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../../redux-store/user-reducers/userSlice";
import {
  getAnalytics,
  report,
} from "../../../../redux-store/attendance-reducers/attendanceManagement";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Users,
  Clock,
  LogOut,
  CalendarCheck,
  CalendarX,
  TrendingUp,
  ChevronRight,
  Search,
  Filter,
  Download,
  MoreVertical,
  UserCircle,
  Mail,
  Briefcase,
  Activity,
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

const Analytics = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { analyticsData } = useSelector((state) => state.adminAttendance);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    dispatch(getAnalytics(user._id));
  };

  const stats = analyticsData?.stats;

  // Enhanced Bar Chart Data
  const barChartData = {
    labels: ["Working Hours", "Auto Logout"],
    datasets: [
      {
        label: "Hours",
        data: [stats?.totalWorkingHours || 0, stats?.autoLogoutHours || 0],
        backgroundColor: ["#6366F1", "#F59E0B"],
        borderRadius: 12,
        barPercentage: 0.6,
        categoryPercentage: 0.8,
      },
    ],
  };

  // Doughnut Chart Data
  const doughnutData = {
    labels: ["Days Present", "Days Absent"],
    datasets: [
      {
        data: [stats?.totalDaysPresent || 0, stats?.totalDaysNotPresent || 0],
        backgroundColor: ["#10B981", "#EF4444"],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  // Weekly Trend Data (sample - replace with actual data)
  const weeklyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Hours Worked",
        data: [8, 7.5, 8.5, 8, 7, 0, 0],
        borderColor: "#6366F1",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#6366F1",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1F2937",
        titleColor: "#F9FAFB",
        bodyColor: "#D1D5DB",
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#E5E7EB",
          drawBorder: false,
        },
        ticks: {
          stepSize: 2,
          callback: (value) => value + "h",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1F2937",
        callbacks: {
          label: (context) => `${context.raw} days`,
        },
      },
    },
  };

  const filteredUsers = users?.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    dispatch(report())
      .unwrap()
      .then((res) => {
        console.log("report res");
        console.log(res);
      })
      .catch((er) => {
        console.log("report err");
        console.log(er);
      });
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 ">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Attendance Analytics
              </h1>
              <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
                <Activity size={16} className="text-indigo-400" />
                Real-time employee attendance insights and metrics
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-xl transition-all">
                <Download size={20} className="text-gray-600" />
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2">
                <Filter size={18} />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Selected User Analytics */}
        {analyticsData && selectedUser && (
          <div className="space-y-8 mb-8">
            {/* User Profile Header */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {selectedUser.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedUser.name}
                  </h2>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Mail size={14} />
                      {selectedUser.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase size={14} />
                      <span className="capitalize">{selectedUser.role}</span>
                    </span>
                  </div>
                </div>
                <div
                  className={`px-4 py-2 rounded-xl ${
                    selectedUser.isActive
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-600"
                  } font-medium`}
                >
                  {selectedUser.isActive ? "Active" : "Inactive"}
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Working Hours</p>
                    <h2 className="text-3xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                      {stats?.totalWorkingHours || 0}
                      <span className="text-sm font-normal text-gray-400 ml-1">
                        hrs
                      </span>
                    </h2>
                  </div>
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                    <Clock className="text-indigo-600" size={24} />
                  </div>
                </div>
                <div className="mt-4 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full inline-flex items-center gap-1">
                  <TrendingUp size={12} />
                  <span>+12% from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Auto Logout</p>
                    <h2 className="text-3xl font-bold text-gray-800 group-hover:text-amber-600 transition-colors">
                      {stats?.autoLogoutHours || 0}
                      <span className="text-sm font-normal text-gray-400 ml-1">
                        hrs
                      </span>
                    </h2>
                  </div>
                  <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                    <LogOut className="text-amber-600" size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Days Present</p>
                    <h2 className="text-3xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                      {stats?.totalDaysPresent || 0}
                      <span className="text-sm font-normal text-gray-400 ml-1">
                        days
                      </span>
                    </h2>
                  </div>
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                    <CalendarCheck className="text-emerald-600" size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Days Absent</p>
                    <h2 className="text-3xl font-bold text-gray-800 group-hover:text-red-600 transition-colors">
                      {stats?.totalDaysNotPresent || 0}
                      <span className="text-sm font-normal text-gray-400 ml-1">
                        days
                      </span>
                    </h2>
                  </div>
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-red-100 transition-colors">
                    <CalendarX className="text-red-600" size={24} />
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bar Chart */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-gray-800">
                    Hours Overview
                  </h3>
                  <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                    Last 30 days
                  </span>
                </div>
                <div className="h-64">
                  <Bar data={barChartData} options={chartOptions} />
                </div>
              </div>

              {/* Doughnut Chart */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-gray-800">
                    Attendance Ratio
                  </h3>
                </div>
                <div className="flex items-center gap-8">
                  <div className="relative h-48 w-48">
                    <Doughnut data={doughnutData} options={doughnutOptions} />
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-3xl font-bold text-gray-800">
                        {stats?.totalDaysPresent || 0}
                      </span>
                      <span className="text-xs text-gray-400">Total Days</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Present</span>
                      </div>
                      <span className="font-semibold">
                        {stats?.totalDaysPresent || 0} days
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Absent</span>
                      </div>
                      <span className="font-semibold">
                        {stats?.totalDaysNotPresent || 0} days
                      </span>
                    </div>
                    <div className="pt-3 border-t">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Attendance Rate</span>
                        <span className="font-bold text-emerald-600">
                          {Math.round(
                            (stats?.totalDaysPresent /
                              (stats?.totalDaysPresent +
                                stats?.totalDaysNotPresent || 1)) *
                              100
                          )}
                          %
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Trend */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-gray-800">Weekly Trend</h3>
                  <select className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                    <option>This Week</option>
                    <option>Last Week</option>
                    <option>This Month</option>
                  </select>
                </div>
                <div className="h-80">
                  <Line data={weeklyData} options={chartOptions} />
                </div>
              </div>
            </div>

            {/* Attendance History */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">
                    Recent Attendance History
                  </h3>
                  <button className="text-indigo-600 text-sm hover:text-indigo-700 flex items-center gap-1">
                    View All <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Hours
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sessions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {analyticsData?.attendanceHistory?.length > 0 ? (
                      analyticsData.attendanceHistory.map((day, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900">
                              {day.date}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium">
                              {day.dayTotal} hrs
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-2">
                              {day.sessions.map((s, i) => (
                                <div
                                  key={i}
                                  className="px-3 py-1 bg-gray-100 rounded-lg text-xs text-gray-600"
                                >
                                  {s.checkIn} - {s.checkOut}{" "}
                                  <span className="font-medium text-indigo-600">
                                    ({s.hours}h)
                                  </span>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <CalendarX className="text-gray-300" size={48} />
                            <p className="text-gray-400">
                              No attendance records found
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Employees Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">
                  Employee Directory
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Click on any employee to view analytics
                </p>
              </div>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm">
                {filteredUsers?.length || 0} employees
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers?.map((user) => (
                  <tr
                    key={user._id}
                    onClick={() => handleUserClick(user)}
                    className={`hover:bg-indigo-50/30 cursor-pointer transition-colors group ${
                      selectedUser?._id === user._id ? "bg-indigo-50/50" : ""
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm shadow-md group-hover:shadow-lg transition-shadow">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs capitalize font-medium">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.isActive
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical size={16} className="text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

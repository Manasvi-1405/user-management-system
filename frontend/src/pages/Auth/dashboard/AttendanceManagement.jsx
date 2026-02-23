// import React from 'react'

// const AttendanceManagement = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default AttendanceManagement

import React, { useState } from "react";
import {
  Users,
  UserCheck,
  XCircle,
} from "lucide-react";

const AttendanceManagement = () => {
  const today = new Date().toISOString().split("T")[0];

  // 🔥 Dummy Summary Data
  const summary = {
    totalEmployees: 25,
    presentToday: 18,
    absentToday: 7,
  };

  // 🔥 Dummy Attendance Records
  const records = [
    {
      userId: "1",
      userName: "Rahul Sharma",
      status: "Present",
      firstSession: { checkIn: "2026-02-23T09:05:00" },
      lastCheckOut: "2026-02-23T18:10:00",
      totalWorkHours: 8,
      displayDate: today,
    },
    {
      userId: "2",
      userName: "Priya Singh",
      status: "Late",
      firstSession: { checkIn: "2026-02-23T10:15:00" },
      lastCheckOut: "2026-02-23T18:00:00",
      totalWorkHours: 7,
      displayDate: today,
    },
    {
      userId: "3",
      userName: "Amit Verma",
      status: "Absent",
      firstSession: {},
      lastCheckOut: null,
      totalWorkHours: 0,
      displayDate: today,
    },
  ];

  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const formatTime = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (record) => {
    if (record.status === "Present") {
      return (
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
          Present
        </span>
      );
    }
    if (record.status === "Late") {
      return (
        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
          Late
        </span>
      );
    }
    return (
      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
        Absent
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">
        Attendance Management
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard
          title="Total Employees"
          value={summary.totalEmployees}
          icon={Users}
        />
        <StatCard
          title="Present Today"
          value={summary.presentToday}
          icon={UserCheck}
        />
        <StatCard
          title="Absent"
          value={summary.absentToday}
          icon={XCircle}
        />
      </div>

      {/* Attendance Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Employee</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Check In</th>
              <th className="p-3 text-left">Check Out</th>
              <th className="p-3 text-left">Hours</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50">
                <td
                  className="p-3 cursor-pointer text-blue-600"
                  onClick={() =>
                    setSelectedEmployeeId(record.userId)
                  }
                >
                  {record.userName}
                </td>
                <td className="p-3">
                  {getStatusBadge(record)}
                </td>
                <td className="p-3">
                  {formatTime(record.firstSession?.checkIn)}
                </td>
                <td className="p-3">
                  {formatTime(record.lastCheckOut)}
                </td>
                <td className="p-3">
                  {record.totalWorkHours}h
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Drawer */}
      {selectedEmployeeId && (
        <EmployeeReportDrawer
          userId={selectedEmployeeId}
          onClose={() => setSelectedEmployeeId(null)}
        />
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
      <Icon size={24} />
    </div>
  );
};

export default AttendanceManagement;
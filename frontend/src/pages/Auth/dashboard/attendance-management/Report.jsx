import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReport } from "../../../../redux-store/attendance-reducers/attendanceManagement";
import {
  Calendar,
  Filter,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

const Report = () => {
  const dispatch = useDispatch();
  const { history } = useSelector((state) => state.adminAttendance);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [entries, setEntries] = useState(5);

  useEffect(() => {
    dispatch(getReport());
  }, [dispatch]);

  if (!history) return null;

  /* ================= RATE CALCULATIONS ================= */

  const totalEmployees = history?.summary?.totalEmployees || 1;
  const presentToday = history?.summary?.presentToday || 0;
  const lateToday = history?.summary?.lateToday || 0;
  const absentToday = history?.summary?.absentToday || 0;

  const attendanceRate = ((presentToday / totalEmployees) * 100).toFixed(1);
  const onTimeRate = (
    ((presentToday - lateToday) / totalEmployees) *
    100
  ).toFixed(1);
  const absentRate = ((absentToday / totalEmployees) * 100).toFixed(1);

  /* ================= FILTER LOGIC ================= */

  const filteredReport = useMemo(() => {
    if (!history.report) return {};

    let filtered = Object.entries(history.report);

    if (fromDate) {
      filtered = filtered.filter(([date]) => date >= fromDate);
    }
    if (toDate) {
      filtered = filtered.filter(([date]) => date <= toDate);
    }

    return Object.fromEntries(filtered);
  }, [history.report, fromDate, toDate]);

  /* ================= RENDER ================= */

  return (
    <div className="space-y-8">
      {/* ================= FILTER SECTION ================= */}
      <div className="bg-white p-5 rounded-xl shadow-sm space-y-4">
        <div className="flex items-center gap-2 font-semibold text-gray-700">
          <Filter size={18} />
          Filters
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm text-gray-500">From Date</label>
            <input
              type="date"
              className="w-full border rounded-lg p-2 mt-1"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">To Date</label>
            <input
              type="date"
              className="w-full border rounded-lg p-2 mt-1"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Show</label>
            <select
              className="w-full border rounded-lg p-2 mt-1"
              value={entries}
              onChange={(e) => setEntries(Number(e.target.value))}
            >
              <option value={5}>5 entries</option>
              <option value={10}>10 entries</option>
              <option value={20}>20 entries</option>
            </select>
          </div>
        </div>
      </div>

      {/* ================= RATE CARDS ================= */}
      <div className="grid md:grid-cols-3 gap-4">
        <RateCard
          title="Attendance Rate"
          value={`${attendanceRate}%`}
          color="green"
          icon={<CheckCircle size={18} />}
        />
        <RateCard
          title="On-Time Rate"
          value={`${onTimeRate}%`}
          color="blue"
          icon={<Clock size={18} />}
        />
        <RateCard
          title="Absent Rate"
          value={`${absentRate}%`}
          color="red"
          icon={<XCircle size={18} />}
        />
      </div>

      {/* ================= DATE GROUPED REPORT ================= */}
      {Object.entries(filteredReport).map(([date, users]) => (
        <div key={date} className="space-y-4">
          {/* DATE HEADER */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-purple-600 text-white p-2 rounded-lg">
                <Calendar size={18} />
              </div>
              <div>
                <h2 className="font-semibold text-lg">{date}</h2>
                <p className="text-sm text-gray-500">
                  {users.length} records
                </p>
              </div>
            </div>

            <button className="border px-3 py-1 rounded-lg text-sm hover:bg-gray-100">
              Show All ({users.length})
            </button>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-4 py-3 text-left">Employee</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Check In</th>
                  <th className="px-4 py-3 text-left">Check Out</th>
                  <th className="px-4 py-3 text-left">Hours</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.slice(0, entries).map((user) => (
                  <tr key={user.userId} className="border-t">
                    {/* EMPLOYEE */}
                    <td className="px-4 py-3 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-semibold">
                        {user.userName?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{user.userName}</p>
                        <p className="text-xs text-gray-500">
                          {user.userEmail}
                        </p>
                      </div>
                    </td>

                    {/* STATUS */}
                    <td className="px-4 py-3">
                      <StatusBadge status={user.status} />
                    </td>

                    {/* CHECK IN */}
                    <td className="px-4 py-3">
                      {user.checkIn || "-"}
                    </td>

                    {/* CHECK OUT */}
                    <td className="px-4 py-3">
                      {user.lastCheckOut || "-"}
                    </td>

                    {/* HOURS */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span>{user.totalWorkHours || 0}h</span>
                        <div className="h-2 w-24 bg-gray-200 rounded">
                          <div
                            className="h-2 bg-blue-600 rounded"
                            style={{
                              width: `${
                                (user.totalWorkHours / 8) * 100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* ACTION */}
                    <td className="px-4 py-3">
                      <Eye
                        size={18}
                        className="text-gray-500 cursor-pointer hover:text-black"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const RateCard = ({ title, value, color, icon }) => {
  const colorMap = {
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    red: "bg-red-100 text-red-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
      <div className={`p-2 rounded-lg ${colorMap[color]}`}>
        {icon}
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  if (status === "Present")
    return (
      <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
        Active
      </span>
    );

  if (status === "Auto Logout")
    return (
      <span className="px-3 py-1 text-xs rounded-full bg-orange-100 text-orange-700">
        Auto Logout
      </span>
    );

  return (
    <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700">
      Absent
    </span>
  );
};

export default Report;
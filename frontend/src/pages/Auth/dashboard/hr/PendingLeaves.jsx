"use client";

import React, { useEffect } from "react";
import { getPendingLeaves, updatedLeaves } from "../../../../redux-store/hr-management/leavesSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function PendingLeavesTable() {
  const dispatch = useDispatch();

  const { pendingLeaves, isLoading } = useSelector(
    (state) => state.leavesSlice
  );

  useEffect(() => {
    dispatch(getPendingLeaves())
      .unwrap()
      .then((res) => {
        console.log("getPendingLeaves", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [dispatch]);

  function handleApprove(leave) {
    const payload = {
      currentPendingLeaveId: leave._id,
      status: "Approved",
    };

    dispatch(updatedLeaves(payload))
      .unwrap()
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
        }
      })
      .catch((er) => {
        console.log("er", er);
      });
  }

  function handleReject(leave) {
    const payload = {
      currentPendingLeaveId: leave._id,
      status: "Rejected",
    };

    dispatch(updatedLeaves(payload))
      .unwrap()
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
        }
      })
      .catch((er) => {
        console.log("er", er);
      });
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold bg-linear-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Pending Leave Requests
        </h1>
        <p className="text-gray-600 mt-1">
          Review and manage employee leave applications
        </p>
      </div>

      {/* Table Container */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            
            {/* Table Head */}
            <thead className="bg-linear-to-br from-indigo-500 to-purple-500 text-white">
              <tr>
                <th className="px-4 py-3 whitespace-nowrap">SN</th>
                <th className="px-4 py-3 whitespace-nowrap">Employee</th>
                <th className="px-4 py-3 whitespace-nowrap">Leave Type</th>
                <th className="px-4 py-3 whitespace-nowrap">Start Date</th>
                <th className="px-4 py-3 whitespace-nowrap">End Date</th>
                <th className="px-4 py-3 whitespace-nowrap">Days</th>
                <th className="px-4 py-3 whitespace-nowrap">Reason</th>
                <th className="px-4 py-3 whitespace-nowrap">Status</th>
                <th className="px-4 py-3 text-center whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {pendingLeaves.map((leave, index) => (
                <tr
                  key={leave.id}
                  className="border-b hover:bg-indigo-50/40 transition duration-300"
                >
                  <td className="px-4 py-3 text-center font-semibold text-gray-700">
                    {index + 1}
                  </td>

                  <td className="px-4 py-3 text-center font-medium text-indigo-700">
                    {leave.user.name}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
                      {leave.leaveType}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center text-gray-600">
                    {leave.startDate}
                  </td>

                  <td className="px-4 py-3 text-center text-gray-600">
                    {leave.endDate}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span className="px-3 py-1 text-xs font-semibold bg-purple-100 text-purple-700 rounded-full">
                      {leave.totalDays} Days
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center max-w-xs truncate text-gray-600">
                    {leave.reason}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span className="px-3 py-1 text-xs font-semibold bg-yellow-100 text-yellow-700 rounded-full">
                      {leave.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 flex justify-center space-x-3">
                    
                    {/* Approve Button */}
                    <button
                      onClick={() => handleApprove(leave)}
                      className="px-4 py-1.5 text-xs font-semibold bg-linear-to-br from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
                    >
                      {isLoading ? (
                        <span className="h-4 w-4 inline-block animate-spin border-2 border-white border-t-transparent rounded-full"></span>
                      ) : (
                        "Approve"
                      )}
                    </button>

                    {/* Reject Button */}
                    <button
                      onClick={() => handleReject(leave)}
                      className="px-4 py-1.5 text-xs font-semibold bg-linear-to-br from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
                    >
                      Reject
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
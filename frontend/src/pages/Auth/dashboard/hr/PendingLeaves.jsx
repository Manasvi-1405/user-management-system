"use client";

import React, { useEffect } from "react";
import { getPendingLeaves, updatedLeaves } from "../../../../redux-store/hr-management/leavesSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";


export default function PendingLeavesTable() {
const dispatch=useDispatch()

const{pendingLeaves,isLoading}=useSelector((state)=>state.leavesSlice)
console.log("pendingLeavs",pendingLeaves)

  useEffect(()=>{
    dispatch(getPendingLeaves()).unwrap().then((res)=>{
      console.log("getPendingLeaves",res)
    }).catch((err)=>{
      console.log("err",err)
    })
  },[dispatch])

  function handleApprove(leave){
    console.log("leave")
    console.log(leave._id)
    const payload={
      currentPendingLeaveId:leave._id,
      status:"Approved"
    }

    dispatch(updatedLeaves(payload)).unwrap().then((res)=>{
      console.log("res")
      console.log(res)
      if(res.status===200){
        toast.success(res.data.message)
      }
    }).catch((er)=>{
      console.log("er")
      console.log(er)
    })
  }


   function handleReject(leave){
    console.log("leave")
    console.log(leave._id)
    const payload={
      currentPendingLeaveId:leave._id,
      status:"Rejected"
    }

    dispatch(updatedLeaves(payload)).unwrap().then((res)=>{
      console.log("res")
      console.log(res)
      if(res.status===200){
        toast.success(res.data.message)
      }
    }).catch((er)=>{
      console.log("er")
      console.log(er)
    })
  }

  return (
    <div className="min-h-screen  ">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Pending Leave Requests
        </h1>
        <p className="text-gray-500">
          Review and manage employee leave applications
        </p>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            
            {/* Table Head */}
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-2 border py-3 font-semibold whitespace-nowrap text-gray-700">SN</th>
                <th className="px-2 border py-3 font-semibold whitespace-nowrap text-gray-700">Employee</th>
                <th className="px-2 border py-3 font-semibold whitespace-nowrap text-gray-700">Leave Type</th>
                <th className="px-2 border py-3 font-semibold whitespace-nowrap text-gray-700">Start Date</th>
                <th className="px-2 border py-3 font-semibold whitespace-nowrap text-gray-700">End Date</th>
                <th className="px-2 border py-3 font-semibold whitespace-nowrap text-gray-700">Days</th>
                <th className="px-2 border py-3 font-semibold whitespace-nowrap text-gray-700">Reason</th>
                <th className="px-2 border py-3 font-semibold whitespace-nowrap text-gray-700">Status</th>
                <th className="px-2 border py-3 font-semibold whitespace-nowrap text-gray-700 text-center">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
               {pendingLeaves.map((leave,index) => (
                <tr
                  key={leave.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                     <td className="px-6 py-4 border text-center whitespace-nowrap font-medium text-gray-800">
                    {index +1}
                  </td>
                  <td className="px-6 py-4 border text-center whitespace-nowrap font-medium text-gray-800">
                    {leave.user.name}
                  </td>
                  <td className="px-2 border text-center whitespace-nowrap py-4">{leave.leaveType}</td>
                  <td className="px-2 border text-center whitespace-nowrap py-4">{leave.startDate}</td>
                  <td className="px-2 border text-center whitespace-nowrap py-4">{leave.endDate}</td>
                  <td className="px-2 border text-center whitespace-nowrap py-4">{leave.totalDays}</td>
                  <td className="px-2 border text-center whitespace-nowrap py-4 max-w-xs truncate">
                    {leave.reason}
                  </td>
                  <td className="px-6 py-4 border">
                    <span className="px-3 py-1 text-xs  text-center font-medium bg-yellow-100 text-yellow-700 rounded-full">
                      {leave.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex text-center   space-x-2">
                    <button onClick={()=>handleApprove(leave)} className="px-3 py-1 text-xs bg-green-500 hover:bg-green-600 text-white rounded-md transition">
                      {isLoading?<span className="h-4 w-4 animate-spin border-t border-t-white border-2 border-gray-700 rounded-full "></span>:"Approve"}
                      
                    </button>
                    <button  onClick={()=>handleReject(leave)} className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded-md transition">
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
"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, LogIn, LogOut, CalendarDays, TrendingUp, Award, Coffee, MapPin, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { clockIn, clockOut, myAttendanceHistory } from "../../../redux-store/attendance-reducers/attendanceSlice";
import { toast } from "sonner";


const mockRecords = [
  { date: "14 Feb 2026", in: "09:05 AM", out: "06:10 PM", hours: "9h 05m", location: "Office", status: "on-time" },
  { date: "13 Feb 2026", in: "09:00 AM", out: "05:58 PM", hours: "8h 58m", location: "Remote", status: "on-time" },
  { date: "12 Feb 2026", in: "09:12 AM", out: "06:02 PM", hours: "8h 50m", location: "Office", status: "late" },
  { date: "11 Feb 2026", in: "08:55 AM", out: "05:45 PM", hours: "8h 50m", location: "Office", status: "on-time" },
  { date: "10 Feb 2026", in: "09:30 AM", out: "06:30 PM", hours: "9h 00m", location: "Remote", status: "late" },
];

const Attendance = () => {
  const [status, setStatus] = useState("idle");
  const [selectedView, setSelectedView] = useState("10");

  const [isColckedIn, setIsClockedIn] = useState(false)
  const dispatch = useDispatch()

  const {myAttendanceHistoryy}=useSelector((state)=>state.attendance)

  console.log("myAttendanceHistory")
  console.log(myAttendanceHistoryy)



  async function genrateLocation() {

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log(latitude, longitude);

        const payload = {
          lat: latitude,
          lng: longitude
        };

        dispatch(clockIn(payload))
          .unwrap()
          .then((res) => {
            console.log("res location", res);
            if (res.status === 201) {
              toast.success(res.data.message)
              setIsClockedIn(true)
            }
          })
          .catch((er) => {
            console.log("er location", er);
          });
      },
      (error) => {
        console.error("Location error:", error);
      }
    );


  }


  function handleClockOut() {
    dispatch(clockOut()).unwrap().then((res) => {
      console.log("out res")
      console.log(res)
      if (res.status === 200) {
        toast.success(res.data.message)
        setIsClockedIn(false)
      }
    }).catch((er) => {
      console.log("out err")
      console.log(er)
    })
  }


  useEffect(()=>{
    dispatch(myAttendanceHistory()).unwrap().then((res)=>{
      console.log("history")
      console.log(res)
    }).catch((er)=>{
      console.log("history err")
      console.log(er)
    })
  },[])

  return (
    <div className="min-h-screen   space-y-6">

      {/* Header Section */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">
          <Badge variant="outline" className="px-4 py-2 bg-white shadow-sm">
            <CalendarDays className="w-4 h-4 mr-2 text-blue-600" />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </Badge>
        </div>
      </div>

      {/* Status + Actions Card */}
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-600 to-indigo-600" />
        <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-2xl">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Today's Status</p>
              <div className="flex items-center gap-2 mt-1">
                <div className={cn(
                  "w-3 h-3 rounded-full animate-pulse",
                  isColckedIn ? "bg-green-500" : "bg-red-500"
                  // isColckedIn === true ? "bg-green-500" : status === false ? "bg-red-500" : "bg-slate-300"
                )} />
                <span className="text-xl font-semibold text-slate-800">


                  {isColckedIn ? "Active" : "Not Active"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              size="lg"
              className={cn(
                "rounded-xl px-6 transition-all duration-200 shadow-md hover:shadow-lg",
                isColckedIn === true
                  ? "bg-slate-200 text-slate-400 hover:bg-slate-200 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
              )}
              disabled={isColckedIn}
              onClick={genrateLocation}
            >
              <LogIn className="mr-2 w-5 h-5" /> Clock In
            </Button>
            <Button
              size="lg"
              className={cn(
                "rounded-xl px-6 transition-all duration-200 shadow-md hover:shadow-lg",
                isColckedIn == false
                  ? "bg-slate-200 text-slate-400 hover:bg-slate-200 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white"
              )}
              disabled={isColckedIn === false}
              onClick={handleClockOut}
            >
              <LogOut className="mr-2 w-5 h-5" /> Clock Out
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Today's Hours</p>
                <p className="text-3xl font-bold text-slate-800 mt-2">2h 15m</p>
                <p className="text-xs text-green-600 mt-2">+15% vs yesterday</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-2xl">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">This Month</p>
                <p className="text-3xl font-bold text-slate-800 mt-2">145h 30m</p>
                <p className="text-xs text-slate-500 mt-2">Target: 160h</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-2xl">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Days Worked</p>
                <p className="text-3xl font-bold text-slate-800 mt-2">18 Days</p>
                <p className="text-xs text-slate-500 mt-2">92% attendance</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-2xl">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Break Time</p>
                <p className="text-3xl font-bold text-slate-800 mt-2">45m</p>
                <p className="text-xs text-slate-500 mt-2">Avg. per day</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-2xl">
                <Coffee className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Table */}
      <Card className="border-0 shadow-xl bg-white overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800">My Attendance Records</h2>
              <p className="text-sm text-slate-500 mt-1">Track your recent attendance history</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-slate-400" />
                <Select defaultValue="10" onValueChange={setSelectedView}>
                  <SelectTrigger className="w-28 rounded-xl border-slate-200 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">Last 5</SelectItem>
                    <SelectItem value="10">Last 10</SelectItem>
                    <SelectItem value="20">Last 20</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="sm" className="rounded-xl border-slate-200 hover:bg-slate-50">
                View All <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow className="hover:bg-slate-50">
                  <TableHead className="font-semibold text-slate-600">Date</TableHead>
                  <TableHead className="font-semibold text-slate-600">Clock In</TableHead>
                  {/* <TableHead className="font-semibold text-slate-600">Clock Out</TableHead> */}
                  <TableHead className="font-semibold text-slate-600">Hours Worked</TableHead>
                  <TableHead className="font-semibold text-slate-600">Location</TableHead>
                  <TableHead className="font-semibold text-slate-600">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myAttendanceHistoryy.map((record, index) => (
                  <TableRow key={index} className="hover:bg-slate-50 transition-colors">
                    <TableCell className="font-medium text-slate-700">{record.date}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {new Date(record.checkIn).toLocaleString("en-IN")}
                      </Badge>
                    </TableCell>
                    {/* <TableCell>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        2
                      </Badge>
                    </TableCell> */}
                    <TableCell className="font-medium text-slate-700">{record.workHours}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span className="text-slate-600"></span>
                      </div>
                    </TableCell>
                   <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {record.status
}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Quick Insights */}
          {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-sm text-blue-600 font-medium">Early Arrivals</p>
              <p className="text-2xl font-bold text-blue-700 mt-1">12</p>
              <p className="text-xs text-blue-500 mt-1">This month</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4">
              <p className="text-sm text-amber-600 font-medium">Late Arrivals</p>
              <p className="text-2xl font-bold text-amber-700 mt-1">4</p>
              <p className="text-xs text-amber-500 mt-1">This month</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-sm text-green-600 font-medium">Perfect Days</p>
              <p className="text-2xl font-bold text-green-700 mt-1">8</p>
              <p className="text-xs text-green-500 mt-1">This month</p>
            </div>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default Attendance;
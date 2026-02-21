import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarRange, Calendar } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Clock,
  LogIn,
  LogOut,
  CalendarDays,
  TrendingUp,
  Award,
  Coffee,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  attendanceStatusAdmin,
  clockIn,
  clockOut,
  getAdminReport,
  getEmployeeAnalytics,
  getMonthlyReport as getMonthlyReportAction, // ✅ FIX 1: renamed import to avoid conflict with state variable
  getWorkHours,
  myAttendanceHistory,
} from "../../../redux-store/attendance-reducers/attendanceSlice";
import { toast } from "sonner";

const DashboardCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-3xl font-bold">{value}</h2>
      </div>
      <div className="bg-gray-100 p-3 rounded-full">{icon}</div>
    </div>
  );
};

const Attendance = () => {
  const [selectedView, setSelectedView] = useState("10");
  const [isColckedIn, setIsClockedIn] = useState(false);
  const dispatch = useDispatch();
const { adminReport}=useSelector((state)=>state.attendance)
  const { myAttendanceHistoryy } = useSelector((state) => state.attendance);
  const { workingHours } = useSelector((state) => state.attendance);
  // const { getMonthlyReport } = useSelector((state) => state.attendance); // ✅ state variable kept as-is
  const summary = {
    today: adminReport?.today?.length || 0,
    thisWeek: adminReport?.thisWeek?.length || 0,
    thisMonth: adminReport?.thisMonth?.length || 0,
    thisYear: adminReport?.thisYear?.length || 0,
    totalEmployees: adminReport?.totalEmployees || 0,
    activeNow: adminReport?.activeNow || 0,
    absentToday: adminReport?.absentToday || 0
  };
  
  const groupedByDate = adminReport?.groupedByDate || {};
  async function genrateLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log(latitude, longitude);

        const payload = {
          lat: latitude,
          lng: longitude,
        };

        dispatch(clockIn(payload))
          .unwrap()
          .then((res) => {
            console.log("res location", res);
            if (res.status === 201) {
              toast.success(res.data.message);
              setIsClockedIn(true);
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
    dispatch(clockOut())
      .unwrap()
      .then((res) => {
        console.log("out res");
        console.log(res);
        if (res.status === 200) {
          toast.success(res.data.message);
          setIsClockedIn(false);
        }
      })
      .catch((er) => {
        console.log("out err");
        console.log(er);
      });
  }

  useEffect(() => {
    dispatch(myAttendanceHistory())
      .unwrap()
      .then((res) => {
        console.log("history");
        console.log(res);
      })
      .catch((er) => {
        console.log("history err");
        console.log(er);
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getWorkHours())
      .unwrap()
      .then((res) => {
        console.log("workHours");
        console.log(res);
        if (res.status === 200) toast.success(res.data.message);
      })
      .catch((er) => {
        console.log("out err");
        console.log(er);
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch( getAdminReport())
      .unwrap()
      .then((res) => {
        console.log(" getAdminReport");
        console.log(res);
      })
      .catch((err) => {
        console.log("err");
        console.log(err);
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMonthlyReportAction()) // ✅ using renamed import
      .unwrap()
      .then((res) => {
        console.log("MonthlyReport");
        console.log(res);
        if (res.status === 200) {
          toast.success(res.message);
        }
      })
      .catch((er) => {
        console.log("out err");
        console.log(er);
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getEmployeeAnalytics())
      .unwrap()
      .then((res) => {
        console.log("getEmployeeAnalytics");
        console.log(res);
      })
      .catch((er) => {
        console.log("out err");
        console.log(er);
      });
  }, [dispatch]);

  
 

  return (
    <>
      {/* ── Employee View ── */}
      <div className="min-h-screen space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-4 py-2 bg-white shadow-sm">
              <CalendarDays className="w-4 h-4 mr-2 text-blue-600" />
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Badge>
          </div>
        </div>

        {/* Status + Actions Card */}
        {/* ✅ FIX 6: added relative so the absolute colored bar is positioned correctly */}
        <Card className="relative border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-600 to-indigo-600" />
          <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-2xl">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Today's Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className={cn(
                      "w-3 h-3 rounded-full animate-pulse",
                      isColckedIn ? "bg-green-500" : "bg-red-500"
                    )}
                  />
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
                  <p className="text-3xl font-bold text-slate-800 mt-2">
                    {workingHours.totalHours}
                  </p>
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
                  <p className="text-3xl font-bold text-slate-800 mt-2">
                    145h 30m
                  </p>
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
                  <p className="text-sm text-slate-500">Day Count</p>
                  <p className="text-3xl font-bold text-slate-800 mt-2">
                    {workingHours.daysCount}
                  </p>
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
                  <p className="text-sm text-slate-500">Period</p>
                  <p className="text-3xl font-bold text-slate-800 mt-2">
                    {workingHours.period}
                  </p>
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
                <h2 className="text-xl font-bold text-slate-800">
                  My Attendance Records
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Track your recent attendance history
                </p>
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
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-slate-200 hover:bg-slate-50"
                >
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
                    <TableHead className="font-semibold text-slate-600">Hours Worked</TableHead>
                    <TableHead className="font-semibold text-slate-600">Location</TableHead>
                    <TableHead className="font-semibold text-slate-600">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myAttendanceHistoryy.map((record, index) => (
                    <TableRow
                      key={index}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <TableCell className="font-medium text-slate-700">
                        {record.date}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          {new Date(record.checkIn).toLocaleString("en-IN")}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium text-slate-700">
                        {record.workHours}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span className="text-slate-600"></span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          {record.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

      </div>

    

      {/* ── Admin View (renders only when adminStates is populated) ── */}
      {/* {adminStates?.summary && (
        <div className="bg-gray-100 min-h-screen space-y-8 p-6">
          <h1 className="text-3xl font-bold">Lead Performance Overview</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard
              title="Today"
              value={summary.today || 0}
              icon={<CalendarDays />}
            />
            <DashboardCard
              title="This Week"
              value={summary.thisWeek || 0}
              icon={<CalendarRange />}
            />
            <DashboardCard
              title="This Month"
              value={summary.thisMonth || 0}
              icon={<Calendar />}
            />
            <DashboardCard
              title="This Year"
              value={summary.thisYear || 0}
              icon={<TrendingUp />}
            />
          </div>

        
        </div>
      )} */}
    </>
  );
};

export default Attendance;


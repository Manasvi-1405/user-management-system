import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  TrendingDown,
  Award,
  Target,
  Users,
  UserCheck,
  Medal,
  Crown,
  Sparkles,
  Flame,
  AlertTriangle,
  ChevronRight,
  Download,
  Filter,
  Activity,
} from "lucide-react";


import { cn } from "@/lib/utils";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart as ReLineChart,
  Line,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

import {
  getUserAnalytics,
  getUserPerformanceDashboard,
} from "../../../redux-store/performance/performanceSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAdminReport } from "../../../redux-store/attendance-reducers/attendanceSlice";

const Performance = () => {
  const dispatch = useDispatch();
  const currentRole = localStorage.getItem("currentUser") || "user";

  // Real data from Redux store
  const { userPerformanceOverview } = useSelector((state) => state.performance);
  const { userAnalytic } = useSelector((state) => state.performance);
  const { adminReport } = useSelector((state) => state.attendance);

  useEffect(() => {
    if (currentRole === "admin") {
      dispatch(getAdminReport());
    } else {
      dispatch(getUserPerformanceDashboard());
      dispatch(getUserAnalytics());
    }
  }, [dispatch, currentRole]);



  // User Performance View
  const UserPerformance = () => {
    if (!userAnalytic || !userPerformanceOverview) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading performance data...</p>
          </div>
        </div>
      );
    }



    return (
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-medium text-white/90">
                Your Performance Overview
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Great Job, {userAnalytic?.userDetails?.name || "User"} 👋
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Here's a comprehensive look at your performance metrics.
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <Card className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border bg-gradient-to-r from-blue-100 to-blue-100">
                <CardContent className="p-6">
                  <p className="text-xl text-gray-500 font-bold">Total Leads</p>
                  <h2 className="text-3xl font-bold text-blue-700 mt-2">
                    {userPerformanceOverview?.totalLeads || 0}
                  </h2>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border bg-gradient-to-r from-green-100 to-green-100">
                <CardContent className="p-6">
                  <p className="text-xl text-gray-500 font-bold">Efficiency Score</p>
                  <h2 className="text-3xl font-bold text-green-700 mt-2">
                    {userPerformanceOverview?.efficiencyScore || 0}%
                  </h2>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border bg-gradient-to-r from-purple-100 to-purple-100">
                <CardContent className="p-6">
                  <p className="text-xl text-gray-500 font-bold">Conversion Rate</p>
                  <h2 className="text-3xl font-bold text-purple-700 mt-2">
                    {userPerformanceOverview?.conversionRate || 0}%
                  </h2>
                </CardContent>
              </Card>

              <Card className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border bg-gradient-to-r from-orange-100 to-orange-100">
                <CardContent className="p-6">
                  <p className="text-xl text-gray-500 font-bold">Closed Leads</p>
                  <h2 className="text-3xl font-bold text-orange-700 mt-2">
                    {userPerformanceOverview?.closedSales || 0}
                  </h2>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Attendance Section */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-purple-700 hover:text-purple-800 transition-colors w-fit">
            {userAnalytic?.userDetails?.name || "User"} Attendance Dashboard
          </h1>

          {/* Attendance Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-green-600">Present Days</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-yellow-500">
                  {userAnalytic?.attendanceReport?.presentDays || 0}
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-yellow-500">Late Days</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">
                  {userAnalytic?.attendanceReport?.lateDays || 0}
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-blue-600">Auto Logouts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-red-500">
                  {userAnalytic?.attendanceReport?.autoLogouts || 0}
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-red-500">Total Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600">
                  {userAnalytic?.attendanceReport?.totalWorkingHours || 0}h
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Attendance Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Attendance Performance</CardTitle>
              <CardDescription>Your overall attendance record</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Progress 
                value={userAnalytic?.attendanceReport?.attendancePercentage || 0} 
                className="h-3"
              />
              <p className="text-sm text-gray-500">
                {userAnalytic?.attendanceReport?.attendancePercentage || 0}% Overall Attendance
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Placeholder for Charts - Will be implemented when data is available */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              <CardTitle>Performance Metrics</CardTitle>
            </div>
            <CardDescription>Additional metrics coming soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-400">
              More detailed analytics will be displayed here
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Admin Performance View
  const AdminPerformance = () => {
    if (!adminReport) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading team data...</p>
          </div>
        </div>
      );
    }

    const summary = adminReport?.summary || {};

    const stats = [
      {
        label: "Total Employees",
        value: summary.totalEmployees || 0,
        icon: Users,
        color: "blue",
      },
      {
        label: "Present Today",
        value: summary.presentToday || 0,
        icon: TrendingUp,
        change: "+5%",
        color: "green",
      },
      {
        label: "Present Now",
        value: summary.presentRightNow || 0,
        icon: Crown,
        color: "yellow",
      },
      {
        label: "Late Arrival",
        value: summary.lateToday || 0,
        icon: AlertTriangle,
        color: "red",
      },
      {
        label: "Absent",
        value: summary.absentToday || 0,
        icon: Activity,
        color: "purple",
      },
    ];

    return (
      <div className="space-y-6">
        {/* Admin Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Team Performance</h1>
            <p className="text-gray-500 mt-1">Real-time overview of your team</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Team Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((stat, i) => (
            <Card
              key={i}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={cn(
                      "p-3 rounded-xl",
                      stat.color === "blue" && "bg-blue-100",
                      stat.color === "green" && "bg-green-100",
                      stat.color === "yellow" && "bg-yellow-100",
                      stat.color === "red" && "bg-red-100",
                      stat.color === "purple" && "bg-purple-100"
                    )}
                  >
                    <stat.icon
                      className={cn(
                        "w-5 h-5",
                        stat.color === "blue" && "text-blue-600",
                        stat.color === "green" && "text-green-600",
                        stat.color === "yellow" && "text-yellow-600",
                        stat.color === "red" && "text-red-600",
                        stat.color === "purple" && "text-purple-600"
                      )}
                    />
                  </div>
                  {stat.change && (
                    <Badge
                      className={cn(
                        "bg-green-100 text-green-700 border-0",
                        stat.change.startsWith("-") && "bg-red-100 text-red-700"
                      )}
                    >
                      {stat.change}
                    </Badge>
                  )}
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Overview Section */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle>Team Overview</CardTitle>
            <CardDescription>Key metrics at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-600 font-medium">Avg. Productivity</p>
                <p className="text-2xl font-bold text-blue-700">{summary.avgProductivity }%</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <p className="text-sm text-green-600 font-medium">Top Performer</p>
                <p className="text-lg font-bold text-green-700">{summary.topPerformer }</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl">
                <p className="text-sm text-purple-600 font-medium">Team Efficiency</p>
                <p className="text-2xl font-bold text-purple-700">{summary.teamEfficiency }%</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-xl">
                <p className="text-sm text-orange-600 font-medium">Needs Improvement</p>
                <p className="text-lg font-bold text-orange-700">{summary.improvementNeeded }</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
      {currentRole === "user" ? <UserPerformance /> : <AdminPerformance />}
    </div>
  );
};

export default Performance;
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { BarChart3 } from "lucide-react";
import { payrollSummary } from "../../../../redux-store/hr-management/leavesSlice";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";

const PayrollSummary = () => {
  const dispatch = useDispatch();
  const { companyPayrollSummaryData } = useSelector(
    (state) => state.leavesSlice
  );

  const [filters, setFilters] = useState({
    month: "",
    year: "",
  });

  const handleFetchSummary = () => {
    if (!filters.month || !filters.year) return;

    dispatch(payrollSummary(filters))
      .unwrap()
      .then((res) => {
        if (res.status === 200) {
          toast.success("Summary Loaded Successfully 🚀");
        }
      })
      .catch((er) => {
        if (er) {
          toast.error(er.data.message);
        }
      });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-r from-blue-50 via-indigo-50 to-purple-50 p-6 space-y-10">

      {/* Animated Background Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-300 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-blue-300 opacity-20 rounded-full blur-3xl animate-pulse"></div>

      {/* Header */}
      <div className="relative flex items-center gap-4">
        <div className="p-4 rounded-2xl bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-xl hover:scale-110 hover:rotate-6 transition duration-500">
          <BarChart3 className="w-7 h-7" />
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-sm">
          Company Payroll Summary
        </h1>
      </div>

      {/* Filters Card */}
      <Card className="relative rounded-3xl bg-white/70 backdrop-blur-xl shadow-2xl border border-white/40 hover:shadow-indigo-200 transition-all duration-500">
        <CardHeader>
          <CardTitle className="text-xl font-semibold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Select Month & Year
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col md:flex-row gap-6 items-center">

          <Select
            value={filters.month}
            onValueChange={(value) =>
              setFilters({ ...filters, month: value })
            }
          >
            <SelectTrigger className="w-full md:w-52 rounded-xl bg-white/80 backdrop-blur-md border border-gray-200 hover:border-indigo-400 focus:ring-2 focus:ring-indigo-400 transition-all duration-300">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              {[...Array(12)].map((_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>
                  {new Date(0, i).toLocaleString("default", {
                    month: "long",
                  })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.year}
            onValueChange={(value) =>
              setFilters({ ...filters, year: value })
            }
          >
            <SelectTrigger className="w-full md:w-40 rounded-xl bg-white/80 backdrop-blur-md border border-gray-200 hover:border-indigo-400 focus:ring-2 focus:ring-indigo-400 transition-all duration-300">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {[2024, 2025, 2026, 2027].map((yr) => (
                <SelectItem key={yr} value={yr.toString()}>
                  {yr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={handleFetchSummary}
            className="rounded-xl px-8 py-2 font-semibold bg-linear-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg hover:shadow-indigo-400/50 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Fetch Summary
          </Button>

        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">

        <Card className="rounded-3xl bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-500">
          <CardContent className="p-8">
            <p className="text-sm uppercase tracking-wide opacity-80">
              Total Employees
            </p>
            <h2 className="text-5xl font-bold mt-3">
              {companyPayrollSummaryData?.summary?.totalEmployees || 0}
            </h2>
          </CardContent>
        </Card>

        <Card className="rounded-3xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-500">
          <CardContent className="p-8">
            <p className="text-sm uppercase tracking-wide opacity-80">
              Total Payable Days
            </p>
            <h2 className="text-5xl font-bold mt-3">
              {companyPayrollSummaryData?.summary?.totalPayableDays || 0}
            </h2>
          </CardContent>
        </Card>

        <Card className="rounded-3xl bg-linear-to-r from-cyan-500 via-sky-500 to-blue-500 text-white shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-500">
          <CardContent className="p-8">
            <p className="text-sm uppercase tracking-wide opacity-80">
              Total LOP Days
            </p>
            <h2 className="text-5xl font-bold mt-3">
              {companyPayrollSummaryData?.summary?.totalLOPDays || 0}
            </h2>
          </CardContent>
        </Card>

      </div>

      {/* Employee Breakdown */}
      <Card className="relative rounded-3xl bg-white/70 backdrop-blur-xl shadow-2xl border border-white/40">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Employee Breakdown -{" "}
            {companyPayrollSummaryData?.summary?.month}{" "}
            {companyPayrollSummaryData?.summary?.year}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-inner">
            <Table>
              <TableHeader className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
                <TableRow>
                  <TableHead className="text-white">Employee</TableHead>
                  <TableHead className="text-white">Email</TableHead>
                  <TableHead className="text-white">Payable Days</TableHead>
                  <TableHead className="text-white">LOP Days</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {companyPayrollSummaryData?.employees?.map((emp) => (
                  <TableRow
                    key={emp.employee.id}
                    className="hover:bg-indigo-50 hover:scale-[1.01] transition duration-300"
                  >
                    <TableCell className="font-semibold text-gray-700">
                      {emp.employee.name}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {emp.employee.email}
                    </TableCell>
                    <TableCell className="text-green-600 font-semibold">
                      {emp.payableDays}
                    </TableCell>
                    <TableCell className="text-red-600 font-semibold">
                      {emp.lopDays}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default PayrollSummary;
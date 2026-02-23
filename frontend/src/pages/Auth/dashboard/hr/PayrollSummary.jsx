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
import { Users, Calendar, BarChart3 } from "lucide-react";

const PayrollSummary = () => {
  const [filters, setFilters] = useState({
    month: "",
    year: "",
  });

  // 🧠 Dummy Response (Based on Backend Structure)
  const dummyData = {
    summary: {
      totalEmployees: 3,
      totalPayableDays: 72,
      totalLOPDays: 6,
      month: "January",
      year: 2026,
    },
    employees: [
      {
        employee: {
          id: "1",
          name: "Amit Sharma",
          email: "amit@company.com",
        },
        payableDays: 24,
        lopDays: 2,
      },
      {
        employee: {
          id: "2",
          name: "Priya Verma",
          email: "priya@company.com",
        },
        payableDays: 25,
        lopDays: 1,
      },
      {
        employee: {
          id: "3",
          name: "Rahul Singh",
          email: "rahul@company.com",
        },
        payableDays: 23,
        lopDays: 3,
      },
    ],
  };

  const handleFetchSummary = () => {
    if (!filters.month || !filters.year) return;

    // 🔌 TODO: Replace with dispatch or API call
    console.log("Fetch Payroll Summary:", filters);

    /*
    axios.get("/payroll-summary", {
      params: {
        month: filters.month,
        year: filters.year
      }
    })
    */
  };

  return (
    <div className=" mx-auto  space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <BarChart3 className="w-6 h-6" />
        <h1 className="text-2xl font-semibold">
          Company Payroll Summary
        </h1>
      </div>

      {/* Filters */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Select Month & Year</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <Select
            value={filters.month}
            onValueChange={(value) =>
              setFilters({ ...filters, month: value })
            }
          >
            <SelectTrigger className="w-full md:w-52">
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
            <SelectTrigger className="w-full md:w-40">
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

          <Button className="bg-blue-600" onClick={handleFetchSummary}>
            Fetch Summary
          </Button>
          
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Total Employees
            </p>
            <h2 className="text-3xl font-bold">
              {dummyData.summary.totalEmployees}
            </h2>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Total Payable Days
            </p>
            <h2 className="text-3xl font-bold">
              {dummyData.summary.totalPayableDays}
            </h2>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              Total LOP Days
            </p>
            <h2 className="text-3xl font-bold">
              {dummyData.summary.totalLOPDays}
            </h2>
          </CardContent>
        </Card>
      </div>

      {/* Employee Breakdown Table */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>
            Employee Breakdown - {dummyData.summary.month}{" "}
            {dummyData.summary.year}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Payable Days</TableHead>
                <TableHead>LOP Days</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyData.employees.map((emp) => (
                <TableRow key={emp.employee.id}>
                  <TableCell className="font-medium">
                    {emp.employee.name}
                  </TableCell>
                  <TableCell>{emp.employee.email}</TableCell>
                  <TableCell>{emp.payableDays}</TableCell>
                  <TableCell>{emp.lopDays}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollSummary;
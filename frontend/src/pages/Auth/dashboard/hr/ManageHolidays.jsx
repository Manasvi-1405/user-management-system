import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, PlusCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addHolidays, getHolidays } from "../../../../redux-store/hr-management/leavesSlice";
import { toast } from "sonner";

const ManageHolidays = () => {

  const dispatch = useDispatch();

  const { holidayList } = useSelector((state) => state.leavesSlice);

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    type: "Public",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.date) return;

    dispatch(addHolidays(formData)).unwrap().then((res) => {
      if (res.status === 201) {
        toast.success(res.data.message);
        dispatch(getHolidays());
      }
    }).catch((err) => {
      console.log("err", err);
    });

    setHolidays((prev) => [...prev, formData]);

    setFormData({
      name: "",
      date: "",
      type: "Public",
    });
  };

  useEffect(() => {
    dispatch(getHolidays()).unwrap().then((res) => {
      console.log("getHolidays", res);
    }).catch((err) => {
      console.log("err", err);
    });
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 space-y-8">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-500 text-white shadow-lg">
          <CalendarDays className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-extrabold bg-linear-to-br from-blue-500 to-indigo-500 bg-clip-text text-transparent">
          Manage Holidays
        </h1>
      </div>

      {/* Add Holiday Card */}
      <Card className="rounded-3xl bg-white/80 backdrop-blur-lg shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2 text-indigo-700">
            <PlusCircle className="w-5 h-5" />
            Add Holiday
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-4 gap-5"
          >
            <Input
              placeholder="Holiday Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="rounded-xl focus:ring-2 focus:ring-indigo-400 transition"
            />

            <Input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
              className="rounded-xl focus:ring-2 focus:ring-indigo-400 transition"
            />

            <Select
              value={formData.type}
              onValueChange={(value) =>
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger className="w-full rounded-xl focus:ring-2 focus:ring-indigo-400 transition">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Public">Public</SelectItem>
                <SelectItem value="Company-Event">
                  Company-Event
                </SelectItem>
              </SelectContent>
            </Select>

            <Button
              type="submit"
              className="w-full rounded-xl font-semibold bg-linear-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md hover:shadow-lg transition duration-300"
            >
              Add Holiday
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Holiday List Card */}
      <Card className="rounded-3xl bg-white/80 backdrop-blur-lg shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-xl text-indigo-500">
            Holiday List
          </CardTitle>
        </CardHeader>

        <CardContent>
          {holidayList.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No holidays found.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-gray-100">
              <table className="w-full text-sm">
                <thead className="bg-linear-to-br from-blue-600 to-green-500 text-white">
                  <tr>
                    <th className="text-left  py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {holidayList.map((holiday, index) => (
                    <tr
                      key={index}
                      className="border-b last:border-none hover:bg-indigo-200 transition duration-300"
                    >
                      <td className="py-3 px-4 font-semibold text-gray-800">
                        {holiday.name}
                      </td>
                      <td className="py-3 px-4 text-gray-800">
                        {holiday.date}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          className={
                            holiday.type === "Public"
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                          }
                        >
                          {holiday.type}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageHolidays;
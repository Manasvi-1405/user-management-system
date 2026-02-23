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
  const [holidays, setHolidays] = useState([
    { name: "New Year", date: "2026-01-01", type: "Public" },
    { name: "Annual Meetup", date: "2026-03-15", type: "Company-Event" },
  ]);


  const dispatch=useDispatch()
  
const { holidayList}=useSelector((state)=>state.leavesSlice)
console.log("holidayList")
console.log(holidayList)
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    type: "Public",
  });




  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.date) return; 

    // 🔌 TODO: Replace with dispatch(addHoliday(formData))
    console.log("Dispatch addHoliday here:", formData);
    dispatch(addHolidays(formData)).unwrap().then((res)=>{
      console.log("addHolidays",res)
      if(res.status===201){
        toast.success(res.data.message)
        dispatch(getHolidays())
      }
    }).catch((err)=>{
      console.log("err",err)
    })

    setHolidays((prev) => [...prev, formData]);

    setFormData({
      name: "",
      date: "",
      type: "Public",
    });

};


//
  useEffect(()=>{
  dispatch(getHolidays()).unwrap().then((res)=>{
    console.log("getHolidays",res)

  }).catch((err)=>{
    console.log("err",err)
  })
},[dispatch])



  return (
    <div className=" mx-auto space-y-4">
      <div className="flex items-center gap-2">
        <CalendarDays className="w-6 h-6" />
        <h1 className="text-2xl font-semibold">Manage Holidays</h1>
      </div>

      {/* Add Holiday Card */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <PlusCircle className="w-5 h-5" />
            Add Holiday
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <Input
              placeholder="Holiday Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />

            <Input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />

            <Select
              value={formData.type}
              onValueChange={(value) =>
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Public">Public</SelectItem>
                <SelectItem value="Company-Event">
                  Company-Event
                </SelectItem>
              </SelectContent>
            </Select>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 cursor-pointer">
              Add
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Holiday List Card */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Holiday List</CardTitle>
        </CardHeader>

        <CardContent>
          {holidayList.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No holidays found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">Name</th>
                    <th className="text-left py-3">Date</th>
                    <th className="text-left py-3">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {holidayList.map((holiday, index) => (
                    <tr
                      key={index}
                      className="border-b last:border-none hover:bg-muted/40 transition"
                    >
                      <td className="py-3 font-medium">
                        {holiday.name}
                      </td>
                      <td className="py-3">{holiday.date}</td>
                      <td className="py-3">
                        <Badge
                          variant={
                            holiday.type === "Public"
                              ? "default"
                              : "secondary"
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
import React, { useEffect, useState } from "react";
import axios from "axios";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { getMySalary, getSalaryHistory } from "../../../../redux-store/hr-management/salaryManagemenetSlice";
import { useDispatch, useSelector } from "react-redux";

const MySalary = () => {
  const [salary, setSalary] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch=useDispatch()
  const {mySalary}=useSelector((state)=>state.salaryManagementSlice)
  console.log("mysalary")
  console.log(mySalary)

  // useEffect(() => {
  //   fetchSalary();
  // }, []);

  // const fetchSalary = async () => {
  //   try {
  //     const { data } = await axios.get("/api/salary/my-salary"); // adjust route if needed
  //     setSalary(data.data);
  //   } catch (error) {
  //     console.error("Error fetching salary", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
useEffect(()=>{
  dispatch(getMySalary()).unwrap().then((res)=>{
console.log("getmysalary")
  console.log(res)
  }).catch((er)=>{
  console.log("er")
  console.log(er)
  
})
},[dispatch])

useEffect(()=>{
  dispatch(getSalaryHistory()).unwrap().then((res)=>{
console.log("getmysalary")
  console.log(res)
  }).catch((er)=>{
  console.log("er")
  console.log(er)
  
})
},[dispatch])


  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (!salary) {
    return (
      <div className="text-center mt-10 text-muted-foreground">
        Salary details not available.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold">My Salary Details</h2>

      {/* Employee Info */}
      <Card>
        <CardContent className="p-6 space-y-2">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">
                {mySalary.user?.name}
              </h3>
              <p className="text-muted-foreground">
                {mySalary.user?.email}
              </p>
            </div>
            <Badge>Active</Badge>
          </div>

          <Separator />

          {/* <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-sm text-muted-foreground">Annual CTC</p>
              <p className="text-lg font-semibold">
                ₹ {mySalary.ctc?.annual?.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">In-Hand (Annual)</p>
              <p className="text-lg font-semibold text-green-600">
                ₹ {mySalary.inHand?.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Effective Date</p>
              <p className="font-medium">
                {new Date(mySalary.effectiveDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Updated By</p>
              <p className="font-medium">
                {mySalary.updatedBy?.name}
              </p>
            </div>
          </div> */}
        </CardContent>
      </Card>

      {/* CTC Breakup */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">CTC Breakup</h3>

          <div className="grid grid-cols-2 gap-4">
            {/* {Object.entries(salary.ctc?.breakup || {}).map(([key, value]) => (
              <div key={key}>
                <p className="text-sm text-muted-foreground capitalize">
                  {key}
                </p>
                <p className="font-medium">
                  ₹ {value?.toLocaleString()}
                </p>
              </div>
            ))} */}
          </div>
        </CardContent>
      </Card>

      {/* Deductions */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-red-600">
            Deductions
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {Object.entries(salary.deductions || {}).map(([key, value]) =>
              key !== "otherDeductions" ? (
                <div key={key}>
                  <p className="text-sm text-muted-foreground capitalize">
                    {key}
                  </p>
                  <p className="font-medium text-red-500">
                    ₹ {value?.toLocaleString()}
                  </p>
                </div>
              ) : null
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tax Breakup */}
      {salary.taxBreakup && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">
              Tax Breakup
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {Object.entries(salary.taxBreakup).map(([key, value]) => (
                <div key={key}>
                  <p className="text-sm text-muted-foreground capitalize">
                    {key}
                  </p>
                  <p className="font-medium">
                    ₹ {value?.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MySalary;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../../redux-store/user-reducers/userSlice";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getHolidayPolicy, initializeHolidayPolicy, initializeLeavePolicies, setSalary } from "../../../../redux-store/hr-management/salaryManagemenetSlice";

const SetSalary = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    annual: "",
    basic: "",
    hra: "",
    specialAllowance: "",
    bonus: "",
    insurance: "",
    effectiveDate: "",
    reason: "",
  });



  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const employeeUsers = users

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleSubmit = () => {
    const payload = {
      ctc: {
        annual: Number(formData.annual),
        breakup: {
          basic: Number(formData.basic),
          hra: Number(formData.hra),
          specialAllowance: Number(formData.specialAllowance),
          bonus: Number(formData.bonus),
          insurance: Number(formData.insurance),
        },
      },
      effectiveDate: formData.effectiveDate,
      reason: formData.reason,
    };

    console.log("Payload to backend:", payload);
    console.log("UserId:", selectedUser?._id);

    // 👉 yaha tum axios call karoge

    dispatch(setSalary({payload:payload,id:selectedUser?._id})).unwrap().then((res)=>{
      console.log("res")
      console.log(res)
       setOpen(false);
    }).catch((er)=>{
      console.log("er")
      console.log(er)
    })

  dispatch(initializeLeavePolicies()).unwrap().then((res)=>{
      console.log("init lreave res")
      console.log(res)
       setOpen(false);
    }).catch((er)=>{
      console.log("er")
      console.log(er)
  })



   
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Set Employee Salary</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employeeUsers?.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.isActive ? "Active" : "Inactive"}
              </TableCell>
              <TableCell>
                <Button onClick={() => handleOpen(user)}>
                  Set Salary
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog Popup */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Set Salary for {selectedUser?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <Input name="annual" placeholder="Annual CTC" onChange={handleChange} />
            <Input name="basic" placeholder="Basic Salary" onChange={handleChange} />
            <Input name="hra" placeholder="HRA" onChange={handleChange} />
            <Input name="specialAllowance" placeholder="Special Allowance" onChange={handleChange} />
            <Input name="bonus" placeholder="Bonus" onChange={handleChange} />
            <Input name="insurance" placeholder="Insurance" onChange={handleChange} />
            <Input name="effectiveDate" type="date" onChange={handleChange} />
            <Input name="reason" placeholder="Reason" onChange={handleChange} />
          </div>

          <DialogFooter className="mt-4">
            <Button onClick={handleSubmit}>
              Save Salary
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SetSalary;
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FileText, Users } from "lucide-react";
import { getUsers } from "../../../../redux-store/user-reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { genrateSalarySlip } from "../../../../redux-store/hr-management/leavesSlice";

const GenrateSalarySlip = () => {
  // Dummy Users
  // const users = [
  //   { id: "u1", name: "Amit Sharma", email: "amit@company.com" },
  //   { id: "u2", name: "Priya Verma", email: "priya@company.com" },
  //   { id: "u3", name: "Rahul Singh", email: "rahul@company.com" },
  // ];

  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.users);

  console.log("users");
  console.log(users);

  const [payload, setPayload] = useState({
    month: "",
    year: "",
  });

  const handleGenerate = () => {
    if (!payload.month || !payload.year) return;

    const finalPayload = {
      userId: selectedUser?._id,
      month: payload.month,
      year: payload.year,
    };

    // 🔌 TODO: Replace with dispatch or API call
    // getSalarySlipData(userId, { month, year })
    console.log("Dispatch salary slip generation:", finalPayload);
    dispatch(genrateSalarySlip(finalPayload))
      .unwrap()
      .then((res) => {
        console.log("res");
        console.log(res);
        if (res.status === 200) {
          toast.success("Done");
          setOpen(false);
          setPayload({ month: "", year: "" });
        }
      })
      .catch((er) => {
        console.log("er");
     

        if(er){
          toast.error(er.data.message)
        }
      });
  };

  useEffect(() => {
    dispatch(getUsers())
      .unwrap()
      .then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [dispatch]);

  return (
    <div className=" mx-auto  space-y-2">
      <div className="flex items-center gap-2">
        <Users className="w-6 h-6" />
        <h1 className="text-2xl font-semibold">Generate Salary Slip</h1>
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Employee List</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="text-right flex justify-end">
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedUser(user);
                        setOpen(true);
                      }}
                      className="flex items-center bg-blue-600 cursor-pointer gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      Genrate Slip
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Generate Salary Slip for {selectedUser?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Month</label>
              <Select
                value={payload.month}
                onValueChange={(value) =>
                  setPayload({ ...payload, month: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12",
                  ].map((m) => (
                    <SelectItem key={m} value={m}>
                      {new Date(0, m - 1).toLocaleString("default", {
                        month: "long",
                      })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Year</label>
              <Input
                type="number"
                placeholder="Enter Year (e.g. 2026)"
                value={payload.year}
                onChange={(e) =>
                  setPayload({ ...payload, year: e.target.value })
                }
              />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600" onClick={handleGenerate}>
              Generate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GenrateSalarySlip;

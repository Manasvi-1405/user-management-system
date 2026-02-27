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
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

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

    dispatch(genrateSalarySlip(finalPayload))
      .unwrap()
      .then((res) => {
        if (res.status === 200) {
          toast.success("Salary Slip Generated 🚀");
          setOpen(false);
          setPayload({ month: "", year: "" });
        }
      })
      .catch((er) => {
        if (er) {
          toast.error(er.data.message);
        }
      });
  };

  useEffect(() => {
    dispatch(getUsers())
      .unwrap()
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
        }
      })
      .catch(() => {});
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 space-y-6 relative overflow-hidden">

      {/* Background Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-300 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-blue-300 opacity-20 rounded-full blur-3xl animate-pulse"></div>

      {/* Header */}
      <div className="relative flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 text-white shadow-lg hover:scale-110 hover:rotate-6 transition duration-500">
          <Users className="w-6 h-6" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Generate Salary Slip
        </h1>
      </div>

      {/* Card */}
      <Card className="rounded-3xl bg-white/70 backdrop-blur-xl shadow-2xl border border-white/40 hover:shadow-indigo-200 transition-all duration-500">
        <CardHeader>
          <CardTitle className="text-xl font-semibold bg-linear-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Employee List
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-inner">
            <Table>
              <TableHeader className="bg-linear-to-br from-indigo-500 to-purple-600 text-white">
                <TableRow>
                  <TableHead className="text-white">Name</TableHead>
                  <TableHead className="text-white">Email</TableHead>
                  <TableHead className="text-right text-white">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    className="hover:bg-indigo-50 hover:scale-[1.01] transition gap-2 duration-300"
                  >
                    <TableCell className="font-semibold text-gray-700">
                      {user.name}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {user.email}
                    </TableCell>
                    <TableCell className="text-right flex justify-end">
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedUser(user);
                          setOpen(true);
                        }}
                        className="flex items-center gap-2 rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 text-white shadow-md hover:shadow-indigo-400/50 hover:scale-105 active:scale-95 transition-all duration-300"
                      >
                        <FileText className="w-4 h-4" />
                        Generate Slip
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/40">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold bg-linear-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Generate Salary Slip for {selectedUser?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 mt-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Month
              </label>
              <Select
                value={payload.month}
                onValueChange={(value) =>
                  setPayload({ ...payload, month: value })
                }
              >
                <SelectTrigger className="w-full rounded-xl bg-white/90 backdrop-blur-md border border-gray-200 hover:border-indigo-400 focus:ring-2 focus:ring-indigo-400 transition-all duration-300">
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  {["1","2","3","4","5","6","7","8","9","10","11","12"].map((m) => (
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
              <label className="text-sm font-medium text-gray-700">
                Year
              </label>
              <Input
                type="number"
                placeholder="Enter Year (e.g. 2026)"
                value={payload.year}
                onChange={(e) =>
                  setPayload({ ...payload, year: e.target.value })
                }
                className="rounded-xl border-gray-200 focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              />
            </div>
          </div>

          <DialogFooter className="pt-6 flex gap-3">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="rounded-xl hover:bg-gray-100 transition"
            >
              Cancel
            </Button>

            <Button
              className="rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg hover:shadow-indigo-400/50 hover:scale-105 active:scale-95 transition-all duration-300"
              onClick={handleGenerate}
            >
              Generate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GenrateSalarySlip;
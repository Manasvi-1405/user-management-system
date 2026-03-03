import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../../redux-store/user-reducers/userSlice";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DocumentList = ({ setSelectedUser }) => {
  const [searchMembers, setSearchMembers] = useState("");
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.users);
  const navigate=useNavigate()
  useEffect(() => {
    dispatch(getUsers())
      .unwrap()
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  // Filter users
  const filteredUsers = users?.filter((user) =>
    user.name?.toLowerCase().includes(searchMembers.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-8 text-center">
        <p className="text-gray-500">Loading members...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Team Members
          </h2>
          <p className="text-sm text-gray-500">
            {filteredUsers?.length || 0} members found
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search by name..."
          value={searchMembers}
          onChange={(e) => setSearchMembers(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredUsers?.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user._id}>
                  
                  {/* Name */}
                  <TableCell className="font-medium">
                    {user.name}
                  </TableCell>

                  {/* Email */}
                  <TableCell>
                    {user.email}
                  </TableCell>

                  {/* Role */}
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </TableCell>

                  {/* Action */}
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                       onClick={() => navigate(`/document/${user._id}`)}
                    >
                      Get Document
                    </Button>
                  </TableCell>

                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                  No members found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DocumentList;
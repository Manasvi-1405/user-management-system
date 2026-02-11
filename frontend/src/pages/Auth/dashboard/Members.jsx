import React, { useEffect, useState } from "react";
import { employeeData } from "../../../utils/employeeData";
import {useDispatch} from "react-redux"
import { getUsers } from "../../../redux-store/user-reducers/userSlice";

const Members = ({ setSelectedUser }) => {
  const [searchMembers, setSearchMembers] = useState("");
  const dispatch=useDispatch()

  const filteredData = employeeData.filter((employee) =>
    employee.name.toLowerCase().includes(searchMembers.toLowerCase())
  );
useEffect(() => {
  dispatch(getUsers())
    .unwrap()
    .then((res) => {
      console.log("res", res);
    })
    .catch((err) => {
      console.log("err", err);
    });
}, [dispatch]);


return (
    <>
      <h3 className="text-lg mb-4 text-white">Members</h3>

      <input
        className="border-gray-700 border px-3 py-1 rounded-md outline-none w-full mb-4"
        placeholder="search by name"
        value={searchMembers}
        onChange={(e) => setSearchMembers(e.target.value)}
      />

      <table className="w-full text-sm">
        <thead className="text-gray-400 border-b border-gray-700">
          <tr className="flex justify-evenly">
            <th>Name</th>
            <th>Status</th>
            <th>Rolled</th>
            <th>Lead Assigned</th>
            <th>Completed Lead</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((employee, index) => (
              <tr
                key={index}
                className="border-b border-gray-800 text-gray-100 flex justify-evenly cursor-pointer hover:bg-gray-800"
              >
                {/* 👇 CLICK HERE */}
                <td
                  className="py-3 text-blue-400 underline"
                  onClick={() => setSelectedUser(employee.name)}
                >
                  {employee.name}
                </td>

                <td className="py-3 text-lime-400">
                  {employee.status}
                </td>
                <td className="py-3">70%</td>
                <td className="py-3">{employee.leadAssigned}</td>
                <td className="py-3">{employee.completedLeads}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-3 text-center text-gray-400 w-full">
                No members found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Members;

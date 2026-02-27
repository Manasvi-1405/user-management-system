import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const SalaryManagement = () => {
  const [userId, setUserId] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [salaryData, setSalaryData] = useState(null);

  const [formData, setFormData] = useState({
    annual: "",
    basic: "",
    hra: "",
    conveyance: "",
    medical: "",
    special: "",
    bonus: "",
    gratuity: "",
    pf: "",
    insurance: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ SET SALARY
  const handleSetSalary = async () => {
    try {
      const payload = {
        ctc: {
          annual: Number(formData.annual),
          breakup: {
            basic: Number(formData.basic),
            hra: Number(formData.hra),
            conveyance: Number(formData.conveyance),
            medical: Number(formData.medical),
            special: Number(formData.special),
            bonus: Number(formData.bonus),
            gratuity: Number(formData.gratuity),
            pf: Number(formData.pf),
            insurance: Number(formData.insurance),
          },
        },
      };

      const res = await axios.post(
        `/api/salary/set/${userId}`,
        payload
      );

      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error setting salary");
    }
  };

  // ✅ GET SALARY
  const handleGetSalary = async () => {
    try {
      const res = await axios.get(`/api/salary/user/${userId}`);
      setSalaryData(res.data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error fetching salary");
    }
  };

  // ✅ GENERATE SLIP
  const handleGenerateSlip = async () => {
    try {
      const res = await axios.get(
        `/api/salary/slip/${userId}?month=${month}&year=${year}`
      );
      setSalaryData(res.data.data);
      toast.success("Salary Slip Generated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error generating slip");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-r from-indigo-50 via-purple-50 to-pink-50 p-8">

      {/* Header */}
      <h1 className="text-4xl font-extrabold mb-8 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
        Salary Management
      </h1>

      {/* USER ID INPUT */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border p-3 rounded-lg w-full"
        />
      </div>

      {/* SET SALARY FORM */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4 text-indigo-600">
          Set / Update Salary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.keys(formData).map((key) => (
            <input
              key={key}
              type="number"
              name={key}
              placeholder={key.toUpperCase()}
              value={formData[key]}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />
          ))}
        </div>

        <button
          onClick={handleSetSalary}
          className="mt-4 px-6 py-2 bg-linear-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-md"
        >
          Save Salary
        </button>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleGetSalary}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md"
        >
          View Salary
        </button>

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border p-2 rounded-lg w-24"
          />
          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border p-2 rounded-lg w-28"
          />
          <button
            onClick={handleGenerateSlip}
            className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md"
          >
            Generate Slip
          </button>
        </div>
      </div>

      {/* DISPLAY RESULT */}
      {salaryData && (
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold text-purple-600 mb-4">
            Salary Details
          </h2>

          <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto">
            {JSON.stringify(salaryData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default SalaryManagement;
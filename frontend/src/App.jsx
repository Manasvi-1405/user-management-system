import { Routes, Route } from "react-router-dom";
import UserDashboardLayout from "./layout/UserDashboardLayout";
import AllLeads from "./pages/Auth/dashboard/AllLeads";
import Home from "./pages/Auth/dashboard/Home";
import Attendance from "./pages/Auth/dashboard/Attendance";
import Performance from "./pages/Auth/dashboard/Performance";
import Members from "./pages/Auth/dashboard/Members";
import Design from "./pages/Auth/dashboard/Design";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/forgotPassword";
import ResetPassword from "./pages/Auth/resetPassword";
import Settings from "./pages/Auth/dashboard/settingsPage";
import { Toaster } from "sonner";
import ProfileSection from "./pages/Auth/dashboard/ProfileSection";
import PendingLeavesTable from "./pages/Auth/dashboard/hr/PendingLeaves";
import ManageHolidays from "./pages/Auth/dashboard/hr/ManageHolidays";
import GenrateSalarySlip from "./pages/Auth/dashboard/hr/GenrateSalarySlip";
import PayrollSummary from "./pages/Auth/dashboard/hr/PayrollSummary";
import AttendanceManagement from "./pages/Auth/dashboard/AttendanceManagement";

function App() {
  return (
    <div>
      <Toaster></Toaster>
         <Routes>
      
      <Route path="/" element={<UserDashboardLayout />}>
        <Route index element={<Home />} />
        <Route path="all-leads" element={<AllLeads />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="performance" element={<Performance />} />
        <Route path="members" element={<Members />} />
        <Route path="design" element={<Design />} />
        <Route path="Settings" element={<Settings></Settings>} />
        <Route path="pending-leaves" element={<PendingLeavesTable></PendingLeavesTable>}/>
        <Route path="manage-holidays" element={<ManageHolidays></ManageHolidays>}/>
        <Route path="generate-salary-slip" element={<GenrateSalarySlip></GenrateSalarySlip>}/>
        <Route path="payroll-summary" element={<PayrollSummary></PayrollSummary>}/>
        <Route path="attendance-management" element={<AttendanceManagement></AttendanceManagement>}/>
        {/* <Route path="update-leave" element={<UpdateLeave></UpdateLeave>}/> */}

      </Route>

      <Route path="/register" element={<Register></Register>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/forgotpassword" element={<ForgotPassword></ForgotPassword>}></Route>
      <Route path="/reset-password" element={<ResetPassword></ResetPassword>}></Route>
      <Route path="/signout" element={<ProfileSection />} />
      

    </Routes>
    </div>
 
  );
}

export default App;

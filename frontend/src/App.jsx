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
import Report from "./pages/Auth/dashboard/attendance-management/Report";
import Analytics from "./pages/Auth/dashboard/attendance-management/Analytics";
import SetSalary from "./pages/Auth/dashboard/salary-management/SetSalary";
import SalaryList from "./pages/Auth/dashboard/salary-management/SalaryList";
import MySalary from "./pages/Auth/dashboard/salary-management/MySalary";
import UploadDocument from "./pages/Auth/dashboard/UploadDocument ";
import DocumentList from "./pages/Auth/dashboard/hr/DocumentList";
import SingleUserDocuemt from "./pages/Auth/dashboard/hr/SingleUserDocuemt";

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
          <Route
            path="pending-leaves"
            element={<PendingLeavesTable></PendingLeavesTable>}
          />
          <Route
            path="manage-holidays"
            element={<ManageHolidays></ManageHolidays>}
          />
          <Route
            path="generate-salary-slip"
            element={<GenrateSalarySlip></GenrateSalarySlip>}
          />
          <Route
            path="payroll-summary"
            element={<PayrollSummary></PayrollSummary>}
          />
          <Route path="attendance-report" element={<Report></Report>} />
          <Route
            path="atttendance-anlytics"
            element={<Analytics></Analytics>}
          />
          <Route path="set-salary" element={<SetSalary></SetSalary>} />
          <Route path="salary-list" element={<SalaryList></SalaryList>} />
          <Route path="my-salary" element={<MySalary></MySalary>} />
          <Route
            path="upload-documents"
            element={<UploadDocument></UploadDocument>}
          />
          <Route path="document-list" element={<DocumentList></DocumentList>} />
          <Route
            path="document/:userId"
            element={<SingleUserDocuemt></SingleUserDocuemt>}
          />
          {/* <Route path="update-leave" element={<UpdateLeave></UpdateLeave>}/> */}
        </Route>

        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route
          path="/forgotpassword"
          element={<ForgotPassword></ForgotPassword>}
        ></Route>
        <Route
          path="/reset-password"
          element={<ResetPassword></ResetPassword>}
        ></Route>
        <Route path="/signout" element={<ProfileSection />} />
      </Routes>
    </div>
  );
}

export default App;

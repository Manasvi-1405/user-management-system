import { Routes, Route } from "react-router-dom";
import UserDashboardLayout from "./layout/UserDashboardLayout";
import AllLeads from "./pages/Auth/dashboard/AllLeads";
import Home from "./pages/Auth/dashboard/Home";
import Attendance from "./pages/Auth/dashboard/Attendance";
import AssignLeads from "./pages/Auth/dashboard/AssignLeads";
import Members from "./pages/Auth/dashboard/Members";
import Design from "./pages/Auth/dashboard/Design";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import LeadTimelineChart from "./pages/Auth/dashboard/LeadTimelineChart";
import ForgotPassword from "./pages/Auth/forgotPassword"
import ResetPassword from "./pages/Auth/resetPassword";
import Settings from "./pages/Auth/dashboard/settingsPage";



function App() {
  return (
    <Routes>
      <Route path="/" element={<UserDashboardLayout />}>
        <Route index element={<Home />} />
         <Route path="all-leads" element={< AllLeads/>} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="assign-leads" element={<AssignLeads />} /> 
        <Route path="member" element={<Members />} />
        <Route path="design" element={<Design />} />
        <Route path="Settings" element={<Settings></Settings>} />
        <Route path="leadtimeline" element={<LeadTimelineChart />} />
      </Route>

      <Route path="/register" element={<Register></Register>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/forgotpassword" element={<ForgotPassword></ForgotPassword>}></Route>
      <Route path="/reset-password" element={<ResetPassword></ResetPassword>}></Route>
    </Routes>
  );
}

export default App;

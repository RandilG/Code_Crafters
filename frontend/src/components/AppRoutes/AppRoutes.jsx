import { Route, Routes } from "react-router-dom";
import Dashboard from "../../Pages/FinancialAdmin/Dashboard/Dashboard";
import Notification from "../../Pages/Notification/Notification";
import Payments from "../../Pages/FinancialAdmin/Payments/Payments";
import Revenue from "../../Pages/FinancialAdmin/Revenue/Revenue";
import LogHome from "../../Pages/LogHome/LogHome";
import Signup from "../../Pages/SuperAdmin/Signup/Signup";
import Verification from "../../Pages/SuperAdmin/SignupVerification/SignupVerification";
import ForgotPassword from "../../Pages/ForgotPassword/ForgotPassword";
import ChangePassword from "../../Pages/Common/ChangePassword/ChangePassword";
import FinancialAdminLogin from "../../Pages/FinancialAdmin/FinancialAdminLogin/FinancialAdminLogin";
import AdminProfile from "../../Pages/Common/AdminProfile/AdminProfile";
import LayoutPage from "../LayoutPage/LayoutPage";
import SuperAdminDashboard from "../../Pages/SuperAdmin/Dashboard/SuperAdminDashboard";
import SuperAdminLogin from "../../Pages/SuperAdmin/SuperAdminLogin/SuperAdminLogin";
import SuperAdminLayoutPage from "../../Pages/SuperAdmin/LayoutPage/LayoutPage";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LogHome />} />
            <Route path="/LogHome" element={<LogHome />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/financialadminloging" element={<FinancialAdminLogin />} />            
            <Route path="/Verification" element={<Verification /> } />
            <Route path="/financialAdmin" element={<LayoutPage />}>
                <Route path="Dashboard" element={<Dashboard />} />
                <Route path="Revenue" element={<Revenue />} />
                <Route path="Notification" element={<Notification />} />
                <Route path="Payments" element={<Payments />} />
                <Route path="UserProfile" element={<AdminProfile/>}/>
            </Route>
            <Route path="/SuperAdminLogin" element={<SuperAdminLogin /> } /> 
            <Route path="/SuperAdmin" element={<SuperAdminLayoutPage />}>                      
                <Route path="SuperAdminDashboard" element={<SuperAdminDashboard /> } />
                <Route path="SuperAdminUserProfile" element={<AdminProfile/>}/>
                <Route path="FinancialAdminRevenue" element={<Revenue />} />
                <Route path="FinancialAdminNotification" element={<Notification />} />
                <Route path="FinancialAdminPayments" element={<Payments />} />
                <Route path="Notification" element={<Notification />} />
                <Route path="Signup" element={<Signup />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;

import { Route, Routes } from "react-router-dom";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import Notification from "../../Pages/Notification/Notification";
import Payments from "../../Pages/Payments/Payments";
import FinancialAdmins from "../../Pages/Income/Income";
import LogHome from "../../Pages/LogHome/LogHome";
import Loging from "../../Pages/Login/Loging";
import Signup from "../../Pages/Signup/Signup";
import Verification from "../../Pages/Verification/Verification";
import UserProfile from "../../Pages/UserProfile/userProfile";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LogHome />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/LogHome" element={<LogHome />} />
            <Route path="/Loging" element={<Loging />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Verification" element={<Verification /> } />                      
            <Route path="/Revenue" element={<FinancialAdmins />} />
            <Route path="/Notification" element={<Notification />} />
            <Route path="/Payments" element={<Payments />} />
            <Route path="/UserProfile" element={<UserProfile /> } />
                      
        </Routes>
    );
}

export default AppRoutes;

import { Route, Routes } from "react-router-dom";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import Notification from "../../Pages/Notification/Notification";
import Payments from "../../Pages/Payments/Payments";
import Settings from "../../Pages/Settings/Setting";
import FinancialAdmins from "../../Pages/Income/Income";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Income" element={<FinancialAdmins />} />
            <Route path="/Notification" element={<Notification />} />
            <Route path="/Payments" element={<Payments />} />
            <Route path="/Settings" element={<Settings />} />


        </Routes>
    );
}

export default AppRoutes;

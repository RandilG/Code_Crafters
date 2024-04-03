import { Route, Routes } from "react-router-dom";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import Notification from "../../Pages/Notification/Notification";
import Payments from "../../Pages/Payments/Payments";
import Settings from "../../Pages/Settings/Setting";
import FinancialAdmins from "../../Pages/Financial/Admin";
// import Chat from "../../Pages/Chat/Chat";
// import ProfileManagementAdmins from "../../Pages/Admins/Profile/Admin";
// import NewJobs from "../../Pages/Jobs/NewJobs/Jobs";
// import CompletedJobs from "../../Pages/Jobs/CompletedJobs/CompletedJobs";
// import JobReviews from "../../Pages/Jobs/JobReviews/Admin";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Financial" element={<FinancialAdmins />} />
            {/* <Route path="/Profile" element={<ProfileManagementAdmins />} />
            <Route path="/New-Jobs" element={<NewJobs />} />
            <Route path="/Completed-Jobs" element={<CompletedJobs />} />
            <Route path="/JobReviews" element={<JobReviews />} /> */}
            <Route path="/Notification" element={<Notification />} />
            {/* <Route path="/Chat" element={<Chat />} /> */}
            <Route path="/Payments" element={<Payments />} />
            <Route path="/Settings" element={<Settings />} />


        </Routes>
    );
}

export default AppRoutes;

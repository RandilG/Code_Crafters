import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//pages
import ProfileAdminLayoutPage from './pages/ProfileAdminLayoutPage/ProfileAdminLayoutPage';

//components
import Dashboard from './components/Dashboard/Dashboard';
import ProfileRequests from './components/ProfileRequests/ProfileRequests';
import SeeReview from './components/SeeReview/SeeReview';
import HoldReview from './components/HoldReview/HoldReview';
import DeactivatedAccounts from './components/DeactivatedAccounts/DeactivatedAccounts';
import DeleteReview from './components/DeleteReview/DeleteReview';
import AccountSettings from './components/AccountSettings/AccountSettings';
import ActiveViewComponent from './components/ActiveViewComponent/ActiveViewComponent ';
import DeclinedViewComponent from './components/DeclinedViewComponent/DeclinedViewComponent ';
import JobSeekerProfileRequests from './components/JobSeekerProfileRequests/JobSeekerProfileRequests'
import JobSeekerActiveProfiles from './components/JobSeekerActiveProfiles/JobSeekerActiveProfiles';
import JobSeekerDeclinedProfiles from './components/JobSeekerDeclinedProfiles/JobSeekerDeclinedProfiles';
import JobSeekerDeactivatedProfiles from './components/JobSeekerDeactivatedProfiles/JobSeekerDeactivatedProfiles';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ProfileAdminLayoutPage />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='profilerequests' element={<ProfileRequests />} />
          <Route path='seereview' element={<SeeReview />} />
          <Route path='holdreview' element={<HoldReview />} />
          <Route path='deletereview' element={<DeleteReview />} /> 
          <Route path='accountsettings' element={<AccountSettings />} />
          <Route path='viewactiveprofiles' element={<ActiveViewComponent />} />
          <Route path='viewdeclinedprofiles' element={<DeclinedViewComponent />} />
          <Route path='deactivatedprofile' element={<DeactivatedAccounts />} />
          <Route path='jobseekerrequests' element={<JobSeekerProfileRequests />} />
          <Route path='activejobseekers' element={<JobSeekerActiveProfiles />} />
          <Route path='declinedjobseekers' element={<JobSeekerDeclinedProfiles />} />
          <Route path='deactivatedjobseekers' element={<JobSeekerDeactivatedProfiles/>} />
        
        </Route>
      </Routes>
    </Router> 
  );
}

export default App;

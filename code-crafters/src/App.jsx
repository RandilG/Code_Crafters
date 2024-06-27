import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//pages
import ProfileAdminLayoutPage from './pages/ProfileAdminLayoutPage/ProfileAdminLayoutPage';

//components
import Dashboard from './components/Dashboard/Dashboard';
import ProfileRequests from './components/ProfileRequests/ProfileRequests';
import DeactivatedAccounts from './components/DeactivatedAccounts/DeactivatedAccounts';
import DeleteReview from './components/DeleteReview/DeleteReview';
import AccountSettings from './components/AccountSettings/AccountSettings';
import ActiveViewComponent from './components/ActiveViewComponent/ActiveViewComponent ';
import DeclinedViewComponent from './components/DeclinedViewComponent/DeclinedViewComponent ';
import JobSeekerProfileRequests from './components/JobSeekerProfileRequests/JobSeekerProfileRequests'
import JobSeekerActiveProfiles from './components/JobSeekerActiveProfiles/JobSeekerActiveProfiles';
import JobSeekerDeclinedProfiles from './components/JobSeekerDeclinedProfiles/JobSeekerDeclinedProfiles';
import JobSeekerDeactivatedProfiles from './components/JobSeekerDeactivatedProfiles/JobSeekerDeactivatedProfiles';
import JobPosterRatings from './components/JobPosterRatings/JobPosterRatings';
import JobSeekerRatings from './components/JobSeekerRatings/JobSeekerRatings';
import ProfileAdminLogin from './components/ProfileAdminLogin/ProfileAdminLogin';
import ChangePassword from './components/ChangePassword/ChangePassword';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Profile from './components/AdminProfile/AdminProfile';

function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<ProfileAdminLogin />}/>
      <Route path = '/forgotpassword' element={<ForgotPassword/>}/>
      <Route path='/changepassword' element={<ChangePassword />}/>
        <Route path='/profileadmin' element={<ProfileAdminLayoutPage />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='profilerequests' element={<ProfileRequests />} />
          <Route path='jobeekeravgratings' element={<JobSeekerRatings />} />
          <Route path='jobposteravgratings' element={<JobPosterRatings />} />
          <Route path='deletereview' element={<DeleteReview />} /> 
          <Route path='accountsettings' element={<AccountSettings />} />
          <Route path='viewactiveprofiles' element={<ActiveViewComponent />} />
          <Route path='viewdeclinedprofiles' element={<DeclinedViewComponent />} />
          <Route path='deactivatedprofile' element={<DeactivatedAccounts />} />
          <Route path='jobseekerrequests' element={<JobSeekerProfileRequests />} />
          <Route path='activejobseekers' element={<JobSeekerActiveProfiles />} />
          <Route path='declinedjobseekers' element={<JobSeekerDeclinedProfiles />} />
          <Route path='deactivatedjobseekers' element={<JobSeekerDeactivatedProfiles/>} />
          <Route path='profile' element={<Profile/>}/>
         
        
        </Route>
      </Routes>
    </Router> 
  );
}

export default App;

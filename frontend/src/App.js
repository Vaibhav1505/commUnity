import './App.css';
import { Routes, Route } from 'react-router-dom';
import SigninPage from './Pages/Signin-Signup/signinPage.js';
import SignupPage from './Pages/Signin-Signup/signupPage.js';
import PeopleListPage from './Pages/Dashboard/Sidebar/People/PeopleListPage.js'
import Dashboard from './Pages/Dashboard/index'
import DashboardContent from './Pages/Dashboard/Content/index.js';
import ProjectListPage from './Pages/Dashboard/Content/Projects/index.js';
import UserProfile from './Pages/Dashboard/Sidebar/Account/userProfilePage.js';
import EventMeetingDetail from './Pages/Dashboard/Content/EventMeeting/Events/EventDetail.js/index.js';
import ProjectDetails from './Pages/Dashboard/Content/Projects/ProjectDetails/index.js';
import ChatPage from './Pages/Dashboard/Chat/index.js';
import LandingPage from './Pages/LandingPage/index.js';
import ProtectedRoute from './helpers/protectedRoute.js';
import CallPage from './Pages/Dashboard/Call/index.js';
import MailPage from './Pages/Dashboard/Mail/index.js';
import TeamsPage from './Pages/Dashboard/Teams/index.js';

function App() {


  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path='/' element={<LandingPage />} />
      <Route path='/signin' element={<SigninPage />} />
      <Route path='/signup' element={<SignupPage />} />


      {/* PROTECTED ROUTES */}
      <Route path='/dashboard'
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>}>

        <Route index element={<DashboardContent />} />
        <Route path='people' element={<PeopleListPage />} />
        <Route path='eventsAndMeetings' element={<EventMeetingDetail />} />
        <Route path='project'>
          <Route index element={<ProjectListPage />} />
          <Route path=':projectId' element={<ProjectDetails />} />
        </Route>
        <Route path='teams' element={<TeamsPage />} />
        <Route path='chats' element={<ChatPage />} />
        <Route path='call' element={<CallPage/>}/>
        <Route path='mail' element={<MailPage/>}/>
        <Route path='userDetail/:userId' element={<UserProfile />} />
      </Route>

    </Routes>
  );
}

export default App;

import './App.css';
import { Routes, Route } from 'react-router-dom';
import SigninPage from './Pages/Signin-Signup/signinPage';
import SignupPage from './Pages/Signin-Signup/signupPage';
import LandingPage from './Pages/LandingPage/landingPage';
import PeopleListPage from './Pages/Dashboard/Sidebar/People/PeopleListPage'
import Dashboard from './Pages/Dashboard/index'
import DashboardContent from './Pages/Dashboard/Content';
import ProjectListPage from './Pages/Dashboard/Content/Projects';
import TeamsPage from './Pages/Dashboard/Teams/teamsPage';
import UserProfile from './Pages/Dashboard/Sidebar/Account/userProfilePage';
import EventMeetingDetail from './Pages/Dashboard/Content/EventMeeting/Events/EventDetail.js/index.js';
import ProjectDetails from './Pages/Dashboard/Content/Projects/ProjectDetails/index.js';
import ChatPage from './Pages/Dashboard/Chat/index.js';

function App() {


  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/signin' element={<SigninPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/dashboard' element={<Dashboard />}>
        <Route index element={<DashboardContent />} />
        <Route path='people' element={<PeopleListPage />} />
        <Route path='eventsAndMeetings' element={<EventMeetingDetail />} />
        <Route path='project'>
          <Route index element={<ProjectListPage />} />
          <Route path=':projectId' element={<ProjectDetails />} />
        </Route>
        <Route path='teams' element={<TeamsPage />} />
        <Route path='chats' element={<ChatPage/>}/>
        <Route path='userDetail/:userId' element={<UserProfile />} />
      </Route>

    </Routes>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./Login";
import Navbar from "./Navbar";
import ProfilePage from "./UserProfilePage"
import Home from "./Home"
// import UserDetails from "./UserDetails";
// import Users from "./Users";
import Projects from "./Projects";

// import ProjectDetails from "./ProjectDetails";
import ProjectSubmission from "./ProjectSubmission";
import BountyDetailsPage from "./BountyDetailsPage";

// import PendingProjects from "./PendingProjects";
import GenUser from "./GenUserProfile";
// import SupraCoderDetails from "./SupraCoderDetails";
import ChatPage from "./ChatPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/coder-profile" element={<ProfilePage />} />
        {/* <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetails />} /> */}
        <Route path="/projects" element={<Projects />} />

        {/* <Route path="/projects/:id" element={<ProjectDetails />} /> */}
        <Route path="/requests" element={<ProjectSubmission />} />
        {/* <Route path="/pending_projects/:id" element={<PendingProjects />} /> */}

        <Route path="/projects/:projectId" element={<BountyDetailsPage />} />
        <Route path="/bounties/:bountyId/chat" element={<ChatPage />} />
        {/* <Route path="/pending_projects/:id" element={<PendingProjects />} />  */}

        <Route path="/user-profile" element={<GenUser />} />
        {/* <Route path="/supracoders/:id" element={<SupraCoderDetails />} /> */}


      </Routes>
    </Router>
  );
}

export default App;

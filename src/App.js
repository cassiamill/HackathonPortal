import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

// === COMMON COMPONENTS ===
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// === AUTH & UTILITY PAGES ===
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import VerificationPage from "./pages/VerificationPage"; 
import AboutPage from "./pages/AboutPage"; 
import ContactPage from "./pages/ContactPage"; 

// === CORE PAGES (COMMON/STUDENT) ===
import HomePage from "./pages/HomePage";
import FullSchedulePage from "./pages/FullSchedulePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import StudentDashboard from "./pages/StudentDashboard";
import StudentProfilePage from "./pages/StudentProfilePage";
import TeamPage from "./pages/TeamPage"; // Acts as Team Workspace
import TeamSelectionPage from "./pages/TeamSelectionPage"; // RENAMED and UNIFIED component for Create/Join
import TeamUpdatesPage from "./pages/TeamUpdatesPage"; 
import MentorChatPage from "./pages/MentorChatPage"; 
import SurveyPage from "./pages/SurveyPage"; // NEW: Post-Hackathon Feedback (Req 7.0)
import CertificatePage from "./pages/CertificatePage"; // NEW: Certificate Download (Req 8.0)


// === COORDINATOR PAGES ===
import CoordinatorDashboard from "./pages/CoordinatorDashboard"; 
import PostHackathonReports from "./pages/PostHackathonReports"; 
import AdminScheduleEditor from "./pages/AdminScheduleEditor"; 
import JudgeRubricEditor from "./pages/JudgeRubricEditor"; // NEW: Rubric Customization (Req 3.0)

// === JUDGE PAGES ===
import JudgeDashboard from "./pages/JudgeDashboard"; 
import JudgeSubmissionsList from "./pages/JudgeSubmissionsList";
import JudgeGradingView from "./pages/JudgeGradingView";
import JudgeTeamHistory from "./pages/JudgeTeamHistory";

// === MENTOR PAGES ===
import MentorDashboard from "./pages/MentorDashboard";
import MentorAssignedTeams from "./pages/MentorAssignedTeams";
import MentorBriefingView from "./pages/MentorBriefingView";
import MentorTeamUpdates from "./pages/MentorTeamUpdates";
import MentorProfilePage from "./pages/MentorProfilePage";


function App() {
    return (
        <Router>
            <Navbar />
            <div className="main-content-area"> {/* Container for main content */}
                <Routes>
                    
                    {/* === PUBLIC / AUTH ROUTES === */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                    <Route path="/verify-email" element={<VerificationPage />} />
                    
                    {/* === UTILITY & INFO ROUTES === */}
                    <Route path="/schedule" element={<FullSchedulePage />} />
                    <Route path="/leaderboard" element={<LeaderboardPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />

                    {/* === STUDENT ROUTES & GENERAL POST-HACKATHON === */}
                    <Route path="/student/dashboard" element={<StudentDashboard />} />
                    <Route path="/student/profile" element={<StudentProfilePage />} />
                    <Route path="/student/team-select" element={<TeamSelectionPage />} /> {/* RENAMED ROUTE */}
                    <Route path="/student/team" element={<TeamPage />} /> 
                    <Route path="/student/updates" element={<TeamUpdatesPage />} />
                    <Route path="/chat/:teamId" element={<MentorChatPage />} /> 

                    {/* NEW POST-HACKATHON ROUTES (Req 7.0 & 8.0) */}
                    <Route path="/survey" element={<SurveyPage />} />
                    <Route path="/certificate" element={<CertificatePage />} />

                    {/* === COORDINATOR/ADMIN ROUTES === */}
                    <Route path="/admin/dashboard" element={<CoordinatorDashboard />} />
                    <Route path="/admin/schedule-edit" element={<AdminScheduleEditor />} /> 
                    <Route path="/admin/reports" element={<PostHackathonReports />} />
                    
                    {/* NEW COORDINATOR ROUTE (Req 3.0) */}
                    <Route path="/admin/rubric-editor" element={<JudgeRubricEditor />} />
                    
                    {/* === JUDGE ROUTES === */}
                    <Route path="/judge/dashboard" element={<JudgeDashboard />} />
                    <Route path="/judge/submissions" element={<JudgeSubmissionsList />} />
                    <Route path="/judge/grade/:teamId" element={<JudgeGradingView />} />
                    <Route path="/judge/history/:teamId" element={<JudgeTeamHistory />} />

                    {/* === MENTOR ROUTES === */}
                    <Route path="/mentor/dashboard" element={<MentorAssignedTeams />} />
                    <Route path="/mentor/teams" element={<MentorAssignedTeams />} />
                    <Route path="/mentor/briefing" element={<MentorBriefingView />} />
                    <Route path="/mentor/updates/:teamId" element={<MentorTeamUpdates />} />
                    <Route path="/mentor/profile" element={<MentorProfilePage />} />

                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
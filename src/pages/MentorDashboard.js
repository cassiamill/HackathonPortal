import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config"; // Import auth for user info
import "./MentorDashboard.css";
// STUDENT TODO: Import your Navbar/Footer components here later

// Mock data to simulate fetching a mentor's assignments from MongoDB
const mockMentorData = {
    mentorName: "Dr. Evelyn Reed",
    assignedTeams: [
        { id: "T001", name: "The Code Ninjas", projectStatus: "Working on MVP", lastUpdate: "2 hours ago", link: "/mentor/team/T001" },
        { id: "T002", name: "Innovators United", projectStatus: "Need help with API", lastUpdate: "Yesterday", link: "/mentor/team/T002" },
        { id: "T003", name: "Future Thinkers", projectStatus: "Blueprint submitted", lastUpdate: "Day 1 End", link: "/mentor/team/T003" },
    ],
    briefingMaterials: [
        { name: "Challenge Document (2025)", type: "PDF", link: "/files/challenge.pdf" },
        { name: "Judging Criteria Overview", type: "DOCX", link: "/files/criteria.docx" },
    ],
};

export default function MentorDashboard() {
    const [mentorInfo, setMentorInfo] = useState(null);
    const navigate = useNavigate();

    // 📌 Simple effect to simulate fetching data and checking login
    useEffect(() => {
        // STUDENT TODO: In the final app, this must check if the role is 'Mentor'
        const user = auth.currentUser;
        if (!user) {
            navigate("/login");
            return;
        }

        // Simulate successful data load
        setMentorInfo(mockMentorData);

        // Fetching team data logic goes here later (using user.uid)
        // axios.get(API_BASE_URL/mentor/dashboard?uid=${user.uid})
    }, [navigate]);

    // Handle button click for a team's Q&A/Chat
    const handleQnA = (teamId) => {
        // Navigates to the shared chat interface for the specific team
        navigate(`/mentor/chat/${teamId}`);
    };

    if (!mentorInfo) {
        return <div className="loading-container">Loading Mentor Dashboard...</div>;
    }

    return (
        <div className="dashboard-container mentor-container">
            <h1 className="dashboard-title">👋 Welcome, {mentorInfo.mentorName}</h1>
            <p className="dashboard-subtitle">Your Hackathon Guide Portal. Thank you for your critical role!</p>

            {/* 1. Assigned Teams Section */}
            <section className="section assigned-teams-section">
                <h3 className="section-title">Assigned Teams ({mentorInfo.assignedTeams.length})</h3>
                <div className="team-list">
                    {mentorInfo.assignedTeams.map((team) => (
                        <div key={team.id} className="team-card">
                            <h4>{team.name}</h4>
                            <p className="team-status">Status: <strong>{team.projectStatus}</strong></p>
                            <p className="team-update">Last Update: {team.lastUpdate}</p>
                            {/* Link to the detailed team view (Page 13) */}
                            <Link to={team.link} className="btn-link view-link">View Team Details</Link>
                            {/* Button for the dedicated Q&A feature (Page 13/11 component) */}
                            <button 
                                className="btn-action chat-btn" 
                                onClick={() => handleQnA(team.id)}
                            >
                                Start Q&A
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* 2. Briefing Materials Section */}
            <section className="section briefing-section">
                <h3 className="section-title">Briefing Materials</h3>
                <div className="material-list">
                    {mentorInfo.briefingMaterials.map((material, index) => (
                        <div key={index} className="material-item">
                            <span className="material-name">{material.name} ({material.type})</span>
                            {/* STUDENT TODO: Replace '#' with Cloudinary/S3 link later */}
                            <a href={material.link} target="_blank" rel="noopener noreferrer" className="btn-link download-link">Download</a>
                        </div>
                    ))}
                </div>
            </section>

            {/* STUDENT TODO: Add a Footer component here later */}
        </div>
    );
}
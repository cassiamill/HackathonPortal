import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase/config";
import "./MentorAssignedTeams.css";

// Mentor check email (A simple mock for Mentor role check, replace with real role check)
const MENTOR_EMAIL = "mentor@example.com"; 

// Mock Data for a mentor's assigned teams
const mockAssignedTeams = [
    { teamId: "T001", teamName: "The Code Whisperers", lead: "Alex Johnson", project: "AI-Driven Eco-Route", status: "Active" },
    { teamId: "T005", teamName: "The Debuggers", lead: "Maria Sanchez", project: "Smart Waste Management", status: "Active" },
    { teamId: "T009", teamName: "Innovators Inc.", lead: "Sam Lee", project: "Campus Safety App", status: "Needs Help" },
];

export default function MentorAssignedTeams() {
    const [teams, setTeams] = useState(mockAssignedTeams);
    const [isMentor, setIsMentor] = useState(false);
    const [mentorName, setMentorName] = useState("Mentor Chris");
    const navigate = useNavigate();

    useEffect(() => {
        const user = auth.currentUser;
        
        // 🚨 ACCESS CONTROL: Must be a Mentor
        if (!user || user.email !== MENTOR_EMAIL) {
            navigate("/mentorlogin"); // Redirect to a specialized login/dashboard
            return;
        }
        setIsMentor(true);
        
        // STUDENT TODO: Fetch mentor name and assigned teams from the backend (Req 2.0)
    }, [navigate]);

    if (!isMentor) {
        return <div className="mentor-denied">Access Denied: Mentor Login Required.</div>;
    }

    return (
        <div className="mentor-dashboard-container">
            <h1 className="mentor-title">Welcome, {mentorName}!</h1>
            <p className="mentor-subtitle">Your Assigned Teams - Provide guidance and support during the hackathon.</p>

            <div className="teams-list-wrapper">
                {teams.map(team => (
                    <div key={team.teamId} className={`team-card status-${team.status.toLowerCase().replace(' ', '-')}`}>
                        <div className="team-header">
                            <h2 className="team-name">{team.teamName}</h2>
                            <span className="team-status">{team.status}</span>
                        </div>
                        
                        <p className="team-project">**Project:** {team.project}</p>
                        <p className="team-lead">**Leader:** {team.lead}</p>
                        
                        <div className="team-actions">
                            <Link to={`/mentor/updates/${team.teamId}`} className="action-button updates">
                                View Updates (Req 4.0)
                            </Link>
                            <Link to={`/chat/${team.teamId}`} className="action-button chat">
                                Go to Team Chat (Req 2.0)
                            </Link>
                            <Link to={`/mentor/briefing`} className="action-button briefing">
                                View Briefing &rarr;
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase/config";
import "./MentorTeamUpdates.css";

const MENTOR_EMAIL = "mentor@example.com"; 

// Mock Data for a specific team's updates
const mockTeamUpdates = {
    teamName: "Innovators Inc. (T009)",
    updates: [
        { 
            id: 3, 
            date: "Nov 26, 2025 - Day 3", 
            content: "We completed the core API integration this morning! Moving on to final styling and bug fixes now. The initial architecture is holding up well.",
            attachment: "screenshot_ui_progress.png",
            visibility: "Mentor & Coordinator"
        },
        { 
            id: 2, 
            date: "Nov 25, 2025 - Day 2", 
            content: "We're stuck on the authentication flow; having trouble setting up the Firebase rules. We need a mentor's input on best practices for secure access control.",
            attachment: null,
            visibility: "Mentor Only"
        },
        { 
            id: 1, 
            date: "Nov 24, 2025 - Day 1", 
            content: "Blueprint officially locked down. Focusing on database schema design for the next 12 hours.",
            attachment: "db_schema_diagram.pdf",
            visibility: "Public"
        },
    ],
};

export default function MentorTeamUpdates() {
    const { teamId } = useParams();
    const [teamUpdates, setTeamUpdates] = useState(null);
    const [isMentor, setIsMentor] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = auth.currentUser;
        
        // 🚨 ACCESS CONTROL: Must be a Mentor
        if (!user || user.email !== MENTOR_EMAIL) {
            navigate("/mentorlogin"); 
            return;
        }
        setIsMentor(true);
        
        // STUDENT TODO: Fetch real-time updates for the specified teamId (ensuring visibility filter allows mentor view)
        setTeamUpdates(mockTeamUpdates);
    }, [navigate, teamId]);

    if (!isMentor || !teamUpdates) {
        return <div className="mentor-denied">Loading Team Updates or Access Denied...</div>;
    }

    return (
        <div className="updates-container">
            <h1 className="updates-title">Progress Updates for {teamUpdates.teamName}</h1>
            <p className="updates-subtitle">Review milestones and progress shared by the team (Req 4.0).</p>

            <div className="updates-list">
                {teamUpdates.updates.map(update => (
                    <div key={update.id} className="update-card">
                        <div className="update-header">
                            <span className="update-date">{update.date}</span>
                            <span className="update-visibility">Visibility: **{update.visibility}**</span>
                        </div>
                        
                        <p className="update-content">{update.content}</p>

                        {update.attachment && (
                            <div className="update-attachment">
                                📎 Attachment: 
                                <a href={`/files/${update.attachment}`} target="_blank" rel="noopener noreferrer">
                                    {update.attachment} (View)
                                </a>
                            </div>
                        )}
                        
                        {/* Quick link to chat if the team seems stuck */}
                        {update.content.includes("stuck") && (
                            <div className="mentor-call-to-action">
                                <Link to={`/chat/${teamId}`} className="chat-link-button">
                                    Reply via Team Chat &rarr;
                                </Link>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            
            <p className="updates-footer">
                If the team indicates they need help, please use the Team Chat feature to respond quickly.
            </p>
        </div>
    );
}
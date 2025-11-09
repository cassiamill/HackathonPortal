import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import "./StudentProfilePage.css";

// Mock data to simulate student profile and achievements
const mockProfileData = {
    fullName: "Alex Johnson",
    email: "alex.johnson@guscollege.ca",
    college: "Niagara College - Toronto (NCT)",
    collegeId: "N00123456",
    role: "Student",
    teamName: "The Code Whisperers",
    hackathonHistory: [
        { year: 2024, position: "Top 10 Finalist", project: "Eco-Route Planner" },
    ],
    achievements: [
        { id: 1, name: "First Timer Badge", description: "Completed registration for the first time.", icon: "🌟" },
        { id: 2, name: "Blueprint Master", description: "Submitted Blueprint on time.", icon: "✅" },
        { id: 3, name: "Team Leader", description: "Successfully created and led a team.", icon: "👑" },
    ],
};

export default function StudentProfilePage() {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // STUDENT TODO: Check login and fetch actual user profile data from backend
        const user = auth.currentUser;
        if (!user) {
            navigate("/login");
            return;
        }
        // In the real app, fetch data based on user.uid
        setProfile(mockProfileData);
    }, [navigate]);

    if (!profile) {
        return <div className="loading-container">Loading Student Profile...</div>;
    }

    return (
        <div className="profile-container">
            <h1 className="profile-title">👤 My Student Profile</h1>
            <p className="profile-subtitle">Hackathon History & Personal Achievements</p>

            {/* 1. BASIC INFORMATION */}
            <section className="section info-section">
                <h3 className="section-title">Personal Details</h3>
                <div className="info-grid">
                    <div className="info-item"><strong>Full Name:</strong> <span>{profile.fullName}</span></div>
                    <div className="info-item"><strong>Email:</strong> <span>{profile.email}</span></div>
                    <div className="info-item"><strong>College:</strong> <span>{profile.college}</span></div>
                    <div className="info-item"><strong>Student ID:</strong> <span>{profile.collegeId}</span></div>
                    <div className="info-item"><strong>Current Team:</strong> <span>{profile.teamName}</span></div>
                    <div className="info-item"><strong>Role:</strong> <span>{profile.role}</span></div>
                </div>
            </section>
            
            {/* 2. ACHIEVEMENTS / BADGES (Req 4.0) */}
            <section className="section achievements-section">
                <h3 className="section-title">🏆 Achievements ({profile.achievements.length})</h3>
                <div className="achievements-grid">
                    {profile.achievements.map(a => (
                        <div key={a.id} className="achievement-card">
                            <span className="achievement-icon">{a.icon}</span>
                            <h4>{a.name}</h4>
                            <p>{a.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. HACKATHON HISTORY */}
            <section className="section history-section">
                <h3 className="section-title">🗓️ Hackathon History</h3>
                <ul className="history-list">
                    {profile.hackathonHistory.length > 0 ? (
                        profile.hackathonHistory.map((h, index) => (
                            <li key={index} className="history-item">
                                <span className="history-year">{h.year}</span>
                                <span className="history-project">{h.project}</span>
                                <span className="history-position">({h.position})</span>
                            </li>
                        ))
                    ) : (
                        <p className="no-history">No past hackathon history found. Time to make some!</p>
                    )}
                </ul>
            </section>
        </div>
    );
}
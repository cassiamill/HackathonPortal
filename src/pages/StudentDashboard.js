import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import "./StudentDashboard.css";
// STUDENT TODO: Import your Navbar/Footer components here later

// Mock data to simulate student/team status
const mockStudentData = {
    userName: "Alex Johnson",
    teamName: "The Code Whisperers",
    teamId: "T007",
    isTeamLeader: true,
    mentorName: "Dr. Evelyn Reed",
    nextDeadline: "Blueprint Submission",
    deadlineTime: "Day 1 - 5:00 PM EST",
    submissionStatus: {
        blueprint: "Submitted (Awaiting Review)",
        finalProject: "Pending",
    },
    // Mock achievements/history for Student Profile link (Req 4.0)
    achievementsCount: 2, 
};

export default function StudentDashboard() {
    const [studentInfo, setStudentInfo] = useState(null);
    const navigate = useNavigate();

    // 📌 Simple effect to simulate fetching data and checking login
    useEffect(() => {
        const user = auth.currentUser;
        if (!user) {
            navigate("/login");
            return;
        }

        // Simulate successful data load
        // STUDENT TODO: Replace this with a secure fetch from MongoDB to get user and team data
        setStudentInfo(mockStudentData);
    }, [navigate]);

    if (!studentInfo) {
        return <div className="loading-container">Loading Dashboard...</div>;
    }

    return (
        <div className="dashboard-container student-container">
            <h1 className="dashboard-title">👋 Welcome back, {studentInfo.userName}</h1>
            <p className="dashboard-subtitle">Your Hackathon Command Center</p>

            {/* 1. CRITICAL ALERTS & DEADLINES (Req 5.0) */}
            <section className="section deadline-section">
                <h3 className="section-title">🚨 Next Critical Deadline</h3>
                <div className="deadline-card">
                    <p className="deadline-label">{studentInfo.nextDeadline}</p>
                    <p className="deadline-time">{studentInfo.deadlineTime}</p>
                    <p className="deadline-tip">Don't miss the deadline! Use the <Link to="/submission" className="inline-link">Submission Portal</Link>.</p>
                </div>
            </section>

            {/* 2. TEAM OVERVIEW & MANAGEMENT */}
            <section className="section team-overview-section">
                <h3 className="section-title">👥 Team Overview: {studentInfo.teamName}</h3>
                <div className="team-grid">
                    <div className="team-item status-box">
                        <p className="box-label">Your Role:</p>
                        <p className="box-value">{studentInfo.isTeamLeader ? "Team Leader" : "Team Member"}</p>
                        {studentInfo.isTeamLeader && 
                            <Link to="/team-management" className="btn-small action-link">Manage Team (Page 4)</Link>
                        }
                    </div>
                    <div className="team-item mentor-box">
                        <p className="box-label">Your Mentor:</p>
                        <p className="box-value">{studentInfo.mentorName}</p>
                        <Link to="/mentor-chat" className="btn-small chat-link">Start Q&A (Page 8)</Link>
                    </div>
                    <div className="team-item submission-box">
                        <p className="box-label">Blueprint Status:</p>
                        <p className="box-value submission-status">{studentInfo.submissionStatus.blueprint}</p>
                        <Link to="/submission" className="btn-small submit-link">Submission Portal (Page 7)</Link>
                    </div>
                </div>
            </section>
            
            {/* 3. QUICK LINKS / PROFILE */}
            <section className="section quick-links-section">
                <h3 className="section-title">🚀 Quick Actions</h3>
                <div className="quick-links-grid">
                    <Link to="/team-workspace" className="quick-link">
                        <span className="link-icon">📁</span>
                        <span className="link-text">Team Private Workspace (Page 6)</span>
                    </Link>
                    <Link to="/team-updates" className="quick-link">
                        <span className="link-icon">📢</span>
                        <span className="link-text">Post Team Updates (Page 5)</span>
                    </Link>
                    <Link to="/student-profile" className="quick-link">
                        <span className="link-icon">👤</span>
                        <span className="link-text">My Profile & Achievements ({studentInfo.achievementsCount} Badges) (Page 9)</span>
                    </Link>
                    <Link to="/presentation-schedule" className="quick-link">
                        <span className="link-icon">🗓️</span>
                        <span className="link-text">View Presentation Schedule (Page 10)</span>
                    </Link>
                </div>
            </section>

            {/* STUDENT TODO: Add a Footer component here later */}
        </div>
    );
}
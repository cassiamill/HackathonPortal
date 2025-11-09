import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import "./CoordinatorDashboard.css";

// Coordinator check email (must match the Leaderboard and Schedule ones)
const COORDINATOR_EMAIL = "coordinator@example.com";

// Mock Data for high-level stats
const mockStats = {
    totalStudents: 150,
    totalTeams: 30,
    activeMentors: 8,
    submissionsBlueprint: 28, // Teams that have submitted
    presentationsCompleted: 5,
};

// Mock alerts and notifications
const mockAlerts = [
    { id: 1, type: "Urgent", message: "Team 12 needs immediate mentor support (Chat not responding)." },
    { id: 2, type: "Deadline", message: "Final presentation schedule finalized and published." },
    { id: 3, type: "Data", message: "Team 3's registration is incomplete; missing College ID." },
];

export default function CoordinatorDashboard() {
    const [stats, setStats] = useState(mockStats);
    const [alerts, setAlerts] = useState(mockAlerts);
    const [communicationMessage, setCommunicationMessage] = useState("");
    const [recipientGroup, setRecipientGroup] = useState("All Students");
    const [isCoordinator, setIsCoordinator] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = auth.currentUser;
        
        // 🚨 STRICT ACCESS CONTROL: ONLY COORDINATORS
        if (!user || user.email !== COORDINATOR_EMAIL) {
            navigate("/login"); // Redirect to login or deny access
            return;
        }
        setIsCoordinator(true);
        
        // STUDENT TODO: Fetch real-time stats and alerts from the backend
        // For now, mock data is used.
    }, [navigate]);

    // Handle sending a message to a specific group (Req 5.0)
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!communicationMessage.trim()) return alert("Message cannot be empty.");

        // STUDENT TODO: Integrate with backend communication endpoint
        console.log(`Sending message to ${recipientGroup}: "${communicationMessage.trim()}"`);
        
        alert(`Message sent to ${recipientGroup}!`);
        setCommunicationMessage("");
    };

    if (!isCoordinator) {
        // Render nothing or a strict access denial message before redirect
        return <div className="coordinator-denied">Access Denied: Coordinator Login Required.</div>;
    }

    return (
        <div className="coordinator-container">
            <h1 className="coordinator-title">Program Coordinator Dashboard</h1>
            <p className="coordinator-subtitle">High-level overview and management portal.</p>

            {/* 1. KEY ANALYTICS/STATS (Req 6.0) */}
            <section className="section stats-section">
                <h3 className="section-title">📊 Key Metrics (Live)</h3>
                <div className="stats-grid">
                    <div className="stat-card total-students">
                        <h4>Total Students</h4>
                        <p>{stats.totalStudents}</p>
                    </div>
                    <div className="stat-card total-teams">
                        <h4>Registered Teams</h4>
                        <p>{stats.totalTeams}</p>
                    </div>
                    <div className="stat-card active-mentors">
                        <h4>Active Mentors</h4>
                        <p>{stats.activeMentors}</p>
                    </div>
                    <div className="stat-card blueprint-submissions">
                        <h4>Blueprint Submissions</h4>
                        <p>{stats.submissionsBlueprint} / {stats.totalTeams}</p>
                    </div>
                </div>
            </section>

            {/* 2. COMMUNICATION CENTER (Req 5.0) */}
            <section className="section communication-section">
                <h3 className="section-title">📢 Communication Center</h3>
                <form onSubmit={handleSendMessage} className="comm-form">
                    <textarea
                        placeholder="Type your announcement, deadline reminder, or direct message..."
                        value={communicationMessage}
                        onChange={(e) => setCommunicationMessage(e.target.value)}
                        rows="4"
                        className="comm-textarea"
                    ></textarea>
                    <div className="comm-controls">
                        <select
                            value={recipientGroup}
                            onChange={(e) => setRecipientGroup(e.target.value)}
                            className="comm-select"
                        >
                            <option>All Students</option>
                            <option>All Mentors</option>
                            <option>All Judges</option>
                            <option>Team Leaders</option>
                            <option>No Show Teams</option>
                        </select>
                        <button type="submit" className="comm-button">
                            Send Message
                        </button>
                    </div>
                </form>
            </section>
            
            {/* 3. ALERTS AND NOTIFICATIONS (Req 5.0) */}
            <section className="section alerts-section">
                <h3 className="section-title">🔔 System Alerts & Actions</h3>
                <div className="alerts-list">
                    {alerts.map(alert => (
                        <div key={alert.id} className={`alert-item alert-${alert.type.toLowerCase()}`}>
                            <span className="alert-type">{alert.type}:</span>
                            <span className="alert-message">{alert.message}</span>
                            <button className="alert-action-button">View Detail</button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
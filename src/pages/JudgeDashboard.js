import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import "./JudgeDashboard.css";
// STUDENT TODO: Import your Navbar/Footer components here later

// Mock data to simulate the judge's assigned teams and schedule
const mockJudgeData = {
    judgeName: "Professor John Smith",
    teamsToGrade: [
        { id: "T004", name: "Alpha Squad", latestSubmission: "Blueprint", status: "Ready for Blueprint Review", link: "/judge/submissions/T004" },
        { id: "T005", name: "Data Drivers", latestSubmission: "Final Project", status: "Ready for Final Review", link: "/judge/submissions/T005" },
        { id: "T006", name: "The Disruptors", latestSubmission: "None", status: "No Submissions Yet", link: "/judge/submissions/T006" },
    ],
    presentationSchedule: [
        { time: "10:00 AM", team: "Alpha Squad", room: "M101" },
        { time: "10:20 AM", team: "Data Drivers", room: "M101" },
        { time: "10:40 AM", team: "The Disruptors", room: "M102" },
    ],
};

export default function JudgeDashboard() {
    const [judgeInfo, setJudgeInfo] = useState(null);
    const navigate = useNavigate();

    // 📌 Simple effect to simulate fetching data and checking login
    useEffect(() => {
        // STUDENT TODO: In the final app, this must check if the role is 'Judge'
        const user = auth.currentUser;
        if (!user) {
            navigate("/login");
            return;
        }
        
        // Simulate successful data load
        setJudgeInfo(mockJudgeData);

        // Fetching judge data logic goes here later (using user.uid)
    }, [navigate]);

    if (!judgeInfo) {
        return <div className="loading-container">Loading Judge Dashboard...</div>;
    }

    return (
        <div className="dashboard-container judge-container">
            <h1 className="dashboard-title">⚖️ Judge Portal, {judgeInfo.judgeName}</h1>
            <p className="dashboard-subtitle">Manage team submissions and live grading.</p>

            {/* 1. Grading Action Center */}
            <section className="section grading-action-section">
                <h3 className="section-title">Grading Action Center</h3>
                {/* Link to the main live grading page (Page 15) */}
                <Link to="/judge-grading" className="cta-btn primary-btn">
                    Access Live Grading System &rarr;
                </Link>
                <p className="grading-note">Use the Live Grading System to enter scores, comments, and calculate final rankings based on the predefined rubrics.</p>
            </section>

            {/* 2. Teams to Review Section */}
            <section className="section teams-review-section">
                <h3 className="section-title">Teams Awaiting Review</h3>
                <div className="review-list">
                    {judgeInfo.teamsToGrade.map((team) => (
                        <div key={team.id} className={`review-card ${team.latestSubmission ? 'submitted' : 'pending'}`}>
                            <h4>{team.name}</h4>
                            <p><strong>Latest Submission:</strong> {team.latestSubmission || 'N/A'}</p>
                            <p className="status-text">Status: {team.status}</p>
                            {/* Link to view submissions for informed decision-making (Req 3.0) */}
                            <Link to={team.link} className="btn-link view-submission-link">View All Submissions</Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. Presentation Schedule Section */}
            <section className="section schedule-section">
                <h3 className="section-title">Day 4 Presentation Schedule</h3>
                <table className="schedule-table">
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Team Name</th>
                            <th>Room</th>
                        </tr>
                    </thead>
                    <tbody>
                        {judgeInfo.presentationSchedule.map((item, index) => (
                            <tr key={index}>
                                <td>{item.time}</td>
                                <td>{item.team}</td>
                                <td>{item.room}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p className="schedule-note">This schedule is generated automatically but can be adjusted by Coordinators.</p>
            </section>

            {/* STUDENT TODO: Add a Footer component here later */}
        </div>
    );
}
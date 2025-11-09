import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase/config";
import "./JudgeSubmissionsList.css";

// Coordinator check email (A simple mock for Judge role check, replace with real role check)
const JUDGE_EMAIL = "judge@example.com"; 

// Mock Data for a judge's assigned teams and submission status
const mockAssignedTeams = [
    { teamId: "T001", teamName: "The Code Whisperers", blueprintStatus: "Submitted", finalProjectStatus: "Submitted", score: "78/100" },
    { teamId: "T002", teamName: "Phoenix Rising", blueprintStatus: "Submitted", finalProjectStatus: "Submitted", score: "Pending" },
    { teamId: "T003", teamName: "Tech Titans", blueprintStatus: "Missing", finalProjectStatus: "Submitted", score: "Pending" },
    { teamId: "T004", teamName: "Syntax Squad", blueprintStatus: "Submitted", finalProjectStatus: "Missing", score: "55/100" },
];

export default function JudgeSubmissionsList() {
    const [teams, setTeams] = useState(mockAssignedTeams);
    const [isJudge, setIsJudge] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = auth.currentUser;
        
        // 🚨 ACCESS CONTROL: Must be a Judge
        if (!user || user.email !== JUDGE_EMAIL) {
            navigate("/judgelogin"); // Redirect to a specialized login/dashboard
            return;
        }
        setIsJudge(true);
        
        // STUDENT TODO: Fetch list of teams specifically assigned to this judge from the backend
    }, [navigate]);

    if (!isJudge) {
        return <div className="judge-denied">Access Denied: Judge Login Required.</div>;
    }

    return (
        <div className="judge-submissions-container">
            <h1 className="judge-title">Team Submissions Overview</h1>
            <p className="judge-subtitle">Review the project files and grading status for your assigned teams.</p>

            <table className="submissions-table">
                <thead>
                    <tr>
                        <th>Team Name</th>
                        <th>Blueprint (Day 1)</th>
                        <th>Final Project (Day 4)</th>
                        <th>Current Score</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map(team => (
                        <tr key={team.teamId}>
                            <td className="team-name-cell">{team.teamName}</td>
                            
                            <td className={`status-cell status-${team.blueprintStatus.toLowerCase()}`}>
                                {team.blueprintStatus === 'Submitted' ? (
                                    <a href={`/api/files/download/${team.teamId}_Blueprint`} target="_blank" rel="noopener noreferrer">
                                        View File &rarr;
                                    </a>
                                ) : (
                                    <span>{team.blueprintStatus}</span>
                                )}
                            </td>
                            
                            <td className={`status-cell status-${team.finalProjectStatus.toLowerCase()}`}>
                                {team.finalProjectStatus === 'Submitted' ? (
                                    <a href={`/api/files/download/${team.teamId}_Final`} target="_blank" rel="noopener noreferrer">
                                        View File &rarr;
                                    </a>
                                ) : (
                                    <span>{team.finalProjectStatus}</span>
                                )}
                            </td>
                            
                            <td className="score-cell">{team.score}</td>

                            <td className="action-cell">
                                <Link to={`/judge/grade/${team.teamId}`} className="grade-button">
                                    {team.score === 'Pending' ? 'Start Grading' : 'Review/Edit Grade'}
                                </Link>
                                <Link to={`/judge/history/${team.teamId}`} className="history-button">
                                    History (Req 3.0)
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
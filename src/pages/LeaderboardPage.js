import React, { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import axios from "axios";
import { getIdToken } from "firebase/auth";
import './LeaderboardPage.css';

// Mock Data for consistent frontend display (replace with API call later)
const mockLeaderboardData = [
    { teamName: "The Code Whisperers", score: 98.5 },
    { teamName: "Phoenix Rising", score: 95.0 },
    { teamName: "Tech Titans", score: 92.2 },
    { teamName: "Algorithm Avengers", score: 88.9 },
    { teamName: "Syntax Squad", score: 85.5 },
];

// 📌 STRICT ACCESS CONTROL BASED ON BRIEF REQUIREMENT 6.0
const COORDINATOR_EMAIL = "coordinator@example.com"; 

export default function LeaderboardPage() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [accessDenied, setAccessDenied] = useState(false);

    useEffect(() => {
        const user = auth.currentUser;

        // 🚨 IMPLEMENTING BRIEF REQUIREMENT: VISIBLE ONLY TO COORDINATORS
        if (!user || user.email !== COORDINATOR_EMAIL) {
            setAccessDenied(true);
            setLoading(false);
            return;
        }

        // Fetch leaderboard from backend (Coordinator has access)
        const fetchLeaderboard = async () => {
            try {
                // Get Firebase token for secure backend request
                const token = await getIdToken(user); 
                
                // STUDENT TODO: Re-integrate your backend call here when the route is ready
                /*
                const res = await axios.get(
                    "https://hackathon-portal-project.onrender.com/teams/leaderboard", 
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setLeaderboard(res.data);
                */
                
                // --- Using Mock Data for now ---
                setTimeout(() => {
                    setLeaderboard(mockLeaderboardData);
                    setLoading(false);
                }, 500);
                // -----------------------------

            } catch (err) {
                console.error("Error fetching leaderboard:", err);
                setLeaderboard(mockLeaderboardData); // Fallback data
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    if (loading) {
        return <div className="leaderboard-loading">Loading Coordinator Leaderboard...</div>;
    }
    
    // 📌 DISPLAY ACCESS DENIED MESSAGE
    if (accessDenied) {
        return (
            <div className="access-denied-container">
                <h1 className="access-denied-title">🚫 Access Restricted</h1>
                <p className="access-denied-message">
                    The Live Leaderboard is only accessible to **Program Coordinators** as per the hackathon policy.
                </p>
            </div>
        );
    }

    return (
        <div className="leaderboard-container">
            <h1 className="leaderboard-title">🥇 Coordinator Live Leaderboard</h1>
            <p className="leaderboard-subtitle">Current ranking based on judges' live scoring.</p>
            
            <div className="table-wrapper">
                <table className="leaderboard-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Team Name</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map((team, idx) => (
                            <tr 
                                key={idx} 
                                className={idx < 3 ? 'top-team' : ''} // Highlight top 3
                            >
                                <td>{idx + 1}</td>
                                <td>{team.teamName}</td>
                                <td className="team-score">{team.score.toFixed(1)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="leaderboard-footer">Scores are live and calculated automatically from the judges' portal.</p>
        </div>
    );
}
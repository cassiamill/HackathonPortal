import React, { useEffect, useState } from "react";
import { auth } from "../firebase/config"; // firebase auth
import axios from "axios"; // for backend requests
import './LeaderboardPage.css';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]); // store teams
  const [loading, setLoading] = useState(true); // loading state
  const [accessDenied, setAccessDenied] = useState(false); // admin check

  useEffect(() => {
    const user = auth.currentUser;

    // check if user is admin (simple check)
    const adminEmail = "coordinator@example.com";
    if (!user || user.email !== adminEmail) {
      setAccessDenied(true);
      setLoading(false);
      return;
    }

    // fetch leaderboard from backend
    const fetchLeaderboard = async () => {
      try {
        const token = await user.getIdToken(); // get firebase token
        const res = await axios.get(
          "https://hackathon-portal-project.onrender.com/teams/leaderboard", // backend endpoint
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLeaderboard(res.data); // save data
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <p>Loading leaderboard...</p>;
  if (accessDenied) return <p>Access denied. Only admins can view this page.</p>;

  return (
    <div className="leaderboard-container">
      <h2>leaderboard</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>rank</th>
              <th>team name</th>
              <th>score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((team, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{team.teamName}</td>
                <td>{team.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
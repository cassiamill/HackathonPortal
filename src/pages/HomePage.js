import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import axios from "axios";
import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();

  // Handle "Join Hackathon" click
  const handleJoinHackathon = async () => {
    const user = auth.currentUser;

    // Not logged in -> go to login
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      // Get Firebase token
      const token = await user.getIdToken();

      // Fetch user's project/team from backend
      const res = await axios.get(
        "https://hackathon-portal-project.onrender.com/projects",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // If backend returns projects, check if user has one
      const userProject = Array.isArray(res.data)
        ? res.data.find((p) => p.user === user.uid)
        : null;

      // Redirect based on existence of project/team
      if (userProject) {
        navigate("/team");
      } else {
        navigate("/team-selection");
      }
    } catch (err) {
      // Backend not ready or error → fallback
      console.warn("Backend not available or error fetching projects:", err);
      navigate("/team-selection");
    }
  };

  return (
    <div className="home-container">
      <main className="main-content">
        <h1 className="main-title">GUS Hackathon Portal</h1>
        <h2 className="subtitle">The home for hackathons.</h2>
        <p className="description">
          Where students collaborate on projects, showcase their skills, and win
          amazing prizes!
        </p>
        <button className="cta-btn" onClick={handleJoinHackathon}>
          Join the Hackathon
        </button>
      </main>
    </div>
  );
}
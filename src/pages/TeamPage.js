import React, { useEffect, useState } from "react";
import FileUpload from "../components/FileUpload";
import axios from "axios";
import "./TeamPage.css";

export default function TeamPage() {
  const [user, setUser] = useState(null); // logged-in user
  const [team, setTeam] = useState(null); // team data
  const [updates, setUpdates] = useState([]); // team updates
  const [newUpdate, setNewUpdate] = useState(""); // input for new update

  useEffect(() => {
    // Load logged-in user from localStorage
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedUser) {
      setUser(loggedUser);

      // Fetch team info from backend
      axios
        .get(`https://hackathon-portal-project.onrender.com/api/teams/${loggedUser.teamId}`)
        .then((res) => {
          setTeam(res.data);
          setUpdates(res.data.updates || []);
        })
        .catch((err) => console.error("Failed to fetch team:", err));
    }
  }, []);

  // Add new team update
  const handleAddUpdate = () => {
    if (!newUpdate.trim()) return;

    const updatedList = [...updates, newUpdate];
    setUpdates(updatedList);
    setNewUpdate("");

    axios
      .post(`https://hackathon-portal-project.onrender.com/api/teams/${team.id}/updates`, { message: newUpdate })
      .catch((err) => console.error("Failed to send update:", err));
  };

  // Leave team
  const handleLeaveTeam = () => {
    if (!team) return;
    if (window.confirm("Are you sure you want to leave the team?")) {
      axios
        .post(`https://hackathon-portal-project.onrender.com/api/teams/${team.id}/leave`, { userId: user.id })
        .then(() => {
          setTeam(null);
          alert("You have left the team.");
        })
        .catch((err) => {
          console.error("Failed to leave team:", err);
          alert("Failed to leave team.");
        });
    }
  };

  if (!user) return <p className="team-message">Please log in to see your team page.</p>;
  if (!team) return <p className="team-message">You are not part of a team.</p>;

  return (
    <div className="team-container">
      <div className="team-card">
        <div className="team-header">
          <h1 className="team-title">{team.name}</h1>
          <p className="team-description">{team.description}</p>
        </div>

        <div className="team-section">
          <h3>Team Leader</h3>
          <p><strong>{team.leader}</strong></p>
        </div>

        <div className="team-section">
          <h3>Team Members</h3>
          <ul className="member-list">
            {team.members.map((member, index) => <li key={index}>{member}</li>)}
          </ul>
        </div>

        <div className="team-section">
          <h3>Mentor</h3>
          <p>
            <strong>{team.mentor.name}</strong> -{" "}
            <a href={`mailto:${team.mentor.email}`} className="mentor-link">{team.mentor.email}</a>
          </p>
        </div>

        <div className="team-section">
          <h3>Upload Team Files</h3>
          <FileUpload teamId={team.id} userId={user.id} />
        </div>

        <div className="team-section">
          <h3>Team Updates</h3>
          <div className="update-input">
            <input
              type="text"
              value={newUpdate}
              onChange={(e) => setNewUpdate(e.target.value)}
              placeholder="Share your progress..."
            />
            <button onClick={handleAddUpdate} className="post-btn">Post</button>
          </div>
          <ul className="update-list">
            {updates.length === 0 ? (
              <p className="no-updates">No updates yet.</p>
            ) : (
              updates.map((update, index) => <li key={index}>{update}</li>)
            )}
          </ul>
        </div>

        <div className="team-section">
          <h3>Presentation Schedule</h3>
          <p>{team.presentationTime}</p>
        </div>

        <div className="team-section">
          <button onClick={handleLeaveTeam} className="leave-team-button">Leave Team</button>
        </div>
      </div>
    </div>
  );
}
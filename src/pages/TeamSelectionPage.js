import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../firebase/config"; // for current user and token
import "./TeamSelectionPage.css";

export default function TeamSelectionPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [memberEmails, setMemberEmails] = useState(["", "", "", ""]);
  const [message, setMessage] = useState("");

  const handleCreateTeam = async () => {
    if (!name.trim()) {
      setMessage("Team name is required!");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      setMessage("You must be logged in to create a team.");
      return;
    }

    const token = await user.getIdToken();
    const teamData = {
      name,
      description,
      leaderId: user.uid,
      memberEmails: memberEmails.filter((email) => email.trim() !== ""),
    };

    try {
      const res = await axios.post(
        "https://hackathon-portal-project.onrender.com/api/teams",
        teamData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Team created:", res.data);
      navigate("/team"); // go to team page after creation
    } catch (err) {
      console.error("Failed to create team:", err);
      setMessage("Failed to create team. Try again.");
    }
  };

  return (
    <div className="team-selection-container">
      <h2>Create Team</h2>
      {message && <p className="message">{message}</p>}

      <input
        type="text"
        placeholder="Team Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {memberEmails.map((email, idx) => (
        <input
          key={idx}
          type="email"
          placeholder={`Member ${idx + 1} Email`}
          value={email}
          onChange={(e) => {
            const newMembers = [...memberEmails];
            newMembers[idx] = e.target.value;
            setMemberEmails(newMembers);
          }}
        />
      ))}

      <button onClick={handleCreateTeam}>Create Team</button>
      <a href="/" className="back-link">Back to Home</a>
    </div>
  );
}
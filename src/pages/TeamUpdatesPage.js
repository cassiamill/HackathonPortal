import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import "./TeamUpdatesPage.css";
// STUDENT TODO: Import your Navbar/Footer components here later

// Mock data for the current team and existing updates
const mockTeamUpdates = {
    teamName: "The Code Whisperers",
    teamBio: "Building a smart traffic management system using AI.",
    updates: [
        { id: 1, content: "Successfully set up the Node.js backend server and MongoDB connection! Progress: 20%", timestamp: "Nov 7, 10:00 AM", privacy: "Public" },
        { id: 2, content: "Stuck on integrating the Cloudinary file upload component. Need mentor help.", timestamp: "Nov 7, 2:30 PM", privacy: "Mentor Only" },
        { id: 3, content: "Internal file structure review complete. Finalizing presentation slides.", timestamp: "Nov 8, 9:00 AM", privacy: "Private" },
    ],
    // Mock for displaying the team's stored logo
    logoUrl: "https://placehold.co/80x80/65c5e8/ffffff?text=LOGO" 
};

export default function TeamUpdatesPage() {
    const [teamData, setTeamData] = useState(null);
    const [newUpdate, setNewUpdate] = useState("");
    const [privacy, setPrivacy] = useState("Public"); // Public, Mentor Only, Private
    const [imageFile, setImageFile] = useState(null); // For image/picture uploads (Req Day 2 & 3)
    const navigate = useNavigate();

    useEffect(() => {
        // STUDENT TODO: Check login and fetch actual team data from backend
        const user = auth.currentUser;
        if (!user) {
            navigate("/login");
            return;
        }
        setTeamData(mockTeamUpdates);
    }, [navigate]);

    const handlePostUpdate = (e) => {
        e.preventDefault();
        if (!newUpdate.trim() && !imageFile) {
            alert("Please enter some text or select a file to post.");
            return;
        }

        // 📌 FRONTEND MOCK LOGIC
        // STUDENT TODO: This is where you will send the data to the Node.js backend
        // and upload the imageFile to Cloudinary, getting the URL back.
        
        console.log("Posting Update:", { content: newUpdate, privacy: privacy, image: imageFile ? imageFile.name : 'none' });
        
        // --- Mocking the update success ---
        const newMockUpdate = {
            id: teamData.updates.length + 1,
            content: newUpdate,
            timestamp: new Date().toLocaleString(),
            privacy: privacy
        };
        setTeamData(prev => ({
            ...prev,
            updates: [newMockUpdate, ...prev.updates] // Add new update to the top
        }));
        // --- End Mock ---

        // Clear form
        setNewUpdate("");
        setPrivacy("Public");
        setImageFile(null);
        alert("Update posted successfully!");
    };

    if (!teamData) {
        return <div className="loading-container">Loading Team Updates...</div>;
    }

    return (
        <div className="updates-container">
            <header className="team-header">
                <img src={teamData.logoUrl} alt={`${teamData.teamName} Logo`} className="team-logo" />
                <h1 className="updates-title">{teamData.teamName} Updates</h1>
                <p className="team-bio">{teamData.teamBio}</p>
                <Link to="/team-management" className="btn-edit-profile">Edit Team Profile</Link>
            </header>
            
            {/* 1. POST NEW UPDATE SECTION */}
            <section className="section new-update-section">
                <h3 className="section-title">Post New Update 📢</h3>
                <form onSubmit={handlePostUpdate} className="update-form">
                    <textarea
                        placeholder="Share your progress, milestones, or a fun picture update here..."
                        value={newUpdate}
                        onChange={(e) => setNewUpdate(e.target.value)}
                        rows="4"
                        className="update-textarea"
                    ></textarea>

                    <div className="form-controls">
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => setImageFile(e.target.files[0])} 
                            className="file-input"
                        />
                        <select 
                            value={privacy} 
                            onChange={(e) => setPrivacy(e.target.value)}
                            className="privacy-select"
                        >
                            <option value="Public">Public (Visible to All)</option>
                            <option value="Mentor Only">Mentor Only (Assigned Mentor)</option>
                            <option value="Private">Private (Team Members Only)</option>
                        </select>
                    </div>

                    <button type="submit" className="post-button">
                        Post Update
                    </button>
                    {imageFile && <p className="file-info">Selected file: {imageFile.name}</p>}
                </form>
            </section>

            {/* 2. UPDATE HISTORY SECTION */}
            <section className="section update-history-section">
                <h3 className="section-title">Update History</h3>
                <div className="updates-list">
                    {teamData.updates.map(update => (
                        <div key={update.id} className={`update-item ${update.privacy.toLowerCase().replace(' ', '-')}`}>
                            <p className="update-content">{update.content}</p>
                            <div className="update-footer">
                                <span className="update-timestamp">{update.timestamp}</span>
                                <span className={`update-privacy tag-${update.privacy.toLowerCase().replace(' ', '-')}`}>{update.privacy}</span>
                            </div>
                        </div>
                    ))}
                    {teamData.updates.length === 0 && <p className="no-updates">No updates yet. Post your first milestone!</p>}
                </div>
            </section>

            {/* STUDENT TODO: Add a Footer component here later */}
        </div>
    );
}
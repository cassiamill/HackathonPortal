import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import FileUpload from "../components/FileUpload"; // <-- CORRECTED IMPORT
import "./FileUpload.css";

// Mock data to simulate fetching submission history
const mockSubmissionHistory = [
    { type: "Blueprint Submission (Day 1)", date: "Nov 23, 2025", status: "Successful", fileName: "Team7_Blueprint_V1.pdf" },
    { type: "Final Project Code (Day 4)", date: "Pending", status: "Awaiting Upload", fileName: "N/A" },
    { type: "Final Presentation Slides (Day 4)", date: "Pending", status: "Awaiting Upload", fileName: "N/A" },
];

// Mock Team/User IDs (In a real app, these would come from state/backend)
const MOCK_TEAM_ID = "T007_CWHISPERERS";
const MOCK_USER_ID = "FIREBASE_UID_12345";

// SubmissionPage component
export default function SubmissionPage() {
    const [history, setHistory] = useState(mockSubmissionHistory);
    const [submissionType, setSubmissionType] = useState("Blueprint");
    const [message, setMessage] = useState("");
    const [teamId, setTeamId] = useState(MOCK_TEAM_ID);
    const [userId, setUserId] = useState(MOCK_USER_ID);
    const navigate = useNavigate();

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) {
            navigate("/login");
            return;
        }
        // Use actual Firebase UID
        setUserId(user.uid); 

        // STUDENT TODO: Fetch real team ID from MongoDB based on user.uid
        // For now, MOCK_TEAM_ID is used.
    }, [navigate]);

    // 📌 Handle the successful file upload from the FileUpload component
    const handleSubmissionSuccess = (fileName, fileUrl) => {
        setMessage(`Success! Your ${submissionType} (${fileName}) was successfully uploaded.`);
        
        // STUDENT TODO: This is where you call your backend to record the fileUrl, 
        // submissionType, teamId, and userId in your MongoDB collection.
        
        // Mocking the update of history state for frontend display:
        setHistory(prevHistory => {
            // Find existing mock item and update it, or add a new one if dynamic
            const existingIndex = prevHistory.findIndex(item => item.type.includes(submissionType) && item.status.includes('Pending'));
            if (existingIndex > -1) {
                const newHistory = [...prevHistory];
                newHistory[existingIndex] = { 
                    ...newHistory[existingIndex], 
                    date: new Date().toLocaleDateString(), 
                    status: "Successful", 
                    fileName: fileName 
                };
                return newHistory;
            }
            return prevHistory;
        });

        // Reset message after a few seconds
        setTimeout(() => setMessage(""), 5000);
    };

    return (
        <div className="submission-container">
            <h1 className="submission-title">Project Submission Portal</h1>
            <p className="submission-subtitle">Upload your required files (Blueprints & Final Projects).</p>

            {message && <p className="status-message success-message">{message}</p>}

            {/* 1. UPLOAD SECTION */}
            <section className="section upload-section">
                <h3 className="section-title">New Submission</h3>
                <div className="form-group">
                    <label htmlFor="submissionType">Select Submission Type*</label>
                    <select
                        id="submissionType"
                        value={submissionType}
                        onChange={(e) => setSubmissionType(e.target.value)}
                        className="select-input"
                    >
                        <option value="Blueprint">Blueprint (Day 1)</option>
                        <option value="Final Project Code">Final Project Code (Day 4)</option>
                        <option value="Final Presentation Slides">Final Presentation Slides (Day 4)</option>
                    </select>
                </div>
                
                <p className="upload-note">
                    **Note:** File types allowed: PDF, DOCX, PPTX, or ZIP (for code). Max size: 50MB.
                </p>
                {/* 📌 CORRECT INTEGRATION WITH YOUR FileUpload.js */}
                <FileUpload 
                    teamId={teamId} // Pass required prop
                    userId={userId} // Pass required prop
                    submissionType={submissionType} // Pass for backend logging
                    onSuccess={handleSubmissionSuccess} // Use the callback
                />
            </section>

            {/* 2. SUBMISSION HISTORY (Req 3.0) */}
            <section className="section history-section">
                <h3 className="section-title">Submission History</h3>
                <table className="history-table">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>File Name</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item, index) => (
                            <tr key={index}>
                                <td>{item.type}</td>
                                <td>{item.fileName}</td>
                                <td>{item.date}</td>
                                <td data-label="Status" className={`status-${item.status.toLowerCase().replace(' ', '-')}`}>
                                    {item.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}
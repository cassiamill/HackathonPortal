import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config"; // Assuming Firebase auth setup
import "./CertificatePage.css";

// --- MOCK DATA / ROLE CHECK ---
const MOCK_USER = {
    role: 'student', // Change for testing: 'student', 'mentor', 'judge'
    name: 'Alex Johnson',
    certificateType: 'Participation', // 'Participation' or 'Appreciation'
    surveyCompleted: true, // Set to false to test denial flow
    hackathonName: 'NCT Spring 2026 Innovation Challenge',
};
// --- END MOCK DATA ---

export default function CertificatePage() {
    const [user, setUser] = useState(MOCK_USER);
    const [canDownload, setCanDownload] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // 1. Check Auth (Ensure user is logged in)
        // const currentUser = auth.currentUser;
        // if (!currentUser) { navigate('/login'); return; }

        // 2. Fetch User Status from Backend (Real implementation)
        // fetch(`/api/user/${currentUser.uid}/certificate-status`).then(res => res.json()).then(data => {
        //     setUser(data);
        //     setCanDownload(data.surveyCompleted);
        // });

        // SIMULATION: Check mock status
        setCanDownload(MOCK_USER.surveyCompleted);
    }, [navigate]);

    const handleDownload = () => {
        // TODO: Trigger a backend API call to generate and stream the PDF/PNG certificate.
        alert(`Downloading ${user.certificateType} Certificate for ${user.name}...`);
        // Example: window.open(`/api/certificates/download/${user.role}`, '_blank');
    };

    if (!canDownload) {
        return (
            <div className="certificate-container access-denied">
                <h2>Certificate Status</h2>
                <p className="error-message">
                    Access Denied: You must complete the **Post-Hackathon Survey** to unlock your certificate (Req 8.0).
                </p>
                <button 
                    className="survey-link-button" 
                    onClick={() => navigate('/survey')}
                >
                    Go to Survey Page
                </button>
            </div>
        );
    }

    return (
        <div className="certificate-container">
            <h2 className="certificate-title">
                {user.certificateType} Certificate
            </h2>
            <p className="certificate-subtitle">
                Congratulations, **{user.name}**! Your commitment to the **{user.hackathonName}** is appreciated.
            </p>
            
            <div className="certificate-display">
                <p>Preview of your Certificate:</p>
                
                <p>Type: **{user.certificateType}** | Role: **{user.role}**</p>
            </div>

            <button 
                className="download-button" 
                onClick={handleDownload}
            >
                ⬇️ Download High-Resolution Certificate
            </button>
        </div>
    );
}
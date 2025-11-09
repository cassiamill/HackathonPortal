import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import "./JudgeTeamHistory.css";

// Judge check email
const JUDGE_EMAIL = "judge@example.com"; 

// Mock Data for a team's history
const mockTeamHistory = {
    teamName: "The Code Whisperers (T001)",
    submissions: [
        { 
            type: "Blueprint Submission", 
            date: "Nov 23, 2025", 
            fileName: "T001_Blueprint_V1.pdf", 
            fileUrl: "/download/blueprint_t001",
            status: "Successful"
        },
        { 
            type: "Final Project Code", 
            date: "Nov 26, 2025", 
            fileName: "T001_Final_Code.zip", 
            fileUrl: "/download/final_code_t001",
            status: "Successful"
        },
        { 
            type: "Final Presentation Slides", 
            date: "Nov 26, 2025", 
            fileName: "T001_Slides.pptx", 
            fileUrl: "/download/slides_t001",
            status: "Successful"
        },
    ],
    comments: [
        { 
            judge: "Judge Maria K.", 
            score: "55/100",
            date: "Nov 26, 2025",
            overallComment: "Strong concept, but the front-end design is very rough and could use polish. Technical execution was sound for the MVP.",
            rubricBreakdown: [
                { criterion: "Innovation", score: 20 },
                { criterion: "Technical", score: 25 },
            ]
        },
        { 
            judge: "Judge Alex B.", 
            score: "62/100",
            date: "Nov 27, 2025",
            overallComment: "Excellent use of the required API. The blueprint was clear, but the team seemed to deviate significantly from the original plan.",
            rubricBreakdown: [
                { criterion: "Innovation", score: 25 },
                { criterion: "Technical", score: 30 },
            ]
        },
    ]
};

export default function JudgeTeamHistory() {
    const { teamId } = useParams();
    const [history, setHistory] = useState(null);
    const [isJudge, setIsJudge] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = auth.currentUser;
        
        // 🚨 ACCESS CONTROL: Must be a Judge
        if (!user || user.email !== JUDGE_EMAIL) {
            navigate("/judgelogin"); 
            return;
        }
        setIsJudge(true);
        
        // STUDENT TODO: Fetch real submission history and past comments for this teamId
        setHistory(mockTeamHistory);
    }, [navigate, teamId]);

    if (!isJudge || !history) {
        return <div className="judge-denied">Loading History or Access Denied...</div>;
    }

    return (
        <div className="history-container">
            <h1 className="history-title">Submission History: {history.teamName}</h1>
            <p className="history-subtitle">Access to all files and past feedback is crucial for informed decision-making (Req 3.0).</p>

            {/* 1. SUBMISSION HISTORY (Files) */}
            <section className="section file-history-section">
                <h3 className="section-title">📂 Project Submission Files</h3>
                <table className="submission-history-table">
                    <thead>
                        <tr>
                            <th>Submission Type</th>
                            <th>File Name</th>
                            <th>Date Uploaded</th>
                            <th>Download Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.submissions.map((sub, index) => (
                            <tr key={index}>
                                <td>{sub.type}</td>
                                <td>{sub.fileName}</td>
                                <td>{sub.date}</td>
                                <td>
                                    <a href={sub.fileUrl} target="_blank" rel="noopener noreferrer" className="download-link">
                                        Download &darr;
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* 2. GRADING COMMENTS & FEEDBACK (Page 15) */}
            <section className="section comments-section">
                <h3 className="section-title">💬 All Judge Feedback Received</h3>
                
                {history.comments.length > 0 ? (
                    history.comments.map((comment, index) => (
                        <div key={index} className="comment-card">
                            <div className="comment-header">
                                <span className="judge-name">Judge: **{comment.judge}**</span>
                                <span className="score-date">Score: **{comment.score}** | Date: {comment.date}</span>
                            </div>
                            
                            <p className="overall-comment-text">**Overall Comment:** {comment.overallComment}</p>
                            
                            <div className="rubric-summary">
                                <strong>Rubric Snippet:</strong>
                                <ul>
                                    {comment.rubricBreakdown.map((item, i) => (
                                        <li key={i}>{item.criterion}: {item.score} points</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-comments">No grading comments have been submitted for this team yet.</p>
                )}
            </section>
        </div>
    );
}
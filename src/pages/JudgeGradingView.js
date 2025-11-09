import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import "./JudgeGradingView.css";

// Judge check email
const JUDGE_EMAIL = "judge@example.com"; 

// Mock Rubric Data (customizable by admins - Req 3.0)
const mockRubric = [
    { id: 1, criterion: "Innovation & Creativity", maxScore: 30, score: 0, comment: "" },
    { id: 2, criterion: "Technical Execution & Polish", maxScore: 30, score: 0, comment: "" },
    { id: 3, criterion: "Project Blueprint & Planning", maxScore: 20, score: 0, comment: "" },
    { id: 4, criterion: "Presentation & Clarity", maxScore: 20, score: 0, comment: "" },
];

export default function JudgeGradingView() {
    const { teamId } = useParams(); // Get teamId from URL (e.g., /judge/grade/T001)
    const [teamName, setTeamName] = useState("");
    const [rubricScores, setRubricScores] = useState(mockRubric);
    const [judgeComment, setJudgeComment] = useState("");
    const [isJudge, setIsJudge] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = auth.currentUser;
        if (!user || user.email !== JUDGE_EMAIL) {
            navigate("/judgelogin"); 
            return;
        }
        setIsJudge(true);
        
        // STUDENT TODO: Fetch team name and current/previous scores/comments for this judge/team
        setTeamName(`Team ${teamId}`);
    }, [navigate, teamId]);
    
    // Calculate the running total score
    const totalScore = rubricScores.reduce((sum, item) => sum + parseInt(item.score || 0), 0);
    const maxTotalScore = rubricScores.reduce((sum, item) => sum + item.maxScore, 0);

    const handleScoreChange = (id, value) => {
        const score = Math.max(0, Math.min(value, rubricScores.find(r => r.id === id).maxScore));
        
        setRubricScores(prev => prev.map(item => 
            item.id === id ? { ...item, score: score } : item
        ));
    };

    const handleCommentChange = (id, comment) => {
        setRubricScores(prev => prev.map(item => 
            item.id === id ? { ...item, comment: comment } : item
        ));
    };

    const handleSubmitGrade = (e) => {
        e.preventDefault();
        
        if (totalScore === 0) {
            return alert("Please enter scores before submitting.");
        }

        // 🚨 LIVE GRADING SYSTEM (Req 3.0)
        // STUDENT TODO: Send the rubricScores, judgeComment, and teamId to the backend
        // The backend will automatically recalculate the team's ranking.
        
        console.log(`Submitting grades for ${teamName}:`, { 
            totalScore: totalScore, 
            rubric: rubricScores, 
            overallComment: judgeComment 
        });

        alert(`Grades for ${teamName} submitted! Score: ${totalScore}/${maxTotalScore}. Ranking will update automatically.`);
        navigate("/judge/submissions"); // Go back to the list
    };

    if (!isJudge) {
        return <div className="judge-denied">Access Denied: Judge Login Required.</div>;
    }

    return (
        <div className="grading-container">
            <h1 className="grading-title">Grading: {teamName}</h1>
            <p className="grading-subtitle">Live Grading System - Enter scores based on the hackathon rubric.</p>

            <form onSubmit={handleSubmitGrade} className="grading-form">
                
                {/* 1. RUBRIC SCORING */}
                <section className="section rubric-section">
                    <h3 className="section-title">Rubric Criteria Scores</h3>
                    {rubricScores.map(rubric => (
                        <div key={rubric.id} className="rubric-item">
                            <div className="rubric-header">
                                <h4>{rubric.criterion}</h4>
                                <span className="max-score">Max: {rubric.maxScore}</span>
                            </div>
                            <input
                                type="number"
                                min="0"
                                max={rubric.maxScore}
                                value={rubric.score}
                                onChange={(e) => handleScoreChange(rubric.id, parseInt(e.target.value))}
                                className="score-input"
                            />
                            <textarea
                                placeholder="Criterion-specific feedback..."
                                value={rubric.comment}
                                onChange={(e) => handleCommentChange(rubric.id, e.target.value)}
                                rows="2"
                                className="comment-input"
                            />
                        </div>
                    ))}
                </section>

                {/* 2. OVERALL FEEDBACK (Req 3.0) */}
                <section className="section overall-comment-section">
                    <h3 className="section-title">Overall Feedback (Required)</h3>
                    <textarea
                        placeholder="Provide comprehensive, constructive comments and suggestions for the team."
                        value={judgeComment}
                        onChange={(e) => setJudgeComment(e.target.value)}
                        rows="5"
                        className="overall-comment-textarea"
                        required
                    />
                </section>

                {/* 3. SUBMISSION / TOTAL SCORE */}
                <div className="submission-footer">
                    <div className="total-score-box">
                        Total Score: <span>{totalScore} / {maxTotalScore}</span>
                    </div>
                    <button type="submit" className="submit-grade-button">
                        Submit Final Grade & Update Ranking
                    </button>
                </div>
            </form>
        </div>
    );
}
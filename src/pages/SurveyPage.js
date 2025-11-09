import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config"; // Assuming Firebase auth setup
import "./SurveyPage.css";

// --- MOCK DATA / ROLE CHECK (To be replaced by Backend calls) ---

// Role Definitions (Will come from authenticated user object)
const MOCK_USER_ROLE = "student"; // Change this for testing: 'student', 'mentor', 'judge'

const studentSurvey = [
  { id: 1, type: "rating", question: "How satisfied were you with the hackathon challenge?" },
  { id: 2, type: "rating", question: "How helpful was the mentorship provided to your team?" },
  { id: 3, type: "textarea", question: "What suggestions do you have for next year's event organization?" },
];

const mentorSurvey = [
  { id: 1, type: "rating", question: "Rate the overall quality of team engagement and ideas." },
  { id: 2, type: "rating", question: "How effective was the provided briefing and communication?" },
  { id: 3, type: "textarea", question: "Please provide feedback on the mentor assignment process and support." },
];

const judgeSurvey = [
  { id: 1, type: "rating", question: "How clear and relevant were the judging rubrics?" },
  { id: 2, type: "rating", question: "Rate the functionality and ease-of-use of the live grading system." },
  { id: 3, type: "textarea", question: "What advice would you give to future hackathon organizers regarding the judging process?" },
];

// Helper function to get the correct survey based on role
const getSurveyByRole = (role) => {
  switch (role) {
    case "student":
      return studentSurvey;
    case "mentor":
      return mentorSurvey;
    case "judge":
      return judgeSurvey;
    default:
      return null;
  }
};
// --- END MOCK DATA ---

export default function SurveyPage() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const [surveyQuestions, setSurveyQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Role and Data Fetching Simulation
  useEffect(() => {
    // In a real app, this would fetch the user role from the backend
    // based on auth.currentUser.uid or from a context/store.
    const user = auth.currentUser; 
    if (!user) {
        navigate('/login'); // Ensure user is logged in
        return;
    }

    // SIMULATION: Set role and load appropriate survey
    const role = MOCK_USER_ROLE; 
    const survey = getSurveyByRole(role);
    
    setUserRole(role);
    setSurveyQuestions(survey);
    setIsLoading(false);
    
    // Check if the user has already submitted the survey (via backend)
    // If so, setSubmitted(true);
  }, [navigate]);

  const handleInputChange = (id, value) => {
    setAnswers({
      ...answers,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(answers).length !== surveyQuestions.length) {
        alert("Please answer all questions before submitting.");
        return;
    }

    console.log(`Submitting survey for ${userRole}:`, answers);
    // TODO: 
    // 1. Send answers to backend (Req 7.0)
    // 2. Backend updates user's record (e.g., 'surveyCompleted: true')
    // 3. Backend triggers certificate generation status update (Req 8.0)
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
    setIsLoading(false);

    setSubmitted(true);
  };

  if (isLoading) {
    return <div className="survey-container">Loading survey...</div>;
  }

  if (submitted) {
    // Navigate to Certificate Page (Req 8.0) after successful submission
    return (
        <div className="survey-container submitted-view">
            <h1>🎉 Thank You for Your Feedback!</h1>
            <p>Your valuable input has been recorded and will help us improve future hackathons (Req 7.0).</p>
            <p>You can now proceed to download your certificate.</p>
            <button 
                className="certificate-button" 
                onClick={() => navigate('/certificate')}
            >
                View and Download Certificate (Req 8.0)
            </button>
        </div>
    );
  }

  if (!surveyQuestions.length) {
    return <div className="survey-container">No survey available for your role ({userRole}).</div>;
  }

  return (
    <div className="survey-container">
      <h1 className="survey-title">Feedback Survey: {userRole.charAt(0).toUpperCase() + userRole.slice(1)}</h1>
      <p className="survey-subtitle">Your honest feedback is essential for planning future NCT events (Req 7.0).</p>

      <form onSubmit={handleSubmit} className="survey-form">
        {surveyQuestions.map((item) => (
          <div key={item.id} className="question-group">
            <label className="question-label">{item.question}</label>
            {item.type === "rating" && (
              <div className="rating-options">
                {[1, 2, 3, 4, 5].map(star => (
                    <label key={star} className="rating-label">
                        <input
                            type="radio"
                            name={`q${item.id}`}
                            value={star}
                            onChange={(e) => handleInputChange(item.id, parseInt(e.target.value))}
                            required
                        />
                        {star}
                    </label>
                ))}
                <span className="rating-scale">(1 = Poor, 5 = Excellent)</span>
              </div>
            )}
            {item.type === "textarea" && (
              <textarea
                rows="4"
                placeholder="Type your detailed feedback here..."
                onChange={(e) => handleInputChange(item.id, e.target.value)}
                required
              />
            )}
          </div>
        ))}

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit Feedback & Unlock Certificate'}
        </button>
      </form>
    </div>
  );
}
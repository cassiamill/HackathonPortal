import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, reload, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase/config";
import { Link, useNavigate, useLocation } from "react-router-dom";
// STUDENT TODO: Import your Footer component here later
// import Footer from "../components/Footer"; 
import './LoginPage.css';

// 📌 Backend URL for future API calls
const API_BASE_URL = "https://hackathon-portal-project.onrender.com";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [infoMessage, setInfoMessage] = useState(""); 
    const [errorMessage, setErrorMessage] = useState("");
    
    const navigate = useNavigate();
    const location = useLocation(); 

    // useEffect to handle the success message after registration
    useEffect(() => {
        if (location.state?.emailSent && location.state?.message) {
            setInfoMessage(location.state.message);
            window.history.replaceState({}, document.title); 
        }
    }, [location.state]);


    // STUDENT TODO: TEMPORARY FUNCTION. Replace with a secure call to API_BASE_URL later.
    // This simulates fetching the role from the MongoDB 'Users' collection.
    const TEMPORARY_getRoleFromBackend = (userEmail) => {
        if (userEmail.includes("coordinator")) return "Coordinator";
        if (userEmail.includes("judge")) return "Judge";
        if (userEmail.includes("mentor")) return "Mentor";
        return "Student";
    };

    // handle login form submit
    const handleLogin = async (e) => {
        e.preventDefault();
        setInfoMessage(""); 
        setErrorMessage("");

        try {
            // 1. Firebase Login
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. CRITICAL CHECK: Email Verification
            await reload(user); 

            if (!user.emailVerified) {
                await auth.signOut(); 
                setErrorMessage("Your email has not been verified. Please check your inbox for the link or use the resend button.");
                return; 
            }

            // 3. Determine Role and Redirect
            const userRole = TEMPORARY_getRoleFromBackend(user.email); 

            // 4. Role-Based Navigation
            switch (userRole) {
                case "Coordinator":
                    navigate("/admin-dashboard"); 
                    break;
                case "Judge":
                    navigate("/judge-dashboard"); 
                    break;
                case "Mentor":
                    navigate("/mentor-dashboard"); 
                    break;
                case "Student":
                default:
                    navigate("/team-selection");
                    break;
            }

        } catch (err) {
            console.error("Login error:", err);
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                setErrorMessage("Invalid email or password. Please try again.");
            } else {
                setErrorMessage(`Login failed: ${err.message}`);
            }
        }
    };

    return (
        <div className="login-container">
            {/* Header/Nav will go above here */}
            <h2>Portal Log In</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /><br />

                <button type="submit">Access Portal</button>
            </form>

            <p><Link to="/reset-password" className="forgot-password-link">Forgot your password?</Link></p>
            
            {infoMessage && <p className="message info">{infoMessage}</p>} 
            {errorMessage && <p className="message error">{errorMessage}</p>} 

            <p className="already-account">Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
    );
}
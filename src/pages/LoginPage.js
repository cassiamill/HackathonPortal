import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { Link, useNavigate } from "react-router-dom";
import './LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState(""); // email input
  const [password, setPassword] = useState(""); // password input
  const [message, setMessage] = useState(""); // error / info message
  const navigate = useNavigate();

  // handle login form submit
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Firebase login
      await signInWithEmailAndPassword(auth, email, password);

      // navigate to team selection after login
      navigate("/team-selection");

    } catch (err) {
      console.error(err);
      setMessage(err.message); // show error
    }
  };

  return (
    <div className="login-container">
      <h2>log in</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />

        <button type="submit">Log in</button>
      </form>

      <p><Link to="/reset-password" className="forgot-password-link">Forgot your password?</Link></p>

      <p className="message">{message}</p>

      <p className="already-account">Don't have an account? <Link to="/register">Create an account</Link></p>
    </div>
  );
}
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './RegisterPage.css';

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      // create firebase user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // update display name
      await updateProfile(user, { displayName: name });

      // get firebase token
      const token = await user.getIdToken();

      // call backend to check if user already has a team
      let userTeam = null;
      try {
        const res = await axios.get(
          `https://hackathon-portal-project.onrender.com/users/${user.uid}/team`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        userTeam = res.data.team;
      } catch (err) {
        console.log("Backend not ready or no team yet");
      }

      if (userTeam) {
        navigate("/team"); // user has a team
      } else {
        navigate("/team-selection"); // user needs to select/create a team
      }

    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
        /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        /><br />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        /><br />

        <button type="submit">Sign Up</button>
      </form>

      <p className="message">{message}</p>

      <p className="already-account">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}
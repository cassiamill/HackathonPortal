import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase/config";
import "./HomePage.css";

// Mock data for the landing page sections
const mockData = {
  details: {
    theme: "Sustainable Urban Futures",
    date: "November 23-24, 2025",
    location: "Niagara College Toronto Campus (Virtual Track Available)",
    duration: "24 Hours (Starting 10:00 AM EST)",
  },
  prizes: [
    { title: "Grand Prize", value: "$5,000 Cash + Tech Bundle", description: "Best overall project implementation and presentation." },
    { title: "Runner Up", value: "$2,000 Cash", description: "Second place prize for innovation and completeness." },
    { title: "Sustainability Award", value: "$500 Gift Card", description: "Best project addressing an environmental challenge." },
  ],
  schedule: [
    { time: "10:00 AM", event: "Opening Ceremony & Keynote" },
    { time: "11:00 AM", event: "Hacking Begins & Team Check-in" },
    { time: "05:00 PM", event: "Mentor Office Hours (Virtual)" },
    { time: "11:00 AM (Day 2)", event: "Project Submissions Deadline" },
    { time: "12:00 PM", event: "Live Judging Sessions" },
    { time: "03:00 PM", event: "Closing Ceremony & Awards" },
  ],
  sponsors: [
    { name: "Google Cloud", logo: "https://placehold.co/150x40/f0f0f0/333333?text=Google+Cloud" },
    { name: "AWS", logo: "https://placehold.co/150x40/f0f0f0/333333?text=AWS" },
    { name: "TD Bank", logo: "https://placehold.co/150x40/f0f0f0/333333?text=TD+Bank" },
    { name: "CIBC", logo: "https://placehold.co/150x40/f0f0f0/333333?text=CIBC" },
  ]
};


export default function HomePage() {
  const navigate = useNavigate();

  // Handle "Join Hackathon" click - logic is simplified for now
  const handleJoinHackathon = () => {
    const user = auth.currentUser;

    // If not logged in, navigate to login page
    if (!user) {
      navigate("/login");
      return;
    }
    
    // Default to the team creation flow if the user is logged in
    navigate("/team-selection");
  };

  return (
    <div className="home-container">
      
      {/* 1. HERO SECTION */}
      <section className="section hero-section">
        <h1 className="main-title">GUS HACKATHON PORTAL</h1>
        <h2 className="subtitle">The Home for Innovation.</h2>
        <p className="description">
          Where students collaborate on projects, showcase their skills, and win amazing prizes!
        </p>
        <button className="cta-btn" onClick={handleJoinHackathon}>
          Join the Hackathon
        </button>
        <p className="status-text">Registration is now open!</p>
      </section>

      {/* 2. EVENT DETAILS SECTION */}
      <section className="section details-section">
        <h3 className="section-title">Event Details</h3>
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Theme:</span>
            <span className="detail-value">{mockData.details.theme}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">When:</span>
            <span className="detail-value">{mockData.details.date}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Location:</span>
            <span className="detail-value">{mockData.details.location}</span>
          </div>
        </div>
      </section>
      
      {/* 3. PRIZE SECTION */}
      <section className="section prize-section">
        <h3 className="section-title">Prizes & Awards</h3>
        <div className="prize-list">
          {mockData.prizes.map((p, index) => (
            <div key={index} className="prize-item">
              <span className="prize-rank">#{index + 1}</span>
              <div className="prize-info">
                <h4>{p.title} - <span className="prize-value-text">{p.value}</span></h4>
                <p>{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SCHEDULE SNEAK PEEK */}
      <section className="section schedule-section">
        <h3 className="section-title">Schedule Highlights</h3>
        <div className="schedule-list">
          {mockData.schedule.map((item, index) => (
            <div key={index} className="schedule-item">
              <span className="schedule-time">{item.time}</span>
              <span className="schedule-event">{item.event}</span>
            </div>
          ))}
        </div>
        <Link to="/full-schedule" className="full-schedule-link">View Full Schedule &rarr;</Link>
      </section>

      {/* 5. SPONSORS SECTION */}
      <section className="section sponsor-section">
        <h3 className="section-title">Our Proud Sponsors</h3>
        <div className="sponsor-logos">
          {mockData.sponsors.map((s, index) => (
            <div key={index} className="sponsor-logo-wrapper">
              {/* Using a simple placeholder text to match the minimalist theme */}
              <p className="sponsor-text">{s.name}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
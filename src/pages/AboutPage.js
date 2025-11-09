import React from 'react';
import './AboutPage.css';

export default function AboutPage() {
    return (
        <div className="about-container">
            <h1 className="about-title">🌟 About the GUS Hackathon 2025</h1>
            <p className="about-subtitle">Fostering Innovation and Collaboration Across Campuses.</p>

            <section className="section about-mission">
                <h2 className="section-title">Our Mission</h2>
                <p>
                    The GUS Hackathon is an annual, multi-campus event designed to challenge students 
                    to develop innovative solutions to real-world problems using cutting-edge technology. 
                    It's a high-energy, 72-hour competition where creativity, teamwork, and technical 
                    skills are pushed to the limit. We aim to bridge the gap between academic theory 
                    and practical application, preparing students for the future of tech.
                </p>
            </section>
            
            <section className="section about-theme">
                <h2 className="section-title">This Year's Theme: Sustainable Urban Tech</h2>
                <p>
                    This year, participants will focus on creating solutions that improve city life, 
                    address environmental challenges, or optimize urban infrastructure. From smart traffic 
                    management to waste reduction, we're looking for projects that make our cities smarter 
                    and more sustainable.
                </p>
            </section>

            <section className="section about-sponsors">
                <h2 className="section-title">Our Generous Sponsors</h2>
                <div className="sponsors-grid">
                    <div className="sponsor-logo gold">
                        <p>TechNexus Solutions</p>
                        <span className="tier">GOLD TIER</span>
                    </div>
                    <div className="sponsor-logo silver">
                        <p>CloudCore Services</p>
                        <span className="tier">SILVER TIER</span>
                    </div>
                    <div className="sponsor-logo bronze">
                        <p>Niagara College - Toronto</p>
                        <span className="tier">BRONZE TIER</span>
                    </div>
                </div>
                <p className="sponsor-note">
                    Thank you to all our partners for making this event possible.
                </p>
            </section>
        </div>
    );
}
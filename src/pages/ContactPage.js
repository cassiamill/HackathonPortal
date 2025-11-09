import React from 'react';
import './ContactPage.css';

export default function ContactPage() {
    return (
        <div className="contact-container">
            <h1 className="contact-title">Need Support?</h1>
            <p className="contact-subtitle">Get in touch with the GUS Hackathon Coordination Team or your respective campus support.</p>

            <div className="contact-grid">
                
                {/* 1. Hackathon Coordination (Technical/Event) */}
                <div className="contact-card primary-contact">
                    <h2 className="card-title">Event Coordination & Technical Support</h2>
                    <p>For immediate technical issues, project questions, or event logistics.</p>
                    <div className="contact-info">
                        <strong>Email:</strong> 
                        <a href="mailto:hackathon.support@gus-edu.com">hackathon.support@gus-edu.com</a>
                    </div>
                    <div className="contact-info">
                        <strong>Live Chat:</strong> 
                        <span className="available">Available 24/7 (Days 1-4)</span>
                    </div>
                </div>

                {/* 2. Niagara College - Toronto Support */}
                <div className="contact-card campus-contact">
                    <h2 className="card-title">Niagara College - Toronto Campus</h2>
                    <p>For student services, facility access, and non-hackathon academic inquiries.</p>
                    <div className="contact-info">
                        <strong>Phone:</strong> 
                        <a href="tel:+14168001710">(416) 800-1710</a>
                    </div>
                    <div className="contact-info">
                        <strong>Website:</strong> 
                        <a href="https://niagaracollege.ca/toronto/" target="_blank" rel="noopener noreferrer">niagaracollege.ca/toronto</a>
                    </div>
                    <div className="contact-info">
                        <strong>Location:</strong> 
                        295 Adelaide St W, Toronto, ON M5V 1P7
                    </div>
                </div>

                {/* 3. GUS College B Support (Placeholder for other campus) */}
                <div className="contact-card campus-contact">
                    <h2 className="card-title">GUS College B Campus</h2>
                    <p>For campus-specific inquiries regarding IT, library, or administrative services.</p>
                    <div className="contact-info">
                        <strong>Phone:</strong> 
                        <a href="tel:+15551234567">(555) 123-4567</a>
                    </div>
                    <div className="contact-info">
                        <strong>Website:</strong> 
                        <a href="https://example-gus.com" target="_blank" rel="noopener noreferrer">GUSCollegeB.com</a>
                    </div>
                    <div className="contact-info">
                        <strong>Location:</strong> 
                        [Campus B Address]
                    </div>
                </div>

            </div>
            
            <p className="contact-footer">
                **Note:** Mentors and Judges should use the dedicated Chat feature within the portal for team-specific communications.
            </p>
        </div>
    );
}
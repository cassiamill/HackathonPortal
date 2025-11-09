import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import "./AdminScheduleEditor.css";

// Coordinator check email
const COORDINATOR_EMAIL = "coordinator@example.com"; 

// Mock Schedule Item Structure
const mockSchedule = [
    { id: 1, time: "09:00", event: "Hackathon Launch & Keynote", day: "Day 1", location: "Main Auditorium" },
    { id: 2, time: "10:00", event: "Team Formation/Check-in", day: "Day 1", location: "Registration Desk" },
    { id: 3, time: "18:00", event: "Blueprint Submission Deadline", day: "Day 1", location: "Portal Submission" },
];

export default function AdminScheduleEditor() {
    const [schedule, setSchedule] = useState(mockSchedule);
    const [isCoordinator, setIsCoordinator] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = auth.currentUser;
        
        // 🚨 ACCESS CONTROL: Only Coordinators can edit the schedule
        if (!user || user.email !== COORDINATOR_EMAIL) {
            alert("Access Denied: You must be a Coordinator to edit the schedule.");
            navigate("/admin/dashboard");
            return;
        }
        setIsCoordinator(true);
        
        // STUDENT TODO: Fetch the current live schedule data from the backend
    }, [navigate]);

    const handleSaveSchedule = () => {
        // STUDENT TODO: Send the 'schedule' state data to the backend API to update the live schedule
        console.log("Saving updated schedule:", schedule);
        alert("Schedule updated and published successfully!");
    };

    const handleAddEvent = () => {
        const newEvent = { id: Date.now(), time: "00:00", event: "New Event", day: "Day 1", location: "TBD" };
        setSchedule([...schedule, newEvent]);
    };

    const handleRemoveEvent = (id) => {
        setSchedule(schedule.filter(item => item.id !== id));
    };
    
    // Simple change handler for editing fields
    const handleChange = (id, field, value) => {
        setSchedule(schedule.map(item => 
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    if (!isCoordinator) {
        return <div className="admin-denied">Access Denied: Coordinator Login Required.</div>;
    }

    return (
        <div className="schedule-editor-container">
            <h1 className="editor-title">🗓️ Schedule Editor</h1>
            <p className="editor-subtitle">Modify the live hackathon schedule (Updates will reflect immediately on the **FullSchedulePage**).</p>

            <button onClick={handleAddEvent} className="add-event-button">+ Add New Event</button>

            <div className="schedule-items">
                {schedule.map(item => (
                    <div key={item.id} className="schedule-item-card">
                        <div className="item-details">
                            <input 
                                type="text" 
                                value={item.day} 
                                onChange={(e) => handleChange(item.id, 'day', e.target.value)}
                                className="day-input"
                            />
                            <input 
                                type="time" 
                                value={item.time} 
                                onChange={(e) => handleChange(item.id, 'time', e.target.value)}
                                className="time-input"
                            />
                            <input 
                                type="text" 
                                value={item.event} 
                                onChange={(e) => handleChange(item.id, 'event', e.target.value)}
                                placeholder="Event Description"
                                className="event-input"
                            />
                            <input 
                                type="text" 
                                value={item.location} 
                                onChange={(e) => handleChange(item.id, 'location', e.target.value)}
                                placeholder="Location"
                                className="location-input"
                            />
                        </div>
                        <button onClick={() => handleRemoveEvent(item.id)} className="remove-button">
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <button onClick={handleSaveSchedule} className="save-schedule-button">
                Publish Changes to Live Schedule
            </button>
        </div>
    );
}
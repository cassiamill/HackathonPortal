import React, { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import "./FullSchedulePage.css";

// Mock Data for the presentation schedule
const mockSchedule = [
    { slot: 1, time: "9:00 AM", teamName: "Phoenix Rising", status: "Scheduled" },
    { slot: 2, time: "9:30 AM", teamName: "The Code Whisperers", status: "Scheduled" },
    { slot: 3, time: "10:00 AM", teamName: "Tech Titans", status: "Scheduled" },
    { slot: 4, time: "10:30 AM", teamName: "Algorithm Avengers", status: "Scheduled" },
    { slot: 5, time: "11:00 AM", teamName: "Syntax Squad", status: "Scheduled" },
    { slot: 6, time: "11:30 AM", teamName: "The Debuggers", status: "Scheduled" },
    { slot: 7, time: "1:00 PM", teamName: "Innovators Inc.", status: "Scheduled" }, // Break for lunch
];

// Coordinator check email (must match the Leaderboard one)
const COORDINATOR_EMAIL = "coordinator@example.com";

export default function FullSchedulePage() {
    const [schedule, setSchedule] = useState(mockSchedule);
    const [isCoordinator, setIsCoordinator] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = auth.currentUser;
        if (user && user.email === COORDINATOR_EMAIL) {
            setIsCoordinator(true);
        }
        
        // STUDENT TODO: Fetch the actual schedule from the backend (MongoDB)
        // For now, use mock data and set loading to false.
        setLoading(false);
    }, []);
    
    // Coordinator function to mark a team as 'No Show'
    const handleNoShow = (slotId) => {
        // STUDENT TODO: Send update request to backend
        const newSchedule = schedule.map(item => 
            item.slot === slotId 
                ? { ...item, status: item.status === 'No Show' ? 'Scheduled' : 'No Show' }
                : item
        );
        setSchedule(newSchedule);
        alert(`Status for Slot ${slotId} changed.`);
    };
    
    // Coordinator function to move a team (simple mock swap)
    const handleSwap = (index1, index2) => {
        if (index1 < 0 || index2 < 0 || index1 >= schedule.length || index2 >= schedule.length) return;
        
        const newSchedule = [...schedule];
        
        // Simple swap logic
        [newSchedule[index1], newSchedule[index2]] = [newSchedule[index2], newSchedule[index1]];
        
        // Fix the displayed slot number after the swap
        newSchedule[index1].slot = index1 + 1;
        newSchedule[index2].slot = index2 + 1;
        
        // STUDENT TODO: Send updated schedule to backend
        setSchedule(newSchedule);
    };


    if (loading) return <div className="schedule-loading">Loading Presentation Schedule...</div>;

    return (
        <div className="schedule-container">
            <h1 className="schedule-title">📅 Day 4 Presentation Schedule</h1>
            <p className="schedule-subtitle">Final presentations will be held on Day 4 at Mirvish.</p>
            
            {/* Coordinator Controls (Hidden for students/mentors/judges) */}
            {isCoordinator && (
                <div className="coordinator-controls">
                    <button 
                        onClick={() => setEditMode(!editMode)} 
                        className={`coord-button ${editMode ? 'active' : ''}`}
                    >
                        {editMode ? 'Exit Edit Mode' : 'Enter Edit Mode (Coordinator)'}
                    </button>
                    {editMode && <p className="edit-tip">Drag and drop rows to adjust presentation order.</p>}
                </div>
            )}

            <div className="schedule-wrapper">
                <table className="schedule-table">
                    <thead>
                        <tr>
                            <th>Slot</th>
                            <th>Time</th>
                            <th>Team Name</th>
                            <th>Status</th>
                            {isCoordinator && editMode && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map((item, index) => (
                            <tr 
                                key={item.slot} 
                                className={`status-${item.status.toLowerCase().replace(' ', '-')}`}
                                draggable={isCoordinator && editMode}
                                onDragStart={(e) => e.dataTransfer.setData("index", index)}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    const draggedIndex = parseInt(e.dataTransfer.getData("index"));
                                    handleSwap(draggedIndex, index);
                                }}
                            >
                                <td className="schedule-slot">{index + 1}</td>
                                <td className="schedule-time">{item.time}</td>
                                <td>{item.teamName}</td>
                                <td className="schedule-status">{item.status}</td>
                                
                                {isCoordinator && editMode && (
                                    <td className="schedule-actions">
                                        <button 
                                            onClick={() => handleNoShow(item.slot)}
                                            className="action-noshow"
                                        >
                                            {item.status === 'No Show' ? 'Mark Scheduled' : 'Mark No Show'}
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <p className="schedule-footer">
                Please arrive 15 minutes before your scheduled slot. Check the portal for final updates.
            </p>
        </div>
    );
}
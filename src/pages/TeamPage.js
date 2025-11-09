import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import "./TeamPage.css";

// Mock data to simulate fetching the team's private workspace content
const mockWorkspaceData = {
    teamName: "The Code Whisperers",
    tasks: [
        { id: 1, name: "Finalize AI Model Training Data", assignedTo: "Alex", status: "In Progress" },
        { id: 2, name: "Design Presentation Slides", assignedTo: "Maria", status: "To Do" },
        { id: 3, name: "Integrate Firebase Authentication", assignedTo: "Sam", status: "Completed" },
    ],
    notes: [
        { id: 1, content: "Remember to use the Cloudinary URL from the submission page for the final project demo link.", author: "Alex (Leader)" },
        { id: 2, content: "Check the API limit for the weather data service.", author: "Sam" },
    ],
    resourceLinks: [
        { name: "Official Hackathon GitHub Repo", url: "https://github.com/gus-hack-2025/team-7" },
        { name: "MongoDB Atlas Connection String (Private)", url: "mongodb://[REDACTED]" },
    ],
};

export default function TeamWorkspacePage() {
    const [workspace, setWorkspace] = useState(null);
    const [newTask, setNewTask] = useState("");
    const [newNote, setNewNote] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // STUDENT TODO: Check login and fetch actual team workspace data from backend
        const user = auth.currentUser;
        if (!user) {
            navigate("/login");
            return;
        }
        // In the real app, fetch data based on user's teamId
        setWorkspace(mockWorkspaceData);
    }, [navigate]);

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        // 📌 FRONTEND MOCK LOGIC for Task Addition
        const task = {
            id: workspace.tasks.length + 1,
            name: newTask.trim(),
            assignedTo: "Me", // Simple assignment mock
            status: "To Do",
        };
        // STUDENT TODO: Send task creation request to Node.js backend
        setWorkspace(prev => ({ ...prev, tasks: [...prev.tasks, task] }));
        setNewTask("");
    };

    const handleAddNote = (e) => {
        e.preventDefault();
        if (!newNote.trim()) return;

        // 📌 FRONTEND MOCK LOGIC for Note Addition
        const note = {
            id: workspace.notes.length + 1,
            content: newNote.trim(),
            author: "You", // Simple author mock
        };
        // STUDENT TODO: Send note creation request to Node.js backend
        setWorkspace(prev => ({ ...prev, notes: [note, ...prev.notes] })); // Newest on top
        setNewNote("");
    };
    
    // Function to visually toggle task status (mocking backend interaction)
    const toggleTaskStatus = (taskId) => {
        setWorkspace(prev => ({
            ...prev,
            tasks: prev.tasks.map(task => 
                task.id === taskId 
                    ? { ...task, status: task.status === 'Completed' ? 'To Do' : 'Completed' } 
                    : task
            )
        }));
    };

    if (!workspace) {
        return <div className="loading-container">Loading Private Workspace...</div>;
    }

    return (
        <div className="workspace-container">
            <h1 className="workspace-title">{workspace.teamName} - Private Workspace</h1>
            <p className="workspace-subtitle">Your team's internal collaboration hub.</p>

            {/* 1. TO-DO LIST / TASK MANAGEMENT */}
            <section className="section task-section">
                <h3 className="section-title">🚀 Team To-Do List</h3>
                <form onSubmit={handleAddTask} className="task-form">
                    <input
                        type="text"
                        placeholder="Add a new task (e.g., Build Frontend Dashboard)"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        className="task-input"
                    />
                    <button type="submit" className="task-button">Add Task</button>
                </form>
                
                <div className="task-list">
                    {workspace.tasks.map(task => (
                        <div key={task.id} className={`task-item status-${task.status.toLowerCase().replace(' ', '-')}`}>
                            <input 
                                type="checkbox" 
                                checked={task.status === 'Completed'}
                                onChange={() => toggleTaskStatus(task.id)}
                            />
                            <span className="task-name">{task.name}</span>
                            <span className="task-assignee">({task.assignedTo})</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* 2. SHARED NOTES & RESOURCES */}
            <section className="section notes-section">
                <h3 className="section-title">📝 Quick Notes & Ideas</h3>
                <form onSubmit={handleAddNote} className="note-form">
                    <textarea
                        placeholder="Share a quick note or idea..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        rows="3"
                        className="note-textarea"
                    ></textarea>
                    <button type="submit" className="task-button">Add Note</button>
                </form>
                
                <div className="notes-list">
                    {workspace.notes.map(note => (
                        <div key={note.id} className="note-item">
                            <p className="note-content">{note.content}</p>
                            <span className="note-author">- {note.author}</span>
                        </div>
                    ))}
                </div>
            </section>
            
            <section className="section links-section">
                <h3 className="section-title">🔗 Critical Resources</h3>
                <ul className="links-list">
                    {workspace.resourceLinks.map((link, index) => (
                        <li key={index}>
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="resource-link">
                                {link.name} &rarr;
                            </a>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
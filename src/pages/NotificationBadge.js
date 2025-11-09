import React, { useState, useEffect } from 'react';
import './NotificationBadge.css';

// Mock function to fetch unread notifications for a user role
const fetchUnreadNotifications = (role) => {
    // STUDENT TODO: Replace this with an API call based on the logged-in user's ID
    const mockData = {
        Student: 3,
        Mentor: 1,
        Judge: 0,
        Coordinator: 5 // Coordinator gets system alerts
    };
    return mockData[role] || 0;
};

export default function NotificationBadge({ role }) {
    const [count, setCount] = useState(0);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        // Fetch count on load
        setCount(fetchUnreadNotifications(role));
        
        // Setup a simple polling interval (optional, but realistic for live updates)
        const interval = setInterval(() => {
            setCount(fetchUnreadNotifications(role));
        }, 30000); // Check every 30 seconds

        return () => clearInterval(interval);
    }, [role]);

    const handleClick = () => {
        // STUDENT TODO: Navigate to the actual Notifications Center page 
        // For now, this clears the badge and shows a message
        if (count > 0) {
            alert(`Opening Notification Center for ${role}. ${count} unread messages cleared.`);
            setCount(0);
        } else {
            alert(`No new notifications for ${role}.`);
        }
    };

    if (count === 0) return null;

    return (
        <div 
            className="notification-badge" 
            onClick={handleClick}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <span className="notification-icon">💬</span>
            <span className="notification-count">{count}</span>
            {showTooltip && (
                <div className="notification-tooltip">
                    You have {count} unread system messages or announcements.
                </div>
            )}
        </div>
    );
}
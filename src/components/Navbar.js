import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import logo from "../images/1.png"; 
import "./Navbar.css";

// STUDENT TODO: Temporary function to simulate fetching the user's role from the backend
const TEMPORARY_getRole = (userEmail) => {
    if (!userEmail) return null;
    if (userEmail.includes("coordinator")) return "Coordinator";
    if (userEmail.includes("judge")) return "Judge";
    if (userEmail.includes("mentor")) return "Mentor";
    return "Student";
};

function Navbar() {
  // Now stores the user object AND their assigned role
  const [user, setUser] = useState(null); 
  const [userRole, setUserRole] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    // 🚨 IMPORTANT: When backend is ready, this is where you call the API 
    // to get the *verified* role from your MongoDB 'Users' collection.
    
    const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        // 1. Get basic Firebase user data
        const userData = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || firebaseUser.email,
        };

        // 2. TEMPORARY: Simulate fetching the user's role
        const role = TEMPORARY_getRole(firebaseUser.email);
        
        setUser(userData);
        setUserRole(role);
        
        // STUDENT TODO: Store the role in localStorage for simple persistence/checking
        localStorage.setItem("userRole", role); 

      } else {
        setUser(null);
        setUserRole(null);
        localStorage.removeItem("userRole");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      setDropdownOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  
  // ⬇️ New function to render links based on role
  const renderNavLinks = () => {
    // Links visible to all authenticated users
    let links = [];

const closeDropdown = () => setDropdownOpen(false);

    // === COMMON UTILITY LINKS ===
    links.push(<Link key="schd-pub" to="/schedule" onClick={closeDropdown}>Full Schedule</Link>);
    links.push(<div key="div-1" className="dropdown-divider" />);
    
    // === ROLE-SPECIFIC LINKS (UPDATED PATHS) ===
    if (userRole === "Student") {
        // FIX: Updated paths to use structured routing convention
        links.push(<Link key="dash" to="/student/dashboard" onClick={closeDropdown}>Dashboard</Link>); 
        links.push(<Link key="team" to="/student/team" onClick={closeDropdown}>My Team & Submissions</Link>); // My Team links
        links.push(<Link key="schd-priv" to="/student/schedule" onClick={closeDropdown}>Presentation Schedule</Link>); 
        links.push(<Link key="prof" to="/student/profile" onClick={closeDropdown}>Edit Profile</Link>); 
    }

    else if (userRole === "Mentor") {
        links.push(<Link key="mentorDash" to="/mentor/teams" onClick={closeDropdown}>My Teams</Link>); 
        links.push(<Link key="briefing" to="/mentor/briefing" onClick={closeDropdown}>Briefing View</Link>); 
        links.push(<Link key="prof" to="/mentor/profile" onClick={closeDropdown}>My Profile</Link>); 
    }

    else if (userRole === "Judge") {
        links.push(<Link key="judgeDash" to="/judge/dashboard" onClick={closeDropdown}>Judge Portal</Link>); 
        links.push(<Link key="grade" to="/judge/grading" onClick={closeDropdown}>Live Grading</Link>); 
        links.push(<Link key="sublist" to="/judge/submissions" onClick={closeDropdown}>Submissions List</Link>);
    }
    
    else if (userRole === "Coordinator") {
        links.push(<Link key="adminDash" to="/admin/dashboard" onClick={closeDropdown}>Admin Dashboard</Link>); 
        links.push(<Link key="users" to="/admin/users" onClick={closeDropdown}>Users</Link>); 
        links.push(<Link key="reports" to="/admin/reports" onClick={closeDropdown}>Reports & Analytics</Link>); 
    links.push(<Link key="lboard-pub" to="/leaderboard" onClick={closeDropdown}>Leaderboard</Link>);
        links.push(<Link key="schd-edit" to="/admin/schedule-edit" onClick={closeDropdown}>Edit Schedule</Link>);
    }
    
    // === INFO & SUPPORT LINKS ===
    links.push(<div key="div-2" className="dropdown-divider" />);
    links.push(<Link key="about" to="/about" onClick={closeDropdown}>About Hackathon</Link>);
    links.push(<Link key="contact" to="/contact" onClick={closeDropdown}>Contact & Support</Link>);
    
    // Links visible to everyone (e.g., Logout)
    links.push(<button key="logout" onClick={handleLogout}>Log out</button>);
    
    return links;
  };


  return (
    <nav className="navbar">
      <div className="nav-left">
        {/* Link always goes to the main landing page */}
        <Link to="/">
          <img src={logo} alt="Hackathon Portal Logo" className="nav-logo" />
        </Link>
      </div>

      {user ? (
        // ✅ Authenticated View: Show user name and role-based dropdown
        <div className="nav-right authenticated">
          <span className="user-info">Welcome, {user.name.split(' ')[0]} ({userRole})</span>
          <div className="hamburger" onClick={() => setDropdownOpen(!dropdownOpen)}>
            &#9776;
          </div>
          {dropdownOpen && (
            <div className="dropdown-menu">
              {renderNavLinks()} {/* Render dynamic links */}
            </div>
          )}
        </div>
      ) : (
        // ✅ Public View: Show Login/Sign Up buttons
        <div className="nav-right public">
          <Link to="/login" className="nav-btn">Log In</Link>
          <Link to="/register" className="nav-btn signup-highlight">Sign Up</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
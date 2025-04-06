import React, { useEffect } from "react";
import { useNavigate} from "react-router-dom";
import './index.css';
import { useState } from "react";
import Map from "./Map";


function Dashboard() {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            navigate("/login");
        } else {
            setUsername(localStorage.getItem("username"));
        }
    }, [navigate]);
    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("username");
        navigate("/login");
    }
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }

    return (
        <div className="dashboard">
            <header>
                <nav className="navbar-links">
                    <button onClick={handleLogout} className="navbar-button-logout">
                        Logout
                    </button>
                    <button className="navbar-button">
                        Profile Settings
                    </button>
                </nav>
                <h1>Dashboard</h1>
                <p>Welcome, {username}!</p>
                
            </header>
            <main>
                <Map />
            </main>
        </div>
    );
}

export default Dashboard;
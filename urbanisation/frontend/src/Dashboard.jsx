import React, { useEffect } from "react";
import { useNavigate} from "react-router-dom";
import './index.css';
import { useState } from "react";

function Dashboard() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            // Dacă nu există token, redirecționează utilizatorul la pagina de login
            navigate("/login");
        }
    }, [navigate]);
    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard!</p>
            
        </div>
    );
}

export default Dashboard;
import React, { useEffect } from "react";
import { useNavigate} from "react-router-dom";
import './index.css';
import { useState } from "react";
import Map from "./Map";
import axios from "axios";
import { toast } from "react-toastify";

function Dashboard() {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [showMap, setShowMap] = useState(true);
    const [favoriteRoutes, setFavoriteRoutes] = useState([]);


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
    const handleFavoriteRoutesClick = async () => {
        setShowMap(false); 
        const token = localStorage.getItem("access_token");
        if (!token) {
            navigate("/login");
        }
        try {
            const response = await axios.get("http://localhost:8000/api/routes/get-favorites/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                console.log("Favorite Routes:", response.data);
                length = response.data.favorites.length;
                console.log("test", response.data.favorites[length-1]);
                // Handle the favorite routes data as needed
                setFavoriteRoutes(response.data.favorites);
            }
            
        }
        catch (error) {
            console.error("Error fetching favorite routes:", error);
            // Handle error as needed
            if (error.response && error.response.status === 401) {
                navigate("/login");
            } else {
                console.error("Error fetching favorite routes:", error.message);
            }
        }
    }
    const handleDeleteFavoriteRoute = async (routeId) => {
        const token  = localStorage.getItem("access_token");
        if (!token) {
            navigate("/login");
        }
        try {
            const response = await axios.delete(`http://localhost:8000/api/routes/delete-favorite/${routeId}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                console.log("Favorite Route deleted successfully:", response.data);
                toast.success("Favorite Route deleted successfully!");
                setFavoriteRoutes((prevRoutes) => prevRoutes.filter((route) => route.route_id !== routeId));
            }
            else if (response.status === 404) {
                toast.error("Favorite Route not found!");
            }
        } catch (error) {
            console.error("Error deleting favorite route:", error);
        }
    }
    const handleHomeClick = () => {
        setShowMap(true);
    }
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }

    return (
        <div className="dashboard">
            <header>
                <nav className="navbar-links">
                    <button className="navbar-button" onClick={handleHomeClick}>
                        Home
                    </button>
                    <button className="navbar-button-favRoutes" onClick={handleFavoriteRoutesClick}>
                        Favorite Routes
                    </button>
                    <button className="navbar-button">
                        Profile Settings
                    </button>
                    <button className="navbar-button-logout">
                        Report Route
                    </button>
                    <button onClick={handleLogout} className="navbar-button-logout">
                        Logout
                    </button>
                </nav>
                <h1>Dashboard</h1>
                <p>Welcome, {username}!</p>
                
            </header>
            <main>
                {showMap ? (
                    <Map />
                ) : (
                    <div className="favorite-routes">
                        <h2>Favorite Routes:</h2>
                        {favoriteRoutes.length > 0 ? (
                            <ul>
                                {favoriteRoutes.map((route, index) => (
                                    <li key={index}>
                                        <p className="favorite-routes-p">{route.route_name}</p>
                                        <button className="favorite-routes-button" onClick={() => handleDeleteFavoriteRoute(route.route_id, username)}>Delete</button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No favorite routes found.</p>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Dashboard;
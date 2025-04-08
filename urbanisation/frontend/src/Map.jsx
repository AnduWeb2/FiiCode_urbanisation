import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { routes } from "./Api_data.jsx";
import "leaflet/dist/leaflet.css";
import "./index.css";

function Map() {
    const mapRef = useRef(null);
    const searchBarRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredRoutes, setFilteredRoutes] = useState(routes);
    const [showResults, setShowResults] = useState(false);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = routes.filter((route) =>
            route.route_long_name.toLowerCase().includes(term)
        );
        setFilteredRoutes(filtered);
        setShowResults(true);
    };

    const handleClickOutside = (e) => {
        if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
            setShowResults(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="search-bar-container" ref={searchBarRef}>
                <input
                    type="text"
                    placeholder="Search for routes..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-bar"
                />
                {showResults && filteredRoutes.length > 0 && (
                    <div className="search-results">
                        <ul>
                            {filteredRoutes.map((route, index) => (
                                <li key={index} className="search-result-item">
                                    <span className="route-number">{route.route_id}</span>
                                    <span className="route-name">{route.route_long_name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div style={{ height: "50vh", width: "50vw" }} className="map-container">
                <MapContainer
                    center={[47.1585, 27.6014]}
                    zoom={13}
                    ref={mapRef}
                    style={{ height: "50vh", width: "50vw" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                </MapContainer>
            </div>
        </>
    );
}

export default Map;
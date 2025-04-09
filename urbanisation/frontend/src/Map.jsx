import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import { routes, trips, stops, stop_times } from "./Api_data.jsx";
import "leaflet/dist/leaflet.css";
import "./index.css";
import Routing from "./Routing.jsx";


function Map() {
    const mapRef = useRef(null);
    const searchBarRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredRoutes, setFilteredRoutes] = useState(routes);
    const [showResults, setShowResults] = useState(false);
    const [stopsDetails, setStopsDetails] = useState([]);
    const [color, setColor] = useState("#000000");
    const [showPolyline, setShowPolyline] = useState(false);

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

    const handleRouteClick = (routeID) => {
        const route1 = routes.find((route) => route.route_id === routeID);
        const trip = trips.find((trip) => trip.route_id === routeID && trip.direction_id === 0);
        let stopSeq = 0;
        let stopIDs = [];
        let stopid = stop_times.find((stop) => stop.trip_id === trip.trip_id && stop.stop_sequence === stopSeq);
        stopIDs.push(stopid.stop_id);
        stopSeq++;
        while (stopid) {
            stopid = stop_times.find((stop) => stop.trip_id === trip.trip_id && stop.stop_sequence === stopSeq);
            if (stopid) {
                stopIDs.push(stopid.stop_id);
                stopSeq++;
            }
        }
        let stops_details = [];
        setShowPolyline(false);
        for (let i = 0; i < stopIDs.length; i++) {
            const stop = stops.find((stop) => stop.stop_id === stopIDs[i]);
            stops_details.push({
                stop_name: stop.stop_name,
                lat: stop.stop_lat,
                lon: stop.stop_lon,
            });
            setColor(route1.route_color);
        }
        setTimeout(() => setShowPolyline(true), 10);
        setStopsDetails(stops_details);
        console.log("Route clicked:", route1.route_long_name);
        console.log("Trip:", trip);
        console.log("Stops", stops_details);
        console.log("Color", color);
        setShowResults(false);
    }

    return (
        <>
            <div className="search-bar-container" ref={searchBarRef}>
                <input
                    type="text"
                    placeholder="Search for routes..."
                    value={searchTerm}
                    onChange={handleSearch}
                    onFocus={() => setShowResults(true)}
                    className="search-bar"
                />
                {showResults  && (
                    <div className="search-results">
                        <ul>
                            {filteredRoutes.map((route, index) => (
                                <li key={index} className="search-result-item" onClick={() => handleRouteClick(route.route_id)}>
                                    <span className="route-number" style={{ backgroundColor: route.route_color }}>{route.route_id}</span>
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
                    {stopsDetails.map((stop, index) => (
                        <Marker key={index} position={[stop.lat, stop.lon]}>
                            <Popup>{stop.stop_name}</Popup>
                        </Marker>
                    ))}
                    {stopsDetails.length > 1 && showPolyline===true && (
                        <Routing points={stopsDetails.map((stop) => [stop.lat, stop.lon])} color={color} />
                        
                    )}
                </MapContainer>
            </div>
        </>
    );
}

export default Map;
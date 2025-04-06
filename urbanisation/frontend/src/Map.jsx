import React, {useRef} from "react";
import {MapContainer, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './index.css';

function Map() {
    const mapRef = useRef(null);

    return (
        <div style={{ height: "50vh", width: "50vw" }} className="map-container">
            <MapContainer center={[47.1585, 27.6014]} zoom={13} ref={mapRef} style={{height: "50vh", width: "50vw"}} >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
            </MapContainer>
        </div>
    );
}
export default Map;
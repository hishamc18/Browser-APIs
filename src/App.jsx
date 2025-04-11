import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
    const [input, setInput] = useState("");
    const [location, setLocation] = useState({ lat: null, long: null });
    const [placeDetails, setPlaceDetails] = useState("");

    const speak = () => {
        const utterance = new SpeechSynthesisUtterance(input);
        speechSynthesis.speak(utterance);
    };

    const handleNotify = () => {
        if ("Notification" in window) {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    const notification = new Notification("Hello from Hisham", {
                        body: "Hope you are fine.",
                    });
                    notification.onclick = () => {
                        window.open("http://localhost:5173");
                    };
                } else {
                    alert("Notification permission not granted.");
                }
            });
        } else {
            alert("This browser does not support notifications.");
        }
    };

    const getLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const long = position.coords.longitude;
                    setLocation({ lat, long });

                    try {
                        const apiKey = import.meta.env.VITE_OPENCAGE;
                        const response = await axios.get(
                            `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${apiKey}`
                        );

                        const result = response.data.results[0];
                        const { city, town, village, suburb, hamlet, state, country } = result.components;

                        const placeName = city || town || village || suburb || hamlet || "Unknown place";
                        const locationName = `${placeName}, ${state}, ${country}`;
                        setPlaceDetails(locationName);
                    } catch (err) {
                        console.log("Error getting location details.");
                    }
                },
                (err) => {
                    alert("Location access denied or unavailable.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    return (
      <>
      <h1 className="heading">Browser APIs</h1>
        <div className="app">
            <div className="card">
                <h2>🗣️ Text to Speech</h2>
                <input
                    type="text"
                    placeholder="Type something..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className="btn blue" onClick={speak}>
                    Speak
                </button>
            </div>

            <div className="card">
                <h2>🔔 Browser Notification</h2>
                <button className="btn green" onClick={handleNotify}>
                    Show Notification
                </button>
                <p className="note">Make sure you allowed browser notifications!</p>
            </div>

            <div className="card">
                <h2>📍 Find My Location</h2>
                <button className="btn red" onClick={getLocation}>
                    Show Location
                </button>
                <p className="note">Make sure you allowed browser location access!</p>
                {location.lat && location.long && (
                    <>
                        <p>🌐 Latitude: {location.lat}</p>
                        <p>🌐 Longitude: {location.long}</p>
                    </>
                )}

                {placeDetails && <h4>📍 Location: {placeDetails}</h4>}
            </div>
        </div>
        </>
    );
};

export default App;

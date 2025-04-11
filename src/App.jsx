import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [input, setInput] = useState("please type something");
  const [location, setLocation] = useState({ lat: null, long: null });
  const [placeDetails, setPlaceDetails] = useState("");

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Online status handler
  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);


  // text to speach
  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(input);
    speechSynthesis.speak(utterance);
  };


  // handle notification
  const handleNotify = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          const notification = new Notification("Hello from Hisham", {
            body: "Hope you are fine.",
          });
          notification.onclick = () => {
            window.open("https://browserapis-pi.vercel.app/");
          };
        } else {
          alert("Notification permission not granted.");
        }
      });
    } else {
      alert("This browser does not support notifications.");
    }
  };


  // fetching location
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


  // camera access
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOn(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  // closing camera
  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
  };

  return (
    <>
      <h1 className="heading">Browser APIs</h1>
      <div className="app">
        {/* Text to Speech */}
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

        {/* Browser Notification */}
        <div className="card">
          <h2>🔔 Browser Notification</h2>
          <button className="btn green" onClick={handleNotify}>
            Show Notification
          </button>
          <p className="note">Make sure you allowed browser notifications!</p>
        </div>

        {/* Location Access */}
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

        {/* Camera Access */}
        <div className="card">
          <h2>📷 Live Camera</h2>
          <video
            ref={videoRef}
            autoPlay
            style={{ width: "70%", borderRadius: "12px", marginBottom: "1rem" }}
          />
          {!isCameraOn ? (
            <button onClick={openCamera} className="btn blue">
              Open Camera
            </button>
          ) : (
            <button onClick={closeCamera} className="btn red">
              Close Camera
            </button>
          )}
        </div>

        {/* Online Status */}
        <div className="card">
          <h2>🌐 Network Status</h2>
          <p>You are currently: <strong>{isOnline ? "Online ✅" : "Offline ❌"}</strong></p>
        </div>
      </div>
    </>
  );
};

export default App;

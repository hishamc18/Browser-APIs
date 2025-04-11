# 🌐 Browser APIs Showcase

**🔴 Live Demo:** [https://browserapis-pi.vercel.app/](https://browserapis-pi.vercel.app/)

<img width="1680" alt="Screenshot 2025-04-11 at 9 09 24 PM" src="https://github.com/user-attachments/assets/73de27fa-16bf-4bb9-8d6f-ef6cab28133c" />


---

## 📦 Features

### 🗣️ Text to Speech
- Type anything and your browser will read it out loud.
- Powered by the **Web Speech API**.

---

### 🔔 Browser Notification
- Send a native browser notification.
- Works with the **Notification API** (requires user permission).

---

### 📍 Find My Location
- Uses `navigator.geolocation` to get your current coordinates.
- Reverse geocodes your location via the [OpenCage Geocoder API](https://opencagedata.com/).
- Displays:
  - 🌐 **Latitude & Longitude**
  - 📍 **Human-readable address**

---

### 📷 Camera Access
- Stream live video from your webcam using `navigator.mediaDevices.getUserMedia`.
- Toggle **camera on/off** using buttons.

---

### 📡 Network & Device Info
- Detects **online/offline** status using `navigator.onLine`.
- Displays:
  - 🔋 **Battery level & charging status** via the Battery Status API
  - 🖥️ **Browser & device info** via `navigator.userAgent`

---

## 🛠️ Built With

- React + Vite
- Vanilla Browser APIs (Geolocation, MediaDevices, Notifications, SpeechSynthesis, etc.)
- OpenCage Geocoder API

---

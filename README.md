# 🌐 Browser APIs Showcase

A fun and interactive React app demonstrating various modern browser capabilities!

**🔴 Live Demo:** [https://browserapis-pi.vercel.app/](https://browserapis-pi.vercel.app/)

![Screenshot](https://github.com/user-attachments/assets/f9f8b28e-948a-4892-b0d9-33b6495f870b)

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

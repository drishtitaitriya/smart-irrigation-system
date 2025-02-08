// import React, { useState } from "react";
// import axios from "axios";

// function App() {
//   const [city, setCity] = useState("");
//   const [irrigationData, setIrrigationData] = useState(null);

//   const getIrrigationAdvice = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/irrigation?city=${city || "Delhi"}`);
//       setIrrigationData(response.data);
//     } catch (error) {
//       console.error("Error fetching irrigation data:", error);
//     }
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
//       <h2 style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold" }}>🌱 Smart Irrigation System</h2>

//       {/* Input Field */}
//       <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
//         <input
//           type="text"
//           placeholder="Enter City (e.g., Mumbai)"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           style={{ flex: 1, padding: "10px", fontSize: "16px" }}
//         />
//         <button
//           onClick={getIrrigationAdvice}
//           style={{ padding: "10px", fontSize: "16px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}
//         >
//           Get Advice
//         </button>
//       </div>

//       {/* Display Irrigation Data */}
//       {irrigationData && (
//         <div style={{ background: "#f9f9f9", padding: "20px", borderRadius: "10px", marginTop: "20px" }}>
//           <h3>🌍 Weather in {irrigationData.city}</h3>
//           <p><strong>🌡 Temperature:</strong> {irrigationData.temperature}°C</p>
//           <p><strong>💧 Humidity:</strong> {irrigationData.humidity}%</p>
//           <p><strong>🌧 Rainfall:</strong> {irrigationData.rainfall} mm</p>
//           <h4 style={{ color: "blue" }}>🚰 {irrigationData.recommendation}</h4>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { CloudRain, Droplets, Thermometer, MapPin, Search } from "lucide-react";

function App() {
  const [city, setCity] = useState("");
  const [irrigationData, setIrrigationData] = useState(null);
  const [error, setError] = useState(false);

  const getIrrigationAdvice = async () => {
    try {
      setError(false);
      const response = await axios.get(`http://localhost:5000/irrigation?city=${city || "Delhi"}`);
      setIrrigationData(response.data);
    } catch (error) {
      console.error("Error fetching irrigation data:", error);
      setError(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #4caf50, #81c784)",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          background: "#ffffff",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
          width: "100%",
          maxWidth: "500px",
          textAlign: "center",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px", color: "#2E7D32" }}
        >
          🌱 Smart Irrigation System
        </motion.h2>

        {/* Input Field */}
        <motion.div
          animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.2 }}
          style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}
        >
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="text"
            placeholder="Enter City (e.g., Mumbai)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{
              flex: 1,
              padding: "12px",
              fontSize: "16px",
              border: "2px solid #4CAF50",
              borderRadius: "8px",
              outline: "none",
            }}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={getIrrigationAdvice}
            style={{
              padding: "12px",
              fontSize: "16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <Search size={18} /> Get Advice
          </motion.button>
        </motion.div>

        {/* Display Irrigation Data */}
        {irrigationData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              background: "#F1F8E9",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "20px",
              textAlign: "left",
            }}
          >
            <motion.h3
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <MapPin size={20} color="#2E7D32" /> Weather in {irrigationData.city}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <Thermometer size={20} color="#E57373" /> <strong>Temperature:</strong> {irrigationData.temperature}°C
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <Droplets size={20} color="#1E88E5" /> <strong>Humidity:</strong> {irrigationData.humidity}%
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <CloudRain size={20} color="#1565C0" /> <strong>Rainfall:</strong> {irrigationData.rainfall} mm
            </motion.p>
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ color: "blue", marginTop: "10px", fontWeight: "bold" }}
            >
              🚰 {irrigationData.recommendation}
            </motion.h4>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default App;


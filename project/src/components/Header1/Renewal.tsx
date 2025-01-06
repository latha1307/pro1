import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Renewal: React.FC = () => {
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const handleAddRenewal = () => {
    navigate("/renewalform");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "20vh",
        backgroundColor: "#f6fcf7",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ color: "purple", marginBottom: "20px", fontWeight: "bold" }}>Enter ID For Payment</h2>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Enter ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            border: "1px solid black",
            borderRadius: "4px",
            width: "600px",
          }}
        />
        <button
          style={{
            padding: "15px 80px",
            backgroundColor: "#56baed",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "14px",
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",
          }}
          onClick={handleAddRenewal}
        >
          Go
        </button>
      </div>
    </div>
  );
};

export default Renewal;

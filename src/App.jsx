// src/App.jsx
import { useEffect, useState } from "react";
import API from "./services/api.js";
import LeadForm from "./components/LeadForm.jsx";
import LeadTable from "./components/LeadTable.jsx";
import Dashboard from "./components/Dashboard.jsx";

function App() {
  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    try {
      const res = await API.get("/leads");
      setLeads(res.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
  <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
    <h1 style={{ marginBottom: "20px" }}>Lead Dashboard</h1>

    <div style={{ marginBottom: "30px", overflow: "scroll" }}>
      <Dashboard leads={leads} />
    </div>

    {/* ➕ Add Lead */}
    <div style={{ marginBottom: "30px" }}>
      <LeadForm refresh={fetchLeads} />
    </div>

    {/* 📋 Table */}
    <div style={{ marginBottom: "30px" }}>
      <LeadTable leads={leads} />
    </div>
  </div>
);
}

export default App;
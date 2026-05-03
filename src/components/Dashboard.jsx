// // src/components/Dashboard.jsx
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Dashboard({ leads = [] }) {
  const safeLeads = Array.isArray(leads) ? leads : [];

  const statusCount = {};
  const cityCount = {};
  const serviceCount = {};

  safeLeads.forEach((lead) => {
    const status = lead?.status || "Unknown";
    const city = lead?.city || "Unknown";
    const service = lead?.service || "Unknown";

    statusCount[status] = (statusCount[status] || 0) + 1;
    cityCount[city] = (cityCount[city] || 0) + 1;
    serviceCount[service] = (serviceCount[service] || 0) + 1;
  });

  const statusData = Object.entries(statusCount).map(([name, value]) => ({
    name,
    value,
  }));

  const cityData = Object.entries(cityCount).map(([name, value]) => ({
    name,
    value,
  }));

  const serviceData = Object.entries(serviceCount).map(([name, value]) => ({
    name,
    value,
  }));

  if (safeLeads.length === 0) {
    return (
      <div style={{ marginBottom: "24px" }}>
        <h2>Dashboard</h2>
        <p>No leads yet.</p>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: "24px", marginTop: "20px",  }}>
      <h2>Dashboard</h2>
      <h3>Total Leads: {safeLeads.length}</h3>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <div style={{ width: "100%", height: 320 }}>
          <h4>Status-wise Count</h4>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {statusData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{ width: "100%", height: 320 }}>
          <h4>City-wise Distribution</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cityData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ width: "100%", height: 320, gridColumn: "1 / -1" }}>
          <h4>Service-wise Distribution</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={serviceData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
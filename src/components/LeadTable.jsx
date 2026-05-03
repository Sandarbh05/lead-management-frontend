// src/components/LeadTable.jsx
export default function LeadTable({ leads = [] }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr style={{ background: "#f5f5f5" }}>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Mobile</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>City</th>
            <th style={thStyle}>Service</th>
            <th style={thStyle}>Budget</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>

        <tbody>
          {leads.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                No leads found
              </td>
            </tr>
          ) : (
            leads.map((lead) => (
              <tr key={lead._id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={tdStyle}>{lead.name}</td>
                <td style={tdStyle}>{lead.mobile}</td>
                <td style={tdStyle}>{lead.email}</td>
                <td style={tdStyle}>{lead.city}</td>
                <td style={tdStyle}>{lead.service}</td>
                <td style={tdStyle}>₹{lead.budget}</td>

                {/* Status Badge */}
                <td style={tdStyle}>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      background: getStatusColor(lead.status),
                      color: "#fff",
                    }}
                  >
                    {lead.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// reusable styles
const thStyle = {
  textAlign: "left",
  padding: "12px",
  fontSize: "14px",
};

const tdStyle = {
  padding: "12px",
  fontSize: "14px",
};

// status color helper
function getStatusColor(status) {
  switch (status) {
    case "New":
      return "#007bff";
    case "Interested":
      return "#ffc107";
    case "Converted":
      return "#28a745";
    case "Rejected":
      return "#dc3545";
    default:
      return "#6c757d";
  }
}
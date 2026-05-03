// src/components/LeadForm.jsx
import { useState } from "react";
import API from "../services/api";

export default function LeadForm({ refresh }) {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    city: "",
    service: "",
    budget: "",
    status: "New"
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      budget: form.budget ? Number(form.budget) : undefined,
    };

    try {
      setLoading(true);
      await API.post("/leads", payload);

      setForm({
        name: "",
        mobile: "",
        email: "",
        city: "",
        service: "",
        budget: "",
        status: "New"
      });

      refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to add lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "10px"
    }}
    >
      
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input type="tel" name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
      <input name="service" placeholder="Service" value={form.service} onChange={handleChange} />
      <input type="number" name="budget" placeholder="Budget" value={form.budget} onChange={handleChange} />

      <select name="status" value={form.status} onChange={handleChange}>
        <option value="New">New</option>
        <option value="Interested">Interested</option>
        <option value="Converted">Converted</option>
        <option value="Rejected">Rejected</option>
      </select>

      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Lead"}
      </button>
    </form>
  );
}
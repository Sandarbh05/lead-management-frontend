// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://lead-management-backend-1t59.onrender.com/api/v1",
});

export default API;
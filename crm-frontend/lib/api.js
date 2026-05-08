import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Attach token to every request automatically
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Handle 401 globally - redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

// ===== AUTH =====
export const authAPI = {
  login: (data) => api.post("/auth/login", data),
  register: (data) => api.post("/auth/register", data),
  getMe: () => api.get("/auth/me"),
};

// ===== LEADS =====
export const leadsAPI = {
  getAll: (params) => api.get("/leads", { params }),
  getById: (id) => api.get(`/leads/${id}`),
  create: (data) => api.post("/leads", data),
  update: (id, data) => api.put(`/leads/${id}`, data),
  delete: (id) => api.delete(`/leads/${id}`),
  updateStatus: (id, status) => api.patch(`/leads/${id}/status`, { status }),
};

// ===== NOTES =====
export const notesAPI = {
  getByLead: (leadId) => api.get(`/leads/${leadId}/notes`),
  create: (leadId, data) => api.post(`/leads/${leadId}/notes`, data),
  delete: (noteId) => api.delete(`/leads/notes/${noteId}`),
};

// ===== DASHBOARD =====
export const dashboardAPI = {
  getStats: () => api.get("/dashboard"),
};

export default api;

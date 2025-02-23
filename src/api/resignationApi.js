import apiClient from "./apiClient";

const resignationApi = {
  submitResignation: async (token, resignationData) => {
    try {
      const response = await apiClient.post("/user/resign", resignationData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getAllResignations: async (token) => {
    try {
      const response = await apiClient.get("/admin/resignations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  concludeResignation: async (token, resignationId, approved, lwd) => {
    try {
      const response = await apiClient.put(
        "/admin/conclude_resignation",
        { resignationId, approved, lwd },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default resignationApi;

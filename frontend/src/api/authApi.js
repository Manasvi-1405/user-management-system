import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Response handler
const handleResponse = (response) => {
  return {
    success: true,
    data: response.data,
  };
};

// Error handler
const handleError = (error) => {
  return {
    success: false,
    message:
      error.response?.data?.message || "Something went wrong",
  };
};

export const authApi = {


  //login signin
  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  //signup
  register: async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);
      return handleResponse(response);
    } catch (error) {
      return handleError(error);
    }
  },

  //reset-password
  
  dangerReset: async (data) => {
  try {
    const response = await api.post("/auth/danger-reset", data);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
}

};

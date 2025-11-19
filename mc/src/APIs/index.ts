import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Use VITE_ prefix if using Vite
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// -------------- AUTH ----------------

export const sendSignupOtp = async (obj: object) => {
  try {
    const response = await API.post("/api/auth/signup-otp/", obj);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const signupUser = async (obj: object) => {
  try {
    const response = await API.post("/api/auth/signup/", obj);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const signinUser = async (obj: object) => {
  try {
    const response = await API.post("/api/auth/signin/", obj);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

// -------------MEETING-------------------
export const uploadMeeting = async (obj: object) => {
  try {
    const response = await API.post("/api/meeting/upload/", obj, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

// ----------- TRANSCRIPT -------------

export const createTranscript = async (obj: object) => {
  try {
    const response = await API.post("/api/transcript/create/", obj);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const editTranscript = async (obj: object) => {
  try {
    const response = await API.put("/api/transcript/edit/", obj);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

// ----------- MINUTES OF THE MEETING -------------

export const generateMon = async (obj: any) => {
  try {
    const response = await API.post("/api/mom/generate/", obj);
    return response.data;
  } catch (err: any) {
    throw err.response.data;
  }
};

// services/api.js
import axios from "axios";
import { getAuthToken } from "./auth";

const API_URL = "http://localhost:8080/api/v1/"; //  backend URL

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Add token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/users/login", credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/users/register", userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const getJobs = async (filters = {}) => {
  try {
    const response = await axiosInstance.get("/jobs", { params: filters });
    console.log(response.data);
    if (response.status === 404) {
      // Handle the case where no jobs are found but not an error
      return { data: [], message: "No jobs found for this category" };
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch jobs");
  }
};

export const postJob = async (jobData, userid) => {
  try {
    const userid = localStorage.getItem("userid");
    console.log(localStorage);
    const response = await axiosInstance.post(
      `/jobs/create/${userid}`,
      jobData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Job posting failed");
  }
};
export const applyJob = async (formData, jobid) => {
  try {
    const response = await axiosInstance.post(`/jobs/apply/${jobid}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw error; // Propagate error for handling in component
  }
};


export const getUserProfile = async () => {
  try {
    const userid = localStorage.getItem("userid");
    const response = await axiosInstance.get(`/users/${userid}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch profile");
  }
};

// services/api.js
export const updateUserProfile = async (updatedProfile) => {
  try {
    const userid = localStorage.getItem("userid");
    const response = await axiosInstance.put(
      `/users/update/${userid}`,
      updatedProfile
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update profile"
    );
  }
};
// New methods for application details and resume download
export const getApplicationDetails = async (applicationId) => {
  try {
    const response = await axiosInstance.get(`jobs/applicants/${applicationId}`);
    return response.data.application;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch application details"
    );
  }
};

export const downloadResume = async (applicationId) => {
  try {
    const response = await axiosInstance.get(`/jobs/resume/${applicationId}`, {
      responseType: "blob", // Ensure the file is downloaded as a blob
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `resume_${applicationId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to download resume"
    );
  }
};

export const getUserPostedJobs = async (userid) => {
  try {
    
    const response = await axiosInstance.get(`/users/postedjobs/${userid}`);
    return response.data.jobs;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch jobs");
  }
};

// api.js
export const getJobApplicantsCount = async (jobid) => {
  try {
    const response =await axiosInstance.get(`/jobs/allapplicants/${jobid}`);
    console.log(response.data.applicants);
    return response.data.applicantsCount;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch jobs");
  }
};

export const getJobApplicants = async (jobid) => {
  try {
    const response =await axiosInstance.get(`/jobs/allapplicants/${jobid}`);
    
    return response.data.applicants;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch jobs");
  }
};


export const getUserAppliedJobs = async (userid) => {
  try {
    
    const response = await axiosInstance.get(`/users/appliedjobs/${userid}`);
    return response.data.jobs;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch jobs");
  }
};
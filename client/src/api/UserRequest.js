import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const getUser = (userId) => API.get(`/user/${userId}`);

export const updateUser = (id, formData) => API.put(`/user/${id}`, formData);

export const getAllUsers = () => API.get("/user");

export const getAllFollowUser = ()=> API.get("/user/allfollow")

export const getUnfollowedUsers = (userid) => API.post("/user/UnfollowedUser", { userid });

export const followUser = (id, data) => API.put(`/user/${id}/follow`, data);

export const unFollowUser = (id, data) => API.put(`/user/${id}/unfollow`, data);

export const postReport = (postId) => API.put(`/user/${postId}/report`)

// admin

export const verifiedUser = (id)=> API.put(`/user/${id}/verify`)

export const block = (id) => API.put(`/user/${id}/block`)





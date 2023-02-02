import axios from "axios";

const API = axios.create({ baseURL: "https://back.amazemen.shop" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

// admin


export const block = (id) => API.put(`/admin/${id}/block`)

export const verifiedUser = (id)=> API.put(`/admin/${id}/verify`)

export const getAllUsers = () => API.get("/admin/getalluser");

export const getReportedPost = ()=> API.get('/admin/reportedPosts')

export const removePost = (postId,userId)=> API.post(`/admin/${postId}/remove`,{userId:userId})

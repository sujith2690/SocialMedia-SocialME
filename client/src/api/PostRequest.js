import axios from "axios";

export const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;

  }
  return req;
});

export const getTimelinePosts = (id) =>API.get(`/post/${id}/timeline`)

export const likePost = (id, userId) => API.put(`/post/${id}/like`,{userId:userId})

export const fetchComments = (id) => API.get(`/post/${id}/commnets`).then((result)=>{
  return  result
})

export const deletePost = (id,userId)=> API.delete(`/post/${id}/delete`, { userId:userId })
// save post and get save
export const savepost = (id,userId)=> API.put(`/post/${id}/save`,{userId:userId})

export const getSavedPost=(userId) => API.get(`/post/${userId}/saved`)

export const postReport = (postId,userId) => API.put(`/post/${postId}/report`,{userId:userId})







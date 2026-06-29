import axios from "axios";
export const GOOGLE_AUTH_URL = "/api/auth/google";
//creating a custom axios instance to handle API requests with base URL and token management//
const api= axios.create({
    baseURL: "/api",
    withCredentials: true, // Include cookies in requests for authentication
});
//runs before the req is sent to backend//
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

api.interceptors.response.use((response) => response
, async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const response = await api.post("/auth/refresh-token");
            const newToken = response.data.accessToken;
            localStorage.setItem("token", newToken);
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;//updates failed req with new req header that has the new token//
            return api(originalRequest); //run the req that had failed with the new token//
        }
        catch (refreshError) {
            localStorage.removeItem("token");
            window.location.href = "/login";
            return Promise.reject(refreshError);
        }

    }
    return Promise.reject(error);
});
export const registerUser = async (user) => {
        const response = await api.post("/auth/register", user);
        return response.data;
    }
   
export const loginUser = async (user) => {
   
        const response = await api.post("/auth/login", user);
        return response.data;}

export const fetchUser = async () => { 
        const response = await api.get("/user/me");
        return response.data; }

export const uploadPdf = async (file) => {
    const formData = new FormData();

    formData.append("pdf", file);

    const response = await api.post(
        "/documents/upload",
        formData
    );
    return response.data; // we need t0 return d0cId//
   
};
export const updateUsername = async (username) =>{
    const result = await api.post("/user/update", {
        editUsername: username
})
    return result.data
}
export const logoutCurrentUser = async () => {
    const result = await api.get("/auth/logout")
    return result.data}

export const createSessions = async(docid) => {
    const result = await api.post("/sessions/create", {
        docId:docid
    } )
    console.log(result.data)
    return result.data
}
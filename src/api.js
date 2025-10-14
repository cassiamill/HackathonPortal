import axios from "axios";

const API = axios.create({
  baseURL: "https://hackathon-portal-project.onrender.com/api", 
});

export default API;
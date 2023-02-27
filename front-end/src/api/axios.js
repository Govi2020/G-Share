import axios from "axios";

export default axios.create({
    baseURL: import.meta.env.VITE_BACKEND_SERVER || "http://localhost:3000/"
})
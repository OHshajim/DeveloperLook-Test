import axios from "axios";
import { getDeviceId } from "../utils/device";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
        "X-Device-ID": getDeviceId(), // custom header
    },
});

export default api;

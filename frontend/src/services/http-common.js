// Setup Axios Instance
import axios from "axios";

// Backend server
const baseURL = "http://localhost:8000/";

const http = axios.create({
    baseURL: baseURL,
    headers: {
      "Content-type": "application/json",
    },
});

export default http;

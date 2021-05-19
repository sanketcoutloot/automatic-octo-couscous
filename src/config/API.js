import axios from "axios";
let baseURL = null;

if (process.env.NODE_ENV === "development") {
  baseURL = process.env.REACT_APP_DEV_BASE_URL;
} else if (process.env.NODE_ENV === "production") {
  baseURL = process.env.REACT_APP_PROD_BASE_URL;
} else if (process.env.NODE_ENV === "test") {
  baseURL = process.env.REACT_APP_DEV_BASE_URL;
}

const apiConfig = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiConfig.interceptors.request.use(
  (request) => {
    request.headers.token = localStorage.getItem("token");
    return request;
  },
  null,
  { synchronous: true }
);

apiConfig.interceptors.response.use(
  (response) => {
    const {
      data: { loggedIn },
    } = response;
    if (loggedIn === 0) {
      window.location.replace("/");
    }
    return response;
  },
  null,
  { synchronous: true }
);

export default apiConfig;

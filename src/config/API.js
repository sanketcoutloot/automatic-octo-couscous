import axios from "axios";

let baseURL = "";

if (process.env.NODE_ENV === "development") {
  baseURL = process.env.REACT_APP_DEV_BASE_URL;
} else if (process.env.NODE_ENV === "production") {
  baseURL = process.env.REACT_APP_PROD_BASE_URL;
} else if (process.env.NODE_ENV === "test") {
  baseURL = process.env.REACT_APP_DEV_BASE_URL;
}

console.log({ baseURL });

export default axios.create({
  baseURL,
});

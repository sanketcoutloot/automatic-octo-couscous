import axios from "axios";

let baseURL = "";
if (process.env.NODE_ENV === "development") {
  baseURL = process.env.REACT_APP_DEV_BASE_URL;
}

console.log({ baseURL });

export default axios.create({
  baseURL,
});

import axios from "axios";

const baseURL = "https://interview.t-alpha.com.br";

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "X-Requested-Width": "XMLHttpRequest",
};
const defaultConfig = {
  baseURL: baseURL,
  headers: defaultHeaders,
  timeOut: 7000,
};
const api = axios.create({ ...defaultConfig });

export { api };

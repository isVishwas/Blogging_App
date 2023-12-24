import axios from "axios";
import { api } from "../config";

// default
// axios.defaults.baseURL = api.API_URL;
// content type
axios.defaults.headers.post["Content-Type"] = "application/json";

/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

const setAuthToken = (token) => {
  return localStorage.setItem("auth_token", token);
}

const removeToken = () => {
  return localStorage.removeItem("auth_token");
}

const getToken = () => {
  return localStorage.getItem("auth_token");
}

// content type
const token = getToken() ?? null;
if (token) setAuthorization(token);


// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    switch (error.response.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        localStorage.removeItem("auth_token");
        // window.location.href = window.location.origin + "/login"
        message = "Invalid credentials";
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      default:
        message = error.message || error;
    }
    return Promise.reject(error.response.data.message);
  }
);


class APIClient {

  get = (url, params) => {
    return axios.get(url, params);
  };

  /**
   * post given data to url
   */
  create = (url, data) => {
    return axios.post(url, data);
  };
  /**
   * Updates data
   */
  update = (url, data) => {
    return axios.patch(url, data);
  };

  put = (url, data) => {
    return axios.put(url, data);
  };
  /**
   * Delete
   */
  delete = (url, config) => {
    return axios.delete(url, { ...config });
  };
}


export { APIClient, setAuthorization, setAuthToken, removeToken, getToken };
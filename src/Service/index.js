import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
const API_COVID_URL = process.env.REACT_APP_API_COVID_URL;

const Services = {
  covid19Data: function () {
    return axios
      .get(`${API_URL}/stats/latest`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  },
  covid19All: function () {
    return axios
      .get(`${API_COVID_URL}/all`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  },
  covid19Countries: function () {
    return axios
      .get(`${API_COVID_URL}/countries`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  },
  covid19HistoricalAll: function () {
    return axios
      .get(`${API_COVID_URL}/historical/all?lastdays=120`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  },
};

export default Services;

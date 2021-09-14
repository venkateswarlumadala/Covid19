import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export const CovidServices = {
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
};

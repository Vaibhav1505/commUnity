const { default: axiosInstance } = require("../helpers/axiosInstance");

export default function getMeetings(baseURL){
    return axiosInstance.get(baseURL)
}
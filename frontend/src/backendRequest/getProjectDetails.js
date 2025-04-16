import axiosInstance from "../helpers/axiosInstance";

export default function getProjectDetails(url) {
    return axiosInstance.get(`${url}`)
};

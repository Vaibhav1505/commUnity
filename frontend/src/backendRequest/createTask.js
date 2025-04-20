import axiosInstance from "../helpers/axiosInstance";

export default function createTask(url,payload) {
    return axiosInstance.post(url,payload)
};

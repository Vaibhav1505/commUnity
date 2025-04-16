import axiosInstance from "../helpers/axiosInstance";

export default function getMeetingDetails(url) {
    return axiosInstance.get(`${url}`)
}
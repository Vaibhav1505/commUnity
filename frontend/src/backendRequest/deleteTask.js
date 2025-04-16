import axiosInstance from "../helpers/axiosInstance";
import { DELETE_TASK } from "../utils/apiStrings";

export default function DeleteTask(baseURL, payload) {
    return axiosInstance.post(baseURL,payload)
}
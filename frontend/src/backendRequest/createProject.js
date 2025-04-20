import axios from "axios";
import axiosInstance from "../helpers/axiosInstance";

export default function createProject(url,payload) {
    return axiosInstance.post(url,payload)
};

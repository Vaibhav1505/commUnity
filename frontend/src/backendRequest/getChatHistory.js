import axiosInstance from "../helpers/axiosInstance";

export default function getChatHistory(url,payload){
    return axiosInstance.post(url,payload);
}
import axiosInstance from "../helpers/axiosInstance";

export default async function CreateTean(url,payload) {
    const response= await axiosInstance.post(url,payload)
    return response;
};

import axiosInstance from "../helpers/axiosInstance";

export default async function GetMeetingHostById(baseURL){
    return await axiosInstance.get(baseURL)
}
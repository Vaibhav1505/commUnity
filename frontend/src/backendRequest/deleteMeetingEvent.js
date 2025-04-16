import axiosInstance from "../helpers/axiosInstance";



export default function DeleteEventMeeting(baseURL, payload) {
    console.log("Payload of Meeting Meeting To be Deleted:", payload)
    return axiosInstance.post(baseURL, payload);
}

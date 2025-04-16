import axiosInstance from "../helpers/axiosInstance";

export default async function getParticipants(baseURL, participantIds) {
    const response = await axiosInstance.post(`${baseURL}/bulk`, { ids: participantIds });
    return response.data.users; 
}

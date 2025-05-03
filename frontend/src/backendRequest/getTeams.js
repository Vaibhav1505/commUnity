import axiosInstance from "../helpers/axiosInstance";

export default async function GetTeams(url) {
    const response = await axiosInstance.get(url)
    return response.data.teamData;
};

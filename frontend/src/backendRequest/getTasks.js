import axiosInstance from "../helpers/axiosInstance";

export default async function getTasks(url) {
    const response = await axiosInstance.get(url)

    try {
        if (response.data.success) {
            return response.data;
        } else {
            console.log("Error in fetching all Tasks")
        }
    } catch (error) {
        console.log("Error fetching all Tasks Lists")
    }


}
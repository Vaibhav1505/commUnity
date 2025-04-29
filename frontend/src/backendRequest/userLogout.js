import axiosInstance from "../helpers/axiosInstance";

export default async function UserLogout(url) {
  try {
    return await axiosInstance.post(url);
  } catch (error) {
    throw error; 
  }
}
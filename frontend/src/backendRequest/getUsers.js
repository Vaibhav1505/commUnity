import axiosInstance from "../helpers/axiosInstance";
import { FETCH_USER } from "../utils/apiStrings";

export default async function getUsers(url){
    return await axiosInstance.get(url)
}
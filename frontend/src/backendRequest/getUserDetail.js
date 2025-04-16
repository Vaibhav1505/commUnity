import axiosInstance from '../helpers/axiosInstance'


export default async function getUserDetail(url) {
    const response = await axiosInstance.get(url)
    return response.data.userInfo

}
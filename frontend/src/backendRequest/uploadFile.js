import axios from "axios";
import GetToken from "../helpers/getToken";

export default async function UploadFile(url, formData) {
    const token = await GetToken();
    const response = await axios.post(url, formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    });

    return response.data;

}
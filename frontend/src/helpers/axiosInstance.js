import axios from "axios";

const axiosInstance= axios.create({
    baseURL: 'http://localhost:5001', 
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
})


// REQUEST INTERCEPTORS
axiosInstance.interceptors.request.use(
    function(config){
        const accessToken= localStorage.getItem('accessToken')

        if(accessToken){
            config.headers.Authorization=`Bearer ${accessToken}`
        }
        else{
            console.log('No access token found in local storage.');
        }
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
)


// RESPONCE INTERCEPTORS
axiosInstance.interceptors.response.use(
    function(response){
        // console.log("Response:",response)
        return response;
    },
    function(error){
        if(error.response && error.response.status==401){
            console.log("Unauthorized, Logging out")
        }
        return Promise.reject(error);
    }
)


export default axiosInstance;
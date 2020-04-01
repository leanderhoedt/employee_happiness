import axios from 'axios';
import TokenService from "./Token.service";

const tokenService = new TokenService();

const fetchAuth = (ctx) => {

    let axiosInstance = axios.create({
        baseURL: 'http://localhost:3001/api',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenService.getToken(ctx)}`
        }
    });
    axiosInstance.interceptors.response.use((response) => {
        // Return a successful response back to the calling service
        return response;
    }, (error => {
        return Promise.reject(error.message);
    }));
    return axiosInstance;
}


export {fetchAuth};
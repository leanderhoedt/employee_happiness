import axios from 'axios';
import Router from 'next/router'
import TokenService from "./Token.service";

const fetchAuth = axios.create({
    headers:{
        'Content-Type':'application/json',
        'Authorization': `Bearer ${TokenService.getToken()}`
    }
});

fetchAuth.interceptors.response.use((response) => {
    // Return a successful response back to the calling service
    return response;
}, (error => {

    // Return any error which is not due to authentication back to the calling service
    if (error.response.status !== 401) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
    if (error.response.status === 401) {
        Router.push("/");
    }

}));

export {fetchAuth};
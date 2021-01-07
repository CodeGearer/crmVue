import axios from 'axios';
import {Messages} from "element-ui"
//设置baseURL
axios.defaults.baseURL = 'http://localhost:8080/';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    let {status, message, data} = response.data;
    if(status == 200000) {
        return data;
    } else {
        // Messages.$message.error(message);
        Messages.error(message);
        return Promise.reject(false);
    }
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default axios;

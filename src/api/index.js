import * as constants from "./constant";
import axios from 'axios'


const getToken = () => {
    return localStorage.getItem('userId');
}

const setToken = (token) => {
    return localStorage.setItem('userId', token);
}

const clearToken = () => {
    return localStorage.removeItem('userId');
}


export function axiosWrapper(method, url, data, isHead) {
    let header = {}

    let token = getToken();
    if (!token) {
        throw new Error('Vui lòng đăng nhập');
    }
    if (isHead) header.userId = token;

    let req = {
        url: url,
        method: method,
        headers: header,
    };
    if (data) req.data = JSON.stringify(data);

    return axios(req)
        .then((res) => {

            return res.data
        })
        .catch((e) => {
            // console.log(e);
        });
}

export const getUsersAPI = (req) => axiosWrapper('POST', constants.GET_USERS, null, true);
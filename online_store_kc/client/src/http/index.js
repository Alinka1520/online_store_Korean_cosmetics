import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authorizationHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authorizationInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authorizationHost.interceptors.request.use(authorizationInterceptor)

export {
    $host,
    $authorizationHost
}
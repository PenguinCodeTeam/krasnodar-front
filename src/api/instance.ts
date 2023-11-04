import axios from "axios";
import {ENTRY_POINT, ENTRY_POINT_V} from "../constants";


const $host = axios.create({
    baseURL: ENTRY_POINT + ENTRY_POINT_V,
    withCredentials: true,
    headers: {"Access-Control-Allow-Origin": "*"}
})

const authInterceptor = (config: any) => {
    if (localStorage.getItem('token')) config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$host.interceptors.request.use(authInterceptor)

export default $host
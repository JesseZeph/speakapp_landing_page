import axios, { AxiosInstance } from "axios";

import { showLoader } from "./apiUtils";
import { useMainStore } from "@/store/mainStore";

const baseURL = 'https://speakapp.up.railway.app/api/';

const api: AxiosInstance = axios.create({
    baseURL: baseURL,
});

api.interceptors.request.use(
    function (request) {
        const url = request?.url || '';
        if (showLoader(url)) {
            useMainStore.getState().incrementPendingRequests();
        }

        return request;
    },
    function (error) {
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    function (response) {
        const url = response?.config?.url || '';
        if (showLoader(url)) {
            useMainStore.getState().decrementPendingRequests();
        }

        return response;
    },
    function (error) {
        const url = error?.config?.url || '';
        if (showLoader(url)) {
            useMainStore.getState().decrementPendingRequests();
        }


        return Promise.reject(error);
    }
)

export { api, baseURL}



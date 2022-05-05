import axios from "axios";

const api = axios.create({
    baseURL: process.env.BACKEND_API,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
});

api.interceptors.request.use(
    (request) => {
        if (localStorage && localStorage.getItem('user')) {
            const user = localStorage.getItem('user');
            if (user) {
                const token = "Bearer " + JSON.parse(user).token;
                request.headers = {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Authorization": token
                }
            }
        }
        return request;
    },
    function (error) {
        console.log("REQUEST ERROR", error);
    }
);

api.interceptors.response.use(
    (response) => {
        if (response.data.data && response.data.data.token) {
            api.defaults.headers.common["Authorization"] = "Bearer " + response.data.data.token;
        }
        return response;
    },
    function (error) {
        console.log("RESPONSE ERROR");
        if(error.response){
            if(error.response.data.status == 401){
                localStorage.clear();
            }
            return Promise.reject(error.response.data.error);
        }
        return Promise.reject("API Error!");
    }
)

export default api;
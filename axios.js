import axios from "axios";

const instance = axios.create({
    baseURL: "http://tevkil.eu-central-1.elasticbeanstalk.com",
    timeout: 10000,
    headers: {"X-Custom-Header": "foobar"},
});

export const banUser = (user_id) => {
    return instance.post("/help/ban", {user_id});
};

export const unbanUser = (user_id) => {
    return instance.post("/help/unban", {user_id});
};

export const login = (username, password) => {
    return instance.post("/help/login", {username, password});
};

export const dashboard = () => {
    return instance.get("/help/count");
};


export default instance;

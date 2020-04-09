import axios from "axios";

export const apiHelper = axios.create({
    baseURL: "http://localhost:3000", //"http://localhost:3000",
    json: true
});


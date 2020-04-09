import axios from "axios";

export const apiHelper = axios.create({
    baseURL: "https://us-central1-cms-nevf.cloudfunctions.net/app", //"http://localhost:3000",
    json: true
});


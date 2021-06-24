import axios from "axios";

export const apikey = "60c3b978d9fcf1b50be3480ad7cb025c";

export const tmdbApi = axios.create({
    baseURL: "https://api.themoviedb.org/3/movie/"
});
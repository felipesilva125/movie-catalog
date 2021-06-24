import axios from "axios";

const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MGMzYjk3OGQ5ZmNmMWI1MGJlMzQ4MGFkN2NiMDI1YyIsInN1YiI6IjYwZDQ3N2U0YzM5MGM1MDA1ZDhjMmY3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QxxG9ECjpqjEVc_QCmF0VukmhnLw_8UPUum-922I-W4";

export const tmdbApi = axios.create({
    baseURL: "http://api.themoviedb.org/3/movie/",
    headers: {
        Authorization: `Bearer ${token}`        
    }    
});
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EXERCISE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
    "x-rapidapi-host": "exercisedb.p.rapidapi.com",
  },
});

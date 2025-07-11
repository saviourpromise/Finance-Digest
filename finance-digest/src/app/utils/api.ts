'use client';
import axios from 'axios';

const API_URL = "https://finnhub.io/api/v1/news";
const API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

export const fetchNews = async () => {
  try {
    const { data } = await axios.get(`${API_URL}?category=general&token=${API_KEY}`);
    return data;
  } catch (error) {
  console.error("API Error:", error);
  throw new Error("Something went wrong. Please try again later.");
}
};

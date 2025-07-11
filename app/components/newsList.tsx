'use client';
import Image from "next/image";
import { useEffect, useState } from 'react';
import axios from 'axios';

type NewsItem = {
    id: number;
    image: string;
    source: string;
    datetime: number;
    headline: string;
    url: string;
};

const NewsList = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

    useEffect(() => {
        const getNews = async () => {
            try {
                const res = await axios.get(
                    `https://finnhub.io/api/v1/news?category=general&token=${API_KEY}`
                );
                setNews(res.data);
            } catch (err) {
                console.error('News fetch failed:', err);
                setError('Something went wrong. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        getNews();
    }, [API_KEY]);


    return (
        <div className="min-h-screen p-1 sm:p-12 dark:bg-black text-black dark:text-white">
            <Image src="/blott-logo.png" width={200} height={50} alt="Blott" className="mx-auto my-4" />
            <hr className="block md:hidden remove mx-auto" />
            <h1 className="text-2xl sm:text-5xl font-bold mb-8 px-6 text-left mt-4">NEWS</h1>

            {loading ? (
                <p className="text-left text-lg px-6 font-medium">Loading news...</p>
            ) : error ? (
                <p className="text-left text-lg px-6 font-medium">{error}</p>
            ) : (
                <div className="grid gap-20 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
                    {news.map((item) => (
                        <a
                            key={item.id}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg overflow-hidden flex md:flex-col hover:bg-[#2A283E] p-3 transition duration-300"
                        >
                            {item.image && (
                                <Image
                                    src={item.image}
                                    alt="Thumbnail"
                                    width={500}
                                    height={300}
                                    className="w-32 md:w-full h-32 md:h-54 object-cover"
                                    unoptimized // if images are from external sources and not handled via next.config.js
                                />
                            )}
                            <div className="p-4">
                                <div className="flex justify-between">
                                    <p className="text-md font-semibold text-[#FFFFFFB2]">
                                        {item.source}
                                    </p>
                                    <p className="text-md font-semibold text-[#FFFFFFB2]">
                                        {new Date(item.datetime * 1000).toLocaleDateString()}
                                    </p>
                                </div>
                                <h2 className="font-semibold text-md sm:text-lg mb-2 line-clamp-2">
                                    {item.headline}
                                </h2>
                            </div>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NewsList;

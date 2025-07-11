'use client';

import Image from "next/image";

type News = {
    headline: string;
    image: string;
    source: string;
    datetime: number;
    url: string;
};

type NewsCardProps = {
    news: News;
};

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
    const { headline, image, source, datetime, url } = news;
    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="news-card">
            <Image
                src={image}
                alt="thumbnail"
                width={500}
                height={300}
                className="w-full h-auto object-cover"
                unoptimized
            />
            <div className="content flex justify-between">
                <h3 className="font-500 text-lg">{headline}</h3>
                <p>{source} • {new Date(datetime * 1000).toLocaleDateString()}</p>
            </div>
        </a>
    );
};

export default NewsCard;

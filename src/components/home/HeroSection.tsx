import React from "react";
import { INew } from "@/models/New";
import NewsCard from "./NewsCard";

interface HeroSectionProps {
  news: INew[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ news }) => {
  if (!news || news.length === 0) return null;

  const featuredNews = news[0];
  const secondaryNews = news.slice(1, 3);

  return (
    <div className="w-full mb-8">
      <div className="mb-4">
        <NewsCard news={featuredNews} variant="large" />
      </div>
      {secondaryNews.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {secondaryNews.map((item) => (
            <NewsCard key={item.new_id} news={item} variant="large" />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSection;

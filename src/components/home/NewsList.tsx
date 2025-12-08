import React from "react";
import { INew } from "@/models/New";
import NewsCard from "./NewsCard";

interface NewsListProps {
  news: INew[];
}

const NewsList: React.FC<NewsListProps> = ({ news }) => {
  if (!news || news.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {news.map((item) => (
        <NewsCard key={item.new_id} news={item} variant="small" />
      ))}
    </div>
  );
};

export default NewsList;

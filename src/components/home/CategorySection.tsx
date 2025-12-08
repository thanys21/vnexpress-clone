"use client";

import React, { useState } from "react";
import { INew } from "@/models/New";
import NewsCard from "./NewsCard";
import NewsList from "./NewsList";
import CategorySkeleton from "./skeletons/CategorySkeleton";
import { Category } from "./variables";

interface CategorySectionProps {
  category: Category;
  initialNews: INew[];
  initialHasMore: boolean;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  initialNews,
  initialHasMore,
}) => {
  const [news, setNews] = useState<INew[]>(initialNews);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadMore = async () => {
    setIsLoadingMore(true);
    try {
      const response = await fetch(`/api/vnexpress/news`);
      const data = await response.json();

      if (data.success) {
        setNews((prev) => [...prev, ...data.data]);
        setHasMore(data.hasMore);
      }
    } catch (error) {
      console.log("Error loading more news:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  if (!news || news.length === 0) return null;

  const featuredNews = news[0];
  const listNews = news.slice(1);

  return (
    <div className="w-full mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b-2 border-red-600">
        {category.name}
      </h2>

      <div className="mb-4">
        <NewsCard news={featuredNews} variant="large" />
      </div>

      {listNews.length > 0 && (
        <div className="mb-4">
          <NewsList news={listNews} />
        </div>
      )}

      {isLoadingMore && (
        <div className="mt-4">
          <CategorySkeleton />
        </div>
      )}

      {hasMore && !isLoadingMore && (
        <button
          onClick={loadMore}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Xem thêm
        </button>
      )}
    </div>
  );
};

export default CategorySection;

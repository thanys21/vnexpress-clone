import React from "react";
import Link from "next/link";
import Image from "next/image";
import { INew } from "@/models/New";
import { formatRelativeTime } from "@/utils";

interface NewsCardProps {
  news: INew;
  variant?: "large" | "small";
}

const NewsCard: React.FC<NewsCardProps> = ({ news, variant = "small" }) => {
  if (variant === "large") {
    return (
      <Link
        href={`/news/${news.new_id}`}
        className="block w-full group hover:opacity-90 transition-opacity"
      >
        <div className="w-full aspect-video relative bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden mb-3">
          {news.thumbnail ? (
            <Image
              src={news.thumbnail}
              alt={news.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No image
            </div>
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600">
          {news.title}
        </h2>
        {news.sub_title && (
          <p className="text-base text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
            {news.sub_title}
          </p>
        )}
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {formatRelativeTime(news.publish_date)}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/news/${news.new_id}`}
      className="flex gap-3 group hover:opacity-90 transition-opacity"
    >
      <div className="w-[120px] h-[80px] relative bg-gray-200 dark:bg-gray-700 rounded overflow-hidden flex-shrink-0">
        {news.thumbnail ? (
          <Image
            src={news.thumbnail}
            alt={news.title}
            fill
            className="object-cover"
            sizes="120px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
            No image
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2 group-hover:text-blue-600">
          {news.title}
        </h3>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {formatRelativeTime(news.publish_date)}
        </span>
      </div>
    </Link>
  );
};

export default NewsCard;

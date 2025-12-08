import React from "react";

interface NewsCardSkeletonProps {
  variant?: "large" | "small";
}

const NewsCardSkeleton: React.FC<NewsCardSkeletonProps> = ({
  variant = "small",
}) => {
  if (variant === "large") {
    return (
      <div className="w-full animate-pulse">
        <div className="w-full aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-3"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-3"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 animate-pulse">
      <div className="w-[120px] h-[80px] bg-gray-200 dark:bg-gray-700 rounded flex-shrink-0"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export default NewsCardSkeleton;

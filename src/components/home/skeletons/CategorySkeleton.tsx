import React from "react";
import NewsCardSkeleton from "./NewsCardSkeleton";

const CategorySkeleton: React.FC = () => {
  return (
    <div className="w-full">
      <div className="mb-6">
        <NewsCardSkeleton variant="large" />
      </div>
      <div className="space-y-4">
        <NewsCardSkeleton variant="small" />
        <NewsCardSkeleton variant="small" />
        <NewsCardSkeleton variant="small" />
        <NewsCardSkeleton variant="small" />
      </div>
    </div>
  );
};

export default CategorySkeleton;

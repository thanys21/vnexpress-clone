"use client";

import { INew } from "@/models/New";
import React, { useEffect, useState } from "react";
import CategorySection from "./CategorySection";
import HeroSection from "./HeroSection";
import NewsList from "./NewsList";
import { categories } from "./variables";
import { ImageUploadField } from "../common/ImageUploadField";

const HomePage = (): React.ReactElement => {
  const [news, setNews] = useState<INew[] | undefined>(undefined);
  const [img, setImg] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(false);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`/api/vnexpress/news`);
        const data = await response.json();
        setNews(data.data);
        setHasMore(data.hasMore);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  console.log("img", img);

  return (
    <div className="max-w-[1130px] p-6">
      {/* Testing */}
      <ImageUploadField setImgUrl={setImg} />

      <div className="grid grid-cols-12 lg:grid-cols-9 gap-6">
        <div className="col-span-12 lg:col-span-6">
          <HeroSection news={news ?? []} />
        </div>
        <div className="hidden lg:col-span-3 lg:block w-full h-full border">
          Quảng Cáo
        </div>
      </div>

      <div className="grid grid-cols-12 lg:grid-cols-9 gap-6">
        <div className="col-span-12 lg:col-span-3">
          <NewsList news={news ?? []} />
        </div>
        <div className="col-span-12 lg:col-span-3">
          {/* <CategorySection
            category={categories[0]}
            initialNews={news ?? []}
            initialHasMore={hasMore}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

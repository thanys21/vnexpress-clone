"use client";

import { INew } from "@/models/New";
import { use, useEffect, useState } from "react";

const NewsDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const [news, setNews] = useState<INew | undefined>(undefined);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`/api/vnexpress/news/${id}`);
        const data = await response.json();
        console.log("data", data);
        setNews(data.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [id]);

  console.log("news", news);
  return (
    <div>
      <h1>New Detail</h1>
      <ul>
        {news && (
          <li key={news.new_id}>
            <h2>title: {news.title}</h2>
            <p>sub_title: {news.sub_title}</p>
            <p>content: {news.content}</p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NewsDetailPage;

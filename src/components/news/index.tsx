"use client";

import React, { useState, useEffect } from "react";
import Table from "../common/table";
import { New } from "./interface";
import Button from "../form/components/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NewLists = (): React.ReactElement => {
  const router = useRouter();
  const [data, setData] = useState<New[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchNews = async (page: number, limit: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/vnexpress/news?page=${page}&limit=${limit}`
      );
      const result = await response.json();

      if (result.success) {
        setData(result.data);
        setTotal(result.total);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(page, limit);
  }, [page, limit]);

  const columns = [
    {
      title: "ID",
      type: "number",
      value: (item: New) => (
        <Link href={`/news/${item.new_id}`}>
          <Button variant="primary" minimal>
            {item.new_id}
          </Button>
        </Link>
      ),
    },
    {
      title: "Title",
      type: "text",
      value: (item: New) => <div>{item.title}</div>,
    },
    {
      title: "Sub Title",
      type: "text",
      value: (item: New) => <div>{item.sub_title || "-"}</div>,
    },
    {
      title: "Category",
      type: "text",
      value: (item: New) => <div>{item.category}</div>,
    },
    {
      title: "Author",
      type: "text",
      value: (item: New) => <div>{item.author || "-"}</div>,
    },
    {
      title: "Views",
      type: "number",
      value: (item: New) => <div>{item.views}</div>,
    },
    {
      title: "Publish Date",
      type: "date",
      value: (item: New) => (
        <span>{new Date(item.publish_date).toLocaleDateString()}</span>
      ),
    },
  ];

  return (
    <div className="space-y-4 mt-4">
      <div className="flex justify-between items-center">
        <div>Filter</div>
        <Button variant="primary" onClick={() => router.push("/news/create")}>
          Add New
        </Button>
      </div>
      <Table<New>
        columns={columns}
        data={data}
        loading={loading}
        pagination={{
          total,
          limit,
          page,
          handleChange: (newPage: number, newLimit: number) => {
            setPage(newPage);
            setLimit(newLimit);
          },
        }}
      />
    </div>
  );
};

export default NewLists;

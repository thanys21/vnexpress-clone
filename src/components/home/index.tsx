"use client";

import { INew } from "@/models/New";
import React, { useEffect, useState } from "react";
import CategorySection from "./CategorySection";
import HeroSection from "./HeroSection";
import NewsList from "./NewsList";
import { categories } from "./variables";
import { ImageUploadField } from "../common/ImageUploadField";
import InputField from "../form/fields/input-field";
import SelectField from "../form/fields/select-field";
import Form from "../form";
import Button from "../form/components/button";

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  console.log("img", img);

  return (
    <div className="max-w-[1130px] p-6">
      {/* Testing */}
      <ImageUploadField setImgUrl={setImg} />

      <div className="mb-8 p-6 border rounded-lg bg-white shadow">
        <h2 className="text-2xl font-bold mb-4">Demo Form</h2>

        <Form onSubmit={handleFormSubmit} className="mt-6">
          <InputField
            name="username"
            label="Username"
            placeholder="Enter your username"
          />

          <InputField
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
          />

          <InputField
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
          />

          <InputField
            name="age"
            label="Age"
            type="number"
            placeholder="Enter your age"
          />

          <SelectField
            name="country"
            label="Country"
            options={[
              { label: "Vietnam", value: "vn" },
              { label: "United States", value: "us" },
              { label: "Japan", value: "jp" },
              { label: "South Korea", value: "kr" },
            ]}
            placeholder="Select your country"
          />

          <div className="flex gap-4">
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </div>
        </Form>
      </div>

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

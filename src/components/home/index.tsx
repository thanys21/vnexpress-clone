/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { yup } from "../form/yupValidation";

// Define validation schema (Yup-style)
const validateSchema = yup.object({
  username: yup
    .string()
    .required("Trường bắt buộc")
    .min(3, "Ít nhất 3 ký tự")
    .max(20, "Tối đa 20 ký tự")
    .matches(/^[a-zA-Z0-9_]+$/, "Chỉ được chứa chữ, số và dấu gạch dưới"),
  email: yup
    .string()
    .required("Trường bắt buộc")
    .email("Email không đúng định dạng"),
  password: yup
    .string()
    .required("Trường bắt buộc")
    .min(6, "Ít nhất 6 ký tự")
    .max(50, "Tối đa 50 ký tự"),
  age: yup
    .number()
    .required("Trường bắt buộc")
    .min(1, "Ít nhất 1")
    .max(150, "Tối đa 150")
    .integer("Phải là số nguyên"),
  country: yup.string().required("Vui lòng chọn quốc gia"),
});

const HomePage = (): React.ReactElement => {
  const [news, setNews] = useState<INew[] | undefined>(undefined);
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

  return (
    <div className="max-w-[1130px] p-6">
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

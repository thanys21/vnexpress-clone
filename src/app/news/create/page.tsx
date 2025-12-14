/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Form, { useFormContext } from "@/components/form";
import InputField from "@/components/form/fields/input-field";
import SelectField from "@/components/form/fields/select-field";
import Button from "@/components/form/components/button";
import { yup } from "@/components/form/yupValidation";
import { ImageUploadField } from "@/components/common/ImageUploadField";

const categories = [
  { label: "Thời sự", value: "thoi-su" },
  { label: "Góc nhìn", value: "goc-nhin" },
  { label: "Thế giới", value: "the-gioi" },
  { label: "Video", value: "video" },
  { label: "Podcasts", value: "podcasts" },
  { label: "Kinh doanh", value: "kinh-doanh" },
  { label: "Bất động sản", value: "bat-dong-san" },
  { label: "Khoa học", value: "khoa-hoc" },
  { label: "Giải trí", value: "giai-tri" },
  { label: "Thể thao", value: "the-thao" },
  { label: "Pháp luật", value: "phap-luat" },
  { label: "Giáo dục", value: "giao-duc" },
  { label: "Sức khỏe", value: "suc-khoe" },
  { label: "Đời sống", value: "doi-song" },
  { label: "Du lịch", value: "du-lich" },
  { label: "Số hóa", value: "so-hoa" },
  { label: "Xe", value: "xe" },
  { label: "Ý kiến", value: "y-kien" },
  { label: "Tâm sự", value: "tam-su" },
];

const createNewsSchema = yup.object({
  title: yup
    .string()
    .required("Tiêu đề là bắt buộc")
    .min(10, "Tiêu đề phải có ít nhất 10 ký tự")
    .max(200, "Tiêu đề không được quá 200 ký tự"),
  sub_title: yup.string().max(300, "Tiêu đề phụ không được quá 300 ký tự"),
  content: yup
    .string()
    .required("Nội dung là bắt buộc")
    .min(50, "Nội dung phải có ít nhất 50 ký tự"),
  category: yup.string().required("Vui lòng chọn danh mục"),
  author: yup.string().max(100, "Tên tác giả không được quá 100 ký tự"),
  publish_date: yup.string().required("Ngày xuất bản là bắt buộc"),
});

const TextareaField = ({ name, rows = 5 }: { name: string; rows?: number }) => {
  const formContext = useFormContext();

  const value = formContext?.formData[name] || "";
  const error = formContext?.errors[name];

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (formContext) {
      formContext.setFieldValue(name, e.target.value);
    }
  };

  return (
    <>
      <textarea
        name={name}
        value={value}
        onChange={handleChange}
        placeholder="Nhập nội dung tin tức..."
        rows={rows}
        className={`w-full px-4 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </>
  );
};

const CreateNewsPage = (): React.ReactElement => {
  const router = useRouter();
  const [thumbnail, setThumbnail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: Record<string, any>) => {
    setIsSubmitting(true);

    try {
      const newsData = {
        ...values,
        thumbnail: thumbnail || undefined,
      };

      const response = await fetch("/api/vnexpress/news/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newsData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Tạo tin tức thành công!");
        router.push(`/news/${data.new_id}`);
      } else {
        alert(`Lỗi: ${data.error}`);
      }
    } catch (error) {
      console.error("Error creating news:", error);
      alert("Có lỗi xảy ra khi tạo tin tức!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleValidationError = (errors: Record<string, string>) => {
    console.log("Validation errors:", errors);
    const firstError = Object.values(errors)[0];
    alert(`Vui lòng kiểm tra lại: ${firstError}`);
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toISOString().split("T")[0];
  };

  return (
    <div className="max-w-4xl mx-auto px-4 mt-4">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Tạo tin tức mới
        </h1>
        <p className="text-gray-600 mb-8">
          Điền thông tin bên dưới để tạo một tin tức mới
        </p>

        <Form
          schema={createNewsSchema}
          initialValues={{
            title: "",
            sub_title: "",
            content: "",
            category: "",
            author: "",
            publish_date: getCurrentDate(),
          }}
          onSubmit={handleSubmit}
          onValidationError={handleValidationError}
        >
          <InputField
            name="title"
            label="Tiêu đề"
            placeholder="Nhập tiêu đề tin tức..."
            required
          />

          <InputField
            name="sub_title"
            label="Tiêu đề phụ"
            placeholder="Nhập tiêu đề phụ (tùy chọn)..."
          />

          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">
              Nội dung <span className="text-red-500 ml-1">*</span>
            </label>
            <TextareaField name="content" rows={10} />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-700">
              Ảnh đại diện
            </label>
            <ImageUploadField
              name="thumbnail"
              setImgUrl={setThumbnail}
              accept="png, jpg, jpeg, webp"
            />
          </div>

          <SelectField
            name="category"
            label="Danh mục"
            options={categories}
            placeholder="Chọn danh mục"
            required
          />

          <InputField
            name="author"
            label="Tác giả"
            placeholder="Nhập tên tác giả..."
          />

          <div className="flex justify-end gap-4 mt-8">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
            >
              Hủy
            </Button>

            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? "Đang tạo..." : "Tạo"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateNewsPage;

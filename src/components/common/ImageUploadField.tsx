"use client";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import React, { Dispatch, SetStateAction } from "react";
import { useFormContext } from "../form";
import Image from "next/image";
import Button from "../form/components/button";

interface ImageUploadFieldProps {
  name: string;
  label?: string;
  onUploadSuccess?: (result: CloudinaryUploadWidgetResults) => void;
  setImgUrl?: Dispatch<SetStateAction<string>>;
  required?: boolean;
  accept?: string;
  classNameView?: string;
}

export const ImageUploadField = ({
  name,
  label,
  onUploadSuccess,
  setImgUrl,
  required = false,
  accept,
  classNameView,
}: ImageUploadFieldProps) => {
  const formContext = useFormContext();

  const value = formContext?.formData[name] || "";
  const error = formContext?.errors[name];

  const handleUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
    console.log("Upload successful:", result);

    if (result.event === "success") {
      // @ts-expect-error wrong types
      const imageUrl = result.info?.url ?? "";

      if (formContext) {
        formContext.setFieldValue(name, imageUrl);
      }

      if (setImgUrl) {
        setImgUrl(imageUrl);
      }

      if (onUploadSuccess) {
        onUploadSuccess(result);
      }
    }
  };

  const handleRemoveImage = () => {
    if (formContext) {
      formContext.setFieldValue(name, "");
    }
    if (setImgUrl) {
      setImgUrl("");
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="space-y-3">
        <CldUploadButton
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          onSuccess={handleUploadSuccess}
          onError={(error) => {
            console.error("Upload error:", error);
          }}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            error
              ? "bg-red-50 text-red-600 border border-red-300 hover:bg-red-100"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          options={{
            ...(accept && {
              clientAllowedFormats: accept
                .split(",")
                .map((format) => format.trim()),
            }),
          }}
        >
          {value ? "Thay đổi ảnh" : "Tải ảnh lên"}
        </CldUploadButton>

        {value && (
          <div className={`relative w-48 h-48 ${classNameView || ""}`}>
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover rounded-lg border border-gray-300"
            />

            <Button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2"
            >
              X
            </Button>
          </div>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
};

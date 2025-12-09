"use client";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import React, { Dispatch, SetStateAction } from "react";

interface ImageUploadFieldProps {
  onUploadSuccess?: (result: CloudinaryUploadWidgetResults) => void;
  setImgUrl?: Dispatch<SetStateAction<string>>;
}

export const ImageUploadField = ({
  onUploadSuccess,
  setImgUrl,
}: ImageUploadFieldProps) => {
  return (
    <CldUploadButton
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      onSuccess={(result) => {
        console.log("Upload successful:", result);
        if (onUploadSuccess) {
          onUploadSuccess(result);
        }

        if (result.event === "success" && setImgUrl) {
          // @ts-expect-error wrong types
          setImgUrl(result.info?.url ?? "");
        }
      }}
      onError={(error) => {
        console.error("Upload error:", error);
      }}
    >
      Upload Image
    </CldUploadButton>
  );
};

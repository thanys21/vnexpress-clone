import { ReadonlyURLSearchParams } from "next/navigation";

export const createQueryString = ({
  name,
  value,
  searchParams,
}: {
  name: string;
  value: string;
  searchParams: ReadonlyURLSearchParams;
}) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set(name, value);

  return params.toString();
};

export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) {
    return "vừa xong";
  } else if (diffMinutes < 60) {
    return `${diffMinutes} phút trước`;
  } else if (diffHours < 24) {
    return `${diffHours} giờ trước`;
  } else if (diffDays < 30) {
    return `${diffDays} ngày trước`;
  } else {
    // Format as DD/MM/YYYY for older dates
    const day = new Date(date).getDate().toString().padStart(2, "0");
    const month = (new Date(date).getMonth() + 1).toString().padStart(2, "0");
    const year = new Date(date).getFullYear();
    return `${day}/${month}/${year}`;
  }
};

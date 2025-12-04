import { ReadonlyURLSearchParams } from "next/navigation";
import { headers } from "next/headers";

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

export const getBaseUrl = async () => {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  return `${protocol}://${host}`;
};

export const fetchApi = async (endpoint: string, options?: RequestInit) => {
  const baseUrl = await getBaseUrl();
  const url = `${baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });
  
  return response.json();
};

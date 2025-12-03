import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News - VnExpress Clone",
  description: "Latest news and articles",
};

const NewsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="news-layout">
      <div className="container mx-auto px-4">{children}</div>
    </div>
  );
};

export default NewsLayout;

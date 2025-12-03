import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import MenuBar from "@/components/Header/menu";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "VnExpress Clone",
  description: "A clone of VnExpress news website",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="vi">
      <body className="antialiased">
        <Header />
        <MenuBar />
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  );
};

export default RootLayout;

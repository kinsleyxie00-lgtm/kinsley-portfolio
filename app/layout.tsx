import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: "KINSLEY XIE — Creative Marketer",
  description:
    "谢可心的品牌营销与内容运营作品集，聚焦 Brand Marketing、Content Operation、Social Media 与 Visual Storytelling。",
  keywords: [
    "Kinsley Xie",
    "谢可心",
    "品牌营销",
    "内容运营",
    "新媒体运营",
    "Creative Marketer",
  ],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "KINSLEY XIE — Creative Marketer",
    description: "Brand Marketing / Content Operation / Visual Storytelling",
    type: "website",
    locale: "zh_CN",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "KINSLEY XIE" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "KINSLEY XIE — Creative Marketer",
    description: "Brand Marketing / Content Operation / Visual Storytelling",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

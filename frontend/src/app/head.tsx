import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Tea-App E-commerce",
    template: "%s | Tea-App E-commerce",
  },
  description: "A comprehensive e-commerce website for tea sales, offering a wide variety of teas for local and international customers.",
  keywords: ["tea", "e-commerce", "online tea shop", "Cameroon tea", "international tea shipping"],
  openGraph: {
    title: "Tea-App E-commerce",
    description: "A comprehensive e-commerce website for tea sales, offering a wide variety of teas for local and international customers.",
    url: "https://www.teaapp.com", // Replace with your actual domain
    siteName: "Tea-App E-commerce",
    images: [
      {
        url: "https://www.teaapp.com/og-image.jpg", // Replace with your actual Open Graph image
        width: 1200,
        height: 630,
        alt: "Tea-App E-commerce",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tea-App E-commerce",
    description: "A comprehensive e-commerce website for tea sales, offering a wide variety of teas for local and international customers.",
    creator: "@teaapp", // Replace with your actual Twitter handle
    images: ["https://www.teaapp.com/twitter-image.jpg"], // Replace with your actual Twitter image
  },
};

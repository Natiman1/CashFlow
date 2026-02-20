import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CashFlow — Take control of your money",
    template: "%s | CashFlow",
  },
  description:
    "CashFlow helps you track expenses, manage budgets, and gain insights with charts and reports. Secure, fast, and easy to use.",
  applicationName: "CashFlow",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "CashFlow — Take control of your money",
    description:
      "Track transactions, set budgets per category, and visualize spending trends — all in one lightweight app.",
    url: "https://cash-flow-web-chi.vercel.app/",
    siteName: "CashFlow",
    images: [
      {
        url: "https://cash-flow-web-chi.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "CashFlow",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CashFlow — Take control of your money",
    description: "Track transactions, set budgets, and view spending insights.",
    creator: "@Man2Nati25875",
    images: ["https://cash-flow-web-chi.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>CashFlow — Take control of your money</title>
        <meta
          name="description"
          content="CashFlow helps you track expenses, manage budgets, and gain insights with charts and reports. Secure, fast, and easy to use."
        />
        <meta
          name="keywords"
          content="personal finance, budget tracker, expense tracker, budgets, transactions, money management, finance app"
        />
        <link rel="canonical" href="https://cash-flow-web-chi.vercel.app/" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#0ea5a4" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="CashFlow" />
        <meta
          property="og:title"
          content="CashFlow — Take control of your money"
        />
        <meta
          property="og:description"
          content="Track transactions, set budgets per category, and visualize spending trends — all in one lightweight app."
        />
        <meta
          property="og:url"
          content="https://cash-flow-web-chi.vercel.app/"
        />
        <meta
          property="og:image"
          content="https://cash-flow-web-chi.vercel.app/og-image.png"
        />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Man2Nati25875" />
        <meta
          name="twitter:title"
          content="CashFlow — Take control of your money"
        />
        <meta
          name="twitter:description"
          content="Track transactions, set budgets, and view spending insights."
        />
        <meta
          name="twitter:image"
          content="https://cash-flow-web-chi.vercel.app/og-image.png"
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "CashFlow",
              url: "https://cash-flow-web-chi.vercel.app/",
              description:
                "A lightweight app to track transactions, manage budgets per category, and visualize financial trends.",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
              creator: {
                "@type": "Person",
                name: "Natnael Gete",
                url: "https://cash-flow-web-chi.vercel.app/",
              },
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://cash-flow-web-chi.vercel.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} antialiased scroll-smooth`}
      >
        <Toaster />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}

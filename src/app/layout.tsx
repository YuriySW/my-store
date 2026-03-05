import type { Metadata } from "next";
import { Geist, Geist_Mono, Open_Sans, Raleway } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin", "cyrillic"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin", "cyrillic"],
});

import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { CartHydrator } from "@/components/Cart/CartHydrator";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Fireline - Биокамины премиум качества",
  description: "Производство биокаминов премиум качества по ценам производителя. Изготовление биокаминов на заказ по вашим размерам.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${openSans.variable} ${raleway.variable} antialiased font-sans`}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <Providers>
            <CartHydrator />
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}

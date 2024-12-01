import type { Metadata } from "next";
import 'leaflet/dist/leaflet.css';
import localFont from "next/font/local";
import "./globals.css";
import { Poppins } from 'next/font/google'
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-poppints",
  weight: ["100", "900"],
});

export const metadata: Metadata = {
  title: "bjb Tender Finder",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}

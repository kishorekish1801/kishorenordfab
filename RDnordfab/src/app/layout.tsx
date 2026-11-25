import type { Metadata } from "next";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { StoreProvider } from "@/context/StoreContext";

export const metadata: Metadata = {
  title: "RD NORDFAB | Sustainable 3D Printed Products",
  description: "Premium 3D printed products, prototypes and custom solutions across Europe.",
  metadataBase: new URL("https://rdnordfab.com")
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><StoreProvider><AnnouncementBar /><Navbar /><main>{children}</main><Footer /></StoreProvider></body></html>;
}

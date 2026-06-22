import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import StyledComponentsRegistry from "@/lib/registry";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Okta - Quotes Landing Page",
  description: "Lorem ipsum dolor sit amet consect alora",
  icons: {
    icon: "/Images/Okta_Logomark_Dark_Edition.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}

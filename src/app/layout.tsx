import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd";
import StyleRegistry from "@/styles/StyleRegistry";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm_sans",
  weight: ["400", "600", "800"],
});

export const metadata: Metadata = {
  title: "Ollama Search",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${dmSans.variable}`}>
        <StyleRegistry>
          <ConfigProvider
            theme={{
              token: {
                fontFamily: dmSans.style.fontFamily,
              },
            }}
          >
            {children}
          </ConfigProvider>
        </StyleRegistry>
      </body>
    </html>
  );
}

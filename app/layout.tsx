import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/shared/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <AuthProvider>{children}</AuthProvider>
        <div id="global-modal"></div>
      </body>
    </html>
  );
}

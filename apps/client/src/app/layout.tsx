import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ApolloWrapper } from "@/components/providers/apollo-wrapper";
import { AuthProvider } from "@/components/providers/auth-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Madzone.cz - Team Panel",
  description: "Moderní týmový nástroj pro správu projektů",
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
        <AuthProvider>
          <ApolloWrapper>
            {children}
          </ApolloWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthSessionProvider from "@/components/SessionProvider";
import { HeroUIProviders } from "@/components/HeroUIprovider";
import { Header } from "@/components/Header/header";
import { Footer } from "@/components/Footer/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Investors",
  description: "Mutial Funds Management App",
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
        <HeroUIProviders>
          <AuthSessionProvider>
            <Header />
            {children}
            <Footer />
            </AuthSessionProvider>
        </HeroUIProviders>
      </body>
    </html>
  );
}

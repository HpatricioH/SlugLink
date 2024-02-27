import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Header from "./_components/Header/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "SlugLink",
  description: "URL shortener",
  icons: [{ rel: "icon", url: "logos/slugLink.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <Header />
            <div className="min-h-auto">{children}</div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

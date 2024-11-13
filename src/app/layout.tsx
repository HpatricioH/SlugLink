import "~/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Header from "./_components/Header/Header";
import Footer from "./_components/Footer/Footer";
import { ToastContainer } from "react-toastify";

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
          <ToastContainer />
          <div className="grid min-h-dvh grid-row-[auto 1fr auto]">
            <Header />
            <div>{children}</div>
            <Footer />
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

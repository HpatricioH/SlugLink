import { unstable_noStore as noStore } from "next/cache"; // Import the PostType type

import Feature from "./_components/Features/Features";

export default async function Home() {
  noStore();

  return (
    <main className="h-[calc(100vh-8rem)] flex flex-col items-center pb-[7.60rem] transition-all duration-100 bg-dark-midnight text-white" style={{ backgroundImage: "url(/icons/bg.svg)", height: "100%" }}>
      <div className="container flex flex-col items-center justify-center gap-5 px-4 py-12">
        <h1 className="text-5xl font-bold tracking-tight sm:text-[5rem]">
          Slug<span className="text-dark-violet">Link</span>
        </h1>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white/50 text-center text-wrap">
            URL Shortener, QR Codes – Build, edit and manage your links.
          </p>
        </div>
        <Feature />
      </div>
    </main>
  );
}

import { unstable_noStore as noStore } from "next/cache"; // Import the PostType type
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Feature from "./_components/Features/Features";
import BackgroundSvg from "~/utils/CheckSvg";

//TODO 1: Delete this type when changing all the code. 
type PostType = {
  id: number;
  name: string;
  content: string;
};

export default async function Home() {
  noStore();
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <>
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] bg-grid-slate-400/[0.05] border-b border-slate-100/5" style={{ backgroundImage: "url(/icons/bg.svg)", maskImage: "linear-gradient(to bottom, transparent, black)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black)" }}></div>
      <main className="flex calcHeight flex-col items-center pt-18 pb-20 transition-all duration-100 bg-dark-midnight text-white ">
        <div className="container flex flex-col items-center justify-center gap-5 px-4 py-16 ">
          <h1 className="text-5xl font-bold tracking-tight sm:text-[5rem]">
            Slug<span className="text-dark-violet">Link</span>
          </h1>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white/50">
              {/* {hello ? hello.greeting : "Loading tRPC query..."} */}
              URL Shortener, QR Codes – Build, edit and manage your links.
            </p>
          </div>
          {/* card */}
          <Feature />
          {/* <CrudShowcase /> */}
        </div>
      </main>
    </>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost: PostType = await api.post.getLatest.query() as PostType; // Explicitly type latestPost as PostType

  return (
    <div className="w-full max-w-xs mt-5">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}

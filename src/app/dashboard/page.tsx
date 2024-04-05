import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import CardContainer from "../_components/Card/CardContainer";
import { Suspense } from "react";
import Link from "next/link";

export default async function Page() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect('/')
  }

  return (
    <section className="h-[calc(100vh-8rem)] transition-all duration-100 bg-dark-midnight text-white z-10" >
      <div className="flex flex-col gap-5 container m-auto px-4">
        <div className="border-b-2 border-white/10">
          <div className="navbar-start">
            <div>
              <Link href={'/dashboard'} className="navbar-item">Links</Link>
            </div>
            <div>
              <Link href={'/dashboard'} className="navbar-item">QR Codes</Link>
            </div>
          </div>
        </div>
        <form action="">
          <input
            type="text"
            placeholder="Search..."
            className='input' />
        </form>
        <Suspense fallback={<div className="skeleton-pulse"></div>}>
          <CardContainer />
        </Suspense>
      </div>
    </section>
  )
}
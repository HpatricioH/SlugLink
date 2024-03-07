import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import NoneSvg from "~/utils/NoneSvg";

export default async function Page() {
  const session = await getServerAuthSession();
  const inputClass = "rounded-2xl bg-white/10 w-full mt-1 block px-3 py-2  border border-white/10 text-sm shadow-sm placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/10 disabled:shadow-none"

  if (!session) {
    redirect('/')
  }

  return (
    <section className="calcHeight transition-all duration-100 bg-dark-midnight text-white">
      <div className="flex flex-col gap-5 container m-auto px-4 py-10">
        <h1 className="text-2xl font-bold tracking-wide">Dashboard Page</h1>
        <form action="">
          <input 
            type="text" 
            placeholder="Search..." 
            className={inputClass}/>
        </form>
        <div className="flex flex-col items-center gap-4 mt-4">
          <NoneSvg className="fill-stone-400 h-16 w-16" />
          <p className="mb-6 tracking-wide font-bold">No Links or QR codes created</p>
          <Link 
            href={'/create'}
            className="border border-white rounded-3xl p-3 hover:border-white/50 hover:text-white/50"
            >
            + Create a Link
          </Link>
          <span >or</span>
          <Link
            href={'/qrcode'} 
            className="border border-white rounded-3xl p-3 hover:border-white/50 hover:text-white/50"
            >
              + Create a QR Code
          </Link>
        </div>
      </div>
    </section>
  )
}
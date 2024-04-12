import { getServerAuthSession } from "~/server/auth";
import Image from "next/image";
import Link from "next/link";
import Auth from "../Auth/Auth";
import MenuDropDown from "../Menu/MenuDropDown";
import { Suspense } from "react";

export default async function Header() {
  const session = await getServerAuthSession();

  return (
    <header className="bg-dark-midnight text-white sticky top-0 w-full py-4 duration-300 z-200 z-50">
      <div className="flex container pl-4 pr-4 items-center justify-between mx-auto">
        <Link href='/'>
          <Image
            src="/logos/slugLink.svg"
            alt="SlugLink logo"
            width={40}
            height={40}
          />
        </Link>
        <div className="flex gap-2 items-center">
          <Suspense fallback={<div>...loading</div>}>
            <Auth user={session?.user} session={session} />
          </Suspense>
          {session && <MenuDropDown />}
        </div>
      </div>
    </header>
  )
}
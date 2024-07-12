'use client'

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLoadingSession } from "~/store/loadingSession";
import LoginSvg from "~/ui/svgs/LoginSvg";
import Button from "~/utils/Button";


interface UserProps {
  user: {
    name?: string | null;
  } | null | undefined;
  session?: unknown;
}


export default function Auth({ user }: UserProps) {
  const route = useRouter()

  const handleSignIn = async () => {
    route.push('/login')
  }

  if (user !== undefined) {
    return (
      <p>
        <span>{user?.name}</span>
      </p>
    );
  }

  return (
    <Button
      onClick={handleSignIn}
      className="flex gap-1 hover:text-dark-violet *:hover:fill-dark-violet" >
      Sign in
      <LoginSvg className='fill-white h-5 w-5 self-center' />
    </Button>
  )
}
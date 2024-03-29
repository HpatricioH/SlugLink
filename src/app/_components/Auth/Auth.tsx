'use client'

import { signIn } from "next-auth/react";
import { useLoadingSession } from "~/store/loadingSession";
import Spinner from "~/ui/spinner";
import Button from "~/utils/Button";
import LoginSvg from "~/utils/LoginSvg";

interface UserProps {
  user: {
    name?: string | null;
  } | null | undefined;
  session?: unknown;
}


export default function Auth({ user, session }: UserProps) {
  const { loading, setLoading } = useLoadingSession();

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const response = await signIn("github", { callbackUrl: '/dashboard' })
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading && user === undefined) {
    return <Spinner />;
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
      className="flex gap-1 hover:text-dark-violet *:hover:fill-dark-violet">
      Sign in
      <LoginSvg className='fill-white h-5 w-5 self-center' />
    </Button>
  )
}
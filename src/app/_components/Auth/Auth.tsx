'use client'
import { signIn } from "next-auth/react";
import Button from "~/utils/Button";

interface UserProps {
  user: {
    name?: string | null;
  } | null | undefined;
}


export default function Auth({ user }: UserProps) {
  return (
    <div>
      {user ?
        <p>
          <span>{user?.name}</span>
        </p>
        :
        <Button
          onClick={() => signIn("github")}>
          Sign in
        </Button>
      }
    </div>
  )
}
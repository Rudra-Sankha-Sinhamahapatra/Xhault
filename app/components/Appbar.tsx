"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import { Button as PrimaryButton } from "./Button";

export const Appbar = () => {
  const session = useSession();

  return (
    <div className="border-b px-2 flex justify-between">
      <div className="font-bold text-xl flex flex-col justify-center">XHAULT</div>
      <div className="mt-3">
        {session.data?.user ? 
          <PrimaryButton subject="Logout" onClick={() => signOut()} />
        : 
          <PrimaryButton subject="Login" onClick={() => signIn()} />
        }
      </div>
    </div>
  );
};

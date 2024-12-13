"use client";

import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { signOutAction } from "../_actions/signOutAction";

export function AppBar() {
  const session = useSession();
  return (
    <header className="h-20 flex justify-between border-b items-center px-6">
      <span>Welcome, {session.data?.user?.name}</span>
      <div className="space-x-4">
        <Button size="sm" onClick={() => signIn("google")} variant="outline">
          Conectar conta google
        </Button>

        <Button size="sm" onClick={signOutAction}>
          Logout
        </Button>
      </div>
    </header>
  );
}

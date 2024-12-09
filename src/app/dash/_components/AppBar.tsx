"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { signOutAction } from "../_actions/signOutAction";

export function AppBar() {
  const session = useSession();
  return (
    <header className="h-20 flex justify-end border-b items-center px-6">
      <p className="mr-auto">Welcome, {session.data?.user?.name}</p>
      <Button size="sm" onClick={signOutAction}>
        Logout
      </Button>
    </header>
  );
}

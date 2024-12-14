import React from "react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="bg-secondary rounded-lg shadow-lg">
        <CardContent className="p-10">
          <CardHeader>
            <CardTitle className="text-3xl text-secondary-foreground mb-5">
              Home
            </CardTitle>
          </CardHeader>

          <div className="flex flex-col items-center justify-center space-y-2">
            <div>
              <Link href="/login">
                <Button variant={"outline"}>Login</Button>
              </Link>
              <Link href="/register">
                <Button variant={"outline"}>Register</Button>
              </Link>
            </div>
            
            <Link href="/dash">
              <Button variant={"outline"}>Dashboard</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

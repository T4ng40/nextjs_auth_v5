"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Loader2Icon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useActionState } from "react";
import { toast } from "sonner";
interface ILoginFormProps {
  loginAction: (formData: FormData) => Promise<void | { error: string }>;
}

export function LoginForm({ loginAction }: ILoginFormProps) {
  const [, dispatchAction, isPending] = useActionState(
    async (_previousData: any, formData: FormData) => {
      const response = await loginAction(formData);

      if (response?.error) {
        toast.error(response.error);
      }
    },
    null
  );

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={dispatchAction} className="grid gap-4" noValidate>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input
              name="password"
              id="password"
              placeholder="********"
              autoComplete="current-password"
              type="password"
              required
            />
          </div>
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending && <Loader2Icon className="animate-spin mr-2 h-5 w-5" />}
            Login
          </Button>
          <Button
            variant="outline"
            className="w-full"
            type="button"
            onClick={() => signIn("google")}
          >
            Login with Google
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

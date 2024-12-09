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

interface IRegisterFormProps {
  registerAction: (formData: FormData) => Promise<void>;
}

export function RegisterForm({ registerAction }: IRegisterFormProps) {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>
          Enter your details below to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={registerAction} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="name"
              name="name"
              placeholder="John Doe"
              required
            />
          </div>

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
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="********"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Create account
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      Your role is: {session?.user.role}
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}

import { auth } from "@/lib/auth";
import { withRoleGuard } from "@/lib/withRoleGuard";
import { UserRole } from "@prisma/client";

async function Settings() {
  const session = await auth();

  return (
    <div>
      <h1 className="text-3xl"> {session?.user?.name} Settings </h1>
    </div>
  );
}

export default withRoleGuard(Settings, UserRole.USER);

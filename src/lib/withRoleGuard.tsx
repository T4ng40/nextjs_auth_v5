import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export function withRoleGuard(
  Component: React.ComponentType<any>,
  requiredRole: UserRole
) {
  return async function RoleGuardedComponent(props: any) {
    const session = await auth();
    if (session?.user.role !== requiredRole) {
      redirect("/dash");
    }
    return <Component {...props} />;
  };
}

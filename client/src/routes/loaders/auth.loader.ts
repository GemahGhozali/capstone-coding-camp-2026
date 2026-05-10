import queryClient from "@/libs/queryClient";
import { authUserQueryOptions } from "@/features/auth";

export async function authUserLoader() {
  return queryClient.ensureQueryData(authUserQueryOptions());
}

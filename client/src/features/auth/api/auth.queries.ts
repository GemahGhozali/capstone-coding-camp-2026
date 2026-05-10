import { queryOptions } from "@tanstack/react-query";
import { ensureAuthenticated } from "./auth.services";

export const authQueryKeys = {
  user: ["auth", "user"],
};

export function authUserQueryOptions() {
  return queryOptions({
    queryKey: authQueryKeys.user,
    queryFn: ensureAuthenticated,
    staleTime: Infinity,
  });
}

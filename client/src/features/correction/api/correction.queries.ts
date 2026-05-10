import { queryOptions } from "@tanstack/react-query";
import { getCorrectionById, getCorrections } from "./correction.services";

export const correctionQueryKeys = {
  history: ["corrections", "history"],
  details: (id: string) => ["corrections", "details", id],
};

export function correctionHistoryQueryOptions() {
  return queryOptions({
    queryKey: correctionQueryKeys.history,
    queryFn: getCorrections,
  });
}

export function correctionDetailsQueryOptions(id: string = "") {
  return queryOptions({
    queryKey: correctionQueryKeys.details(id),
    queryFn: () => getCorrectionById(id),
    enabled: !!id,
  });
}

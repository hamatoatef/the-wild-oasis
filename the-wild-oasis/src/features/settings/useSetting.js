import { useQuery } from "@tanstack/react-query";
import { getSetting } from "../../services/apiSettings";

export function useSetting() {
  const { isPending, data: setting } = useQuery({
    queryKey: ["setting"],
    queryFn: getSetting,
  });

  return { isPending, setting };
}

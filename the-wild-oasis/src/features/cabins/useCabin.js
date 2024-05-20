import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabin() {
  const { isPending, data: cabins } = useQuery({
    queryKey: ["cabin"],
    queryFn: getCabins,
  });

  //   const cabins = data.cabins;

  return { isPending, cabins };
}

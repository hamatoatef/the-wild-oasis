import { useQuery } from "@tanstack/react-query";
import { getAllBooking } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams?.get("status");
  const filter =
    !filterValue || filterValue === "all" ? "" : `status=${filterValue}`;

  const sortByRow = searchParams?.get("sortBy") || "startdate-desc";
  // sortBy=startDate-desc
  const sort = !sortByRow ? "" : `sort=${sortByRow}`;

  const { isPending, data: bookings } = useQuery({
    queryKey: ["bookings", filter, sort],
    queryFn: () => getAllBooking(filter, sort),
  });

  //   const cabins = data.cabins;

  return { isPending, bookings };
}

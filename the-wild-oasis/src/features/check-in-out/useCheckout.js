import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isPending: isCheckingout } = useMutation({
    mutationFn: ({ bookingId }) =>
      updateBooking({
        id: bookingId,
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`Booking successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => toast.error("there was an error while checking out"),
  });

  return { checkout, isCheckingout };
}

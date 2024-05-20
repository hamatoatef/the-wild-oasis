import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

export function useChecking() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking({
        id: bookingId,
        status: "checked-in",
        ispaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`Booking successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: () => toast.error("there was an error while checking in"),
  });

  return { checkin, isCheckingIn };
}

// const { isPending: isCreating, mutate: createCabinMutate } = useMutation({
//     mutationFn: (newCabin) => createCabin(newCabin),
//     onSuccess: () => {
//       toast.success("New Cabin successfully Created");
//       queryClient.invalidateQueries({
//         queryKey: ["cabin"],
//       });
//     },
//     onError: (err) => toast.error(err.message),
//   });

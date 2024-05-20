import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { editCabin } from "../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutate: editCabinMutate } = useMutation({
    mutationFn: ({ newCainDate, id }) => editCabin(newCainDate, id),
    onSuccess: () => {
      toast.success("New Cabin successfully Edited");
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCabinMutate };
}

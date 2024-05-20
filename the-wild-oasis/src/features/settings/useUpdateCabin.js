import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { editSetting } from "../../services/apiSettings";

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: ({ field, value }) => editSetting(field, value),
    onSuccess: () => {
      toast.success("New Setting successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["setting"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateSetting };
}

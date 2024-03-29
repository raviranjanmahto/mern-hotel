import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { mutate: deleteCabin, isPending: isDeleting } = useMutation({
    mutationFn: id =>
      fetch(`api/v1/cabins/deleteCabin/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("Cabin successfully deleted!");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: error => toast.error(error.message),
  });
  return { deleteCabin, isDeleting };
}

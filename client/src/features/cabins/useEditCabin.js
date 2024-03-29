import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) =>
      fetch(`api/v1/cabins/editCabin/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCabinData),
      }),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: error => toast.error(error.message),
  });
  return { editCabin, isEditing };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useEditGuest() {
  const queryClient = useQueryClient();

  const { mutate: editGuest, isPending: isEditing } = useMutation({
    mutationFn: ({ newGuestData, id }) =>
      fetch(`/api/v1/guests/editGuest/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGuestData),
      }),
    onSuccess: () => {
      toast.success("Guest successfully edited");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: error => toast.error(error.message),
  });
  return { editGuest, isEditing };
}

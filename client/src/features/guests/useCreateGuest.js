import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useCreateGuest() {
  const queryClient = useQueryClient();

  const { mutate: createGuest, isPending: isCreating } = useMutation({
    mutationFn: ({ newGuestData }) =>
      fetch(`/api/v1/guests/createGuest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGuestData),
      }),
    onSuccess: () => {
      toast.success("Guest successfully created");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: error => toast.error(error.response.data.message),
  });
  return { isCreating, createGuest };
}

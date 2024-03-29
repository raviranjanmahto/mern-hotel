import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: ({ newCabinData }) =>
      fetch(`/api/v1/cabins/createCabin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCabinData),
      }),
    onSuccess: () => {
      toast.success("Cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: error => toast.error(error.response.data.message),
  });
  return { isCreating, createCabin };
}

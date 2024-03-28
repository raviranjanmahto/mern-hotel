import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: async ({ fullName, avatar, password }) => {
      const res = await fetch(`api/v1/users/updateCurrentUser`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, avatar, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return data;
    },
    onSuccess: () => {
      toast.success("User successfully updated");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: err => toast.error(err.message),
  });
  return { updateUser, isUpdating };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isLogginOut } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`api/v1/users/logout`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return data;
    },
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
      toast.success("Logged out success");
    },
    onError: err => toast.error(err.message),
  });

  return { logout, isLogginOut };
}

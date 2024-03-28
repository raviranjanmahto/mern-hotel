import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending: isLoginIn } = useMutation({
    mutationFn: async ({ email, password }) => {
      const res = await fetch(`api/v1/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const user = await res.json();
      if (!res.ok)
        throw new Error(user.message || "An error occurred during login");
      return user;
    },
    onSuccess: () => {
      // queryClient.setQueryData(["user"], user);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Login successful");
      navigate("/dashboard", { replace: true });
    },
    onError: err => toast.error(err?.message),
  });

  return { login, isLoginIn };
}

import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useSignup() {
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: async ({ fullName, email, password }) => {
      const res = await fetch(`api/v1/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });
      const user = await res.json();
      if (!res.ok)
        throw new Error(user.message || "An error occurred during sign-up");
      return user;
    },
    onSuccess: () => toast.success("Account successfully created!"),
    onError: err => toast.error(err.message),
  });

  return { signup, isLoading };
}

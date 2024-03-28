import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const {
    data: user,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetch(`api/v1/users/getCurrentUser`).then(res => res.json()),
    refetchOnWindowFocus: true,
  });

  return {
    user,
    isLoading,
    isFetching,
  };
}

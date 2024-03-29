import { useQuery } from "@tanstack/react-query";

export function useCabins() {
  const {
    data: cabins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: () => fetch(`api/v1/cabins/getCabins`).then(res => res.json()),
  });
  return { cabins, isLoading, error };
}

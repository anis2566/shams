import { useQuery } from "@tanstack/react-query";

import { GET_USERS_FOR_SELLER_ACTION } from "../action";

export const useGetUsersForSellerQuery = (name?: string) => {
  return useQuery({
    queryKey: ["users-for-seller", name],
    queryFn: async () => await GET_USERS_FOR_SELLER_ACTION(name),
  });
};

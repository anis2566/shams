import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

import { SELLER_REGISTER_ACTION } from "../action";

export const useSellerRegisterMutation = () => {
  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/seller",
    });
  };

  return useMutation({
    mutationFn: SELLER_REGISTER_ACTION,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        handleLogout();
      }

      if (data.error) {
        toast.error(data.error);
      }
    },
  });
};

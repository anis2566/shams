import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { CREATE_ORDER_ACTION } from "../action";
import { useCart } from "@/hooks/use-cart";

export const useCreateOrderMutation = () => {
  const router = useRouter();
  const { resetCart } = useCart();

  return useMutation({
    mutationFn: CREATE_ORDER_ACTION,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success);
        resetCart();
        router.push(`/invoice/${data.id}`);
      } else {
        toast.error(data.error);
      }
    },
  });
};

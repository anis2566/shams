import { useMutation } from "@tanstack/react-query";

import { SUBSCRIBE_EMAIL } from "../action";
import { toast } from "sonner";
import { Dispatch } from "react";
import { SetStateAction } from "react";

interface SubscribeMutationType {
  setIsSubmitted: Dispatch<SetStateAction<boolean>>;
}

export const useSubscribeMutation = ({
  setIsSubmitted,
}: SubscribeMutationType) => {
  return useMutation({
    mutationFn: SUBSCRIBE_EMAIL,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
      } else {
        setIsSubmitted(true);
      }
    },
  });
};

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  addAddressApi,
} from "../api/addressApi";

export const useAddAddress =
  () => {

    const queryClient =
      useQueryClient();

    return useMutation({

      mutationFn:
        addAddressApi,

      onSuccess: () => {

        queryClient
          .invalidateQueries({
            queryKey: [
              "addresses",
            ],
          });
      },
    });
};
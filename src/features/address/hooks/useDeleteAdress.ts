import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  deleteAddressApi,
} from "../api/addressApi";

export const useDeleteAddress =
  () => {

    const queryClient =
      useQueryClient();

    return useMutation({

      mutationFn:
        deleteAddressApi,

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
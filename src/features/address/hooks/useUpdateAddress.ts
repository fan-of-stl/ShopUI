import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  updateAddressApi,
} from "../api/addressApi";

export const useUpdateAddress =
  () => {

    const queryClient =
      useQueryClient();

    return useMutation({

      mutationFn: ({
        id,
        payload,
      }: {
        id: number;

        payload: any;
      }) =>
        updateAddressApi(
          id,
          payload
        ),

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
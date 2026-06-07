import {
  useQuery,
} from "@tanstack/react-query";

import {
  getAddressesApi,
} from "../api/addressApi";

export const useAddresses =
  () => {

    return useQuery({
      queryKey: ["addresses"],

      queryFn:
        getAddressesApi,
    });
};
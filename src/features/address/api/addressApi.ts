import apiClient from "../../../services/apiClient";
import type { AddAddressPayload } from "../types/addressType";


export const getAddressesApi =
  async () => {

    const res =
      await apiClient.get(
        "/profile/addresses"
      );

    return res.data;
};

export const addAddressApi =
  async (
    payload:
      AddAddressPayload
  ) => {

    const res =
      await apiClient.post(
        "/profile/addresses",
        payload
      );

    return res.data;
};

export const updateAddressApi =
  async (
    id: number,
    payload:
      AddAddressPayload
  ) => {

    const res =
      await apiClient.put(
        `/profile/addresses/${id}`,
        payload
      );

    return res.data;
};

export const deleteAddressApi =
  async (id: number) => {

    const res =
      await apiClient.delete(
        `/profile/addresses/${id}`
      );

    return res.data;
};
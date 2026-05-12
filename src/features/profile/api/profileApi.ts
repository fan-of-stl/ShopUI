import apiClient from "../../../services/apiClient";

export const getProfileApi = async () => {
  const res = await apiClient.get("/profile");

  return res.data;
};
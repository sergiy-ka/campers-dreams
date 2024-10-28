import axios from "axios";

const camperApi = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io",
});

export const getCampers = async ({ page = 1, limit = 4, filter = {} }) => {
  const params = new URLSearchParams({
    page,
    limit,
    ...filter,
  });

  const { data } = await camperApi.get(`/campers?${params}`);
  return data;
};

export const getCamperById = async (id) => {
  const { data } = await camperApi.get(`/campers/${id}`);
  return data;
};

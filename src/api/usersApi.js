import api from "./axios";

export const getUsers = async () => {
  const response = await api.get(
    "https://jsonplaceholder.typicode.com/users"
  );

  return response.data;
};
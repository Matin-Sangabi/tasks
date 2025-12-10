import http from "./httpRequest";

export interface UserLists {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: [
    {
      id: number;
      email: string;
      first_name: string;
      last_name: string;
      avatar: string;
    }
  ];
}

export interface SingleUserResponse {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
}

export const usersLists = async (page: number) => {
  const response = await http.get<UserLists>(`/users?page=${page}`);
  return response.data;
};

export const userDetails = async (id: string) => {
  const response = await http.get<SingleUserResponse>(`/users/${id}`);
  return response.data;
};

export const userUpdate = async ({
  id,
  name,
  job,
}: {
  id: string;
  name: string;
  job: string;
}) => {
  const response = await http.put(`/users/${id}`, { name, job });
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await http.delete(`/users/${id}`);
  return response.data;
};

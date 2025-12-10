import http from "./httpRequest";

export interface LoginRequest {
  // username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const loginService = async (data: LoginRequest) => {
  const response = await http.post<LoginResponse>("/login", data);
  return response.data;
};

export const logoutService = async () => {
  const response = await http.post("/logout");
  return response.data;
};

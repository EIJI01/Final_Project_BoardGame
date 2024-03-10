export interface LoginAdminRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  name: string;
  accessToken: string;
  refreshToken: string;
}

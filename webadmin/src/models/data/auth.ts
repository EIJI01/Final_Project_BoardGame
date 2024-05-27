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

export interface RegisterGmForm {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthPayload {
  id: string;
  username: string;
  email: string;
}

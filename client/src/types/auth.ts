export interface ISigninRequestData {
  username: string;
  password: string;
}

export interface ISigninResponseData {
  id: number;
  email: string;
  username: string;
  accessToken: string;
}

export interface ISignupData {
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
}

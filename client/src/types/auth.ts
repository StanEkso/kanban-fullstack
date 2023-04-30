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

export interface ISignupRequestData {
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
}

export interface ISignupResponseData {
  id: number;
  email: string;
  username: string;
}

export interface IGetUserResponseData {
  id: number;
  email: string;
  username: string;
}

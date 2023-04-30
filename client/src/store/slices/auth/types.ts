export interface AuthState {
  account: Account | null;
}

export interface Account {
  id: number;
  username: string;
  email: string;
}

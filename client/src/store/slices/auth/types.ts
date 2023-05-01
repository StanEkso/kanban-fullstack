export interface AuthState {
  account: Account | null;
  isLoading: boolean;
}

export interface Account {
  id: number;
  username: string;
  email: string;
}

import { IUser } from '@contexts/JWTContext';

export interface IAuthData {
  isAuthenticated: boolean;
  user: IUser;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber?: string
  ) => Promise<void>;
}

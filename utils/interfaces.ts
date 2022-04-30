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
export interface IDueDate {
  data?: any;
}

export interface ITodo {
  dueDate: IDueDate;
  _id: string;
  title: string;
  content: string;
  dateCompleted?: any;
  isDone: boolean;
  userId: string;
  collectionId: string;
  collectionName: string;
  dateAdded: Date;
  __v: number;
}

export interface ICollectionData {
  _id: string;
  title: string;
  userId: string;
  doneTodosPercentage: number;
  totalTodos: number;
  doneTodos: number;
  todos: ITodo[];
  dateAdded: Date;
}

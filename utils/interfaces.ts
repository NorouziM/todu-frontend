import { IUser } from '@contexts/JWTContext';
import { IconType } from 'react-icons';

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

export interface ITodo {
  _id: string;
  title: string;
  content: string;
  dateCompleted?: any;
  isDone: boolean;
  dueDate: Date | null;
  userId: string;
  collectionId: string | null;
  collectionName: string | null;
  dateAdded: Date;
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

export interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}

import axiosInstance from '@utils/axios';

interface ITodoFormData {
  title: string;
  content?: string;
  dueDate?: Date | string;
  collectionId: string;
}
/**
 *
 * @param data form data
 * @returns error | null
 */

export const createTodo = async (data: ITodoFormData) => {
  try {
    await axiosInstance.post(`/api/v1/todos`, data);
    return null;
  } catch (error: any) {
    return error.data;
  }
};

/**
 *
 * @param data  {isDone: boolean, ...}
 * @param id  id of the todo
 * @returns error | null
 */

export const updateTodo = async (data: any, id: string) => {
  try {
    await axiosInstance.put(`/api/v1/todos/${id}`, data);
    return null;
  } catch (error: any) {
    return error.data;
  }
};

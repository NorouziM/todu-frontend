import axiosInstance from '@utils/axios';

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

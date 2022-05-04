import axiosInstance from '@utils/axios';

/**
 *
 * @param data {title}
 * @returns error object
 */

export const createCollection = async (data: { title: string }) => {
  try {
    await axiosInstance.post(`/api/v1/collection`, data);
    return null;
  } catch (error: any) {
    return error.data;
  }
};

/**
 *
 * @param id {string}
 * @returns error | null
 */

export const deleteCollection = async (id: string) => {
  try {
    await axiosInstance.delete(`/api/v1/collection/${id}`);
    return null;
  } catch (error: any) {
    return error.data;
  }
};

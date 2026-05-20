import { api } from './client';
import type { Category } from '../types';

export const categoryApi = {
  getAll: () => api.get<Category[]>('/categories'),
  create: (cat: Omit<Category, 'id'>) => api.post<Category>('/categories', cat),
  update: (id: string, cat: Partial<Omit<Category, 'id'>>) => api.put<Category>(`/categories/${id}`, cat),
  delete: (id: string) => api.del<{ success: boolean }>(`/categories/${id}`),
};

import { api } from './client';
import type { NavItem } from '../types';

export const itemApi = {
  getAll: () => api.get<NavItem[]>('/items'),
  create: (item: Omit<NavItem, 'id'>) => api.post<NavItem>('/items', item),
  update: (id: string, item: Partial<Omit<NavItem, 'id'>>) => api.put<NavItem>(`/items/${id}`, item),
  delete: (id: string) => api.del<{ success: boolean }>(`/items/${id}`),
};

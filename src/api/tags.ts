import { api } from './client';

export const tagApi = {
  getAll: () => api.get<string[]>('/tags'),
  delete: (tag: string) => api.del<{ success: boolean }>(`/tags/${encodeURIComponent(tag)}`),
  rename: (oldName: string, newName: string) => api.put<{ success: boolean }>('/tags/rename', { oldName, newName }),
};

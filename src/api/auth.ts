import { api } from './client';

export const authApi = {
  verify: (key: string) => api.post<{ valid: boolean }>('/auth', { key }),
};

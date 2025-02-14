import { useMutation } from '@tanstack/react-query';

export const useCreateMutation = <T>(
  queryKey: string,
  method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE'
) => {
  return useMutation<T, unknown, Record<string, unknown>>({
    mutationKey: queryKey.includes('/') ? queryKey.split('/') : [queryKey],
    mutationFn: async (obj: Record<string, unknown>) => {
      const response = await fetch(`http://localhost:3000/${queryKey}`, {
        method: method ? method : 'POST',
        body: obj !== undefined ? JSON.stringify(obj) : undefined,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.json();
    },
  });
};

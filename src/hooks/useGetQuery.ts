import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useGetQuery = <T>(
  queryKey: string,
  relation?: 'categories' | 'equipments' | 'orders',
  sortBy?: string
): UseQueryResult<T> => {
  return useQuery<T>({
    queryKey: queryKey.includes('/') ? queryKey.split('/') : [queryKey],
    queryFn: async () => {
      const data = await fetch(
        `http://localhost:3000/${queryKey}${relation ? `${queryKey.slice(-1) === '&' ? '' : '?'}_embed=${relation}` : ''}${sortBy ? `${relation ? '&' : queryKey.includes('?') ? '&' : '?'}_sort=${sortBy}` : ''}`
      );
      return data.json();
    },
  });
};

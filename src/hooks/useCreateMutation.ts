import { useMutation } from '@tanstack/react-query';

export const useCreateMutation = <TResponse, TRequest extends { id?: string }>(
  queryKey: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST'
) => {
  return useMutation<TResponse, unknown, TRequest>({
    mutationFn: async (data: TRequest & { id?: string }) => {
      // Sprawdzenie czy mamy id w danych i budowa odpowiedniego URL
      const url = `http://localhost:3000/${
        data && data.id ? `${queryKey}/${data.id}` : `${queryKey}`
      }`;

      const response = await fetch(url, {
        method,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Obsługa błędu HTTP
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json() as Promise<TResponse>;
    },
  });
};

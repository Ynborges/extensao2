import { useQuery, useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';

export const useApi = (queryKey, queryFn, options = {}) => {
  return useQuery(queryKey, queryFn, {
    onError: (error) => {
      const message = error.response?.data?.error || 'Erro ao carregar dados';
      toast.error(message);
    },
    ...options
  });
};

export const useApiMutation = (mutationFn, options = {}) => {
  const queryClient = useQueryClient();
  
  return useMutation(mutationFn, {
    onSuccess: (data, variables, context) => {
      if (options.successMessage) {
        toast.success(options.successMessage);
      }
      if (options.invalidateQueries) {
        options.invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries(queryKey);
        });
      }
      options.onSuccess?.(data, variables, context);
    },
    onError: (error) => {
      const message = error.response?.data?.error || 'Erro na operação';
      toast.error(message);
      options.onError?.(error);
    },
    ...options
  });
};
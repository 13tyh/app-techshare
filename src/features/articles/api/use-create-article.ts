import {useMutation, useQueryClient} from '@tanstack/react-query';
import {InferRequestType, InferResponseType} from 'hono/client';
import {useRouter} from 'next/navigation';
import {toast} from 'sonner';

import {client} from '@/lib/rpc';

type ResponseType = InferResponseType<(typeof client.api.articles)['$post']>;
type RequestType = InferRequestType<(typeof client.api.articles)['$post']>;

export const useCreateArticle = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async () => {
      const response = await client.api.articles.$post();

      if (!response.ok) {
        throw new Error('記事の作成に失敗しました。');
      }

      return await response.json();
    },
    onSuccess: ({data}) => {
      toast.success('記事を作成しました。');
      queryClient.invalidateQueries({queryKey: ['articles']});
      router.push(`/articles/${data.id}/edit`);
    },
    onError: (error) => {
      toast.error('記事の作成に失敗しました。');
    },
  });

  return mutation;
};

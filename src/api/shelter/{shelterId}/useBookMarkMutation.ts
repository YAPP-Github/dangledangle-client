import { useMutation } from '@tanstack/react-query';
import useShelterHomeInfo from './useShelterHomeInfo';
import { post } from './bookmark';
import { useRouter } from 'next/navigation';

export default function useBookMarkMutation(
  shelterId: number,
  onSuccessCallback: (bookMarkState: boolean) => void
) {
  const { refetch } = useShelterHomeInfo(shelterId);
  const router = useRouter();
  const mutate = useMutation(post, {
    onSuccess: data => {
      refetch();
      onSuccessCallback(data.bookMarked!);
    },
    onError: () => {
      router.replace('/login/volunteer');
    }
  });

  return mutate;
}

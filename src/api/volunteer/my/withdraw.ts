import api from '@/api/instance';

export const withdraw = async () => {
  return await api.delete('volunteer/my/withdraw').json();
};

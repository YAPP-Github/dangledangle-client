import api from '@/api/instance';

export const withdraw = async () => {
  return await api.delete('volunteer/my/withdraw').json();
};

export const shelterWithdraw = async () => {
  return await api.delete('shelter/admin/my/withdraw').json();
};

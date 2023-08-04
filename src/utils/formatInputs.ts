export const phoneRegex = /^[0-9-]*$/;
export function formatPhone(input: string) {
  let formattedPhone = '';
  let phone = removeDash(input); // 이전에 추가된 대시 제거

  const isSeoul = phone?.substring(0, 2);

  if (phone?.length <= 3) {
    formattedPhone = phone;
  } else if (isSeoul === '02' && phone?.length === 10) {
    formattedPhone = `${phone?.slice(0, 2)}-${phone?.slice(
      2,
      6
    )}-${phone?.slice(6)}`;
  } else if (phone?.length > 3 && phone?.length <= 7) {
    formattedPhone = `${phone?.slice(0, 3)}-${phone?.slice(3)}`;
  } else if (phone?.length > 7 && phone?.length <= 11) {
    formattedPhone = `${phone?.slice(0, 3)}-${phone?.slice(
      3,
      7
    )}-${phone?.slice(7)}`;
  } else {
    formattedPhone = phone;
  }

  return formattedPhone;
}

export function removeDash(input: string) {
  return input.replace(/-/g, '');
}

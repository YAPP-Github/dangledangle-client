export function formatPhone(input: string) {
  let phone = removeDash(input); // 이전에 추가된 대시 제거

  if (phone.length > 3 && phone.length <= 7) {
    phone = `${phone.slice(0, 3)}-${phone.slice(3)}`;
  } else if (phone.length > 7) {
    phone = `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7)}`;
  }

  return phone;
}

export function removeDash(input: string) {
  return input.replace(/-/g, '');
}

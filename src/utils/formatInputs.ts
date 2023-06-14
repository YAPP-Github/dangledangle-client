export function formatPhoneNumber(input: string) {
  let phoneNumber = removeDash(input); // 이전에 추가된 대시 제거

  if (phoneNumber.length > 3 && phoneNumber.length <= 7) {
    phoneNumber = `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
  } else if (phoneNumber.length > 7) {
    phoneNumber = `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
      3,
      7
    )}-${phoneNumber.slice(7)}`;
  }

  return phoneNumber;
}

export function removeDash(input: string) {
  return input.replace(/-/g, '');
}

import { Address } from 'react-daum-postcode';

export const handlePostCode = (data: Address) => {
  let fullAddress = data.address;
  let extraAddress = '';

  if (data.addressType === 'R') {
    if (data.bname !== '') {
      extraAddress += data.bname;
    }
    if (data.buildingName !== '') {
      extraAddress +=
        extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
    }
    fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
  }
  return [data.address, fullAddress, data.zonecode];
};

import * as Yup from 'yup';
import { RegisterFormValues } from './page';

export const validation: Yup.ObjectSchema<Partial<RegisterFormValues>> =
  Yup.object().shape({
    nickName: Yup.string()
      .max(10)
      .required('닉네임을 한글자 이상 입력해주세요.')
      .test(
        'no-emoji',
        '이모티콘은 사용할 수 없습니다',
        (value = '') =>
          !/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu.test(value)
      ),
    contactNumber: Yup.string()
      .required('전화번호를 입력해주세요.')
      .matches(
        /^(01[0-9]{1}|(02|0[3-9]{2}))[0-9]{3,4}[0-9]{4}$/,
        '전화번호 형식이 아닙니다'
      ),
    complete: Yup.string()
  });

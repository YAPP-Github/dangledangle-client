import yup from '@/utils/yup';

export const loginValidation = yup.object().shape({
  email: yup
    .string()
    .required('필수항목 입니다.')
    .email('올바른 이메일 형식이 아닙니다.'),
  password: yup
    .string()
    .required()
    .min(8, '비밀번호가 너무 짧습니다. 8~15자로 입력해주세요.')
    .matches(
      /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/,
      '영문, 숫자, 특수문자 3가지 조합 8~15자로 입력해주세요.'
    )
    .max(15, '비밀번호가 너무 깁니다. 8~15자로 입력해주세요.')
});

export const passWordFindValidation = yup.object().shape({
  email: yup
    .string()
    .required('필수항목 입니다.')
    .email('올바른 이메일 형식이 아닙니다.')
});

export const registerValidation = yup.object({
  email: yup.string().email('올바른 이메일 형식이 아닙니다.'),
  password: yup
    .string()
    .min(8, '비밀번호가 너무 짧습니다. 8~15자로 입력해주세요.')
    .matches(
      /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/,
      '영문, 숫자, 특수문자 2가지 조합 8~15자로 입력해주세요.'
    )
    .max(15, '비밀번호가 너무 깁니다. 8~15자로 입력해주세요.'),
  passwordConfirm: yup
    .string()
    .optional()
    .oneOf([yup.ref('password'), undefined], '비밀번호가 일치하지 않습니다.'),
  name: yup
    .string()
    .max(20)
    .test(
      'no-emoji',
      '이모티콘은 사용할 수 없습니다.',
      (value = '') =>
        !/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu.test(value)
    )
    .test(
      'no-caret',
      '특수문자가 포함되어있는지 확인해주세요.',
      (value = '') => !/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/gu.test(value)
    ),
  phoneNumber: yup
    .string()
    .matches(/^\d{3}-\d{3,4}-\d{4}$/, '유효한 연락처 형식이 아닙니다.'),
  address: yup.object().shape({
    address: yup.string().required(),
    addressDetail: yup.string(),
    postalCode: yup.string().required(),
    latitude: yup.number().required(),
    longitude: yup.number().required()
  }),
  description: yup.string().max(300, '입력 가능 글자수를 초과했어요.')
});

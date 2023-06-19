import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    default: '사용할 수 없는 값입니다.',
    required: '필수 입력 항목입니다.',
    oneOf: '다음 값 중 하나여야 합니다.: ${values}',
    notOneOf: '다음 값 중 하나가 아니어야 합니다.: ${values}',
    notType: function notType(_ref: any) {
      const type = _ref.type;

      let msg;
      if (type === 'number') {
        msg = '숫자만 입력 가능합니다.';
      } else if (type === 'date') {
        msg = '날짜 형식으로만 입력 가능합니다.';
      } else if (type === 'object') {
        msg = '옵션을 선택해주세요.';
      } else {
        msg = '해당 항목은 `' + type + '` 형식으로 입력해주세요.';
      }

      return msg;
    },
    defined: '정의되지 않았습니다.'
  },
  string: {
    length: '${length}자로 입력해주세요.',
    min: '${min}자 이상 입력바랍니다.',
    max: '${max}자 이하로 입력바랍니다.'
  }
});

export const aniValidation = Yup.object({
  image: Yup.string().required(),
  name: Yup.string().required(),
  specipic: Yup.string().required(),
  age: Yup.number().required(),
  special_note: Yup.string().required().max(300),
  gender: Yup.string().required()
});

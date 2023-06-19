import * as Yup from 'yup';

const ValidationList: ValidationListType = {
  max: (n: number) =>
    n !== 0 && Yup.string().max(n, `글자는 ${n}자 이하로 입력해주세요`),
  email: (b: boolean) =>
    b &&
    Yup.string().matches(
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9]{0,61}(?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.[a-zA-Z0-9]{2,61}(?:\.[a-zA-Z0-9]{2,61})*$/,
      '이메일 형식이 아닙니다'
    ),
  emoji: (b: boolean) =>
    b &&
    Yup.string().test(
      'no-emoji',
      '이모티콘은 사용할 수 없습니다',
      (value = '') =>
        !/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu.test(value)
    ),
  phoneNum: (b: boolean) =>
    b &&
    Yup.string().matches(
      /^(01[0-9]{1}|(02|0[3-9]{2}))[0-9]{3,4}[0-9]{4}$/,
      '전화번호 형식이 아닙니다'
    )
};

/**
 * TODO
 * react hook form에 의존하지 않고 useRef와 함께 사용할수 있도록 개발할 예정
 *
 */
export default function useValidation(
  options?: ValidationArgs
): ValidationFunction {
  return async forValidate => {
    if (!options) return { result: true }; // validaiton props로 전달되는 값 없을때
    const validationListKeys = Object.keys(options);

    // Promise all로 모든 검증이 통과된 이후에 로직 진행
    const validateResult = Promise.all(
      validationListKeys.map(async key => {
        const validationType = key as keyof ValidationListType;
        const validationParam = options[validationType]!;

        let param: any;
        let message: string = '';

        if (typeof validationParam !== 'object') {
          param = validationParam;
        } else {
          param = validationParam.value;
          message = validationParam.message;
        }

        const method = ValidationList[validationType] as (
          p: any
        ) => Yup.StringSchema;
        const validationSchema = method(param);

        await validationSchema.validate(forValidate).catch(e => {
          throw {
            type: validationType,
            message: message || e.message // 에러시 ValidationList에 등록된 메세지가 e.message로 전달됨
          };
        });
      })
    )
      .then(() => ({ result: true })) // 모든 검증 성공, true 반환
      .catch(error => ({
        result: false,
        type: error.type,
        message: error.message
      }));

    return validateResult;
  };
}

/**
 * @description Valdation
 * yup schema를 리턴하는 validation 메서드 모아두는곳,
 * [validationType] : (param) => Yup.StringSchema | false;
 * param은 한개의 인수만 받아야 합니다
 */
type ValidationListType = {
  max: (n: number) => Yup.StringSchema | false;
  email: (b: boolean) => Yup.StringSchema | false;
  emoji: (b: boolean) => Yup.StringSchema | false;
  phoneNum: (b: boolean) => Yup.StringSchema | false;
};

type ValidationMethods = keyof ValidationListType;
type ValidationSchemas = typeof ValidationList;

export type ValidationArgs = {
  [K in ValidationMethods]?: NonNullable<
    | Parameters<ValidationSchemas[K]>[0]
    | {
        value: Parameters<ValidationSchemas[K]>[0];
        message: string;
      }
  >;
};

type ValidationFunction = (forValidate: string) => Promise<{
  result: boolean;
  type?: ValidationMethods;
  message?: string;
}>;

export type TextFieldValidationReturnType = {
  result: boolean;
  type: ValidationMethods;
  message: string;
};

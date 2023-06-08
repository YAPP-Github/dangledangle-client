import { StringSchema, string } from 'yup';

/**
 * @description Valdation
 * yup schema를 리턴하는 validation 메서드 모아두는곳,
 * [methodName] : (param) => yupSchema
 * param은 한개의 인수만 받아야 합니다
 */
const Validation = {
  max: (n: number) => string().max(n, `글자는 ${n}자 이하로 입력해주세요`),
  email: (b: boolean) => b && string().email('이메일 형식이 아닙니다')
};

export type ValidationArgs = {
  [K in keyof typeof Validation]?: Parameters<(typeof Validation)[K]>[0];
};

function useValidation(options?: ValidationArgs) {
  const validate: (forValidate: string) => Promise<{
    result: boolean;
    type?: keyof typeof Validation;
  }> = async forValidate => {
    if (!options) return { result: true };
    const validationKeys = Object.keys(Validation); //options로 넘어오는 값들 entries 생성
    /// entries 순회하며 validation 실행
    const result = Promise.all(
      validationKeys.map(async key => {
        const methodKey = key as keyof typeof Validation;
        if (!Object.hasOwn(options, methodKey)) return;

        const param = options?.[methodKey];
        const method = Validation[methodKey] as (param: any) => StringSchema;
        await method(param)
          .validate(forValidate)
          .catch(() => {
            throw methodKey;
          });
      })
    )
      .then(() => ({ result: true })) // 모든 검증 성공, true 반환
      .catch(methodKey => ({ result: false, type: methodKey })); // 검증 실패, false 반환

    return result;
  };

  return { validate };
}
export default useValidation;

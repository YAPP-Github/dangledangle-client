import { string } from 'yup';

/**
 * @description Valdation
 * yup schema를 리턴하는 validation 메서드 모아두는곳,
 * [methodName] : (value) => yupSchema
 */
const Validation = {
  max: (n: number) => string().max(n, `글자는 ${n}자 이하로 입력해주세요`)
};

export type ValidationArgs = {
  [K in keyof typeof Validation]: Parameters<(typeof Validation)[K]>[0];
};

function useValidation(options?: ValidationArgs) {
  const validate = async (forValidate: string) => {
    if (!options) return true;
    const validationEntries = Object.entries(options); //options로 넘어오는 값들 entries 생성

    /// entries 순회하며 validation 실행
    const result = Promise.all(
      validationEntries.map(async ([key, value]) => {
        const method = key as keyof typeof Validation;
        const validation = await Validation[method](value).isValid(forValidate);
        if (!validation) throw false; // 검증 실패한 경우가 나오면, false를 throw
        return true;
      })
    )
      .then(() => true) // 모든 검증 성공, true 반환
      .catch(() => false); // 검증 실패, false 반환

    return result;
  };

  return { validate };
}
export default useValidation;

import { string } from 'yup';

/**
 * @description
 * yup schema를 리턴하는 validation 메서드 모아두는곳,
 *
 */
const Validation = {
  max: (n: number) => string().max(n, `글자는 ${n}자 이하로 입력해주세요`)
};

export type ValidationArgs = {
  [K in keyof typeof Validation]: Parameters<(typeof Validation)[K]>[0];
};

function useValidation(options?: ValidationArgs) {
  const validate = async (string: string) => {
    if (!options) return;
    const validations = Object.entries(options);

    const results = Promise.all(
      validations.map(async ([method, value]) => {
        const key = method as keyof typeof Validation;
        const validateResult = await Validation[key](value).isValid(string);
        if (!validateResult) throw false;
        return true;
      })
    )
      .then(() => true)
      .catch(() => false);
    return results;
  };

  return { validate };
}
export default useValidation;

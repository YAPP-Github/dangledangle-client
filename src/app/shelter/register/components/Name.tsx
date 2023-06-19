import Button from '@/components/common/Button/Button';
import EmphasizedTitle from '@/components/common/EmphasizedTitle/EmphasizedTitle';
import TextField from '@/components/common/TextField/TextField';
import { H2 } from '@/components/common/Typography';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
import { onNextProps } from '../page';

export default function Name({ onNext }: onNextProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext();
  return (
    <div>
      <EmphasizedTitle>
        <H2>안녕하세요!</H2>
        <H2>보호소 이름을 입력해주세요.</H2>
      </EmphasizedTitle>
      <TextField
        max={10}
        fixedHelper={'국문/영문/숫자/띄어쓰기 조합 20자 이내 (특수문자 불가)'}
        placeholder="보호소 이름을 입력해주세요."
        error={errors['name']}
        {...register('name')}
      />
      <Button onClick={onNext}>다음</Button>
    </div>
  );
}

'use client';
import Button from '@/components/common/Button/Button';
import RadioGroup, {
  RadioOption
} from '@/components/common/RadioGroup/RadioGroup';
import TextArea from '@/components/common/TextArea/TextArea';
import TextField from '@/components/common/TextField/TextField';
import { Caption2 } from '@/components/common/Typography';
import { textButton } from '@/components/common/Typography/Typography.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldErrors, useForm } from 'react-hook-form';
import * as yup from 'yup';
import * as styles from './styles.css';

type FormValues = {
  instagram: string;
  bankName: string;
  account: string;
  donationUrl: string;
  parking: 'true' | 'false';
  parkingNotice: string;
  notice: string;
};

const parkingOptions: RadioOption[] = [
  {
    label: '가능',
    value: 'true'
  },
  {
    label: '불가능',
    value: 'false'
  }
];

const schema: yup.ObjectSchema<Partial<FormValues>> = yup
  .object()
  .shape({})
  .required();

export default function ShelterEditExtraPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data: FormValues | FieldErrors<FormValues>) =>
    console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit, onSubmit)}>
      <div className={styles.container}>
        <TextField
          label="인스타그램 계정"
          placeholder="https://www.instagram.com/프로필명"
          {...register('instagram')}
        />
        <div>
          <TextField
            label="후원 계좌 정보"
            placeholder="은행명"
            {...register('bankName')}
          />
          <TextField placeholder="계좌번호" {...register('account')} />
          <TextField
            placeholder="카카오페이 코드 송금 링크 입력"
            {...register('donationUrl')}
          />
          <Caption2 color="gray600">
            카카오페이 코드송금 링크를 입력하면, 원터치로 후원금 모금이
            가능해요.
          </Caption2>
          <br />
          <Caption2
            className={textButton}
            element={'a'}
            color="primary300"
            href=""
          >
            코드송금 링크는 어떻게 생성하나요?
          </Caption2>
        </div>
        <div>
          <RadioGroup
            style={{ marginBottom: '12px' }}
            label="주차 가능 여부"
            options={parkingOptions}
            {...register('parking')}
          />
          <TextField
            placeholder="추가 주차 관련 안내 (최대 200자)"
            {...register('parkingNotice')}
          />
        </div>
        <TextArea
          label="사전 안내 사항"
          placeholder="봉사자에게 사전에 안내해야 할 내용이 있다면 입력해주세요. (최대 1000자)"
          max={1000}
          fixHeight="174px"
          {...register('notice')}
        />
      </div>
      <Button itemType="submit">Submit</Button>
    </form>
  );
}

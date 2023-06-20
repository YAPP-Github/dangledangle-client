'use client';
import Button from '@/components/common/Button/Button';
import RadioGroup, {
  RadioOption
} from '@/components/common/RadioGroup/RadioGroup';
import TextField from '@/components/common/TextField/TextField';
import { Caption2 } from '@/components/common/Typography';
import { textButton } from '@/components/common/Typography/Typography.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import * as styles from './styles.css';
import FixedFooter from '@/components/common/FixedFooter/FixedFooter';
import TextArea from '@/components/common/TextField/TextArea';
import useShelterInfo from '@/api/shelter/admin/useShelterInfo';
import { isEmpty } from 'lodash';
import useUpdateAdditionalInfo from '@/api/shelter/admin/useUpdateAdditionalInfo';
import { useRouter } from 'next/navigation';

type FormValues = {
  instagram?: string;
  bankName?: string;
  accountNumber?: string;
  donationUrl?: string;
  isParkingEnabled?: string | null;
  parkingNotice?: string;
  notice?: string;
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

const maxNoticeLength = 1000;
const maxParkingNoticeLength = 300;
const schema: yup.ObjectSchema<FormValues> = yup
  .object()
  .shape({
    instagram: yup
      .string()
      .default('')
      .matches(/https:\/\/www\.instagram\.com\/[\w\.]+$/i, {
        excludeEmptyString: true,
        message: '인스타그램 주소를 다시 확인해주세요'
      })
      .url('유효한 url 형식이 아닙니다.'),
    bankName: yup.string(),
    accountNumber: yup.string(),
    donationUrl: yup.string().url(),
    isParkingEnabled: yup.string().nullable().oneOf(['true', 'false']),
    parkingNotice: yup.string().max(maxParkingNoticeLength),
    notice: yup.string().max(maxNoticeLength)
  })
  .required();

export default function ShelterEditExtraPage() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(schema)
  });
  const router = useRouter();
  const shelterQuery = useShelterInfo();
  const { mutateAsync: update } = useUpdateAdditionalInfo();

  const isParkingEnabled = watch('isParkingEnabled');
  const onSubmit = (data: FormValues) => {
    console.log('🔸 → onSubmit → data:', data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        <TextField
          label="인스타그램 계정"
          placeholder="https://www.instagram.com/프로필명"
          error={errors.instagram}
          {...register('instagram')}
        />
        <div>
          <TextField
            label="후원 계좌 정보"
            placeholder="은행명"
            error={errors.bankName}
            {...register('bankName')}
          />

          <TextField
            placeholder="계좌번호"
            error={errors.accountNumber}
            {...register('accountNumber')}
          />
          <TextField
            placeholder="카카오페이 코드 송금 링크 입력"
            error={errors.donationUrl}
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
            {...register('isParkingEnabled')}
          />
          <TextField
            placeholder="추가 주차 관련 안내 (최대 200자)"
            disabled={isParkingEnabled === ''}
            error={errors.parkingNotice}
            {...register('parkingNotice')}
          />
        </div>
        <TextArea
          label="사전 안내 사항"
          placeholder="봉사자에게 사전에 안내해야 할 내용이 있다면 입력해주세요. (최대 1000자)"
          maxLength={maxNoticeLength}
          height="174px"
          error={errors.notice}
          {...register('notice')}
        />
      </div>
      <FixedFooter>
        <Button itemType="submit" disabled={!isEmpty(errors)}>
          저장하기
        </Button>
      </FixedFooter>
    </form>
  );
}

'use client';
import Button from '@/components/common/Button/Button';
import TextField from '@/components/common/TextField/TextField';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as styles from './styles.css';
import { Caption1 } from '@/components/common/Typography';
import TextArea from '@/components/common/TextField/TextArea';
import useShelterInfo from '@/api/shelter/admin/useShelterInfo';
import { isEmpty } from 'lodash';
import useUpdateEssentialInfo from '@/api/shelter/admin/useUpdateEssentialInfo';
import { useRouter } from 'next/navigation';
import AddressSearchBar from '@/components/shelter-edit/AddressSearchBar/AddressSearchBar';
import { ShelterEssentialInfoPayload } from '@/api/shelter/admin/essential-info';
import { formatPhone, removeDash, phoneRegex } from '@/utils/formatInputs';
import yup from '@/utils/yup';
import useHeader from '@/hooks/useHeader';
import { SearchedAddress } from '@/types/shelter';
import useBooleanState from '@/hooks/useBooleanState';

type FormValues = {
  name: string;
  phoneNumber: string;
  addressDetail: string;
  description: string;
};

const schema: yup.ObjectSchema<Partial<FormValues>> = yup
  .object()
  .shape({
    name: yup.string().required(),
    phoneNumber: yup
      .string()
      .matches(phoneRegex, '숫자만 입력해주세요')
      .test(
        'phone-format-validation',
        '전화번호 형식이 올바르지 않습니다',
        value => {
          let val = removeDash(value || '');
          if (!val || (val && val.length <= 3)) {
            return true;
          }

          const result = val.slice(0, 2);
          const phone = val.slice(2);

          if (result === '02' && (phone.length === 7 || phone.length <= 8)) {
            return true;
          } else if (
            phone.length === 7 ||
            phone.length === 8 ||
            phone.length === 9
          ) {
            return true;
          } else {
            return false;
          }
        }
      ),
    addressDetail: yup.string().required(),
    description: yup.string().max(300).required()
  })
  .required();

export default function ShelterEditRequiredPage() {
  useHeader({ title: '필수 정보' });
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  });

  const router = useRouter();
  const shelterQuery = useShelterInfo();
  const { mutateAsync: update } = useUpdateEssentialInfo();
  const [searchedAddress, setSearchedAddress] = useState<SearchedAddress>();
  const [loading, loadingOn] = useBooleanState(false);

  useEffect(() => {
    if (shelterQuery.isSuccess) {
      const data = shelterQuery.data;
      reset({
        name: data.name,
        phoneNumber: formatPhone(data.phoneNumber),
        addressDetail: data.address.addressDetail,
        description: data.description
      });
      setSearchedAddress(data.address);
    }
  }, [reset, shelterQuery.data, shelterQuery.isSuccess]);

  const handlePhoneNumberChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      event.target.value = formatPhone(value);
    },
    []
  );

  const handleChangeAddress = useCallback((address?: SearchedAddress) => {
    setSearchedAddress(address);
  }, []);

  const onSubmit = useCallback(
    async (data: FormValues) => {
      console.log('🔸 → onSubmit → data:', data);
      if (!shelterQuery.isSuccess || !searchedAddress) return;
      loadingOn();
      const payload: ShelterEssentialInfoPayload = {
        ...data,
        phoneNumber: removeDash(data.phoneNumber),
        address: {
          ...searchedAddress,
          addressDetail: data.addressDetail
        }
      };
      await update({ payload });
      router.replace('/admin/shelter/edit');
    },
    [loadingOn, router, searchedAddress, shelterQuery.isSuccess, update]
  );

  return (
    <form className="page" onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        <TextField
          label="보호소 이름"
          {...register('name')}
          error={errors.name}
        />
        <TextField
          label="보호소 연락처"
          {...register('phoneNumber', { onChange: handlePhoneNumberChange })} //onChange Register에 추가
          error={errors.phoneNumber}
        />
        <div>
          <Caption1 element={'label'} color="gray600">
            보호소 주소
          </Caption1>
          <AddressSearchBar
            initialValue={searchedAddress}
            onChange={handleChangeAddress}
          />
          <TextField
            {...register('addressDetail')}
            error={errors.addressDetail}
          />
        </div>
        <TextArea
          height="128px"
          maxLength={300}
          label="보호소 소개 문구"
          {...register('description')}
          defaultValue={watch('description')}
          error={errors.description}
        />
      </div>
      <Button
        className={styles.button}
        disabled={!isEmpty(errors) || !searchedAddress}
        itemType="submit"
        loading={loading}
      >
        저장하기
      </Button>
    </form>
  );
}

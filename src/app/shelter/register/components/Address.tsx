import { SearchedAddress } from '@/api/shelter/admin/essential-info';
import Button from '@/components/common/Button/Button';
import EmphasizedTitle from '@/components/common/EmphasizedTitle/EmphasizedTitle';
import { H2 } from '@/components/common/Typography';
import AddressSearchBar from '@/components/shelter-edit/AddressSearchBar/AddressSearchBar';
import useHeader from '@/hooks/useHeader';
import { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { OnNextProps } from '../page';
import * as styles from './../styles.css';

export default function Address({ onNext }: OnNextProps) {
  const { setValue } = useFormContext();
  const setHeader = useHeader({
    thisPage: 3,
    entirePage: 4
  });

  const [searchedAddress, setSearchedAddress] = useState<SearchedAddress>();
  const handleChangeAddress = useCallback(
    (address?: SearchedAddress) => {
      setSearchedAddress(address);

      setValue('address[address]', address?.address);
      setValue('address[postalCode]', address?.postalCode);
      setValue('address[longitude]', address?.longitude);
      setValue('address[latitude]', address?.latitude);
    },
    [setValue]
  );

  return (
    <>
      <div className={styles.titleWrapper} style={{ marginBottom: '115px' }}>
        <EmphasizedTitle>
          <H2>보호소 주소를 검색해주세요.</H2>
        </EmphasizedTitle>
      </div>

      <AddressSearchBar
        initialValue={searchedAddress}
        onChange={handleChangeAddress}
      />

      <Button
        disabled={!searchedAddress?.address.trim()}
        onClick={onNext}
        style={{ marginTop: '40px' }}
      >
        다음
      </Button>
    </>
  );
}

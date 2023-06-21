import { SearchIcon } from '@/asset/icons';
import { Body2 } from '@/components/common/Typography';
import * as styles from './AddressSearchBar.css';
import React, { useEffect } from 'react';
import useSearchAddress from '@/hooks/useSearchAddress';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import useBooleanState from '@/hooks/useBooleanState';
import { SearchedAddress } from '@/api/shelter/admin/essential-info';

interface AddressSearchBarProps {
  onChange: (address?: SearchedAddress) => void;
}

const AddressSearchBar: React.FC<AddressSearchBarProps> = ({ onChange }) => {
  const { searchResult, onCompleteSearch } = useSearchAddress();
  const [isOpened, open, close] = useBooleanState();
  const handleCompleteSearch = (data: Address) => {
    onCompleteSearch(data);
    close();
  };

  useEffect(() => {
    onChange(searchResult);
  }, [onChange, searchResult]);

  return (
    <div>
      <div className={styles.searchBar} onClick={isOpened ? close : open}>
        <Body2>{searchResult?.address}</Body2>
        <SearchIcon />
      </div>
      {isOpened && (
        <div style={{ height: '390px', overflowY: 'hidden' }}>
          <DaumPostcodeEmbed
            onComplete={handleCompleteSearch}
            useBannerLink={false}
          />
        </div>
      )}
    </div>
  );
};

export default AddressSearchBar;

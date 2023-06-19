import { SearchIcon } from '@/asset/icons';
import { Body2 } from '@/components/common/Typography';
import { useState } from 'react';
import * as styles from './AddressSearchBar.css';
import React from 'react';

interface AddressSearchBarProps {}

const AddressSearchBar: React.FC<AddressSearchBarProps> = () => {
  const [searchResult, setSearchResult] = useState('');

  return (
    <div className={styles.searchBar}>
      <Body2>{searchResult}</Body2>
      <SearchIcon />
    </div>
  );
};

export default AddressSearchBar;

'use client';
import { DropArrow } from '@/asset/icons';
import useBooleanState from '@/hooks/useBooleanState';
import { useState } from 'react';
import BottomSheet from '../BottomSheet/BottomSheet';
import { Body3, Body4, Caption3 } from '../Typography';
import * as styles from './Filter.css';

interface FilterProps {
  label: string;
}

const option = [
  { label: '전체', value: 'ALL' },
  { label: '모집중', value: 'IN_PROGRESS' },
  { label: '모집 종료', value: 'DONE' }
];

export default function Filter({ label }: FilterProps) {
  const [isFilter, openFilter, closeFilter] = useBooleanState();
  const [searchData, setSearchData] = useState(option[0].label);

  return (
    <>
      <button
        className={styles.container}
        onClick={() => {
          openFilter();
        }}
      >
        <div className={styles.grid}>
          <Caption3>
            {label} · {searchData}
          </Caption3>
          <DropArrow />
        </div>
      </button>

      <BottomSheet
        isOpened={isFilter}
        onClose={closeFilter}
        className={styles.sheet}
      >
        <section className={styles.sheetContainer}>
          <Body3 style={{ textAlign: 'center' }}>{label}</Body3>
          <ul>
            {option?.map(({ label, value }) => (
              <li
                key={value}
                className={styles.label}
                onClick={() => {
                  setSearchData(label);
                  closeFilter();
                }}
              >
                <Body4
                  className={styles.labelTxt({
                    color: label === searchData ? 'pick' : 'option'
                  })}
                >
                  {label}
                </Body4>
              </li>
            ))}
          </ul>
        </section>
      </BottomSheet>
    </>
  );
}

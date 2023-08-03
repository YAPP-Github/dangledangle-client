'use client';
import { DropArrow } from '@/asset/icons';
import useBooleanState from '@/hooks/useBooleanState';
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { Caption3 } from '../Typography';
import * as styles from './Filter.css';
import FilterBottom from './FilterBottom';
import Portal from '@/components/global/Dialog/Portal/Portal';
export interface FilterOption {
  label: string;
  value: string;
}
interface FilterProps {
  name: string;
  label: string;
  options: FilterOption[] | readonly string[];
  onChange: (name: string, value: string) => void;
}

/**
 * `Filter` 컴포넌트는 필터 옵션을 선택할 수 있는 바텀시트를 제공합니다.
 * 선택한 필터 옵션 값에 따라 처리 로직을 수행하려면 `onChange` prop에 콜백 함수를 전달해야 합니다.
 *
 * @component
 * @example
 * <Filter
 *   name="region"
 *   label="지역"
 *   options={option_region}
 *   onChange={handleSearchData}
 * />
 * @param name 필터에서 선택한 옵션 값을 처리하는 onChange 로직에서 구분자 역할을 합니다.
 * @param label 필터 UI에 표시되는 텍스트입니다.
 * @param options 선택할 수 있는 필터 옵션들의 배열입니다.
 * @param onChange 필터 값을 변경할 때 호출되는 콜백 함수입니다. 필터 name과 선택된 option의 value 값이 인자로 전달됩니다.
 */

export interface FilterRef {
  setPickOption: (option: string) => void;
}
const Filter = forwardRef<FilterRef, FilterProps>(
  ({ name, label, options, onChange }: FilterProps, ref) => {
    const [isFilter, openFilter, closeFilter] = useBooleanState();
    const [pickOption, setPickOption] = useState(
      typeof options[0] === 'string' ? options[0] : options[0]?.label
    );

    useImperativeHandle(ref, () => ({
      setPickOption
    }));

    const handleChangeData = useCallback(
      (label: string, value: string) => {
        setPickOption(label);
        onChange(name, value);
        closeFilter();
      },
      [name, onChange, closeFilter]
    );

    return (
      <>
        <button className={styles.container} onClick={openFilter}>
          <div className={styles.grid}>
            <Caption3 className={styles.label}>
              {label} · {pickOption}
            </Caption3>
            <DropArrow />
          </div>
        </button>

        <Portal portalId="bottom">
          <FilterBottom
            open={isFilter}
            onClose={closeFilter}
            label={label}
            options={options}
            pickOption={pickOption}
            onClick={handleChangeData}
          />
        </Portal>
      </>
    );
  }
);

Filter.displayName = 'Filter';
export default Filter;

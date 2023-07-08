'use client';
import React from 'react';
import * as styles from './Description.css';
import { Body3 } from '../common/Typography';
import useBooleanState from '@/hooks/useBooleanState';

interface DescriptionProps {
  description: string;
  summaryLength?: number;
}

const SUMMARY_LENGTH_DEFAULT = 50;

export default function Description({
  description,
  summaryLength = SUMMARY_LENGTH_DEFAULT
}: DescriptionProps) {
  const [isExpanded, , , toggleExpaneded] = useBooleanState(true);
  const isLongDescription = description.length > summaryLength;
  const handleClick = () => {
    toggleExpaneded();
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Body3 className={styles.description({ expanded: isExpanded })}>
          {isLongDescription && !isExpanded
            ? `${description.slice(0, 50)}...`
            : description}
        </Body3>
        {isLongDescription && (
          <Body3 className={styles.moreButton} onClick={handleClick}>
            {isExpanded ? '접기' : '더보기'}
          </Body3>
        )}
      </div>
    </>
  );
}

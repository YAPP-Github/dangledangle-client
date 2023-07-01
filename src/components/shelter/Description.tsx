'use client';
import React, { useState } from 'react';
import * as styles from './Description.css';
import { Body3 } from '../common/Typography';
interface DescriptionProps {
  description: string;
}
export default function Description({ description }: DescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isLongDescription = description.length > 50;
  const handleClick = () => {
    setIsExpanded(!isExpanded);
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
